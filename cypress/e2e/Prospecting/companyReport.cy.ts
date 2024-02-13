import { ProspectingPage } from "./utils/prospectingPageUtils";
import messages from "../Static/messages_eng";
const companyReportData = Cypress.env("moduleProspecting")["companyReport"];

describe("Prospecting - CompanyReport", () => {
  it("Open company report", { tags: ["@ITA", "@GER", "@CHE"] }, () => {
    ProspectingPage.visit();
    cy.pageIsLoaded();

    cy.get('tbody[class="ant-table-tbody"]')
      .find("tr") // Find all table rows
      .first() // Select the first row
      .find("a") // Find all <a> elements within the first row
      .first() // Select the first <a> element
      .click(); // Click on the <a> element

    companyReportData.topButtonSelectors.forEach((item) => {
      cy.get(item).should("be.visible");
    });

    cy.get("[data-pf-id='side-menu']").within(() => {
      companyReportData.sideButtonSelectors.forEach((item) => {
        cy.get(item).should("be.visible");
      });
    });
  });

  it("Download company report", { tags: ["@ITA", "@GER", "@CHE"] }, () => {
    cy.visit(companyReportData.companyReportLink);
    cy.pageIsLoaded();

    cy.get("[data-testid='download-pdf-button']").should("be.visible").click();
    cy.get(".ant-modal-content").within(() => {
      cy.get("h3").contains("Confirm operation").should("be.visible");
      cy.findByText(
        "As soon as the PDF file is created you will receive a notification, and you will be able to download it and save it. Proceed with the operation?"
      );
      cy.findByText("Confirm").click();
    });

    cy.waitForAlertBox(
      messages.downloadCompanyReport(companyReportData.companyReportName),
      undefined,
      "Download file"
    );
    cy.verifyDownload(".pdf", { softMatch: true });
    cy.getFirstDownloadedFileName().then((name) => {
      cy.removeDownloadedFile(name);
    });
  });
});
