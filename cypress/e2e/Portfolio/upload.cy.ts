import "./Support/commandsPortfolio";
import "./Support/commandsPortfolioAPI";
import messages from "@e2e/Static/messages_eng";
import { buildQuery } from "./helpers";
describe(
  "Portfolio Upload",
  () => {
    const apiUrl = Cypress.env("apiUrl");
    beforeEach("Test setup - delete downloads folder", () => {
      cy.deleteDownloads();
    });

    afterEach("Test cleanup - delete temporary portfolios", () => {
      cy.get("@requestLink").then((link) => {
        cy.deletePortfolioAPI(String(link), apiUrl);
      });
    });

    it(
      "9 - Standard upload ",
      { tags: ["@ITA", "@GER", "@CZSK", "@CHE"] },
      () => {
        const portfolioName = "upload " + Date.now();
        const portfolioToUpload: string =
          Cypress.env("modulePortfolio")["upload"];
        cy.visit("/portfolio-management");
        const updatedCompanyCount = "1";

        // Selects standard upload
        cy.contains("button[type='button']", "Upload portfolio", {
          matchCase: false,
        }).click();
        cy.get("h2").contains("Type of upload").should("be.visible");
        cy.findByText("Standard Upload").click();
        cy.pageIsLoaded();

        // Download and verify downloaded file
        cy.contains("button[type='button']", "Download the file")
          .should("be.visible")
          .as("downloadTheFile");
        cy.get("@downloadTheFile").click();
        cy.verifyDownload("PortfolioImportTemplate.xlsx");
        cy.clickButton("Continue"); // wizzard 1/3

        // Upload premade portfolio template
        cy.get("h2").contains("Please select your file").should("be.visible");
        cy.get("[placeholder='Select the desired file']")
          .closest("div")
          .find("button")
          .click();
        cy.get("input[type='file']")
          .as("fileInput")
          .closest("div")
          .find("button")
          .click();
        cy.get("@fileInput")
          .invoke("css", "display", "block")
          .selectFile(portfolioToUpload);
        cy.clickButton("Continue"); // wizzard 2/3

        // create intercept for name validation request
        cy.intercept("/api/Portfolio/valid-name").as("validName");

        // Chooses a valid portfolio name
        cy.get("h2").contains("Choose a portfolio name").should("be.visible");
        cy.get("input[aria-label='Portfolio name']")
          .click()
          .type(portfolioName);

        // wait for the name validation request to finish
        cy.wait("@validName");

        // create request intercept
        cy.intercept("/api/PortfolioActions/create-from-file").as(
          "createPortfolio"
        );

        // creates portfolio
        cy.get("button[data-testid='wizard-nextbtn']").contains("Save").click(); // wizzard 3/3

        // create requestLink for cleanup function
        cy.wait("@createPortfolio").then((req) => {
          const destinationId: string = req.response.body.destinationId;
          cy.wrap(destinationId).as("requestLink");
        });

        cy.waitForAlertBox(
          messages.portfolioUpload(portfolioName),
          portfolioName,
          "Open", // click Open on alert box -> redirects user to created portfolio
          "portfolio-management"
        );

        // assert if porfolio was created with correct number of companies
        cy.get("h1").contains(portfolioName, { timeout: 15000 });
        cy.assertCompanyCountAfterQuery(updatedCompanyCount);
      }
    );

    it(
      "9.5 - Checks if uploaded portfolio is on the top of the list and manualy deletes portfolio",
      { tags: ["@ITA", "@GER", "@CZSK", "@CHE"] },
      () => {
        const portfolioName = "Upload " + Date.now();
        cy.createPortfolioAPI(portfolioName, "requestLink", apiUrl);
        cy.visit("/portfolio-management");
        cy.pageIsLoaded();

        // Verifies if notification is in the notification menu
        cy.get('[data-testid="bell-icon"]').as("bellIcon").click(); // open notification menu
        cy.get("div[class^='ant-drawer-body']")
          .find("[data-pf-id='notification']")
          .contains(messages.portfolioUpload(portfolioName));
        cy.get("@bellIcon").click(); // close the menu

        // Checks if newly creted portfolio is on the top of the list
        cy.visit("/portfolio-management");
        cy.get('tbody[class="ant-table-tbody"]')
          .find("tr")
          .first()
          .contains(portfolioName)
          .closest("tr")
          .find('button[aria-label="menu-button"]')
          .click({ force: true });

        // Manualy deletes newly created portfolio
        cy.get('li[data-menu-id$="-Delete portfolio"]')
          .contains("Delete portfolio")
          .click();
        cy.get("h3")
          .contains("Delete portfolio")
          .closest("div[role='dialog']")
          .as("deleteDialog");
        cy.get("@deleteDialog").find("span").contains(portfolioName);
        cy.get("@deleteDialog")
          .find("button[type='button']")
          .contains("Delete")
          .click();
        cy.get("@deleteDialog")
          .find("button[type='button']")
          .contains("Ok")
          .click({ timeout: 15000 });
      }
    );

    it(
      "28 - Simplified upload",
      { tags: ["@ITA", "@GER", "@CZSK", "@CHE"] },
      () => {
        const companies =
          Cypress.env("modulePortfolio")["ids"]["companies_for_creation"];
        const portfolioName = "upload " + Date.now();
        const query = buildQuery(companies);
        const updatedCompanyCount = companies.length;

        cy.visit("/portfolio-management/add-portfolio");
        cy.findByText("Simplified Upload").click();
        cy.get("h1").contains("Simplified Upload Portfolio");

        cy.get("textarea[name='companies']").click().type(query);
        cy.clickButton("Continue"); // wizzard 3/4
        cy.get("input[type='search']").click();
        cy.get("[class='rc-virtual-list-holder-inner']")
          .contains("Competitor")
          .click();
        cy.clickButton("Continue"); // wizzard 3/4
        cy.get("[aria-label='Portfolio name']").click().type(portfolioName);

        // create request intercept
        cy.intercept("/api/PortfolioActions/create-from-company-ids").as(
          "createFromIds"
        );
        cy.clickButton("Save"); // wizzard 4/4

        // create requestLink for cleanup function
        cy.wait("@createFromIds").then((req) => {
          const destinationId = req.response.body.destinationId;
          cy.wrap(destinationId).as("requestLink");
        });

        /* ! only in cypress clinet routing seems to be bugged
        therefore we need to manualy visit portfolio-management
      */
        cy.visit("/portfolio-management");
        cy.pageIsLoaded();

        /* ! sometimes alert box notification is not show
        due to slow loading times of cypress agent 
        therefore we first check the portfolio table
        to see if portfolio is already created
       */
        cy.get("tbody").then(($tbody) => {
          if ($tbody.text().includes(portfolioName)) {
            cy.get("tbody").contains(portfolioName).click();
          } else {
            cy.waitForAlertBox(
              messages.portfolioUpload(portfolioName),
              portfolioName,
              "Open",
              "portfolio-management"
            );
          }
        });

        // assert if porfolio was created with correct number of companies
        cy.get("h1").contains(portfolioName, { timeout: 15000 });
        cy.assertCompanyCountAfterQuery(updatedCompanyCount);
      }
    );

    it(
      "31 - Updates portfolio",
      { tags: ["@ITA", "@GER", "@CZSK", "@CHE"] },
      () => {
        const portfolioName = "Update " + Date.now();
        const { excelToUpload, updatedCompanyCount } =
          Cypress.env("modulePortfolio")["update"];

        cy.createPortfolioAPI(portfolioName, "requestLink", apiUrl);
        cy.get("@requestLink").then((link) => {
          cy.visit("/portfolio-management/portfolio/" + link);
        });
        cy.pageIsLoaded();

        cy.findByText("Update Portfolio", { exact: false }).click();
        cy.clickButton("Continue"); // wizzard 1/2
        cy.get("input[type='file']")
          .invoke("css", "display", "block")
          .selectFile(excelToUpload);
        cy.clickButton("Save"); // wizzard 2/2

        cy.waitForAlertBox(
          "Company uploaded correctly.",
          portfolioName,
          "Open", // click Open on alert box -> redirects user to created portfolio
          "portfolio-management"
        );
        cy.pageIsLoaded();

        // assert if porfolio was created with correct number of companies
        cy.get("h1").contains(portfolioName, { timeout: 15000 });
        cy.assertCompanyCountAfterQuery(updatedCompanyCount);
      }
    );
  }
);
