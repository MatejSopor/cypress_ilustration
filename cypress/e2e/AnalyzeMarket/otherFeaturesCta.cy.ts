import "./support/commandsAnalyzeMarket";
import "../SalesTool/support/commandsSalesTool";
const filterData = Cypress.env("moduleTargeting")["filters"];

describe("Analyze Market - Other features and CTAs ", () => {
  it(
    "50 - Semantic search",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      /**
       * @description Working with Semantic search functionality, firstly using the searchbar to filter companies by using keyword, also checking suggested synonyms
       * that should be displayed under the searchbar, applying Semantic Cluster filter, downloading Semantic search guide, verifying if the functionality is correct
       * and downloads well, using Advanced semantic search filter and finally using dropdown component
       */
      cy.visit("/targeting");
      cy.pageIsLoaded();
      cy.findAllCompaniesLabel();
      cy.returnNumOfCompanies().as("totalNumOfCompanies", { type: "static" }); //storing initial number of companies

      cy.getSemanticSearchSearchbar()
        .type(filterData.analyzeMarket_semantic_search_keyword)
        .press("enter"); //writing keyword "pesca" into semantic search searchbar
      cy.wait(1000);

      cy.returnNumOfCompanies().as("numOfCompaniesAfterSearchbar", {
        type: "static",
      });
      cy.get("@totalNumOfCompanies").then((totalNumOfCompanies) => {
        //expecting number of companies to decrease in comparison with initial number of comps
        cy.get("@numOfCompaniesAfterSearchbar").should(
          "be.lessThan",
          totalNumOfCompanies
        );
      });

      if (Cypress.env("configCountry") === "ITA") {
        cy.get("div[class*='CompanyPortfolioStatus']").within(() => {
          //verifying whether button synonyms with particular words are present, then clicking on a button which applies some of the additional filters based on our search
          cy.findByText("Synonyms").should("be.visible");
          cy.buttonsAreVisible(
            filterData.analyzeMarket_semantic_search_synonyms
          );
          cy.findByText(
            "Refine your search with new Margo Semantic Clusters filter"
          )
            .should("be.visible")
            .click();
        });
        cy.wait(1000);
        cy.returnNumOfCompanies().as(
          "numOfCompaniesAfterSemanticClusterFilter",
          {
            type: "static",
          }
        );
        cy.get("@numOfCompaniesAfterSearchbar").then(
          (numOfCompAfterSearchbar) => {
            //number of companies should be lower when clicking on an additional filter button
            cy.get("@numOfCompaniesAfterSemanticClusterFilter").should(
              "be.lessThan",
              numOfCompAfterSearchbar
            );
          }
        );

        cy.get("[id='Tree-semanticClusters']").within(() => {
          cy.findByText("Delete all").should("be.visible").click();
        });
        cy.wait(1000);
        cy.returnNumOfCompanies().as("numOfCompaniesAfterDeletion", {
          type: "static",
        });
        cy.get("@numOfCompaniesAfterSearchbar").then(
          (numOfCompAfterSearchbar) => {
            cy.get("@numOfCompaniesAfterDeletion").should(
              "eq",
              numOfCompAfterSearchbar
            );
          }
        );
      }

      cy.get("div[class*='CompanyPortfolioStatus']").within(() => {
        // download of a selected portfolio
        cy.downloadSemanticSearchGuide();
      });
      cy.verifyDownload(".pdf", { softMatch: true });

      cy.get("div[class*='CompanyPortfolioStatus']").within(() => {
        //using Advanced semantic search in order to be able to use logical keywords
        cy.clickAdvancedSemanticSearch();
      });
      cy.getSemanticSearchSearchbar() //writing a particular text into searchbox after applying Advanced semantic search
        .clear()
        .type(filterData.analyzeMarket_advanced_sem_search_input)
        .press("enter");
      cy.pageIsLoaded();
      cy.returnNumOfCompanies().as("numOfCompaniesAfterSearchbarUsage", {
        type: "static",
      });
      cy.get("@totalNumOfCompanies").then((totalNumOfCompanies) => {
        cy.get("@numOfCompaniesAfterSearchbarUsage").should(
          "be.lessThan",
          totalNumOfCompanies
        );
      });

      cy.get("div[class*='CompanyPortfolioStatus']").within(() => {
        //choosing Web & Social from combobox, number of companies should decrease even more
        cy.get("input[role='combobox']").click({ force: true });
      });
      cy.get("div[title='Web & Social']").click();
      cy.wait(1000);

      cy.get("@numOfCompaniesAfterSearchbarUsage").then(
        (numOfCompaniesAfterSearchbarUsage) => {
          cy.get("div[class*='TabsContainer']")
            .children()
            .first()
            .invoke("text")
            .then((value) => {
              let totalNumberOfCompanies = parseInt(value.replace(/\D/g, ""));
              expect(totalNumberOfCompanies).is.lessThan(
                Number(numOfCompaniesAfterSearchbarUsage)
              );
            });
        }
      );

      cy.getSemanticSearchSearchbar().next().click(); //clearing the searchbar, expecting num of companies to return as they were at the beginning
      cy.wait(1000);
      cy.returnNumOfCompanies().as("numAtTheEnd", { type: "static" });
      cy.get("@totalNumOfCompanies").then((totalNumOfCompanies) => {
        cy.get("@numAtTheEnd").should("eq", totalNumOfCompanies);
      });
      // deletion of downloaded file
      cy.getFirstDownloadedFileName().then((name) => {
        cy.removeDownloadedFile(name);
      });
    }
  );

  it(
    "75 - Opening graph by clicking Chart Detail button",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      /**
       * @description When landed in Analyze Market section, finding and opening a graph detail provided in method argument
       */
      cy.visit("/targeting");
      cy.pageIsLoaded();
      cy.findAllCompaniesLabel();
      cy.pageIsLoaded();
      cy.openGraphDetails("Geographical distribution");
    }
  );
});
