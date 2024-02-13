import "./support/commandsProspecting";
import "../AnalyzeMarket/support/commandsAnalyzeMarket";
import { ProspectingPage } from "./utils/prospectingPageUtils";
const data = Cypress.env("moduleTargeting");
const queryName = "ProspectingTemporaryQuery";
const campaignForExclusion = "CampaignToBeExcluded";
const groupFilterSearchbar = 'input[type="search"]';
const subFilterSearchbar = "textarea[aria-label='search text area']";

describe("Prospecting - Queries", () => {
  it(
    "Query - creating and saving",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      /**
       * @description Creating a query by selecting particular subfilters in Geo filter and Ateco (exclusive for ITA instances), saving query and verifying whether it was correctly saved.
       * Note: portfolio created in this testcase will be used for the whole spec
       */
      ProspectingPage.visit();
      cy.pageIsLoaded();
      cy.findAllCompaniesLabel();
      cy.prospectingCompaniesAmount().as("initialCompaniesAmount");

      cy.clickOnFilter("standardFilters", "Company Filters"); //choosing Greographic area filter
      cy.applyFilter(groupFilterSearchbar, "Geographic area");
      cy.filterSectionIsPresent("geo");
      cy.openFilterSelection("geo");
      cy.applyFilter(subFilterSearchbar, data.query.analyzeMarket_query_city);

      cy.prospectingCompaniesAmount()
        .as("numOfCompaniesAfterGeo")
        .then((numOfCompaniesAfterGeo) => {
          cy.get("@initialCompaniesAmount").should(
            "be.greaterThan",
            numOfCompaniesAfterGeo
          );
        });

      if (Cypress.env("configCountry").toUpperCase() === "ITA") {
        cy.clickOnFilter("standardFilters", "Company Filters"); //choosing Primary Ateco Code (2007) filter. verifying whether is present
        cy.applyFilter(groupFilterSearchbar, "Primary Ateco code");
        cy.filterSectionIsPresent("Tree-ateco");
        cy.openFilterSelection("Tree-ateco");
        cy.pageIsLoaded();
        cy.applyFilter(
          subFilterSearchbar,
          data.query.analyzeMarket_query_atecoFilter
        );
        cy.checkIfFiltersAreApplied([
          data.query.analyzeMarket_query_atecoFilter,
        ]);

        cy.prospectingCompaniesAmount().then((afterAteco) => {
          cy.get("@numOfCompaniesAfterGeo").should(
            "be.greaterThan",
            afterAteco
          );
        });
      }
      cy.clickOnSaveQueryButton(); //saving new Query and opening it in My account - Resume query
      cy.saveNewQuery(queryName);
    }
  );

  it("Load query", { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] }, () => {
    /**
     * @description Loading previously saved query in Prospecting module, verifying whe integrity of data
     */
    ProspectingPage.visit();
    cy.pageIsLoaded();
    cy.findAllCompaniesLabel();
    cy.prospectingCompaniesAmount().as("initialCompaniesAmount");

    cy.loadExistingQuery(queryName);
    cy.pageIsLoaded();
    cy.prospectingCompaniesAmount()
      .as("afterLoadingQuery")
      .then((afterLoadingQuery) => {
        cy.get("@initialCompaniesAmount").should(
          "be.greaterThan",
          afterLoadingQuery
        );
      });
    cy.get("div[data-pf-id='exclusions-box']").within(() => {
      cy.findByText(queryName).should("be.visible");
    });

    cy.excludePortfolio("ProspectingPortfolio", groupFilterSearchbar);

    cy.get("[data-pf-id='funnel']")
      .contains(/Compan(y|ies) in the list/)
      .prev()
      .contains("-", { timeout: 10_000 })
      .invoke("text");

    cy.get("div[data-pf-id='exclusions-box']").within(() => {
      cy.findByText("Delete all").should("be.visible").click(); //deleting portfolio exclusion
    });

    cy.prospectingCompaniesAmount().then((afterDeletion) => {
      cy.get("@afterLoadingQuery").should("eq", afterDeletion);
    });
    cy.excludeEnrichedCompanies();

    cy.get("[data-pf-id='funnel']")
      .contains(/Compan(y|ies) in the list/)
      .prev()
      .contains("-", { timeout: 10_000 })
      .invoke("text");

    cy.get("div[data-pf-id='exclusions-box']").within(() => {
      cy.get("button[role='switch']").click();
    });

    cy.prospectingCompaniesAmount().then((restored) => {
      cy.get("@afterLoadingQuery").should("eq", restored);
    });

    cy.excludeCampaign(campaignForExclusion, groupFilterSearchbar); //excluding campaign with portfolio selected as loaded, num of companies should be 0

    cy.get("[data-pf-id='funnel']")
      .contains(/Compan(y|ies) in the list/)
      .prev()
      .contains("-", { timeout: 10_000 })
      .invoke("text");

    cy.clickOnResetAllFiltersButton(); //reseting all filters
    cy.findByText("Skip save").click;
    cy.get("[data-pf-id='funnel']")
      .contains(/Compan(y|ies) in the list/)
      .prev()
      .contains("-", { timeout: 10_000 })
      .invoke("text");
  });

  it("Query - deleting", { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] }, () => {
    /**
     * @description Deleting a query created in the first testcase
     */
    ProspectingPage.visit();
    cy.pageIsLoaded();
    cy.findAllCompaniesLabel();
    cy.openModuleInMyAccount("Prospecting");
    cy.deleteQuery(queryName);
  });
});
