const MOCK_COMPANIES = [
    {
        name: "Outmate.ai",
        domain: "outmate.ai",
        industry: "Artificial Intelligence",
        employee_count: 50,
        revenue: "$1M - $5M",
        country: "US",
        linkedin_url: "https://linkedin.com/company/outmate-ai",
        founded_year: 2023,
        tech_stack: ["Next.js", "Node.js", "React"],
        key_contacts: [{ name: "Yash Sharma", title: "Founder" }],
        phone: "+1-415-555-1234",
        raw: {
            logo: "https://logo.clearbit.com/outmate.ai",
            country_name: "United States",
            city_name: "San Francisco",
            number_of_employees_range: "11-50",
            yearly_revenue_range: "$1M - $5M",
            naics_description: "Software Publishers",
            naics_code: "511210",
            sic_code: "7372",
            business_description: "Outmate.ai provides cutting-edge NLP enrichment tools for modern B2B databases.",
            linkedin_profile_url: "https://linkedin.com/company/outmate-ai"
        }
    },
    {
        name: "Stripe",
        domain: "stripe.com",
        industry: "Fintech",
        employee_count: 7000,
        revenue: "$10B+",
        country: "US",
        linkedin_url: "https://linkedin.com/company/stripe",
        founded_year: 2010,
        tech_stack: ["Ruby", "React", "Go"],
        key_contacts: [{ name: "Patrick Collison", title: "CEO" }],
        phone: "+1-415-555-5678",
        raw: {
            logo: "https://logo.clearbit.com/stripe.com",
            country_name: "United States",
            city_name: "South San Francisco",
            number_of_employees_range: "5001-10000",
            yearly_revenue_range: "$1B+",
            naics_description: "Financial Transactions Processing",
            naics_code: "522320",
            sic_code: "6099",
            business_description: "Stripe is a financial infrastructure platform for businesses.",
            linkedin_profile_url: "https://linkedin.com/company/stripe"
        }
    },
    {
        name: "Snowflake",
        domain: "snowflake.com",
        industry: "Cloud Computing",
        employee_count: 6000,
        revenue: "$2B+",
        country: "US",
        linkedin_url: "https://linkedin.com/company/snowflake-computing",
        founded_year: 2012,
        tech_stack: ["Java", "C++", "Python"],
        key_contacts: [{ name: "Frank Slootman", title: "CEO" }],
        phone: "+1-415-555-9012",
        raw: {
            logo: "https://logo.clearbit.com/snowflake.com",
            country_name: "United States",
            city_name: "Bozeman",
            number_of_employees_range: "5001-10000",
            yearly_revenue_range: "$1B+",
            naics_description: "Computing Infrastructure and Data Processing",
            naics_code: "518210",
            sic_code: "7374",
            business_description: "Snowflake is a data cloud company that helps organizations manage and analyze their data.",
            linkedin_profile_url: "https://linkedin.com/company/snowflake-computing"
        }
    },
    {
        name: "Shopify",
        domain: "shopify.com",
        industry: "E-commerce",
        employee_count: 10000,
        revenue: "$5B+",
        country: "CA",
        linkedin_url: "https://linkedin.com/company/shopify",
        founded_year: 2006,
        tech_stack: ["Ruby on Rails", "React", "Go"],
        key_contacts: [{ name: "Tobi Lütke", title: "CEO" }],
        phone: "+1-613-555-3456",
        raw: {
            logo: "https://logo.clearbit.com/shopify.com",
            country_name: "Canada",
            city_name: "Ottawa",
            number_of_employees_range: "10000+",
            yearly_revenue_range: "$1B+",
            naics_description: "Electronic Shopping and Mail-Order Houses",
            naics_code: "454110",
            sic_code: "5961",
            business_description: "Shopify is a leading global commerce company providing trusted tools to start, grow, market, and manage a retail business of any size.",
            linkedin_profile_url: "https://linkedin.com/company/shopify"
        }
    },
    {
        name: "Canva",
        domain: "canva.com",
        industry: "Design",
        employee_count: 3500,
        revenue: "$1B+",
        country: "AU",
        linkedin_url: "https://linkedin.com/company/canva",
        founded_year: 2013,
        tech_stack: ["Java", "React", "TypeScript"],
        key_contacts: [{ name: "Melanie Perkins", title: "CEO" }],
        phone: "+61-2-5555-7890",
        raw: {
            logo: "https://logo.clearbit.com/canva.com",
            country_name: "Australia",
            city_name: "Sydney",
            number_of_employees_range: "1001-5000",
            yearly_revenue_range: "$1B+",
            naics_description: "Graphic Design Services",
            naics_code: "541430",
            sic_code: "7336",
            business_description: "Canva is an online design and publishing tool.",
            linkedin_profile_url: "https://linkedin.com/company/canva"
        }
    },
    {
        name: "Revolut",
        domain: "revolut.com",
        industry: "Fintech",
        employee_count: 6000,
        revenue: "$1B+",
        country: "GB",
        linkedin_url: "https://linkedin.com/company/revolut",
        founded_year: 2015,
        tech_stack: ["Java", "Swift", "Kotlin"],
        key_contacts: [{ name: "Nikolay Storonsky", title: "CEO" }],
        phone: "+44-20-5555-1234",
        raw: {
            logo: "https://logo.clearbit.com/revolut.com",
            country_name: "United Kingdom",
            city_name: "London",
            number_of_employees_range: "5001-10000",
            yearly_revenue_range: "$1B+",
            naics_description: "Commercial Banking",
            naics_code: "522110",
            sic_code: "6029",
            business_description: "Revolut is a global financial superapp.",
            linkedin_profile_url: "https://linkedin.com/company/revolut"
        }
    },
    {
        name: "Deel",
        domain: "deel.com",
        industry: "HR Tech",
        employee_count: 2500,
        revenue: "$295M",
        country: "US",
        linkedin_url: "https://linkedin.com/company/deel",
        founded_year: 2019,
        tech_stack: ["React", "Node.js", "PostgreSQL"],
        key_contacts: [{ name: "Alex Bouaziz", title: "CEO" }],
        phone: "+1-415-555-6789",
        raw: {
            logo: "https://logo.clearbit.com/deel.com",
            country_name: "United States",
            city_name: "San Francisco",
            number_of_employees_range: "1001-5000",
            yearly_revenue_range: "$100M-$500M",
            naics_description: "Human Resources Consulting Services",
            naics_code: "541612",
            sic_code: "8742",
            business_description: "Deel is a global payroll and compliance provider built for remote teams.",
            linkedin_profile_url: "https://linkedin.com/company/deel"
        }
    },
    {
        name: "Notion",
        domain: "notion.so",
        industry: "Productivity",
        employee_count: 500,
        revenue: "$50M+",
        country: "US",
        linkedin_url: "https://linkedin.com/company/notionhq",
        founded_year: 2016,
        tech_stack: ["React", "TypeScript", "Node.js"],
        key_contacts: [{ name: "Ivan Zhao", title: "CEO" }],
        phone: "+1-415-555-2345",
        raw: {
            logo: "https://logo.clearbit.com/notion.so",
            country_name: "United States",
            city_name: "San Francisco",
            number_of_employees_range: "251-1000",
            yearly_revenue_range: "$50M-$100M",
            naics_description: "Software Publishers",
            naics_code: "511210",
            sic_code: "7372",
            business_description: "Notion is a workspace that blends your everyday work apps into one.",
            linkedin_profile_url: "https://linkedin.com/company/notionhq"
        }
    },
    {
        name: "Atlassian",
        domain: "atlassian.com",
        industry: "Software",
        employee_count: 10000,
        revenue: "$3B+",
        country: "AU",
        linkedin_url: "https://linkedin.com/company/atlassian",
        founded_year: 2002,
        tech_stack: ["Java", "React", "Python"],
        key_contacts: [{ name: "Mike Cannon-Brookes", title: "Co-CEO" }],
        phone: "+61-2-5555-3456",
        raw: {
            logo: "https://logo.clearbit.com/atlassian.com",
            country_name: "Australia",
            city_name: "Sydney",
            number_of_employees_range: "10000+",
            yearly_revenue_range: "$1B+",
            naics_description: "Software Publishers",
            naics_code: "511210",
            sic_code: "7372",
            business_description: "Atlassian creates collaboration and productivity software.",
            linkedin_profile_url: "https://linkedin.com/company/atlassian"
        }
    },
    {
        name: "Celonis",
        domain: "celonis.com",
        industry: "SaaS",
        employee_count: 3000,
        revenue: "$1B+",
        country: "DE",
        linkedin_url: "https://linkedin.com/company/celonis",
        founded_year: 2011,
        tech_stack: ["Java", "Angular", "Spring Boot"],
        key_contacts: [{ name: "Alex Rinke", title: "Co-CEO" }],
        phone: "+49-89-5555-7890",
        raw: {
            logo: "https://logo.clearbit.com/celonis.com",
            country_name: "Germany",
            city_name: "Munich",
            number_of_employees_range: "1001-5000",
            yearly_revenue_range: "$1B+",
            naics_description: "Software Publishers",
            naics_code: "511210",
            sic_code: "7372",
            business_description: "Celonis is the global leader in execution management and process mining.",
            linkedin_profile_url: "https://linkedin.com/company/celonis"
        }
    }
];

