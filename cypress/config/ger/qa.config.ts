export const envirmentConfig: Cypress.ConfigOptions<any> = {
  e2e: {
    baseUrl: "http://gmsdeuqa1.icc.crifnet.com:5555",
  },
  env: {
    environment: "qa",
    apiUrl: "http://gmsdeuqa1.icc.crifnet.com:5598",
    grepTags: "@GER",
    isIntConfig: true,
    configCountry: "GER",
    lang_array: ["DE", "EN"],
    area_manager: "DaMS internal",

    username: "admin-test-user",
    username_as: "Sale1 Sale1LastName",
    password: "Margo123@",
    user_name: "A U",
    sale_user_name: "Sale1 Sale1LastName",
    user_email: "o.lementa@consultant.crif.com",
    user_code: "08824059",
    user_code_as_areaManager: "manager-test-user",
    user_code_as_sale: "sales-test-user",
    user_role: "Supervisor",
    user_office: "BÜRGEL M",
    user_subscription: "ORGANIZ. INTERNA TEST MARGO'",
    user_subscription_code: "878328441",
    filter_StatusCompany: 3,
    filter_OfficeType: 2,
    allCompaniesLabel: "All German companies",
    company_vatCode: "2643022573405",
    contact_us_message: "Your message has been correctly sent to CRIF.",

    moduleMemo: {
      appointmentCompanyName: "Feldbinder Spezialfahrzeugwerke GmbH",
      appointmentCompanyVatCode: "1461320",
    },
    moduleOperations: {
      account_portfolio_management:
        "http://gmsdeuqa1.icc.crifnet.com:5555/account/portfolio-management/",
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
      schema_name: "gerQaPortfolioSchemas",
      enrich_test_name: "Enrich + var cus (DO NOT REMOVE)",
      filters_arrangement_address: "Berlin, Germany",
      simplified_upload_country: "",
      upload: "./cypress/uploads/gerQaPortfolioToUpload.xlsx",
      update: {
        excelToUpload: "./cypress/uploads/gerQaUpdatedPortfolio.xlsx",
        updatedCompanyCount: "1",
      },
      links: {
        enriched:
          "/portfolio-management/portfolio/e834d66b-9537-4afb-89b5-60093160850c",
        enrich_test:
          "/portfolio-management/portfolio/2fe137b6-c6d9-4eac-8053-5b199d8f23f6",
        test_var_cus:
          "/portfolio-management/portfolio/2fe137b6-c6d9-4eac-8053-5b199d8f23f6",
        send_to_analyze_market:
          "/portfolio-management/portfolio/2fe137b6-c6d9-4eac-8053-5b199d8f23f6",
      },
      ids: {
        group_actions_download_companies: ["4419137", "15410905", "4426699"],
        group_action: ["4419137", "15410905", "4426699"],
        companies_for_creation: ["4419137", "15410905", "4426699"],
        enriched_companies: [
          "15410905",
          "4366395",
          "4366932",
          "4369549",
          "4415586",
          "4419137",
          "4426699",
        ],
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
          filterVatCode: "DE123047934",
          expecedCompany: "Randstad Deutschland GmbH & Co. KG",
        },
      },
      companyReport: {
        companyReportName: "Randstad Deutschland GmbH & Co. KG",
        companyReportLink: "/company-report/4240463/4240463",
        topButtonSelectors: ["button[data-testid='download-pdf-button']"],
        sideButtonSelectors: [
          "li[data-pf-id='CompanyData']",
          "li[data-pf-id='CompanySummary']",
          "li[data-pf-id='FinancialStatement']",
          "li[data-pf-id='Analytics']",
          "li[data-pf-id='Esg']",
          "li[data-pf-id='SalesTransaction']",
          "li[data-pf-id='Portfolio']",
          "li[data-pf-id='Appointments']",
        ],
      },
      freeSearch: {
        companyName: "Sparbrod & Kretzschmar GmbH",
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
        md5Hash: "",
      },
      analyzeMarket_universal_portfolio: "analyzeMarketUniversalPortfolio",
    },

    moduleSalesTool: {
      manage_campaign_link:
        "salestool/campaign/67c641c1-63b5-479f-9c98-1a66f0b49aae/assignments",
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
      firstCompanyInTable: "Peter Lohse e.K. - Inhaber Ronald Lohse",
      md5Hash: "",
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
      companyTaxCode: [""],
      enrich_company: "",
      enrich_company_id: "",
      enrich_company_vat_code: "",
      cookies_policy_h1: "Cookies policy",
    },
  },
};
