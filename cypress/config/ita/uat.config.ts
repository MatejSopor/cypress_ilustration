export const envirmentConfig: Cypress.ConfigOptions<any> = {
  e2e: {
    baseUrl: "https://www.margo-uat.crif.com",
  },
  env: {
    environment: "uat",
    apiUrl: "https://www.margo-uat.crif.com",
    apiEnrichUrl: "https://www.margo-uat.crif.com",
    grepTags: "@ITA",
    isIntConfig: false,
    configCountry: "ITA",
    lang_array: ["IT", "EN"],
    area_manager: "matej sopor",

    username: "CX100263",
    password: "Margo159@.",
    user_name: "matej sopor",
    user_email: "margoautomation@gmail.com",
    user_code: "CX100263",
    user_code_as_areaManager: "CX100264",
    user_code_as_sale: "CX100265",
    sale_user_name: "matej sopor",
    allCompaniesLabel: "All Italian companies",
    user_role: "Supervisor",
    user_office: "QA",
    user_subscription: "ORMENESE FRANCESCA",
    user_subscription_code: "878352686",
    company_vatCode: "09598861004",
    contact_us_message:
      "Your message has been correctly sent to Customer Care.",

    moduleMemo: {
      appointmentCompanyName: "BUNKEROIL SRL",
      appointmentCompanyVatCode: "00426590493",
    },
    moduleOperations: {
      account_portfolio_management:
        "https://www.margo-uat.crif.com/account/portfolio-management/",
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
      enriched_company_count: "4",
      schema_name: "itaUatPortfolioSchemas",
      enrich_test_name: "Enrich + var cus (DO NOT REMOVE)",
      filters_arrangement_address:
        "Rome, Metropolitan City of Rome Capital, Italy",
      local_units: {
        companyId: ["01768800748"],
        noOfLocalUnits: 20,
        country: "",
      },
      simplified_upload_country: "",
      upload: "./cypress/uploads/itaUatPortfolioToUpload.xlsx",
      update: {
        excelToUpload: "./cypress/uploads/itaUatUpdatedPortfolio.xlsx",
        updatedCompanyCount: "1",
      },
      links: {
        enriched:
          "portfolio-management/portfolio/aa48a639-f7db-4d40-8fd8-d9bc750073e0",
        enrich_test:
          "portfolio-management/portfolio/d10212b1-1161-403d-bcea-28acdcb190df",
        test_var_cus:
          "/portfolio-management/portfolio/b39dfcbf-f135-4111-ac0d-3ffcdc7ee1d8",
        send_to_analyze_market:
          "/portfolio-management/portfolio/b39dfcbf-f135-4111-ac0d-3ffcdc7ee1d8",
      },
      ids: {
        group_actions_download_companies: [
          "01592730673",
          "01931680670",
          "VLTCTR43E69I992D",
        ],
        group_action: ["01323030690", "00328890777", "01513220671"],
        companies_for_creation: [
          "02607330988",
          "01189110453",
          "11574560154",
          "00047820329",
          "00059020057",
        ],
        companies_for_creation2: ["00493230262", "00558890265", "00562260240"],
        enriched_companies: [
          "01513220671",
          "01592730673",
          "01931680670",
          "VLTCTR43E69I992D",
        ],
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
      query: {
        atecoSubFilter:
          "G - Wholesale and retail trade; repair of motor vehicles and motorcycles",
      },
      companyReport: {
        companyReportName: "ENI SPA",
        companyReportLink:
          "/company-report/00484960588/779c7a86-2265-4b00-9401-65b5c3edf42d",
        topButtonSelectors: ["button[data-testid='download-pdf-button']"],
        sideButtonSelectors: [
          "li[data-pf-id='CompanyData']",
          "li[data-pf-id='CompanySummary']",
          "li[data-pf-id='FinancialStatement']",
          "li[data-pf-id='People']",
          "li[data-pf-id='ContactsAndSocial']",
          "li[data-pf-id='LocalUnits']",
          "li[data-pf-id='Analytics']",
          "li[data-pf-id='SalesTransaction']",
          "li[data-pf-id='Portfolio']",
          "li[data-pf-id='Appointments']",
        ],
      },
      freeSearch: {
        companyName: "PERMICRO SPA",
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
        analyzeMarket_date_from: "7/5/2021",
        analyzeMarket_CAP_path: [
          "EMILIA-ROMAGNA",
          "BOLOGNA (PROVINCE)",
          "BOLOGNA",
        ],
        analyzeMarket_CAP_num: "40138",
        anlyzeMarket_ateco_traverse_sections: [
          "F - Construction",
          "43 - Specialized constructions",
        ],
        analyzeMarket_ateco_code: "431 ",
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
        analyzeMarket_advanced_sem_search_input: "pizza OR pasta",
        turnover_id_getter: "businessInfo.turnover",
        employees_id_getter: "businessInfo.employee",
        startDate_id_getter: "businessInfo.startdate",
        geoFilter_id_getter: "Tree-geo",
        legalForm_id_getter: "Tree-legalForm",
        vatCode_id_getter: "businessInfo.vatcode",
        stateOwnedComp_id_getter: "businessInfo.stateOwnedCompany",
        compNegEvents_id_getter: "businessInfo.companiesWithoutNegativeEvents",
        legalForm_subfilter: "Individual company",
        legalForm_name: "Legal Form",
        compNegEvents_name: "Companies without negative events",
        vatCode_name: "Vat code",
      },
      query: {
        analyzeMarket_query_traverse: ["EMILIA-ROMAGNA"],
        analyzeMarket_query_city: "BOLOGNA (PROVINCE)",
        analyzeMarket_query_name: "analyzeMarketNewQuery1",
        analyzeMarket_query_atecoFilter:
          "G - Wholesale and retail trade; repair of motor vehicles and motorcycles",
        md5Hash: "83a8621c57fea477c8b46d9a0604d226",
      },
      analyzeMarket_universal_portfolio: "analyzeMarketUniversalPortfolio",
    },

    moduleSalesTool: {
      manage_campaign_link:
        "salestool/campaign/fa9cff80-c2e5-446f-8223-c8863fca7127/assignments",
      filters: {
        analyzeMarket_date_from: "7/5/2021",
        analyzeMarket_CAP_path: [
          "EMILIA-ROMAGNA",
          "BOLOGNA (PROVINCE)",
          "BOLOGNA",
        ],
        analyzeMarket_CAP_num: "40138",
        employees_id_getter: "businessInfo.employee",
        startDate_id_getter: "businessInfo.startdate",
        geoFilter_id_getter: "Tree-geo",
        vatCode_id_getter: "businessInfo.vatcode",
        compNegEvents_id_getter: "businessInfo.companiesWithoutNegativeEvents",
        compNegEvents_name: "Companies without negative events",
        vatCode_name: "Vat code",
        companySummary_startDate: "Start date",
      },
      firstCompanyInTable: "SPA ESERCIZI AEROPORTUALI S.E.A.",
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