const MOCK_PROSPECTS = [
    {
        name: "Yash Sharma",
        domain: "outmate.ai",
        industry: "Technology",
        employee_count: 50,
        revenue: "N/A",
        country: "IN",
        linkedin_url: "https://linkedin.com/in/yash-sharma",
        founded_year: 2023,
        tech_stack: ["Next.js"],
        key_contacts: [],
        raw: {
            job_title: "Founder & CEO",
            country_name: "India",
            city_name: "Bangalore",
            business_description: "Visionary leader building the future of sales intelligence.",
            linkedin_profile_url: "https://linkedin.com/in/yash-sharma"
        }
    },
    {
        name: "John Doe",
        domain: "celonis.com",
        industry: "Fintech",
        employee_count: 3000,
        revenue: "N/A",
        country: "DE",
        linkedin_url: "https://linkedin.com/in/john-doe",
        founded_year: 2011,
        tech_stack: [],
        key_contacts: [],
        raw: {
            job_title: "VP Sales",
            country_name: "Germany",
            city_name: "Munich",
            business_description: "Experienced sales leader in EMEA.",
            linkedin_profile_url: "https://linkedin.com/in/john-doe"
        }
    },
    {
        name: "Jane Smith",
        domain: "shopify.com",
        industry: "E-commerce",
        employee_count: 10000,
        revenue: "N/A",
        country: "CA",
        linkedin_url: "https://linkedin.com/in/jane-smith",
        founded_year: 2006,
        tech_stack: [],
        key_contacts: [],
        raw: {
            job_title: "Marketing Leader",
            country_name: "Canada",
            city_name: "Toronto",
            business_description: "Marketing visionary at Shopify.",
            linkedin_profile_url: "https://linkedin.com/in/jane-smith"
        }
    }
];

