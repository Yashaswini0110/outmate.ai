const axios = require('axios');

const SYSTEM_PROMPT = `You are an AI assistant that converts natural language sales prompts into structured JSON filters.
You must ALWAYS respond with valid JSON only.
NEVER include explanations, markup (like \`\`\`json), or conversational text.
Your task is to extract the following fields from the user's prompt into this EXACT structure:
{
  "entity_type": "company" | "prospect",
  "filters": {
    "industry": (array of strings),
    "employee_count_min": (number or null),
    "employee_count_max": (number or null),
    "revenue_min": (number or null),
    "revenue_max": (number or null),
    "countries": (array of strings, MUST be 2-letter ISO-3166-1 alpha-2 country codes, e.g., ["US", "DE"]),
    "job_titles": (array of strings),
    "keywords": (array of strings)
  }
}

Only populate fields if explicitly mentioned or clearly implied by the prompt. If a field cannot be determined, set its value to null or an empty array as appropriate based on the type.`;

async function parsePromptWithGemini(userPrompt) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not configured");
    }

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        role: "user",
                        parts: [{ text: userPrompt }]
                    }
                ],
                systemInstruction: {
                    parts: [{ text: SYSTEM_PROMPT }]
                },
                generationConfig: {
                    responseMimeType: "application/json"
                }
            }
        );

        const candidate = response.data.candidates?.[0];
        if (!candidate || !candidate.content || !candidate.content.parts || !candidate.content.parts[0]) {
            throw new Error("Unexpected response structure from Gemini API");
        }

        let rawText = candidate.content.parts[0].text;
        rawText = rawText.replace(/```json\n?|```/g, '').trim();
        return JSON.parse(rawText);

    } catch (error) {
        // ENOTFOUND or ECONNREFUSED indicates a network/DNS issue
        if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
            console.warn(`[Gemini Fallback] Network error ${error.code}. Using local pattern parser.`);
            return basicParserFallback(userPrompt);
        }

        if (error.response) {
            console.error("Gemini API Error Detail:", JSON.stringify(error.response.data, null, 2));

            // If we hit a rate limit/quota error, use the fallback parser to keep the demo alive
            if (error.response.status === 429) {
                console.warn(`[Gemini Fallback] Quota Exceeded (429). Switching to local pattern parser.`);
                return basicParserFallback(userPrompt);
            }

            const apiError = new Error(error.response.data.error?.message || "Gemini API Error");
            apiError.status = error.response.status;
            apiError.code = "GEMINI_API_ERROR";
            throw apiError;
        }

        if (error instanceof SyntaxError) {
            const jsonError = new Error("Gemini returned invalid JSON");
            jsonError.status = 500;
            jsonError.code = "INVALID_GEMINI_RESPONSE";
            throw jsonError;
        }

        throw error;
    }
}

/**
 * Basic keyword-based parser to handle cases where Gemini API is unreachable.
 */
function basicParserFallback(prompt) {
    const lowerPrompt = prompt.toLowerCase();

    // Default structure
    const result = {
        entity_type: "company",
        filters: {
            industry: [],
            employee_count_min: null,
            employee_count_max: null,
            revenue_min: null,
            revenue_max: null,
            countries: [],
            job_titles: [],
            keywords: []
        }
    };

    // 1. Determine entity_type
    if (lowerPrompt.includes("person") || lowerPrompt.includes("lead") || lowerPrompt.includes("vp") ||
        lowerPrompt.includes("ceo") || lowerPrompt.includes("founder") || lowerPrompt.includes("head of")) {
        result.entity_type = "prospect";
    }

    // 2. Extract Countries (Simple List)
    const countries = {
        "us": ["us", "usa", "united states", "america"],
        "de": ["de", "germany", "deutschland"],
        "in": ["in", "india"],
        "uk": ["uk", "united kingdom", "gb", "britain"],
        "ca": ["ca", "canada"],
        "au": ["au", "australia"]
    };
    for (const [code, variants] of Object.entries(countries)) {
        if (variants.some(v => lowerPrompt.includes(v))) {
            result.filters.countries.push(code.toUpperCase());
        }
    }

    // 3. Extract Industry (Simple heuristic)
    const industries = ["saas", "fintech", "ai", "artificial intelligence", "ecommerce", "e-commerce", "cloud", "design", "hr tech", "software"];
    industries.forEach(ind => {
        if (lowerPrompt.includes(ind)) {
            result.filters.industry.push(ind.charAt(0).toUpperCase() + ind.slice(1));
        }
    });

    // 4. Extract Employee Counts (Regex)
    const rangeMatch = lowerPrompt.match(/(\d+)\s*[-to]+\s*(\d+)/);
    if (rangeMatch) {
        result.filters.employee_count_min = parseInt(rangeMatch[1]);
        result.filters.employee_count_max = parseInt(rangeMatch[2]);
    } else {
        const minMatch = lowerPrompt.match(/(?:at least|more than|plus)\s+(\d+)/);
        if (minMatch) result.filters.employee_count_min = parseInt(minMatch[1]);

        const maxMatch = lowerPrompt.match(/(?:less than|under|up to)\s+(\d+)/);
        if (maxMatch) result.filters.employee_count_max = parseInt(maxMatch[1]);
    }

    // 5. Extract Job Titles (for Prospects)
    if (result.entity_type === "prospect") {
        const titles = ["vp sales", "ceo", "founder", "marketing", "developer", "engineering"];
        titles.forEach(title => {
            if (lowerPrompt.includes(title)) {
                result.filters.job_titles.push(title);
            }
        });
    }

    return result;
}

module.exports = {
    parsePromptWithGemini
};
