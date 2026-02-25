function applyFilters(records, filters) {
    if (!Array.isArray(records) || records.length === 0) return [];
    if (!filters || Object.keys(filters).length === 0) return records;

    const scoredRecords = records.map(record => {
        let score = 0;

        const industry = (record.industry || record.raw?.naics_description || "").toLowerCase();
        const country = (record.country || record.raw?.country_name || "").toUpperCase();

        let empCount = record.employee_count;
        if (typeof empCount !== 'number' && record.raw?.number_of_employees_range) {
            const match = record.raw.number_of_employees_range.match(/(\d+)/);
            if (match) empCount = parseInt(match[1], 10);
        }

        const jobTitle = (record.raw?.job_title || "").toLowerCase();

        // 1. Score by Industry
        if (filters.industries && filters.industries.length > 0) {
            const industryMatch = filters.industries.some(ind => industry.includes(ind.toLowerCase()));
            if (industryMatch) score += 20;
        }

        // 2. Score by Country
        if (filters.countries && filters.countries.length > 0) {
            const countryMatch = filters.countries.some(c => country.includes(c.toUpperCase()));
            if (countryMatch) score += 10;
        }

        // 3. Score by Employee Count Range
        if (typeof empCount === 'number') {
            if (typeof filters.employee_count_min === 'number' && empCount >= filters.employee_count_min) {
                score += 5;
            }
            if (typeof filters.employee_count_max === 'number' && empCount <= filters.employee_count_max) {
                score += 5;
            }
        }

        // 4. Score by Job Title (Prospects)
        if (filters.job_titles && filters.job_titles.length > 0) {
            const titleMatch = filters.job_titles.some(title => jobTitle.includes(title.toLowerCase()));
            if (titleMatch) score += 25;
        }

        return { ...record, _relevance_score: score };
    });

    // Sort descending by score. We don't eliminate records entirely, 
    // we just let the highest scoring (most relevant) float to the top 3.
    return scoredRecords
        .sort((a, b) => b._relevance_score - a._relevance_score)
        .map(r => {
            const cleanRecord = { ...r };
            delete cleanRecord._relevance_score;
            return cleanRecord;
        });
}

module.exports = {
    applyFilters
};
