const axios = require('axios');

async function fetchEnrichedData(entityType) {
    try {
        const apiKey = process.env.EXPLORIUM_API_KEY;

        if (!apiKey) {
            throw new Error("EXPLORIUM_API_KEY is missing from environment variables.");
        }

        const endpoint = entityType === 'prospect' ? 'prospects' : 'businesses';
        const EXPLORIUM_API_URL = `https://api.explorium.ai/v1/${endpoint}`;

        const requestBody = {
            mode: "full",
            page: 1,
            page_size: 10 // Fetch the max allowed un-filtered page size
        };

        const response = await axios.post(
            EXPLORIUM_API_URL,
            requestBody,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'api_key': apiKey
                }
            }
        );

        if (response.status !== 200) {
            throw new Error(`Explorium API returned status: ${response.status}`);
        }

        return response.data?.data || [];

    } catch (error) {
        console.error("Explorium API request failed:", error.response?.data || error.message);

        const apiError = new Error(`Failed to fetch data from Explorium API: ${error.message}`);
        apiError.status = error.response?.status || 500;
        throw apiError;
    }
}

module.exports = {
    fetchEnrichedData
};

