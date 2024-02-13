export const envirmentConfig: Cypress.ConfigOptions<any> = {
  e2e: {
    baseUrl: "http://gmsczsk01.icc.crifnet.com:5555",
  },
  env: {
    apiUrl: "http://gmsczsk01.icc.crifnet.com:5598",
    grepTags: "@CZSK",
    isIntConfig: true,
    configCountry: "CZSK",
    lang_array: ["CZ", "SK", "EN"],
    portfolio_to_upload: "./cypress/uploads/czIntPortfolioToUpload.xlsx",
    local_units: ["Agency", "Head office"],
    portfolio_schema_name: "czIntPortfolioSchemas",
    enriched_portfolio_link:
      "/portfolio-management/portfolio/fe0261d5-8cf2-4227-9021-cbc105fc1726",
    enriched_portfolio_id: "fe0261d5-8cf2-4227-9021-cbc105fc1726",
    portfolio_management_enrich_test_link:
      "/portfolio-management/portfolio/f52c2abf-b5e7-4df9-944c-04cdb6e06b18",
    portfolio_management_test_var_cus_link:
      "/portfolio-management/portfolio/f52c2abf-b5e7-4df9-944c-04cdb6e06b18",
    portfolio_account_link:
      "http://gmsczsk01.icc.crifnet.com:5555/account/portfolio-management/",
    portfolio_send_to_analyze_market:
      "/portfolio-management/portfolio/5e126963-8710-440f-8915-5af1d5bf25c1",
    portfolio_to_update: {
      excelToUpload: "./cypress/uploads/czIntUpdatedPortfolio.xlsx",
      portfolioUpdatedCompanyCount: "1",
    },
    company_ids_for_creation: [
      "14406829",
      "37971832",
      "00607274",
      "30011787",
      "14407574",
    ],
    company_ids_for_creation2: ["31140505", "33586501", "33588597"],
    group_actions_download_companies: ["26178541", "46345965", "31333532"],
    area_manager: "AreaManager1 AreaManager1LastName",
    sales_tool_portfolio_link:
      "/portfolio-management/portfolio/5e126963-8710-440f-8915-5af1d5bf25c1",
    enriched_portfolio_companies: [
      "25501143", // cz
      "26178541", // cz
      "46345965", // cz
      "31333532", // sk
      "35876832", // sk
    ],
    username: "SU88894",
    username_as: "CX100034",
    password: "Margo159@",
    user_name: "Martin Klvac",
    sale_user_name: "Sales1 Sales1LastName",
    user_email: "margoautomation@gmail.com",
    user_code: "CX100035",
    user_code_as_areaManager: "AM88894",
    user_code_as_sale: "SA88894",
    user_role: "Supervisor",
    user_office: "Ufficio 1",
    user_subscription: "ORGANIZ. INTERNA TEST MARGO'",
    user_subscription_code: "878328441",
    filter_StatusCompany: 3,
    filter_OfficeType: 2,
    allCompaniesLabel: "All available companies",
    company_vatCode: "SK2020234216",
    contact_us_message:
      "Your message has been correctly sent to Customer Care.",

    operations_geolocation: ["Slovak Republic", "Nitra Region", "Nitra"],
    operations_geolocation_town: "Jarok",
    operations_email: "E-mail",
    operations_min_max: "Register vehicles count",
    operations_date: "Date of registration",
    operations_double_filter_row1_type: "Employee trend",
    operations_double_filter_row1_class: "Positive",
    operations_double_filter_row2_type: "E-mail",

    operations_double_filter_row2_bool: "True",

    operations_double_filter_row1_type2: "Website",
    operations_double_filter_row1_bool2: "True",
    operations_double_filter_row2_type2: "Custom Indexes",
    operations_double_filter_row2_class2: "Index Cribis",
    operations_double_filter_row2_value2: "a1",

    operations_value_filter_type: "Total Assets",
    operations_value_filter_comparsion: "Less than",
    operations_value_filter_value: "200",
    /* Module variables */

    moduleMemo: {
      appointmentCompanyName: "",
      appointmentCompanyVatCode: "",
    },
    moduleProspecting: {
      filters: {
        arrowIconsGeoFilter: [
          "Slovak Republic",
          "Bratislava Region",
          "Pezinok",
        ],
        cityPart: "Dubová",
        defaultFunnelTooltips: ["Status activity"],
        geoFilterFunnelTooltips: ["Status activity", "Geographic area"],
        companieWithoutNegativeEffects:
          "Companies without negative information",

        turnoverFilter: {
          filterSelector:
            "[id='businessInfo.skFinancialIndicators1.assetsTurnover']",
          filterName: "Assets Turnover",
          expectedFunnelTooltips: ["Status activity", "Assets Turnover"],
        },

        vatCodeFilter: {
          filterName: "VAT ID",
          expectedFunnelTooltips: ["Status activity", "VAT ID"],
          filterVatCode: "CZ26178541",
          expecedCompany: "Lidl Česká republika v.o.s.",
        },
      },
      companyReport: {
        companyReportName: "Lidl Česká republika v.o.s.",
        companyReportLink: "/company-report/CZ-26178541/2813",
        topButtonSelectors: [],
        sideButtonSelectors: [
          "li[data-pf-id='CompanyData']",
          "li[data-pf-id='CompanySummary']",
          "li[data-pf-id='FinancialStatement']",
          "li[data-pf-id='People']",
          "li[data-pf-id='ContactsAndSocial']",
          "li[data-pf-id='CustomIndex']",
          "li[data-pf-id='SalesTransaction']",
          "li[data-pf-id='Portfolio']",
        ],
      },
    },

    moduleTargeting: {
      filters: {
        applied_precondition_filters: ["Active"],
        analyzeMarket_CAP_path: ["Slovak Republic", "Prešov Region", "Humenné"],
        analyzeMarket_CAP_num: "Humenné",
        analyzeMarket_semantic_search_keyword: "car",
        analyzeMarket_advanced_sem_search_input: "car OR beer",
        geoFilter_id_getter: "Tree-geographic",
        legalForm_id_getter: "Tree-legalForms",
        vatCode_id_getter: "businessInfo.vatId",
        stateOwnedComp_id_getter: "businessInfo.isStateOwnedCompany",
        compNegEvents_id_getter: "businessInfo.hasNotNegativeEvents",
        legalForm_subfilter: "Legal persons entrepreneurial",
        legalForm_name: "Legal form",
        compNegEvents_name: "Companies without negative information",
        vatCode_name: "VAT ID",
      },
      query: {
        analyzeMarket_query_traverse: [
          "Slovak Republic",
          "Prešov Region",
          "Humenné",
        ],
        analyzeMarket_query_city: "Humenné",
        analyzeMarket_query_name: "analyzeMarketNewQuery1",
        md5Hash: "",
      },
      analyzeMarket_universal_portfolio: "analyzeMarketUniversalPortfolio",
    },

    moduleSalesTool: {
      manage_campaign_link:
        "salestool/campaign/74c2707c-cdc5-4484-94ea-a493fc0e7af7/assignments",
      filters: {
        analyzeMarket_CAP_path: ["Slovak Republic", "Prešov Region", "Humenné"], //
        analyzeMarket_CAP_num: "Humenné",
        geoFilter_id_getter: "Tree-geographic",
        vatCode_id_getter: "businessInfo.vatId",
        compNegEvents_id_getter: "businessInfo.hasNotNegativeEvents",
        compNegEvents_name: "Companies without negative information",
        vatCode_name: "VAT ID",
      },
      firstCompanyInTable: "Telovýchovná jednota Slavoj Veľký Šariš",
    },

    moduleAdditional: {
      navigationPaths: [
        "/portfolio-management",
        "/targeting",
        "/prospecting",
        "/salestool",
      ],
    },

    portfolio_enrich_test_name: "Enrich + var cus (DO NOT REMOVE)",
    portfolio_filtersArrangement_adress: "Nitra, Slovakia",
    portfolio_table_columns: [
      "Company Id",
      "Company Name",
      "Status in portfolio",
      "Amount",
      "Area Manager",
      "Sales",
      "Product",
      "Tags",
      "City",
      "Prevailing activity (NACE)",
      "Offices type",
    ],
    portfolio_top_buttons: [
      "Load Query",
      "Save Query",
      "Download Portfolio",
      "Update Portfolio",
      "Generate Similarity",
      "Send to Other Modules",
    ],
  },
};
