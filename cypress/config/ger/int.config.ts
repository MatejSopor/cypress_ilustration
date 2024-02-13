export const envirmentConfig: Cypress.ConfigOptions<any> = {
  e2e: {
    baseUrl: "http://gmsdeu01.icc.crifnet.com:5555",
  },
  env: {
    environment: "int",
    apiUrl: "http://gmsdeu01.icc.crifnet.com:5598",
    apiEnrichUrl: "http://gmsdeu01.icc.crifnet.com:5522",
    grepTags: "@GER",
    isIntConfig: true,
    configCountry: "GER",
    lang_array: ["DE", "EN"],
    area_manager: "M U",

    username: "admin-test-user-int",
    username_as: "",
    password: "Margo123@",
    user_name: "a u",
    sale_user_name: "S U",
    user_email: "m.sopor@crif.com",
    user_code: "admin-test-user-int",
    user_code_as_areaManager: "manager-test-user-int",
    user_code_as_sale: "sales-test-user-int",
    user_role: "Supervisor",
    user_office: "BÜRGEL M",
    user_subscription: "ORGANIZ. INTERNA TEST MARGO'",
    user_subscription_code: "878328441",
    filter_StatusCompany: 3,
    filter_OfficeType: 2,
    allCompaniesLabel: "All German companies",
    company_vatCode: "17182699",
    contact_us_message: "Your message has been correctly sent to CRIF.",

    moduleMemo: {
      appointmentCompanyName: "KME Mansfeld GmbH",
      appointmentCompanyVatCode: "1462216",
    },
    moduleOperations: {
      account_portfolio_management:
        "http://gmsdeu01.icc.crifnet.com:5555/account/portfolio-management/",
      geolocation: [
        "Hamburg",
        "Hamburg, Freie und Hansestadt",
        "Hamburg, Freie und Hansestadt",
      ],
      geolocation_town: "20095",
      email: "Email",
      min_max: "Turnover",
      date: "Start date",
      doubleFilter1: {
        row1_type: "Office type",
        row1_class: "Headquarter",
        row2_type: "Email",
        row2_bool: "True",
      },
      doubleFilter2: {
        row1_type: "Website",
        row1_bool: "True",
        row2_type: "Analytics Filters",
        row2_class: "Credit needs - Short term",
        row2_value: "1",
      },
      valueFilter: {
        type: "Employees",
        comparsion: "Equal to",
        value: "200",
      },
    },
    modulePortfolio: {
      enriched_company_count: "7",
      schema_name: "gerIntPortfolioSchemas",
      enrich_test_name: "Enrich + var cus (DO NOT REMOVE)",
      filters_arrangement_address: "Frankfurt, Germany",
      simplified_upload_country: "",
      upload: "./cypress/uploads/gerIntPortfolioToUpload.xlsx",
      update: {
        excelToUpload: "./cypress/uploads/gerIntUpdatedPortfolio.xlsx",
        updatedCompanyCount: "1",
      },
      links: {
        enriched:
          "/portfolio-management/portfolio/72a86002-641c-4045-a398-668c0248208b",
        enrich_test:
          "/portfolio-management/portfolio/a25ef6e9-c78e-4b92-af0d-aa2a8dac311b",
        test_var_cus:
          "/portfolio-management/portfolio/a25ef6e9-c78e-4b92-af0d-aa2a8dac311b",
        send_to_analyze_market:
          "/portfolio-management/portfolio/f74e5ebc-b2a3-4a5a-b3c5-b4b48d7ba36f",
      },
      ids: {
        group_actions_download_companies: ["4419137", "15410905", "4426699"],
        group_action: ["4419137", "15410905", "4426699"],
        companies_for_creation: ["19129457", "26869453", "5851826"],
        enriched_companies: [
          "15410905",
          "4366395",
          "4366932",
          "4369549",
          "4415586",
          "4419137",
          "4426699",
        ],
        companies_for_creation2: [],
      },
      table_columns: [
        "ONR Number",
        "Company Name",
        "Status in portfolio",
        "Amount",
        "Area Manager",
        "Sales",
        "Product",
        "Tags",
        "Town",
        "WZ 2008 Classification",
        "Company unit type",
      ],
      top_buttons: [
        "Load Query",
        "Save Query",
        "Download Portfolio",
        "Update Portfolio",
        "Generate Similarity",
        "Send to Other Modules",
      ],
    },
    moduleProspecting: {
      filters: {
        arrowIconsGeoFilter: [
          "Schleswig-Holstein",
          "Lübeck, Hansestadt",
          "Lübeck, Hansestadt",
        ],
        cityPart: "23552",
        defaultFunnelTooltips: ["Office type", "Company status"],
        geoFilterFunnelTooltips: [
          "Office type",
          "Company status",
          "Geographic area",
        ],
        companieWithoutNegativeEffects: "Companies without negative events",

        turnoverFilter: {
          filterSelector: "[id='businessInfo.financialInfo1.turnover1']",
          filterName: "Turnover",
          expectedFunnelTooltips: ["Office type", "Company status", "Turnover"],
        },

        vatCodeFilter: {
          filterName: "Vat number",
          expectedFunnelTooltips: [
            "Office type",
            "Company status",
            "Vat number",
          ],
          filterVatCode: "21230738",
          expecedCompany: "Haynes Inc",
        },
      },
      companyReport: {
        companyReportName: "Arrow Central Europe GmbH",
        companyReportLink: "company-report/19129457/19129457",
        topButtonSelectors: ["button[data-testid='download-pdf-button']"],
        sideButtonSelectors: [
          "li[data-pf-id='CompanyData']",
          "li[data-pf-id='CompanySummary']",
          "li[data-pf-id='FinancialStatement']",
          "li[data-pf-id='Contacts']",
          "li[data-pf-id='Analytics']",
          "li[data-pf-id='SalesTransaction']",
          "li[data-pf-id='Portfolio']",
          "li[data-pf-id='Appointments']",
        ],
      },
      freeSearch: {
        companyName: "Sparks, Wheeler and Davis",
        campaignName: "CampaignToBeExcluded",
        companiesBy: [
          "Company Name",
          "VATcode",
          "Tax id",
          "ONR",
          "Website"
        ],
        findText: [
          "You can search Companies, Portfolios or Campaigns",
          "Companies",
          "by:",
          "Portfolios",
          "Campaigns"
        ]
      }
    },

    moduleTargeting: {
      filters: {
        applied_precondition_filters: ["Headquarter", "Active"],
        analyzeMarket_date_from: "7/5/2021",
        analyzeMarket_CAP_path: ["Nordrhein-Westfalen", "Düsseldorf"],
        analyzeMarket_CAP_num: "Düsseldorf",
        analyzeMarket_semantic_search_keyword: "car",
        analyzeMarket_advanced_sem_search_input: "car OR beer",
        geoFilter_id_getter: "Tree-geo",
        legalForm_id_getter: "Tree-legalForm",
        vatCode_id_getter: "businessInfo.vaTnumber",
        startDate_id_getter: "businessInfo.startBusiness",
        compNegEvents_id_getter:
          "businessInfo.riskInfo.companiesWithoutNegativeEvents",
        employees_id_getter: "businessInfo.employees1",
        turnover_id_getter: "businessInfo.financialInfo1.turnover1",
        legalForm_subfilter: "Public limited company",
        legalForm_name: "Legal Form",
        compNegEvents_name: "Companies without negative events",
        vatCode_name: "Vat number",
      },
      query: {
        analyzeMarket_query_traverse: ["Nordrhein-Westfalen", "Düsseldorf"],
        analyzeMarket_query_city: "Düsseldorf",
        analyzeMarket_query_name: "analyzeMarketNewQuery1",
        md5Hash: "79f314fb32da730da1ca99aeb95edcbb",
      },
      analyzeMarket_universal_portfolio: "analyzeMarketUniversalPortfolio",
    },

    moduleSalesTool: {
      manage_campaign_link:
        "salestool/campaign/d570a412-de60-495f-867f-5a3e89b2959e/assignments",
      filters: {
        analyzeMarket_date_from: "7/5/2021",
        analyzeMarket_CAP_path: ["Nordrhein-Westfalen", "Düsseldorf"],
        analyzeMarket_CAP_num: "Düsseldorf",
        geoFilter_id_getter: "Tree-geo",
        vatCode_id_getter: "businessInfo.vaTnumber",
        startDate_id_getter: "businessInfo.startBusiness",
        compNegEvents_id_getter:
          "businessInfo.riskInfo.companiesWithoutNegativeEvents",
        employees_id_getter: "businessInfo.employees1",
        compNegEvents_name: "Companies without negative events",
        vatCode_name: "Vat number",
        companySummary_startDate: "Date of foundation",
      },
      firstCompanyInTable:
        "Treumedizin Gesellschaft für Praxisplanung und Einrichtung mit beschränkter Haftung",
      md5Hash: "05e5dfdb0497497fcf74d8da3f01a34b",
    },

    moduleAdditional: {
      navigationPaths: [
        "/portfolio-management",
        "/targeting",
        "/prospecting",
        "/salestool",
      ],
    },
    moduleAccount: {
      companyTaxCode: ["000000001274"],
      enrich_company:
        "http://gmsdeu01.icc.crifnet.com:5555/company-report/000000001274/4e93a82b-7ed7-4392-80ce-000000001274/summary",
      enrich_company_id: "4e93a82b-7ed7-4392-80ce-000000001274",
      enrich_company_vat_code: "000000001274",
      cookies_policy_h1: "Cookies policy",
    },
  },
};
