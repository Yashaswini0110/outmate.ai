function normalizeResults(entityType, rawDataArray) {
    const normalizedObjects = rawDataArray.map(rawObj => {
        return {
            type: entityType,
            name: rawObj.name || null,
            domain: rawObj.domain || null,
            industry: rawObj.industry || null,
            revenue: rawObj.revenue || null,
            employee_count: rawObj.employee_count || null,
            country: rawObj.country || null,
            linkedin_url: rawObj.linkedin_url || null,
            founded_year: rawObj.founded_year || null,
            tech_stack: rawObj.tech_stack || null,
            key_contacts: rawObj.key_contacts || null,
            phone: rawObj.phone || null,
            raw: rawObj
        };
    });

    return {
        results: normalizedObjects
    };
}

module.exports = {
    normalizeResults
};
