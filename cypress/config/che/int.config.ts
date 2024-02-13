export const envirmentConfig: Cypress.ConfigOptions<any> = {
  e2e: {
    baseUrl:
      "http://clientapp-frontend-che.integration.margo-ch-int.apps.ocp-dev.icc.crifnet.com",
  },
  env: {
    environment: "int",
    apiUrl:
      "http://clientapp-frontend-che.integration.margo-ch-int.apps.ocp-dev.icc.crifnet.com",
    apiEnrichUrl:
      "http://accounting-webapi.integration.margo-ch-int.apps.ocp-dev.icc.crifnet.com",
    grepTags: "@CHE",
    isIntConfig: true,
    configCountry: "CHE",
    lang_array: ["EN", "IT", "DE", "FR"],
    area_manager: "AreaManager Automation",

    username: "supervisor-kaede.aarion@my2ducks.com",
    password: "Password.01",
    user_name: "Automated test",
    user_email: "kaede.aarion@my2ducks.com",
    user_code_as_sale: "sales-kaede.aarion@my2ducks.com",
    sale_user_name: "Sales Automation",
    user_code_as_areaManager: "areamanager-kaede.aarion@my2ducks.com",
    user_office: "Ufficio 1",
    user_subscription: "ORGANIZ. INTERNA TEST MARGO'",
    user_subscription_code: "878328441",
    contact_us_message: "Your message has been correctly sent to CRIF.",

    filter_StatusCompany: 3,
    filter_OfficeType: 2,
    allCompaniesLabel: "All Austrian and Swiss companies",
    company_vatCode: "CHE628743574",
    additional_navigationPaths: [
      "/portfolio-management",
      "/targeting",
      "/prospecting",
      "/salestool",
    ],
    moduleMemo: {
      appointmentCompanyName: "A. APPIANI SRL",
      appointmentCompanyVatCode: "CHE9926479973",
    },

    // Portfolio Module
    modulePortfolio: {
      enriched_company_count: "5",
      schema_name: "cheIntPortfolioSchemas",
      enrich_test_name: "Enrich + var cus (DO NOT REMOVE)",
      filters_arrangement_address: "Bern, Switzerland",
      local_units: {
        companyId: ["CHE4730479214"],
        noOfLocalUnits: 24,
        country: "CHE",
      },
      simplified_upload_country: "CHE",
      upload: "./cypress/uploads/cheIntPortfolioToUpload.xlsx",
      update: {
        excelToUpload: "./cypress/uploads/cheIntUpdatedPortfolio.xlsx",
        updatedCompanyCount: "1",
      },
      links: {
        enriched:
          "/portfolio-management/portfolio/f89ba647-d00c-47f7-9b6f-ceeb53b05faa",
        enrich_test:
          "/portfolio-management/portfolio/e8f6b460-01b4-45a0-9650-f6a5ccae913c",
        test_var_cus:
          "/portfolio-management/portfolio/e8f6b460-01b4-45a0-9650-f6a5ccae913c",
        send_to_analyze_market:
          "/portfolio-management/portfolio/683002b7-3aa2-4f88-ab71-f63cc31c4674",
      },
      ids: {
        group_actions_download_companies: [
          "FN370583a",
          "FN283967z",
          "CHE3151700178",
        ],
        group_action: ["CHE1624848650", "CHE0482371031", "CHE7374220869"],
        companies_for_creation: ["CHE1663531693"],
        enriched_companies: [
          "FN370583a",
          "FN508741z",
          "FN283967z",
          "CHE1638960148",
          "CHE3151700178",
        ],
      },
      table_columns: [
        "Business identification number / Vat code / Company book number",
        "Company Name",
        "Status in portfolio",
        "Amount",
        "Area Manager",
        "Sales",
        "Product",
        "Tags",
        "City",
        "OENACE 2008",
        "NOGA",
        "Company type",
        "Active campaigns",
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
        arrowIconsGeoFilter: ["Switzerland", "Aargau", "Bezirk Aarau"],
        cityPart: "Aarau",
        defaultFunnelTooltips: ["Company status", "Office type"],
        geoFilterFunnelTooltips: [
          "Company status",
          "Office type",
          "Geographic area",
        ],
        companieWithoutNegativeEffects:
          "Companies without negative information",

        turnoverFilter: {
          filterSelector: "[id='businessInfo.turnover']",
          filterName: "Turnover",
          expectedFunnelTooltips: ["Company status", "Office type", "Turnover"],
        },

        vatCodeFilter: {
          filterName: "Vat Code",
          expectedFunnelTooltips: ["Company status", "Office type", "Vat Code"],
          filterVatCode: "CHE628743574",
          expecedCompany: "UNICOOP FIRENZE SOC COOP",
        },
      },
      companyReport: {
        companyReportName: "RETE FERROVIARIA CHALIANA SPA",
        companyReportLink: "/company-report/CH500D080BS0001/0000025653",
        topButtonSelectors: ["button[data-testid='download-pdf-button']"],
        sideButtonSelectors: [
          "li[data-pf-id='CompanyData']",
          "li[data-pf-id='CompanySummary']",
          "li[data-pf-id='Contacts']",
          "li[data-pf-id='People']",
          "li[data-pf-id='LocalUnits']",
          "li[data-pf-id='SalesTransaction']",
          "li[data-pf-id='Portfolio']",
          "li[data-pf-id='Appointments']",
        ],
      },
      freeSearch: {
        companyName: "SPASCIANI SPA",
        campaignName: "CampaignToBeExcluded",
        companiesBySwiss: [
          "Vat code",
          "Business identification number",
          "Company name",
          "Website",
          "Legacy CH Number"
        ],
        companiesByAustria: [
          "Company name",
          "Vat code",
          "Website",
          "Company Book number"
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
        applied_precondition_filters: ["Active", "Headquarter"],
        analyzeMarket_CAP_path: ["Switzerland", "St. Gallen"],
        analyzeMarket_CAP_num: "Wahlkreis See-Gaster",
        analyzeMarket_semantic_search_keyword: "car",
        analyzeMarket_advanced_sem_search_input: "car OR beer",
        geoFilter_id_getter: "Tree-geographic",
        legalForm_id_getter: "Tree-legalForm",
        vatCode_id_getter: "businessInfo.vatCode",
        employees_id_getter: "businessInfo.employees",
        turnover_id_getter: "businessInfo.turnover",
        legalForm_subfilter: "Limited company",
        legalForm_name: "Legal form",
        vatCode_name: "Vat Code",
      },
      query: {
        analyzeMarket_query_traverse: ["Switzerland", "St. Gallen"],
        analyzeMarket_query_city: "Wahlkreis See-Gaster",
        analyzeMarket_query_name: "analyzeMarketNewQuery1",
        md5Hash: "4130dddea800c85187a4bf0587e8b99e",
      },
      analyzeMarket_universal_portfolio: "analyzeMarketUniversalPortfolio",
    },

    moduleSalesTool: {
      manage_campaign_link:
        "salestool/campaign/3e9c04cc-9ab1-4264-8bbd-dc39ca26b536/assignments",
      filters: {
        analyzeMarket_CAP_path: ["Switzerland", "St. Gallen"],
        analyzeMarket_CAP_num: "Wahlkreis See-Gaster",
        geoFilter_id_getter: "Tree-geographic",
        vatCode_id_getter: "businessInfo.vatCode",
        employees_id_getter: "businessInfo.employees",
        vatCode_name: "Vat Code",
        companySummary_startDate: "Incorporation date",
      },
      firstCompanyInTable: "VANINI FERNANDO",
      md5Hash: "73f59c023eef1efbc1c982ef33b8829b",
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
      companyTaxCode: ["0000014568"],
      enrich_company:
        "http://clientapp-frontend-che.integration.margo-ch-int.apps.ocp-dev.icc.crifnet.com/company-report/CHCC070F06S0001/0000014568/summary",
      enrich_company_id: "0000014568",
      enrich_company_vat_code: "CHCC070F06S0001",
      cookies_policy_h1: "Cookies policyMargo COOKIE POLICY CH",
    },
  },
};
