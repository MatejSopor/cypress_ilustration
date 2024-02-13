export const envirmentConfig: Cypress.ConfigOptions<any> = {
  e2e: {
    baseUrl: "http://ccomapp05.icc.crifnet.com:5555",
  },
  env: {
    environment: "int",
    apiUrl: "https://ccomapp05.icc.crifnet.com:5595",
    apiEnrichUrl: "http://ccomapp05.icc.crifnet.com:5522",
    grepTags: "@ITA",
    isIntConfig: true,
    configCountry: "ITA",
    lang_array: ["IT", "EN"],
    area_manager: "Matej Sopor",

    username: "CX100035",
    username_as: "CX100034",
    password: "Margo159@.",
    user_name: "Martin Klvac",
    sale_user_name: "Third QA",
    user_email: "margoautomation@gmail.com",
    user_code: "CX100035",
    user_code_as_areaManager: "CX100034",
    user_code_as_sale: "CX100036",
    user_role: "Supervisor",
    user_office: "Ufficio 1",
    user_subscription: "ORGANIZ. INTERNA TEST MARGO'",
    user_subscription_code: "878328441",

    filter_StatusCompany: 3,
    filter_OfficeType: 2,
    allCompaniesLabel: "All Italian companies",
    company_vatCode: "01650260381",
    contact_us_message:
      "Your message has been correctly sent to Customer Care.",

    moduleMemo: {
      appointmentCompanyName: "O.M.O. SPA",
      appointmentCompanyVatCode: "00467770178",
    },

    moduleOperations: {
      account_portfolio_management:
        "http://ccomapp05.icc.crifnet.com:5555/account/portfolio-management/",
      geolocation: ["ABRUZZO", "PESCARA", "CAPPELLE SUL TAVO"],
      geolocation_town: "65010 - CAPPELLE SUL TAVO",
      email: "Email",
      min_max: "Turnover",
      date: "Start date",
      doubleFilter1: {
        row1_type: "Office type",
        row1_class: "Administrative headquarter",
        row2_type: "Email",
        row2_bool: "True",
      },
      doubleFilter2: {
        row1_type: "Website",
        row1_bool: "True",
        row2_type: "Analytics Filters",
        row2_class: "Digital attitude score",
        row2_value: "1",
      },
      valueFilter: {
        type: "Employees",
        comparsion: "Equal to",
        value: "200",
      },
    },
    modulePortfolio: {
      enriched_company_count: "9",
      schema_name: "itaIntPortfolioSchemas",
      enrich_test_name: "Enrich + var cus (DO NOT REMOVE)",
      filters_arrangement_address:
        "Rome, Metropolitan City of Rome Capital, Italy",
      local_units: {
        companyId: ["05779711000"],
        noOfLocalUnits: 217,
        country: "",
      },
      simplified_upload_country: "",
      upload: "./cypress/uploads/itaIntPortfolioToUpload.xlsx",
      update: {
        excelToUpload: "./cypress/uploads/itaIntUpdatedPortfolio.xlsx",
        updatedCompanyCount: "1",
        country: "",
      },
      links: {
        enriched:
          "/portfolio-management/portfolio/b50a7a20-56b3-4f37-aaed-c0f9addd6c98",
        enrich_test:
          "/portfolio-management/portfolio/9337db7d-bdd7-4715-ab37-a11e4dd1ecc4",
        test_var_cus:
          "/portfolio-management/portfolio/9337db7d-bdd7-4715-ab37-a11e4dd1ecc4",
        send_to_analyze_market:
          "/portfolio-management/portfolio/fd0bf6da-cfbc-4b17-a18d-bc7136a37722",
      },
      ids: {
        group_actions_download_companies: [
          "00986330678",
          "01585620675",
          "01899320673",
        ],
        group_action: ["00070830054", "00154240022", "00164920027"],
        companies_for_creation: [
          "00464670017",
          "00263760043",
          "00397130584",
          "00279810378",
          "00281690370",
        ],
        enriched_companies: [
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
        companies_for_creation2: ["00164920027", "00159560366", "00373210160"],
      },
      table_columns: [
        "Tax code / Vat code",
        "Crif Number",
        "Name",
        "Status in portfolio",
        "Amount",
        "Area Manager",
        "Sales",
        "Product",
        "Tags",
        "City",
        "Primary Ateco (2007)",
        "Offices type",
        "Active campaigns",
      ],
      top_buttons: [
        "Load Query",
        "Save Query",
        "Download Portfolio",
        "Update Portfolio",
        "Add Local Units",
        "Generate Similarity",
        "Send to Other Modules",
      ],
    },

    moduleProspecting: {
      filters: {
        arrowIconsGeoFilter: [
          "EMILIA-ROMAGNA",
          "BOLOGNA (PROVINCE)",
          "BOLOGNA",
        ],
        cityPart: "40139",
        CAP_NUMBER: "BOLOGNANO",
        defaultFunnelTooltips: ["Status company", "Office type"],
        geoFilterFunnelTooltips: [
          "Status company",
          "Office type",
          "Geographic area",
        ],
        companieWithoutNegativeEffects: "Companies without negative events",

        turnoverFilter: {
          filterSelector: "[id='businessInfo.turnover']",
          filterName: "Turnover",
          expectedFunnelTooltips: ["Status company", "Office type", "Turnover"],
        },

        vatCodeFilter: {
          filterName: "Vat code",
          expectedFunnelTooltips: ["Status company", "Office type", "Vat code"],
          filterVatCode: "13454210157",
          expecedCompany: "Lidl Česká republika v.o.s.",
        },
      },
      companyReport: {
        companyReportName:
          "FCA ITALY S.P.A. IN FORMA FIAT CHRYSLER AUTOMOBILES ITALY S.P.A. E IN FORMA ABBREVIATO FIAT GROUP AUTOMOBILES SPA E FIAT AUTO SPA",
        companyReportLink:
          "/company-report/07973780013/f102cd87-a675-4d95-91b8-671cdff7f849",
        topButtonSelectors: [
          "button[data-testid='download-pdf-button']",
          "button[data-testid='access-purchase-page']",
        ],
        sideButtonSelectors: [
          "li[data-pf-id='CompanyData']",
          "li[data-pf-id='CompanySummary']",
          "li[data-pf-id='FinancialStatement']",
          "li[data-pf-id='People']",
          "li[data-pf-id='ContactsAndSocial']",
          "li[data-pf-id='LocalUnits']",
          "li[data-pf-id='Analytics']",
          "li[data-pf-id='Score']",
          "li[data-pf-id='CadastralData']",
          "li[data-pf-id='Pnrr']",
          "li[data-pf-id='SalesTransaction']",
          "li[data-pf-id='Portfolio']",
          "li[data-pf-id='Appointments']",
        ],
      },
      freeSearch: {
        companyName: "FERRARI RENATO LAVANDERIA LA SALSESE SRL",
        campaignName: "CampaignToBeExcluded",
        companiesBy: [
          "VAT Number",
          "Tax code",
          "CRIF number",
          "Company Name",
          "Website URL",
          "Commercial Display"
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
        applied_precondition_filters: [
          "Enable",
          "Inactive",
          "Dormant",
          "Administrative headquarter",
          "Administrative headquarter and registered office",
        ],
        analyzeMarket_date_from: "7/5/2018",
        analyzeMarket_CAP_path: ["EMILIA-ROMAGNA", "BOLOGNA (PROVINCE)"],
        analyzeMarket_CAP_num: "BOLOGNA",
        anlyzeMarket_ateco_traverse_sections: ["Agriculture"],
        analyzeMarket_ateco_code:
          "01 - Growing of crops and production of animal products, hunting and related services ",
        analyzeMarket_semantic_cluster_traverse_section: [
          "Animals",
          "Animal farming",
        ],
        analyzeMarket_semantic_cluster_subfilter: "Animal feed",
        analyzeMarket_semantic_search_keyword: "pesca",
        analyzeMarket_semantic_search_synonyms: [
          "caccia alle balene",
          "mattanza",
          "motopesca",
          "pesca d'altura",
          "pesca sportiva",
          "pesca subacquea",
          "spinning",
        ],
        analyzeMarket_advanced_sem_search_input: "bulloni OR viti NOT chiodi",
        geoFilter_id_getter: "Tree-geo",
        legalForm_id_getter: "Tree-legalForm",
        vatCode_id_getter: "businessInfo.vatcode",
        stateOwnedComp_id_getter: "businessInfo.stateOwnedCompany",
        compNegEvents_id_getter: "businessInfo.companiesWithoutNegativeEvents",
        startDate_id_getter: "businessInfo.startdate",
        employees_id_getter: "businessInfo.employee",
        turnover_id_getter: "businessInfo.turnover",
        legalForm_subfilter: "Individual company",
        legalForm_name: "Legal Form",
        compNegEvents_name: "Companies without negative events",
        vatCode_name: "Vat code",
      },
      query: {
        analyzeMarket_query_traverse: ["EMILIA-ROMAGNA", "BOLOGNA (PROVINCE)"],
        analyzeMarket_query_city: "BOLOGNA",
        analyzeMarket_query_atecoFilter:
          "01 - Growing of crops and production of animal products, hunting and related services",
        analyzeMarket_query_name: "analyzeMarketNewQuery1",
        md5Hash: "8a8166ef0723d6ea4550bbf28aa3df86",
      },
      analyzeMarket_universal_portfolio: "analyzeMarketUniversalPortfolio",
    },

    moduleSalesTool: {
      manage_campaign_link:
        "salestool/campaign/6ef1ea96-329f-4f92-841b-ae1440f06bf5/assignments",
      filters: {
        analyzeMarket_date_from: "7/5/2021",
        analyzeMarket_CAP_path: [
          "EMILIA-ROMAGNA",
          "BOLOGNA (PROVINCE)",
          "BOLOGNA",
        ],
        analyzeMarket_CAP_num: "40139",
        geoFilter_id_getter: "Tree-geo",
        vatCode_id_getter: "businessInfo.vatcode",
        compNegEvents_id_getter: "businessInfo.companiesWithoutNegativeEvents",
        startDate_id_getter: "businessInfo.startdate",
        employees_id_getter: "businessInfo.employee",
        compNegEvents_name: "Companies without negative events",
        vatCode_name: "Vat code",
        companySummary_startDate: "Start date",
      },
      firstCompanyInTable: "IL CARATO DI CELLENO ARIANNA E UGOLINI SANDRA SNC",
      md5Hash: "9d40ab3fd7b803a71aaa169cf6e80020",
      fileHash:
        "f10927ff06a20755369c5191512ab909dbdaaa234b7642d03a6bc186add27ea4",
    },

    moduleAdditional: {
      navigationPaths: [
        "/portfolio-management",
        "/targeting",
        "/prospecting",
        "/operations",
        "/salestool",
        "/api",
        "/pnrr",
      ],
    },
    moduleAccount: {
      companyTaxCode: ["00839490158"],
      enrich_company:
        "http://ccomapp05.icc.crifnet.com:5555/company-report/02782190157/35f9c9b4-622b-4eb9-afaf-1061bfbf2376/summary",
      enrich_company_id: "35f9c9b4-622b-4eb9-afaf-1061bfbf2376",
      enrich_company_vat_code: "00839490158",
      cookies_policy_h1: "Cookies policy",
    },
  },
};
