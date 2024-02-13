export const envirmentConfig: Cypress.ConfigOptions<any> = {
  e2e: {
    baseUrl: "http://gmsczskqa1.icc.crifnet.com:5555",
  },
  env: {
    apiUrl: "http://gmsczskqa1.icc.crifnet.com:5598",
    grepTags: "@CZSK",
    isIntConfig: true,
    configCountry: "CZSK",
    lang_array: ["CZ", "SK", "EN"],
    uploadablePortfolio: "./cypress/uploads/PortfolioImportTemplate.xlsx",
    updated_uploadable_portfolio: "./cypress/uploads/UpdatedPortfolio.xlsx",
    local_units: ["Agency", "Head office"],
    enriched_portfolio_link:
      "/portfolio-management/portfolio/b50a7a20-56b3-4f37-aaed-c0f9addd6c98",
    portfolio_management_enrich_test_link:
      "/portfolio-management/portfolio/52e4901b-2c64-4202-915e-9ddc9d9bfd89",
    portfolio_management_test_var_cus_link:
      "/portfolio-management/portfolio/52e4901b-2c64-4202-915e-9ddc9d9bfd89",
    portfolio_account_link:
      "http://gmsczskqa1.icc.crifnet.com:5555/account/portfolio-management/",
    company_ids_for_creation: [
      "00464670017",
      "00263760043",
      "00397130584",
      "00279810378",
      "00281690370",
    ],
    company_ids_for_creation2: ["00164920027", "00159560366", "00373210160"],
    group_actions_download_companies: [
      "00986330678",
      "01585620675",
      "01899320673",
    ],
    area_manager: "Matej Sopor",
    enriched_portfolio_companies: [
      "00986330678",
      "01585620675",
      "01887680674",
      "01899320673",
      "01949780678",
      "DCRDRA81T18L103W",
      "DFRPTR39H28C169T",
      "DLCLCN75D01Z133M",
      "DMBMRZ50D21B640D",
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
          filterVatCode: "SK2020234216",
          expecedCompany: "Kaufland Slovenská republika v.o.s.",
        },
      },
      companyReport: {
        companyReportName: "Kaufland Slovenská republika v.o.s.",
        companyReportLink: "/company-report/SK-35790164/21811098",
        topButtonSelectors: [],
        sideButtonSelectors: [
          "li[data-pf-id='CompanyData']",
          "li[data-pf-id='CompanySummary']",
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
        analyzeMarket_CAP_path: ["Slovak Republic", "Prešov Region", "Humenné"],
        analyzeMarket_CAP_num: "Humenné",
        geoFilter_id_getter: "Tree-geographic",
        vatCode_id_getter: "businessInfo.vatId",
        compNegEvents_id_getter: "businessInfo.hasNotNegativeEvents",
        compNegEvents_name: "Companies without negative information",
        vatCode_name: "VAT ID",
      },
      firstCompanyInTable: "",
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
    portfolio_groupACtion_companyId: ["21811098", "21550789", "21813841"],
    portfolio_groupACtion_identificationId: [
      "SK-35790164",
      "SK-31364501",
      "SK-35876832",
    ],
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
