const express = require('express');
const router = express.Router();
const { parsePromptWithGemini } = require('../services/geminiService');
const { fetchEnrichedData } = require('../services/exploriumService');
const { normalizeResults } = require('../services/normalizeService');

// POST /api/enrich
router.post('/', async (req, res, next) => {
    try {
        const { prompt } = req.body;
        const promptLength = prompt ? prompt.length : 0;

        if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
            const error = new Error("Prompt is required");
            error.status = 400;
            error.code = "INVALID_PROMPT";
            throw error;
        }

        const parsed = await parsePromptWithGemini(prompt);

        const entityType = parsed.entity_type;
        const filters = parsed.filters;

        const rawResults = await fetchEnrichedData(entityType, filters);

        const limitedResults = rawResults.slice(0, 3);
        const resultCount = limitedResults.length;

        const finalResponse = normalizeResults(entityType, limitedResults);


        res.json(finalResponse);

    } catch (error) {
        // Log the full technical error in the server console
        console.error("Enrichment Error:", error);

        // If it's a validation error (400), pass the specific message
        if (error.status === 400) {
            return res.status(400).json({
                error: error.message
            });
        }

        // For all other errors (Gemini quota, network, etc.), use masked message
        res.status(500).json({
            error: "AI service temporarily unavailable. Please try again later."
        });
    }
});

module.exports = router;
