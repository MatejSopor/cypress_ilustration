import { ProspectingPage } from "./utils/prospectingPageUtils";
import "../Portfolio/Support/commandsPortfolioAPI";
describe(
  "Prospecting download and save list",
  { tags: ["@ITA", "@GER", "@CZSK", "@CHE"] },
  () => {
    const apiUrl = Cypress.env("apiUrl");
    beforeEach(() => {
      ProspectingPage.visit();
    });

    afterEach(() => {
      cy.get("@requestLink").then((link) => {
        cy.deletePortfolioAPI(String(link), apiUrl);
      });
    });

    it("Saves list", () => {
      const name = "Prospecting Save List " + Date.now();
      cy.pageIsLoaded();
      // select order by from A-Z
      cy.findByText("Order by")
        .parent()
        .find("input[type='search']")
        .click({ force: true });

      // toto id
      cy.findByText("Company name (A-Z)", { exact: false }).click();
      cy.pageIsLoaded();

      // group actions
      cy.findByText("Group Actions").parent().next().click();

      // select first 2 companies
      cy.get("tbody > tr").eq(0).find("input[type='checkbox']").click();
      cy.get("tbody > tr").eq(1).find("input[type='checkbox']").click();

      // actions save list
      cy.findByText("Actions").parent().find("button").click();
      cy.pageIsLoaded();
      cy.get("li").contains("Save List").click();

      // go through save list wizzard
      cy.findByText("Create new").click(); // wizzard 1/4
      cy.findByText("Continue").click();

      // enter name for your portfolio
      cy.get("input[aria-label='Portfolio name']").click().type(name); // wizzard 2/4
      cy.findByText("Continue").click();

      // create tag (optional)
      cy.findByText("Continue").click(); // wizzard 3/4

      // create intercept
      cy.intercept("/api/PortfolioActions/create").as("createPortfolio");

      // enrichment (only one first time needed)
      cy.findByText("Continue").click(); // wizzard 4/4

      // create requestLink for cleanup function
      cy.wait("@createPortfolio").then((req) => {
        const destinationId: string = req.response.body.destinationId;
        cy.wrap(destinationId).as("requestLink");
      });

      // assert if porfolio with right number of companies was created
      cy.waitForAlertBox(
        `Creation of portfolio ${name} and insert of 2 enriched companies executed correctly`,
        name,
        "Open"
      );

      cy.get("div[data-testid='AllCompanies']")
        .find("h4")
        .should((h4) => {
          const companyCount = h4.text().replace(/\D/g, "");
          expect(parseInt(companyCount)).eq(2);
        });
    });
    it("Downloads Excel", () => {
      // order companies from A-Z
      const name = "Download Excel" + Date.now();
      // select order by from A-Z
      cy.findByText("Order by")
        .parent()
        .find("input[type='search']")
        .click({ force: true });

      // select group actions
      cy.findByText("Company name (A-Z)", { exact: false }).click();

      cy.pageIsLoaded();

      cy.findByText("Group Actions").parent().next().click();

      // select first 2 companies
      cy.get("tbody > tr").eq(0).find("input[type='checkbox']").click();
      cy.get("tbody > tr").eq(1).find("input[type='checkbox']").click();

      // actions save list
      cy.findByText("Actions").parent().find("button").click();
      cy.pageIsLoaded();
      cy.get("li").contains("Download Excel").click();

      // go through save list wizzard
      cy.findByText("Create new").click(); // wizzard 1/4
      cy.findByText("Continue").click();

      // enter name for your portfolio
      cy.get("input[aria-label='Portfolio name']").click().type(name); // wizzard 2/4
      cy.findByText("Continue").click();

      // create tag (optional)
      cy.findByText("Continue").click(); // wizzard 3/4

      // create intercept
      cy.intercept("/api/PortfolioActions/create").as("createPortfolio");

      // enrichment (only one first time needed)List
      cy.findByText("Continue").click(); // wizzard 4/4

      // create requestLink for cleanup function
      cy.wait("@createPortfolio").then((req) => {
        const destinationId: string = req.response.body.destinationId;
        cy.wrap(destinationId).as("requestLink");
      });

      cy.waitForAlertBox(
        `Your enriched portfolio ${name} has been correctly created.`,
        name,
        "Download Excel"
      );

      cy.pageIsLoaded();
      cy.findByText("Download Portfolio").click();

      // assert if user is in downloads page
      cy.get("h1").contains("Download portfolio");
      cy.findByText("Select type of list");
      cy.findByText("Base");
      cy.findByText("Marketing");
      cy.findByText("Complete");
    });
  }
);