async function fetchEnrichedData(entityType, filters) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    let results = entityType === "company" ? [...MOCK_COMPANIES] : [...MOCK_PROSPECTS];

    if (filters) {
        if (filters.industry && filters.industry.length > 0) {
            results = results.filter(item => {
                const itemIndustry = (item.industry || "").toLowerCase();
                return filters.industry.some(ind => itemIndustry.includes(ind.toLowerCase()));
            });
        }

        if (filters.countries && filters.countries.length > 0) {
            results = results.filter(item => {
                const itemCountry = (item.country || "").toUpperCase();
                return filters.countries.map(c => c.toUpperCase()).includes(itemCountry);
            });
        }

        if (typeof filters.employee_count_min === 'number') {
            results = results.filter(item => item.employee_count >= filters.employee_count_min);
        }

        if (typeof filters.employee_count_max === 'number') {
            results = results.filter(item => item.employee_count <= filters.employee_count_max);
        }

        if (entityType === "prospect" && filters.job_titles && filters.job_titles.length > 0) {
            results = results.filter(item => {
                const itemJobTitle = (item.raw?.job_title || "").toLowerCase();
                return filters.job_titles.some(title => itemJobTitle.includes(title.toLowerCase()));
            });
        }
    }

    if (results.length === 0) {
        // Fallback to first 3 if no match
        results = entityType === "company" ? MOCK_COMPANIES.slice(0, 3) : MOCK_PROSPECTS.slice(0, 3);
    } else {
        results = results.slice(0, 3);
    }

    return results;
}

module.exports = {
    fetchEnrichedData
};
