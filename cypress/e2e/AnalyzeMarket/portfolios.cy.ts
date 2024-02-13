import "./support/commandsAnalyzeMarket";
import "../SalesTool/support/commandsSalesTool";
const campaignName = `Campaign ${Date.now()}`;
const portfolioName = `Portfolio_SaveList ${Date.now()}`;
const groupFilterSearchbar = 'input[type="search"]';
const data = Cypress.env("moduleTargeting");

describe("Analyze Market - Portfolios", () => {
  it("63 - Portfolios", { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] }, () => {
    /**
     * @description Loading a particular portfolio in Analyze Market module, excluding particular portfolio, then creating a campaign from the same portfolio,
     * later excluding just created campaign from the search (both options should return 0 companies), finally reseting all filters  by button
     */
    cy.visit("/targeting");
    cy.pageIsLoaded();
    cy.findAllCompaniesLabel();
    cy.returnNumOfCompanies().as("totalNumOfCompanies", { type: "static" }); //storing initial number of companies

    cy.clickOnMenuButton("Load Portfolio", "h3", "Load portfolio"); //loading desired portfolio
    cy.loadPortfolio(data.analyzeMarket_universal_portfolio, "Competitor");
    cy.returnNumOfCompanies().as("numOfCompsAfterPortfolioLoaded", {
      type: "static",
    });
    cy.get("@totalNumOfCompanies").then((totalNumOfCompanies) => {
      //validating whether number of selected companies has changed
      cy.get("@numOfCompsAfterPortfolioLoaded").should(
        "be.lessThan",
        totalNumOfCompanies
      );
    });

    cy.excludePortfolio(
      data.analyzeMarket_universal_portfolio,
      groupFilterSearchbar
    );
    cy.get("[class*='TabsContainer']").within(() => {
      cy.get("span").contains("0 Compan");
    }); //as we exclude currently loaded portfolio, we assume that num of selected companies is 0

    cy.get("div[data-pf-id='exclusions-box']").within(() => {
      cy.findByText("Delete all").should("be.visible").click(); //deleting portfolio exclusion
    });
    cy.returnNumOfCompanies().as("numOfCompsAfterDeletion", {
      type: "static",
    });
    cy.get("@numOfCompsAfterPortfolioLoaded").then(
      (numOfCompsAfterPortfolioLoaded) => {
        cy.get("@numOfCompsAfterDeletion").should(
          //after deletion of portfolio exclusion, number of companies should restore to num of companies inside loaded portfolio
          "eq",
          numOfCompsAfterPortfolioLoaded
        );
      }
    );

    cy.excludeEnrichedCompanies();

    cy.get("[class*='TabsContainer']").within(() => {
      cy.get("span").contains("0 Compan");
    }); //every company in this portfolio is enriched so the expected outcome is 0

    cy.visit("/salestool");
    cy.pageIsLoaded();
    cy.clickOnCreateCampaign();
    cy.fillCampaignName(campaignName);
    cy.selectTheStartAndEndDate();
    cy.findByText("without custom variables").prev().click();
    cy.get(".ant-select-selector")
      .click()
      .type(data.analyzeMarket_universal_portfolio + "{enter}");
    cy.get(".ant-select-selector").click();
    cy.get("[data-testid='wizard-nextbtn']").click({ force: true });
    cy.choosingGoal();
    cy.enterDescriptionAndSetConversionRate();
    cy.findAllByText("Ok").click();
    cy.checkIfSalestoolWasLoaded();

    cy.visit("/targeting");
    cy.pageIsLoaded();

    cy.clickOnMenuButton("Load Portfolio", "h3", "Load portfolio"); //loading same portfolio we created a campaign from, meaning number of companies should be the same
    cy.loadPortfolio(data.analyzeMarket_universal_portfolio, "Competitor");

    cy.returnNumOfCompanies().as("numOfCompsAfterSecondPortfolioLoad", {
      type: "static",
    });
    cy.get("@numOfCompsAfterPortfolioLoaded").then(
      (numOfCompsAfterPortfolioLoaded) => {
        cy.get("@numOfCompsAfterSecondPortfolioLoad").should(
          "eq",
          numOfCompsAfterPortfolioLoaded
        );
      }
    );
    cy.excludeCampaign(campaignName, groupFilterSearchbar); //excluding campaign with portfolio selected as loaded, num of companies should be 0

    cy.get("[class*='TabsContainer']").within(() => {
      cy.get("span").contains("0 Compan");
    });

    cy.clickOnResetAllFiltersButton(); //reseting all filters
    cy.returnNumOfCompanies().as("numOfCompsAtTheEnd", {
      type: "static",
    });
    cy.get("@numOfCompsAfterPortfolioLoaded").then(
      //number of companies should restore to number from loaded portfolio
      (numOfCompsAfterPortfolioLoaded) => {
        cy.get("@numOfCompsAtTheEnd").should(
          "eq",
          numOfCompsAfterPortfolioLoaded
        );
      }
    );
  });

  it(
    "71 - Creating new portfolio through Save list button",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      if (!Cypress.env("isIntConfig")) {
        cy.visit("/targeting");
        cy.pageIsLoaded();
        cy.findAllCompaniesLabel();

        cy.returnNumOfCompanies().as("totalNumOfCompanies", {
          type: "static",
        }); //storing initial number of companies

        cy.loadExistingQuery(data.query.analyzeMarket_query_name);
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

        cy.saveList("button-4", portfolioName, "@numOfCompsAfterLoadingQuery");
        cy.clickOnResetAllFiltersButton();
        cy.clickOnMenuButton("Load Portfolio", "h3", "Load portfolio"); //loading same portfolio we created a campaign from, meaning number of companies should be the same
        cy.loadPortfolio(portfolioName, "Prospect");

        cy.returnNumOfCompanies().as("numOfCompsAfterPortfolioLoaded", {
          type: "static",
        });
        cy.get("@numOfCompsAfterLoadingQuery").then(
          (numOfCompsAfterLoadingQuery) => {
            //validating whether number of selected companies has changed
            cy.get("@numOfCompsAfterPortfolioLoaded").should(
              "eq",
              numOfCompsAfterLoadingQuery
            );
          }
        );
      }
    }
  );

  it(
    "78 - Selecting portfolio with different statuses",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      /**
       * @description Loading pre-created portfolio with different statuses,  sending portfolio from Portfolio Management to Analyze Market and verifying whether everything
       * is displayed correctly
       */
      cy.visit("/targeting");
      cy.pageIsLoaded();
      cy.returnNumOfCompanies().as("totalNumOfCompanies", { type: "static" }); //storing initial number of companies
      cy.clickOnModule("portfolio-management", "Portfolio Management");
      cy.pageIsLoaded();

      cy.findItemThroughSearch(
        data.analyzeMarket_universal_portfolio,
        "Search for name of portfolio"
      );
      cy.get("tbody")
        .findByText(data.analyzeMarket_universal_portfolio)
        .click();
      cy.pageIsLoaded();
      cy.sendToOtherModules("Analyze market");
      cy.verifyPortfolioInAnalyzeMarketModule(
        data.analyzeMarket_universal_portfolio,
        "@totalNumOfCompanies"
      );
      cy.compareAMStatusCount(1); //comparing whether statuses that are able to select are greater than 1
    }
  );

  it(
    "80 - Creating and selecting portfolio including Count of companies",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      /**
       * @description Loading pre-created portfolio with Amount field,  sending portfolio from Portfolio Management to Analyze Market and verifying whether everything
       * is displayed correctly, then using "Show by" dropdown and selecting Amount
       */
      cy.visit("/targeting");
      cy.pageIsLoaded();
      cy.returnNumOfCompanies().as("totalNumOfCompanies", { type: "static" }); //storing initial number of companies
      cy.clickOnModule("portfolio-management", "Portfolio Management");
      cy.pageIsLoaded();

      cy.findItemThroughSearch(
        data.analyzeMarket_universal_portfolio,
        "Search for name of portfolio"
      );
      cy.get("tbody")
        .findByText(data.analyzeMarket_universal_portfolio)
        .click();
      cy.sendToOtherModules("Analyze market");
      cy.verifyPortfolioInAnalyzeMarketModule(
        data.analyzeMarket_universal_portfolio,
        "@totalNumOfCompanies"
      );
      cy.findFieldInPortfolioShowBy("Count of companies");
    }
  );
});
