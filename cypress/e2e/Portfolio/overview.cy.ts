import "./Support/commandsPortfolio";
describe("Portfolio - Overview", () => {
  it(
    "2, 3 - User lands in Portfolio Management",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      cy.visit("/");
      cy.clickOnModule("portfolio-management", "Portfolio Management");
      cy.location("pathname").should("eql", "/portfolio-management");
    }
  );

  it(
    `4 - All Portfolios contains All Portfolios, 
    5 - My portfolios contains my portfolios only, 
    6 - Received Portfolios contains Received Portfolios only`,
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      const testDataTabs = [
        {
          interceptAlias: "all",
          tabName: "All Portfolios",
          requestLink: "/api/portfolio?top=20&skip=0",
        },
        {
          interceptAlias: "my",
          tabName: "My Portfolios",
          requestLink: "/api/portfolio?top=20&skip=0&shareType=MyPortfolios",
        },
        {
          interceptAlias: "received",
          tabName: "Received Portfolios",
          requestLink: "/api/portfolio?top=20&skip=0&shareType=SharedWithUser",
        },
      ];

      // create request intecept
      testDataTabs.forEach((tab) => {
        cy.intercept(tab.requestLink).as(tab.interceptAlias);
      });
      cy.visit("/portfolio-management");

      testDataTabs.forEach((tab) => {
        cy.clickOnPortfolioListTab(tab.tabName);
        cy.wait(`@${tab.interceptAlias}`).then((req) => {
          // get total number of companies from request
          const total = parseInt(req.response.body.totalCount);
          // click load more button until all companmies are rendered in list
          cy.clickLoadMore(total);
          if (total > 0)
            // number of comanies in list should be the same that came in request
              cy.get("tbody.ant-table-tbody")
              .find("tr")
              .should("have.length", total);
        });
      });
    }
  );

  it(
    "7 - The lens icon has to appear in the top right corner, allowing the user to search for a portfolio name (not case sensitive research)",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      cy.visit("/portfolio-management");
      cy.get("input[type='search']")
        .should("have.attr", "placeholder", "Search for name of portfolio")
        .as("inputSearch");
      cy.get("@inputSearch").should("not.have.attr", "open");
      cy.get("div[role='button'][aria-label='search']:visible")
        .find("svg")
        .should("be.visible")
        .click()
        .then(() => {
          cy.get("@inputSearch").should("have.attr", "open");
          cy.get("@inputSearch")
            .should("be.visible")
            .type("Non Existant Portfolio{enter}");
          cy.get("table > tbody").should("not.exist", 0);
        });
    }
  );

  it(
    "8 - clicking on Upload portfolio user lands into /portfolio-mnanagement/add-portfolio",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      cy.visit("/portfolio-management");
      cy.contains("button[type='button'][class^=ant-btn]", "Upload Portfolio", {
        matchCase: false,
      })
        .should("be.visible")
        .click();

      cy.location("pathname").should(
        "eql",
        "/portfolio-management/add-portfolio"
      );
      cy.get("h1").contains("Upload Portfolio");
    }
  );

  it(
    "39 - Shares portfolio",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      const areaManager = Cypress.env("area_manager");
      const interceptAlias = "allPortfolios";
      const pmLink = "/portfolio-management";
      cy.intercept("/api/portfolio?top=20&skip=0").as(interceptAlias);
      cy.visit(pmLink);

      // check if porfolio contains indicator icon
      cy.checkPortfolioIndicator("not.exist", interceptAlias);

      // share portfolio
      cy.visitEnrichedPortfolio();
      cy.togglePortfolioSharing("img", areaManager);

      // check if list of porfolios contains indicator icon
      cy.visit(pmLink);
      cy.checkPortfolioIndicator("exist", interceptAlias);

      // disable portfolio sharing
      cy.visitEnrichedPortfolio();
      cy.togglePortfolioSharing("img", areaManager);
    }
  );

  it(
    "40 - Excludes portfolio from sharing",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      const areaManager = Cypress.env("area_manager");
      const interceptAlias = "allPortfolios";
      const sharingSelector = "[class^='ColorIcon__StyledIcon'] > svg";
      const pmLink = "/portfolio-management";
      cy.intercept("/api/portfolio?top=20&skip=0").as(interceptAlias);
      cy.visit(pmLink);

      // check if porfolio contains indicator icon
      cy.checkPortfolioIndicator("not.exist", interceptAlias);

      // exclude portfolio from sharing
      cy.visitEnrichedPortfolio();
      cy.togglePortfolioSharing(sharingSelector, areaManager);

      // check if porfolio contains indicator icon
      cy.visit(pmLink);
      cy.checkPortfolioIndicator("exist", interceptAlias);

      // turn off exclude portfolio sharing
      cy.visitEnrichedPortfolio();
      cy.togglePortfolioSharing(sharingSelector, areaManager);
    }
  );
});
