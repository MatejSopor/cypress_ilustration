export const envirmentConfig: Cypress.ConfigOptions<any> = {
  e2e: {
    baseUrl: "http://mktaps02dev.icc.crifnet.com:5555",
  },

  env: {
    environment: "qa",
    apiUrl: "https://mktaps02dev.icc.crifnet.com:5595",
    apiEnrichUrl: "https://mktaps02dev.icc.crifnet.com:5598",
    grepTags: "@ITA",
    isIntConfig: false,
    configCountry: "ITA",
    lang_array: ["IT", "EN"],
    area_manager: "Area Manager Test QA",

    username: "CX100039",
    username_as: "CX100034",
    password: "Margo159@",
    user_name: "User Automation",
    sale_user_name: "Sales Test QA",
    user_email: "margoautomation@gmail.com",
    user_code: "CX100035",
    user_code_as: "CX100034",
    user_code_as_areaManager: "CX100045",
    user_code_as_sale: "CX100046",
    user_role: "Supervisor",
    user_office: "QA",
    user_subscription: "QA_MARGO",
    user_subscription_code: "878328248",
    filter_StatusCompany: 3,
    filter_OfficeType: 2,
    allCompaniesLabel: "All Italian companies",
    company_vatCode: "00882090152",
    companyReportName: "ENI SPA",
    companyReportLink:
      "/company-report/00484960588/779c7a86-2265-4b00-9401-65b5c3edf42d",
    companyReportTopButtons: ["download-pdf-button", "access-purchase-page"],
    companyReportMenuItems: [
      "CompanyData",
      "CompanySummary",
      "FinancialStatement",
      "People",
      "ContactsAndSocial",
      "LocalUnits",
      "Score",
      "Esg",
      "SalesTransaction",
      "Portfolio",
      "Appointments",
    ],

    contact_us_message:
      "Your message has been correctly sent to Customer Care.",
    moduleMemo: {
      appointmentCompanyName: "APOLLO SRL",
      appointmentCompanyVatCode: "03033630488",
    },
    moduleOperations: {
      account_portfolio_management:
        "http://mktaps02dev.icc.crifnet.com:5555/account/portfolio-management/",
      geolocation: ["BASILICATA", "MATERA (PROVINCE)", "ACCETTURA"],
      geolocation_town: "75011",
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
      enriched_company_count: "4",
      schema_name: "itaQaPortfolioSchemas",
      enrich_test_name: "Enrich + var cus (DO NOT REMOVE)",
      filters_arrangement_address:
        "Rome, Metropolitan City of Rome Capital, Italy",
      local_units: {
        companyId: ["05779711000"],
        noOfLocalUnits: 217,
        country: "",
      },
      simplified_upload_country: "",
      upload: "./cypress/uploads/itaQaPortfolioToUpload.xlsx",
      update: {
        excelToUpload: "./cypress/uploads/itaQaUpdatedPortfolio.xlsx",
        updatedCompanyCount: "1",
      },
      links: {
        enriched:
          "/portfolio-management/portfolio/32d8cfc0-9e16-4f05-aad6-09c90fa2690f",
        enrich_test:
          "/portfolio-management/portfolio/5e1bf6bd-79f8-48a6-b8ed-9d1d0960b7f1",
        test_var_cus:
          "/portfolio-management/portfolio/5e1bf6bd-79f8-48a6-b8ed-9d1d0960b7f1",
        send_to_analyze_market:
          "/portfolio-management/portfolio/844ed053-3aa2-466d-875d-4766e267a8ae",
      },
      ids: {
        group_actions_download_companies: ["00986330678", "01585620675"],
        group_action: ["00070830054", "00093700078", "00119940070"],
        companies_for_creation: ["00070830054", "00397130584"],
        enriched_companies: [
          "00986330678",
          "01585620675",
          "DCRDRA81T18L103W",
          "DLCLCN75D01Z133M",
        ],
        companies_for_creation2: ["00154240022", "00159560366", "00163040546"],
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
        defaultFunnelTooltips: ["Status company", "Office type"],
        geoFilterFunnelTooltips: [
          "Status company",
          "Office type",
          "Geographic area",
        ],
        companieWithoutNegativeEffects: "Companies without negative events",

        turnoverFilter: {
          filterName: "Turnover",
          filterSelector: "[id='businessInfo.turnover']",
          expectedFunnelTooltips: ["Status company", "Office type", "Turnover"],
        },

        vatCodeFilter: {
          filterName: "Vat code",
          expectedFunnelTooltips: ["Status company", "Office type", "Vat code"],
          filterVatCode: "10552510017",
          expecedCompany: "ANYKEY 75 SRL",
        },
      },
      companyReport: {
        companyReportName: "ENI SPA",
        companyReportLink:
          "/company-report/00484960588/779c7a86-2265-4b00-9401-65b5c3edf42d",
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

          "li[data-pf-id='Score']",
          "li[data-pf-id='Esg']",
          "li[data-pf-id='SalesTransaction']",
          "li[data-pf-id='Portfolio']",
          "li[data-pf-id='Appointments']",
        ],
      },
      freeSearch: {
        companyName: "PERMEDICA SPA",
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
        analyzeMarket_date_from: "7/5/2019",
        analyzeMarket_CAP_path: [
          "EMILIA-ROMAGNA",
          "BOLOGNA (PROVINCE)",
          "BOLOGNA",
        ],
        analyzeMarket_CAP_num: "40139",
        anlyzeMarket_ateco_traverse_sections: [
          "Agriculture",
          "Fishing and aquaculture",
          "Fishing",
        ],
        analyzeMarket_ateco_code: "0311",
        analyzeMarket_semantic_cluster_traverse_section: [
          "Clothing and accessories",
        ],
        analyzeMarket_semantic_cluster_subfilter: "Children's clothing",
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
        turnover_id_getter: "businessInfo.turnover",
        employees_id_getter: "businessInfo.employee",
        startDate_id_getter: "businessInfo.startdate",
        geoFilter_id_getter: "Tree-geo",
        legalForm_id_getter: "Tree-legalForm",
        vatCode_id_getter: "businessInfo.vatcode",
        stateOwnedComp_id_getter: "businessInfo.stateOwnedCompany",
        compNegEvents_id_getter: "businessInfo.companiesWithoutNegativeEvents",
        sendToOtherModules_id_getter: "right-action-12",
        legalForm_subfilter: "Individual company",
        legalForm_name: "Legal Form",
        compNegEvents_name: "Companies without negative events",
        vatCode_name: "Vat code",
      },
      query: {
        analyzeMarket_query_traverse: ["EMILIA-ROMAGNA", "BOLOGNA (PROVINCE)"],
        analyzeMarket_query_city: "BOLOGNA",
        analyzeMarket_query_name: "analyzeMarketNewQuery1",
        analyzeMarket_query_atecoFilter:
          "A - Agriculture, forestry and fishing",
        md5Hash: "1cb51628cf7706dcf54ba17686cbc41e",
      },
      analyzeMarket_universal_portfolio: "analyzeMarketUniversalPortfolio",
    },

    moduleSalesTool: {
      manage_campaign_link:
        "salestool/campaign/c8dc6997-c620-4eed-b216-6aa5e466b339/assignments",
      filters: {
        analyzeMarket_date_from: "7/5/2019",
        analyzeMarket_CAP_path: [
          "EMILIA-ROMAGNA",
          "BOLOGNA (PROVINCE)",
          "BOLOGNA",
        ],
        analyzeMarket_CAP_num: "40139",
        employees_id_getter: "businessInfo.employee",
        startDate_id_getter: "businessInfo.startdate",
        geoFilter_id_getter: "Tree-geo",
        vatCode_id_getter: "businessInfo.vatcode",
        compNegEvents_id_getter: "businessInfo.companiesWithoutNegativeEvents",
        compNegEvents_name: "Companies without negative events",
        vatCode_name: "Vat code",
        companySummary_startDate: "Start date",
      },
      firstCompanyInTable: "IL CARATO DI CELLENO ARIANNA E UGOLINI SANDRA SNC",
      md5Hash: "73f59c023eef1efbc1c982ef33b8829b",
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
      companyTaxCode: [""],
      enrich_company: "",
      enrich_company_id: "",
      enrich_company_vat_code: "",
      cookies_policy_h1: "Cookies policy",
    },
  },
};
