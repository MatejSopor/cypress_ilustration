import "./Support/commandsPortfolio";
import messages from "../Static/messages_eng";
import "./Support/commandsPortfolioAPI";
const apiUrl = Cypress.env("apiUrl");
const identificationIds = Cypress.env("modulePortfolio")["ids"]["group_action"];
const country = Cypress.env("modulePortfolio")["simplified_upload_country"];

describe(
  "Portfolio - Group actions",
  { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
  () => {
    beforeEach(() => {
      cy.loginWithPageSession();
      const newPortfolioName = "PortfolioGroupActions" + Date.now();

      cy.createPortfolioWithCompaniesAPI(
        newPortfolioName,
        identificationIds,
        "newPortfolioId",
        apiUrl,
        country
      );

      cy.wrap(newPortfolioName).as("newPortfolioName");
    });

    it("55 delete", () => {
      cy.get("@newPortfolioId").then((id) => {
        cy.visit("/portfolio-management/portfolio/" + id);
      });
      cy.findByText("Group actions").parent().next().click();
      cy.buttonsAreDisabled(Cypress.env("modulePortfolio")["top_buttons"]);
      cy.get("tr").eq(1).find("td").first().click();
      cy.get("tr").eq(2).find("td").first().click();
      cy.findByText("Select").click();
      cy.findAllByText("Delete company").last().click();
      cy.get("div[class='ant-modal-content']").within(() => {
        cy.findByText("Delete").click();
        cy.findByText("Ok").click();
      });
      cy.get("@newPortfolioName").then((name) => {
        cy.waitForAlertBox(
          messages.portfolioCompaniesdelete(name),
          String(name),
          undefined,
          "portfolio-management"
        );
      });
      cy.pageIsLoaded();
      cy.getNumOfCompanies("AllCompanies", "companies");
      cy.get("@companies").then(Number).should("eq", 1);
    });

    afterEach(() => {
      cy.get("@newPortfolioId").then((id) => {
        cy.deletePortfolioAPI(String(id), apiUrl);
      });
    });
  }
);

describe(
  "Portfolio - Group actions",
  { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
  () => {
    beforeEach(() => {
      cy.loginWithPageSession();
      const moveFromPortfolio = "PortfolioGroupActions" + Date.now();
      const moveToPortfolio = "PortfolioGroupActions2" + Date.now();

      cy.createPortfolioWithCompaniesAPI(
        moveFromPortfolio,
        identificationIds,
        "moveFromPortfolioId",
        apiUrl,
        country
      );
      cy.createPortfolioAPI(moveToPortfolio, "moveToPortfolioId", apiUrl);
      cy.wrap(moveFromPortfolio).as("moveFromPortfolioName");
      cy.wrap(moveToPortfolio).as("moveToPortfolioName");
    });

    it("55 move to another portfolio", () => {
      cy.get("@moveFromPortfolioId").then((id) => {
        cy.visit("/portfolio-management/portfolio/" + id);
      });
      cy.findByText("Group actions").parent().next().click();
      cy.get("tr").eq(1).find("td").first().click();
      cy.get("tr").eq(2).find("td").first().click();
      cy.findByText("Select").click();
      cy.findAllByText("Move company to another portfolio").last().click();
      cy.get("div[class='ant-modal-content']").within(() => {
        cy.get("input[type='search']").click();
      });
      cy.pageIsLoaded();
      cy.get("@moveToPortfolioName").then((name) => {
        cy.get("div[class='ant-modal-content']").within(() => {
          cy.get("input[type='search']").type(String(name)).press("enter");
          cy.findByText("Save").click();
          cy.findByText("Ok").click();
        });
      });
      cy.get("@moveFromPortfolioName").then((from) => {
        cy.get("@moveToPortfolioName").then((to) => {
          cy.waitForAlertBox(
            messages.portfolioCompaniesMove(from, to),
            String(from),
            undefined,
            "portfolio-management"
          );
        });
      });
      cy.pageIsLoaded();
      cy.getNumOfCompanies("AllCompanies", "companies");
      cy.get("@companies").then(Number).should("eq", 1);
      cy.get("@moveToPortfolioId").then((id) => {
        cy.visit("/portfolio-management/portfolio/" + id);
      });
      cy.pageIsLoaded();
      cy.getNumOfCompanies("AllCompanies", "companies");
      cy.get("@companies").then(Number).should("eq", 2);
    });

    afterEach(() => {
      cy.get("@moveFromPortfolioId").then((id) => {
        cy.deletePortfolioAPI(String(id), apiUrl);
      });
      cy.get("@moveToPortfolioId").then((id) => {
        cy.deletePortfolioAPI(String(id), apiUrl);
      });
    });
  }
);

describe(
  "Portfolio - Group actions",
  { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
  () => {
    beforeEach(() => {
      cy.loginWithPageSession();
      const newPortfolioName = "PortfolioGroupActions" + Date.now();

      cy.createPortfolioWithCompaniesAPI(
        newPortfolioName,
        identificationIds,
        "newPortfolioId",
        apiUrl,
        country
      );
      cy.wrap(newPortfolioName).as("newPortfolioName");
    });

    it("55 Group action - create portfolio", () => {
      const createdPortfolio = "PortfolioGroupActions2" + Date.now();
      cy.get("@newPortfolioId").then((id) => {
        cy.visit("/portfolio-management/portfolio/" + id);
      });
      cy.intercept(
        "POST",
        "/api/PortfolioActions/create-new-from-portfolio-selection"
      ).as("request");

      cy.findByText("Group actions").parent().next().click();
      cy.get("tr").eq(1).find("td").first().click();
      cy.get("tr").eq(2).find("td").first().click();
      cy.findByText("Select").click();
      cy.findAllByText("Create Portfolio").last().click();
      cy.get("div[class='ant-modal-content']").within(() => {
        cy.get("input[aria-label='Portfolio name']").type(createdPortfolio);
        cy.findByText("Save").click();
      });
      cy.wait("@request").then((req) => {
        cy.wrap(req.response.body.destinationId).as("createdPortfolioId");
      });
      cy.get("@createdPortfolioId").then((id) => {
        cy.visit("/portfolio-management/portfolio/" + id);
      });
      cy.pageIsLoaded();
      cy.get("tbody.ant-table-tbody").find("tr").should("have.length", 2);
      cy.get("@createdPortfolioId").then((id) => {
        cy.deletePortfolioAPI(String(id), apiUrl);
      });
    });

    afterEach(() => {
      cy.get("@newPortfolioId").then((id) => {
        cy.deletePortfolioAPI(String(id), apiUrl);
      });
    });
  }
);

describe(
  "Portfolio - Group actions",
  { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
  () => {
    it("55 enrich", { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] }, () => {
      const url: string =
        Cypress.env("modulePortfolio")["links"]["enrich_test"];
      cy.visit(url);
      cy.findByText("Group actions").parent().next().click();
      cy.get("tr").eq(1).find("td").first().click();
      cy.findByText("Select").click();
      cy.findAllByText("Enrich").last().click();
      cy.get("div[class='ant-modal-content']").within(() => {
        cy.findByText("Enrichment");
        cy.findByText("Confirm").parent().parent().should("be.enabled");
      });
    });

    it(
      "55 company sharing",
      { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
      () => {
        //sharing companies
        const url: string =
          Cypress.env("modulePortfolio")["links"]["enrich_test"];
        const name = Cypress.env("modulePortfolio")["enrich_test_name"];
        cy.visit(url);
        cy.findByText("Group actions").parent().next().click();
        cy.get("tr").eq(3).find("td").first().click();
        cy.get("tr").eq(4).find("td").first().click();
        cy.findByText("Select").click();
        cy.findAllByText("Share companies").last().click();
        cy.get("input[type='checkbox']").eq(1).click();
        cy.findByText("Continue").click();
        cy.findAllByText("Share companies").last().click();
        cy.waitForAlertBox(
          messages.portfolioSharing(),
          name,
          undefined,
          "portfolio-management"
        );
        //stop sharing companies
        cy.get("tr").eq(3).find("td").first().click();
        cy.get("tr").eq(4).find("td").first().click();
        cy.findByText("Select").click();
        cy.findAllByText("Stop sharing companies").last().click();
        cy.get("input[type='checkbox']").eq(1).click();
        cy.findByText("Continue").click();
        cy.findAllByText("Stop sharing companies").last().click();
        cy.waitForAlertBox(
          messages.portfolioSharing(),
          name,
          undefined,
          "portfolio-management"
        );
        cy.get("img[alt='share']", { timeout: 10000 });
      }
    );

    it(
      "55 Group action - other",
      { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
      () => {
        const url: string =
          Cypress.env("modulePortfolio")["links"]["enrich_test"];
        cy.visit(url);

        cy.findByText("Group actions").parent().next().click();
        cy.buttonsAreDisabled(Cypress.env("modulePortfolio")["top_buttons"]);
        const dropdowns = [
          "Select product",
          "Select sales",
          "Select area manager",
        ];
        dropdowns.forEach((dropdown) => {
          cy.findByText(dropdown).prev().children().click();
          cy.findAllByText("Not assigned").last().should("be.visible");
        });

        cy.findAllByText("Select columns").last().click();
        const columns = Cypress.env("modulePortfolio")["table_columns"];
        cy.get("div[class^='ant-dropdown']").within(() => {
          columns.forEach((column) => {
            cy.findByText(column).should("be.visible");
          });
        });
      }
    );
  }
);
