import "./support/commandsOperations";
import "./support/commandsFiltersSetting";
import "./support/operationsUtils";
import messages from "../Static/messages_eng";

describe("Operations - Save, load and download lists", () => {
  const apiUrl = Cypress.env("apiUrl");
  it("16 Save and load Query", { tags: ["@ITA", "@CZSK", "@GER"] }, () => {
    const newQueryName = "Operations_query " + Date.now();
    cy.visitOperationsAndAddRule();
    cy.setValueFilter();
    cy.intercept("POST", "/api/documents/create-filter-query").as("request");
    cy.saveNewQuery(newQueryName);
    cy.wait("@request").then((req) => {
      cy.wrap(req.response.body.id).as("queryId");
    });
    cy.checkQueryExistance(newQueryName);
    cy.clickOnModule("operations", "Operations");
    cy.loadQuery(newQueryName);
    cy.checkLoadedFilter();
    cy.buttonsAreDisabled(["Save List", "Download Excel"]);
    cy.get("@queryId").then((id) => {
      cy.deleteQueryAPI(String(id), apiUrl);
    });
  });

  it("18 Save List", { tags: ["@ITA", "@CZSK", "@GER"] }, () => {
    const newPortfolioName = "Operations_portfolio " + Date.now();
    cy.visitOperationsAndAddRule();
    cy.setValueFilter();
    cy.get("button[type='button']")
      .contains("Search")
      .should("be.visible")
      .click();
    cy.pageIsLoaded();
    cy.getCompanyCount().as("firstResult");
    cy.contains("Save List").click();
    cy.intercept("POST", "/api/portfolio/create-from-compound-expression").as(
      "request"
    );
    cy.newPortfolioWizzard(newPortfolioName);
    cy.wait("@request").then((req) => {
      cy.wrap(req.response.body.destinationId).as("queryId");
    });
    cy.get("@firstResult").then((num) => {
      cy.waitForAlertBox(
        messages.operationsSaveList(newPortfolioName, num),
        newPortfolioName,
        "Open"
      );
    });

    cy.pageIsLoaded();
    cy.get("div[data-testid='AllCompanies']")
      .find("h4")
      .then((h4) => {
        var secondResult = h4.text().replace(" Companies", "");
        cy.get("@firstResult").should("eq", Number(secondResult));
      });
    cy.get("@queryId").then((id) => {
      cy.deletePortfolioAPI(String(id), apiUrl);
    });
  });

  it("19 Create portoflio and Download Excel", { tags: ["@ITA", "@CZSK", "@GER"] }, () => {
    const newPortfolioName = "Operations_portfolio " + Date.now();
    cy.visitOperationsAndAddRule();
    cy.setValueFilter();
    cy.get("button[type='button']")
      .contains("Search")
      .should("be.visible")
      .click();
    cy.contains("Download Excel").click();
    cy.intercept("POST", "/api/portfolio/create-from-compound-expression").as(
      "request"
    );
    cy.newPortfolioWizzard(newPortfolioName);
    cy.wait("@request").then((req) => {
      cy.wrap(req.response.body.destinationId).as("queryId");
    });
    cy.waitForAlertBox(
      messages.operationsDownloadExcel(newPortfolioName),
      "Download portfolio",
      "Download Excel"
    );
    cy.intercept("GET", "/api/DownloadToken/**").as("secondRequest");
    cy.downloadExcelWizzard();
    cy.wait("@secondRequest").then((req) => {
      cy.wrap(req.request.url).as("excelId");
    });
    cy.get("h1").should("have.text", newPortfolioName);
    cy.get("@queryId").then((id) => {
      cy.deletePortfolioAPI(String(id), apiUrl);
    });
    cy.visit(Cypress.env("moduleOperations")["account_portfolio_management"]);
    cy.contains("td", newPortfolioName).then((text) => {
      cy.removeDownloadedFile(text.text());
    });
    cy.get("@excelId").then((myId) => {
      var url = String(myId);
      var newUrl = url.split("/")[5];
      var brandNewUrl = newUrl.replace("register-token?documentId=", "");
      cy.wait(1000);
      cy.deleteExcelAPI(brandNewUrl, apiUrl);
    });
  });

  it("22 Save List with 1 Company", { tags: ["@ITA", "@CZSK", "@GER"] }, () => {
    const newPortfolioName = "Operations_portfolio " + Date.now();
    cy.visitOperationsAndAddRule();
    cy.setValueFilter();
    cy.get("button[type='button']")
      .contains("Search")
      .should("be.visible")
      .click();
    cy.groupAction("Save List");
    cy.intercept("POST", "/api/portfolio/create-from-compound-expression").as(
      "request"
    );
    cy.newPortfolioWizzard(newPortfolioName);
    cy.wait("@request").then((req) => {
      cy.wrap(req.response.body.destinationId).as("queryId");
    });
    cy.waitForAlertBox(
      messages.operationsSaveCompany(newPortfolioName),
      newPortfolioName,
      "Open"
    );
    cy.get("@queryId").then((id) => {
      cy.deletePortfolioAPI(String(id), apiUrl);
    });
  });

  it("23 Download excel with 1 Company", { tags: ["@ITA", "@CZSK", "@GER"] }, () => {
    const newPortfolioName = "Operations_portfolio " + Date.now();
    cy.visitOperationsAndAddRule();
    cy.setValueFilter();
    cy.get("button[type='button']")
      .contains("Search")
      .should("be.visible")
      .click();
    cy.groupAction("Download Excel");
    cy.intercept("POST", "/api/portfolio/create-from-compound-expression").as(
      "request"
    );
    cy.newPortfolioWizzard(newPortfolioName);
    cy.wait("@request").then((req) => {
      cy.wrap(req.response.body.destinationId).as("queryId");
    });
    cy.waitForAlertBox(
      messages.operationsDownload1CompanyExcel(newPortfolioName),
      "Download portfolio",
      "Download Excel"
    );
    cy.get("@queryId").then((id) => {
      cy.deletePortfolioAPI(String(id), apiUrl);
    });
  });
});
