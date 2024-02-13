import "./support/commandsAnalyzeMarket";
import "../SalesTool/support/commandsSalesTool";
const groupFilterSearchbar = 'input[type="search"]';
const subFilterSearchbar = "textarea[aria-label='search text area']";
const queryName = "AnalyzeMarketTemporaryQuery";
const filterData = Cypress.env("moduleTargeting")["filters"];
const queryData = Cypress.env("moduleTargeting")["query"];

describe("Analyze Market - Queries ", () => {
  it(
    "57 - Query - creating and saving",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      /**
       * @description Creating a query by selecting particular subfilters in Geo filter and CRIBIS, saving query and verifying whether it was correctly saved.
       * Note: portfolio created in this testcase will be used for the whole spec
       */
      cy.visit("/targeting");
      cy.pageIsLoaded();
      cy.findAllCompaniesLabel();
      cy.returnNumOfCompanies().as("totalNumOfCompanies", { type: "static" });

      cy.clickOnFilter("standardFilters", "Company Filters"); //choosing Greographic area filter
      cy.applyFilter(groupFilterSearchbar, "Geographic area");
      cy.filterSectionIsPresent(filterData.geoFilter_id_getter);
      cy.openFilterSelection(filterData.geoFilter_id_getter);
      cy.clickOnArrowIcon(queryData.analyzeMarket_query_traverse); //traversing through side arrows until we get desired location
      cy.get("span").contains(queryData.analyzeMarket_query_city).click();
      cy.findAllByText("Save filters & close").click();
      cy.checkIfFiltersAreApplied([queryData.analyzeMarket_query_city]);

      cy.returnNumOfCompanies().as("numOfCompaniesAfterGeo", {
        type: "static",
      });
      cy.get("@totalNumOfCompanies").then((totalNumOfCompanies) => {
        cy.get("@numOfCompaniesAfterGeo").should(
          "be.lessThan",
          totalNumOfCompanies
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
          queryData.analyzeMarket_query_atecoFilter
        );
        cy.checkIfFiltersAreApplied([
          queryData.analyzeMarket_query_atecoFilter,
        ]);
        cy.returnNumOfCompanies().as("numOfCompaniesAfterCribis", {
          type: "static",
        });
        cy.get("@numOfCompaniesAfterGeo").then((numOfCompAfterGeo) => {
          //selecting another filter should lower the number again
          cy.get("@numOfCompaniesAfterCribis").should(
            "be.lessThan",
            numOfCompAfterGeo
          );
        });
      }

      cy.clickOnSaveQueryButton(); //saving new Query and opening it in My account - Resume query
      cy.saveNewQuery(queryName);
    }
  );

  it(
    "72 - Load query -> Send to Prospecting",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      /**
       * @description Loading previously saved query in Analyze Market module, then sending in to Prospecting and verifying whe integrity of data
       */
      cy.visit("/targeting");
      cy.pageIsLoaded();
      cy.findAllCompaniesLabel();
      cy.returnNumOfCompanies().as("totalNumOfCompanies", { type: "static" }); //storing initial number of companies

      cy.loadExistingQuery(queryName);
      cy.pageIsLoaded();
      cy.returnNumOfCompanies().as("numOfCompsAfterLoadingQuery", {
        type: "static",
      });
      cy.get("@totalNumOfCompanies").then((totalNumOfCompanies) => {
        //validating whether number of selected companies has changed
        cy.get("@numOfCompsAfterLoadingQuery").should(
          "be.lessThan",
          totalNumOfCompanies
        );
      });
      cy.get("div[data-pf-id='exclusions-box']").within(() => {
        cy.findByText(queryName).should("be.visible");
      });
      cy.sendQueryToProspecting();
      cy.getNumOfCompsProspecting().as("numOfCompsProspecting", {
        type: "static",
      });
      cy.get("@numOfCompsAfterLoadingQuery").then(
        (numOfCompsAfterLoadingQuery) => {
          //validating whether number of selected companies is the same after loading query and in prospecting
          cy.get("@numOfCompsProspecting").should(
            "not.be.lessThan",
            numOfCompsAfterLoadingQuery
          );
        }
      );
    }
  );

  it(
    "57 - Query - deleting",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      /**
       * @description Deleting a query created in the first testcase
       */
      cy.visit("/targeting");
      cy.pageIsLoaded();
      cy.findAllCompaniesLabel();
      cy.openModuleInMyAccount("Analyze Market");
      cy.deleteQuery(queryName);
    }
  );
});
