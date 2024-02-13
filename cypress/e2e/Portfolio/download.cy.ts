import "./Support/commandsPortfolio";
import translations from "./Support/translations";
import allSchemas from "./Support/allSchemasHelper";
import "./Support/commandsPortfolioAPI";

const langs: langType[] = Cypress.env("lang_array");
const schemasName: schemasNameType =
  Cypress.env("modulePortfolio")["schema_name"];
const trans = translations;
const schemas = allSchemas[schemasName];
langs.forEach((lang) => {
  describe(
    `Portfolio - 24 ${lang} Portfolio download`,
    () => {
      beforeEach(() => {
        cy.deleteDownloads();
        cy.visitEnrichedPortfolio();
        cy.pageIsLoaded();
        cy.setLanguage(lang);
      });

      it(
        `Downloads ${lang} BASE TEMPLATE and verifies headers`,
        { tags: ["@ITA", "@GER", "@CZSK", "@CHE"] },
        () => {
          cy.clickOnTopActionButton("left-action-2", trans.downloadBtn[lang]);
          cy.downloadExcelTemplate(trans.baseTemplate[lang]);
          cy.verifyDownloadedPortfolio(
            "Enriched Portfolio",
            schemas.baseTemplate[lang]
          );
        }
      );

      it(
        `Downloads ${lang} MARKETING TEMPLATE and verifies headers`,
        { tags: ["@ITA", "@GER", "@CZSK", "@CHE"] },
        () => {
          cy.clickOnTopActionButton("left-action-2", trans.downloadBtn[lang]);
          cy.downloadExcelTemplate(trans.marketingTemplate[lang]);
          cy.verifyDownloadedPortfolio(
            "Enriched Portfolio",
            schemas.marketingTemplate[lang]
          );
        }
      );

      it(
        `Downloads ${lang} COMPLETE TEMPLATE and verifies headers`,
        { tags: ["@ITA", "@GER", "@CZSK", "@CHE"] },
        () => {
          cy.clickOnTopActionButton("left-action-2", trans.downloadBtn[lang]);
          cy.downloadExcelTemplate(trans.completeTemplate[lang]);
          cy.verifyDownloadedPortfolio(
            "Enriched Portfolio",
            schemas.completeTemplate[lang]
          );
        }
      );

      it(
        `Downloads ${lang} BASE PORTFOLIO  and verifies excel`,
        { tags: ["@ITA", "@GER", "@CZSK", "@CHE"] },
        () => {
          cy.clickOnTopActionButton("left-action-2", trans.downloadBtn[lang]);
          cy.selectExcelType(trans.baseTemplate[lang]);
          cy.findByText(trans.continueBtn[lang]).click();
          cy.findByText(trans.downloadBtn[lang]).click();
          cy.findByText(trans.okBtn[lang]).click();
          cy.waitForAlertBoxAndDownload(trans.alertBox[lang]);
          cy.verifyDownloadedPortfolio(
            "Enriched Portfolio",
            schemas.base[lang]
          );
        }
      );

      it(
        `Downloads ${lang} MARKETING PORTFOLIO  and verifies excel`,
        { tags: ["@ITA", "@GER", "@CZSK", "@CHE"] },
        () => {
          cy.clickOnTopActionButton("left-action-2", trans.downloadBtn[lang]);
          cy.selectExcelType(trans.marketingTemplate[lang]);
          cy.findByText(trans.continueBtn[lang]).click();
          cy.findByText(trans.downloadBtn[lang]).click();
          cy.findByText(trans.okBtn[lang]).click();
          cy.waitForAlertBoxAndDownload(trans.alertBox[lang]);
          cy.verifyDownloadedPortfolio(
            "Enriched Portfolio",
            schemas.marketing[lang]
          );
        }
      );

      it(
        `Creates ${lang} Custom Track verifies its template,downloads custom portfolio and verifies it and deletes custom track`,
        { tags: ["@ITA", "@GER", "@CZSK", "@CHE"] },
        () => {
          const customTrackName = "Track " + Date.now();

          cy.clickOnTopActionButton(
            "left-action-2",
            trans.leftActionBtn2[lang]
          );
          cy.selectExcelType(trans.customTemplate[lang]);
          cy.findByText(trans.continueBtn[lang]).click();
          cy.selectCustomTrackProperties(lang);

          // download and verify custom template
          cy.get("button[class*='DownloadButton']").click();
          cy.verifyDownloadedPortfolio(
            "Enriched Portfolio",
            schemas.customTemplate[lang]
          );
          cy.deleteDownloads();

          // save custom track
          cy.findByText(trans.saveCustomTrackMessage[lang])
            .siblings("label")
            .click({ waitForAnimations: true })
            .children("span")
            .should("have.class", "ant-checkbox-checked");
          cy.findByText(trans.continueBtn[lang]).click();
          cy.findByText(trans.createNewBtn[lang]).click();
          cy.get("[class='ant-form-item-control-input-content']")
            .find("input")
            .click()
            .type(customTrackName);
          cy.findByText(trans.continueBtn[lang]).click();
          cy.findByText(trans.downloadBtn[lang]).click();
          cy.findByText(trans.okBtn[lang]).click();

          // download and verifies custom portfolio
          cy.waitForAlertBoxAndDownload(trans.alertBox[lang]);
          cy.verifyDownloadedPortfolio(
            "Enriched Portfolio",
            schemas.custom[lang]
          );

          // deltes custom track
          cy.visit("/account/portfolio-management/");
          cy.get("div[role='tab']").contains(trans.customTracks[lang]).click();
          cy.get("tr")
            .contains(customTrackName)
            .parent("tr")
            .find('[data-testid="delete-action"]')
            .click();
          cy.get(".ant-modal-content").as("modal");
          cy.get("@modal")
            .find("button")
            .contains(trans.deleteCustomTrack[lang])
            .click();
          cy.get("@modal").find("button").contains(trans.okBtn[lang]).click();
        }
      );
    }
  );
});

describe("Group action download", () => {
  it(
    "Group action download Base excel",
    { tags: ["@ITA", "@GER", "@CZSK", "@CHE"] },
    () => {
      cy.deleteDownloads();
      cy.visitEnrichedPortfolio();
      cy.setLanguage("EN");
      cy.findByText("Group actions").parent().next().click();
      const companies: string[] =
        Cypress.env("modulePortfolio")["ids"][
          "group_actions_download_companies"
        ];
      companies.forEach((companyId) => {
        cy.findByText(companyId)
          .closest("tr")
          .find("input[type='checkbox']")
          .click();
      });
      cy.findByText("Select").click();
      cy.get("ul").findByText("Download Portfolio").click();
      cy.selectExcelType("Base");
      cy.findByText("Continue").click();
      cy.findByText("Download").click();
      cy.findByText("Ok").click();
      cy.waitForAlertBoxAndDownload("Download list");
      cy.verifyDownloadedPortfolio(
        "Enriched Portfolio",
        schemas.groupActionsBase
      );
    }
  );
});
