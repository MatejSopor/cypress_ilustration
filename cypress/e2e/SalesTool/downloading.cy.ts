import "./support/commandsSalesTool";
import { createHash } from "crypto";
const campaignName = "CampaignToBeDownloaded";
const excelHash = Cypress.env("moduleSalesTool")["md5Hash"];

describe("Sales Tool - Downloading as Supervisor", () => {
  it("Downloading PDF", { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] }, () => {
    cy.visit("/salestool");
    cy.pageIsLoaded();
    cy.clickOnTab("Started");
    cy.findItemThroughSearch(campaignName, "Search for name of campaign");
    cy.clickOnCampaignPortfolioCompany(campaignName);
    cy.downloadCampaignPdf();
    cy.verifyDownload(".pdf", { softMatch: true });
    cy.getFirstDownloadedFileName().then((name) => {
      cy.removeDownloadedFile(name);
    });
  });

  it.skip(
    "Downloading Excel",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      cy.visit("/salestool");
      cy.pageIsLoaded();
      cy.clickOnTab("Started");
      cy.findItemThroughSearch(campaignName, "Search for name of campaign");
      cy.clickOnCampaignPortfolioCompany(campaignName);
      cy.downloadCampaignXlsx();
      cy.waitForAlertBox(
        "Download excel of campaign",
        campaignName,
        "Download list"
      );
      cy.verifyDownload(".xlsx", { softMatch: true });

      //getting latest downloaded file, then creating a MD5 hash from the content and comparing it with pre-hashed sample
      cy.getFirstDownloadedFileName().then((fileName) => {
        cy.readFile(".\\cypress\\downloads\\" + fileName, "binary").then(
          (fileContent) => {
            const fileHash = createHash("md5")
              .update(fileContent)
              .digest("hex");
            cy.log(`File Hash: ${fileHash}`);
            expect(fileHash).to.eq(excelHash);
          }
        );
      });

      cy.getFirstDownloadedFileName().then((name) => {
        cy.removeDownloadedFile(name);
      });
    }
  );
});
