import "./support/commandsAnalyzeMarket";
import "../SalesTool/support/commandsSalesTool";
import { createHash } from "crypto";
const dayjs = require("dayjs");
const queryData = Cypress.env("moduleTargeting")["query"];
const filterData = Cypress.env("moduleTargeting")["filters"];

describe("Analyze Market - Query downloading ", () => {
  it(
    "57 - Query - downloading PDF",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      /**
       * @description Resuming pre-created query from My account section, verifying whether the filters are applied correctly, then downloading PDF and verifying
       * whether it was really downloaded by finding name by its conventions, removing PDF from downloads after the checks
       */
      cy.visit("/targeting");
      cy.pageIsLoaded();
      cy.findAllCompaniesLabel();
      cy.returnNumOfCompanies().as("totalNumOfCompanies", { type: "static" });
      cy.openModuleInMyAccount("Analyze Market");
      cy.clickOnResumeQuery(queryData.analyzeMarket_query_name);
      cy.pageIsLoaded();
      cy.filterSectionIsPresent(filterData.geoFilter_id_getter); //verifying whether filters are selected as they should be
      cy.checkIfFiltersAreApplied([queryData.analyzeMarket_query_city]);
      cy.pageIsLoaded();

      if (Cypress.env("configCountry").toUpperCase() === "ITA") {
        cy.get("[id='Tree-ateco']").scrollIntoView();
        cy.filterSectionIsPresent("Tree-ateco");
        cy.checkIfFiltersAreApplied([
          queryData.analyzeMarket_query_atecoFilter,
        ]);
      }

      cy.returnNumOfCompanies().as("numOfCompaniesAfterResumeQuery", {
        type: "static",
      });
      cy.get("@totalNumOfCompanies").then((totalNumOfCompanies) => {
        cy.get("@numOfCompaniesAfterResumeQuery").should(
          "be.lessThan",
          totalNumOfCompanies
        );
      });

      cy.clickOnDownloadPdfExcelButton();
      cy.downloadPdf("@numOfCompaniesAfterResumeQuery"); //downloading a PDF file, verifying whether it is downloaded
      cy.get("button[data-pf-id='button-2']", { timeout: 120000 }).should(
        "be.visible"
      );
      cy.verifyDownload(
        "TargetingAnalysis" + dayjs().format("_DD_MM_YYYY") + ".pdf"
      );
      cy.getFirstDownloadedFileName().then((name) => {
        cy.removeDownloadedFile(name);
      });
    }
  );

  /**
   * https://www.diffchecker.com/excel-compare/
   * https://www.textcompare.org/excel/
   */
  it.skip(
    "57 - Query - downloading .xlsx file",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      /**
       * @description Resuming pre-created query from My account section, verifying whether the filters are applied correctly, then downloading xlsx file and verifying
       * whether it was really downloaded by finding name by its conventions, removing xlsx from downloads after the checks
       * Note: when on ITA, asserting the presence not only for Geofilter, but also for CRIBIS D&B
       */
      cy.visit("/targeting");
      cy.pageIsLoaded();
      cy.findAllCompaniesLabel();
      cy.returnNumOfCompanies().as("totalNumOfCompanies", { type: "static" });
      cy.openModuleInMyAccount("Analyze Market");
      cy.clickOnResumeQuery(queryData.analyzeMarket_query_name);
      cy.pageIsLoaded();
      cy.filterSectionIsPresent(filterData.geoFilter_id_getter); //verifying whether filters are selected as they should be
      cy.checkIfFiltersAreApplied([queryData.analyzeMarket_query_city]);
      cy.pageIsLoaded();

      if (Cypress.env("configCountry").toUpperCase() === "ITA") {
        cy.get("[id='Tree-ateco']").scrollIntoView();
        cy.filterSectionIsPresent("Tree-ateco");
        cy.checkIfFiltersAreApplied([
          queryData.analyzeMarket_query_atecoFilter,
        ]);
      }

      cy.returnNumOfCompanies().as("numOfCompaniesAfterResumeQuery", {
        type: "static",
      });
      cy.get("@totalNumOfCompanies").then((totalNumOfCompanies) => {
        cy.get("@numOfCompaniesAfterResumeQuery").should(
          "be.lessThan",
          totalNumOfCompanies
        );
      });

      cy.clickOnDownloadPdfExcelButton();
      cy.downloadExcel("@numOfCompaniesAfterResumeQuery"); //downloading a PDF file, verifying whether it is downloaded
      cy.get("button[data-pf-id='button-2']", { timeout: 120000 }).should(
        "be.visible"
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
            expect(fileHash).to.eq(queryData.md5Hash);
          }
        );
      });

      cy.getFirstDownloadedFileName().then((name) => {
        cy.removeDownloadedFile(name);
      });
    }
  );
});
