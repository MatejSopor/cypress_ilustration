export const envirmentConfig: Cypress.ConfigOptions<any> = {
  e2e: {
    baseUrl: "https://ch-uat.margo.crif.com",
  },
  env: {
    environment: "uat",
    apiUrl: "https://ch-uat.margo.crif.com",
    grepTags: "@CHE",
    isIntConfig: false,
    configCountry: "CHE",
    simplified_upload_country: "CHE",
    lang_array: ["EN", "IT", "DE", "FR"],
    area_manager: "Automation AreaManager1",

    username: "supervisor-alexsandro.thaddaeus@my2ducks.com",
    username_as: null,
    password: "Password.01",
    user_name: "Automation Supervisor1",
    sale_user_name: "Automation Sale1",
    user_email: "alexsandro.thaddaeus@my2ducks.com",
    user_code: "CX100035",
    user_code_as_areaManager: "areamanager-alexsandro.thaddaeus@my2ducks.com",
    user_code_as_sale: "sales-alexsandro.thaddaeus@my2ducks.com",
    user_role: "Supervisor",
    user_office: "Office 1",
    user_subscription: "ORGANIZ. INTERNA TEST MARGO'",
    user_subscription_code: "878328441",
    contact_us_message: "Your message has been correctly sent to CRIF.",

    // Portfolio Module
    manage_campaign_link:
      "salestool/campaign/9949064c-bb50-4729-b525-d399e014c1e0/assignments",

    filter_StatusCompany: 3,
    filter_OfficeType: 2,
    allCompaniesLabel: "All Austrian and Swiss companies",
    company_vatCode: "CHE3265066866",
    /* Module variables */
    moduleMemo: {
      appointmentCompanyName: "ABB Ltd",
      appointmentCompanyVatCode: "CHE0029219971",
    },

    modulePortfolio: {
      enriched_company_count: "5",
      schema_name: "cheUatPortfolioSchemas",
      enrich_test_name: "Enrich + var cus (DO NOT REMOVE)",
      filters_arrangement_address: "Bern, Switzerland",
      local_units: {
        companyId: ["ATU14487107"],
        noOfLocalUnits: 79,
        country: "AUT",
      },
      simplified_upload_country: "CHE",
      upload: "./cypress/uploads/cheUatPortfolioToUpload.xlsx",
      update: {
        excelToUpload: "./cypress/uploads/cheUatUpdatedPortfolio.xlsx",
        updatedCompanyCount: "1",
      },
      links: {
        enriched:
          "/portfolio-management/portfolio/30d5b764-a765-413e-998e-32f4e49e6bc8",
        enrich_test:
          "/portfolio-management/portfolio/5940221c-ee13-4a0e-a739-6cf87221375c",
        test_var_cus:
          "/portfolio-management/portfolio/5940221c-ee13-4a0e-a739-6cf87221375c",
        send_to_analyze_market:
          "/portfolio-management/portfolio/1e46bd7a-5009-4c3a-92ef-f25e2dd27f73",
      },
      ids: {
        group_actions_download_companies: [
          "CHE5642522370",
          "ATU66905977",
          "ATU63018479",
        ],
        group_action: ["CHE3265066866", "CHE4151264860", "CHE0863140593"],
        companies_for_creation: ["CHE8322476782"],
        enriched_companies: [
          "FN370583a",
          "FN508741z",
          "FN283967z",
          "CHE5642522370",
          "CHE5906398267",
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
        arrowIconsGeoFilter: ["Austria", "Tirol", "Bregenz"],
        cityPart: "Schwarzach",
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
          filterVatCode: "CHE059535663",
          expecedCompany: "Véron Grauer SA",
        },
      },
      companyReport: {
        companyReportName: "Véron Grauer SA",
        companyReportLink: "/company-report/CH27030099112/121006291144",
        topButtonSelectors: ["button[data-testid='download-pdf-button']"],
        sideButtonSelectors: [
          "li[data-pf-id='CompanyData']",
          "li[data-pf-id='CompanySummary']",
          "li[data-pf-id='SalesTransaction']",
          "li[data-pf-id='Portfolio']",
          "li[data-pf-id='Appointments']",
        ],
      },
      freeSearch: {
        companyName: "Ferratec Industrial Solutions AG",
        campaignName: "CampaignToBeExcluded",
        companiesBySwiss: [
          "Company Name",
          "VATcode",
          "Tax id",
          "ONR",
          "Website"
        ],
        companiesByAustria: [
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
        analyzeMarket_query_traverse: ["Austria", "Tirol", "Bregenz"],
        analyzeMarket_query_city: "Schwarzach",
        analyzeMarket_query_name: "analyzeMarketNewQuery1",
        md5Hash: "5a52f16d76791ca48161b0eab77bb4a0",
      },
      analyzeMarket_universal_portfolio: "analyzeMarketUniversalPortfolio",
    },

    moduleSalesTool: {
      manage_campaign_link:
        "salestool/campaign/9949064c-bb50-4729-b525-d399e014c1e0/assignments",
      filters: {
        analyzeMarket_CAP_path: ["Switzerland", "St. Gallen"],
        analyzeMarket_CAP_num: "Wahlkreis See-Gaster",
        geoFilter_id_getter: "Tree-geographic",
        vatCode_id_getter: "businessInfo.vatCode",
        employees_id_getter: "businessInfo.employees",
        vatCode_name: "Vat Code",
        companySummary_startDate: "Incorporation date",
      },
      firstCompanyInTable: "BAM.wohnen GmbH",
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
      companyTaxCode: [""],
      enrich_company: "",
      enrich_company_id: "",
      enrich_company_vat_code: "",
      cookies_policy_h1: "Cookies policyMargo COOKIE POLICY CH",
    },
  },
};
