import "./Support/commandsAccountAPI";
const env = Cypress.env("configCountry");
const environment = Cypress.env("environment");
const apiUrl = Cypress.env("apiUrl");
const apiEnrichUrl = Cypress.env("apiEnrichUrl");

describe("Account Tab Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.pageIsLoaded();
    cy.setLanguage("EN");
  });

  it(
    "Checks My subscription (rings) section",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      cy.navigateToAccount();
      cy.pageIsLoaded();
      cy.contains("My subscription (rings)")
        .should("be.visible")
        .parents('[class*="PaleBox"]')
        .within(() => {
          cy.contains("Available")
            .prev()
            .invoke("text")
            .then((text) => {
              const numberWithoutCommas = text.replace(/,/g, "");
              expect(numberWithoutCommas).to.match(/\d+/);
            });
          cy.contains("Used")
            .prev()
            .invoke("text")
            .then((text) => {
              const numberWithoutCommas = text.replace(/,/g, "");
              expect(numberWithoutCommas).to.match(/\d+/);
            });
          cy.contains("Total")
            .prev()
            .invoke("text")
            .then((text) => {
              const numberWithoutCommas = text.replace(/,/g, "");
              expect(numberWithoutCommas).to.match(/\d+/);
            });
          cy.contains("Validity:")
            .next()
            .invoke("text")
            .then((text) => {
              expect(text).to.match(
                /\s*From\s+\d{2}\/\d{2}\/\d{4}\s+to\s+\d{2}\/\d{2}\/\d{4}/
              );
            });
          cy.contains(
            "Contact us to update your subscription or buy more rings"
          ).should("be.visible");
          cy.contains("Contact us").should("be.visible");
        });
    }
  );

  it("Checks Contacts section", { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] }, () => {
    cy.visit("/account");
    cy.contains("Contacts")
      .should("be.visible")
      .parents('[class*="PaleBox"]')
      .within(() => {
        cy.contains("User")
          .next()
          .contains(Cypress.env("user_name"))
          .should("be.visible");
        cy.contains("Email")
          .next()
          .contains(Cypress.env("user_email"))
          .should("be.visible");
        cy.contains("Contact us to change your contacts").should("be.visible");
        cy.contains("Contact us").should("be.visible").click();
        cy.pageIsLoaded();
      });

    cy.sendContactUs();
    cy.pageIsLoaded();
    cy.checkContactUsModal();
  });

  // needs fixing - tests is passing randomly and than language stays set in italian
  it(
    "Checks Language section",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      switch (env) {
        case "ita":
          cy.saveLanguage("it-IT", "Italiano");
          break;
        case "ger":
          cy.saveLanguage("de-DE", "Deutsch");
          break;
        case "che":
          cy.saveLanguage("it-IT", "Italiano");
          break;
      }
      cy.pageIsLoaded();
      cy.setLanguage("EN");
      cy.saveLanguage("en-GB", "English");
    }
  );

  it(
    "Checks Subscription Settings section",
    { tags: ["@ITA", "@CZSK"] },
    () => {
      cy.visit("/account");
      cy.contains("Subscription Settings")
        .should("be.visible")
        .parents('[class*="PaleBox"]')
        .within(() => {
          cy.contains("Subscription Code:").should("be.visible");
          cy.contains(Cypress.env("user_subscription_code")).should(
            "be.visible"
          );
          cy.contains("View").should("be.visible").click();
          cy.contains("Contact us to purchase additional features").should(
            "be.visible"
          );
          cy.contains("Contact us").should("be.visible");
        });
      cy.get("div.ant-modal-content").within(() => {
        cy.get(".ant-modal-close")
          .should("have.attr", "aria-label", "Close")
          .should("be.visible");
        cy.get(".ant-modal-header").within(() => {
          cy.get(".ant-modal-title")
            .contains("Subscription Settings")
            .should("be.visible");
        });
        cy.get(".ant-modal-body").within(() => {
          cy.contains("Standard Enablings:")
            .next("[class*='CheckListWrapper']")
            .should("exist");
          cy.contains("Custom Enablings:")
            .next("[class*='CheckListWrapper']")
            .should("exist");
        });
        cy.get(".ant-modal-footer")
          .find(".ant-btn")
          .contains("Cancel")
          .should("be.visible")
          .click();
        cy.get("div.ant-modal-content").should("not.exist");
      });
    }
  );

  it(
    "Checks ESG Settings section",
    { tags: ["@GER"] },
    () => {
      cy.visit("/account");
      cy.get("span")
        .contains("ESG unlocks")
        .should("be.visible")
        .parents('[class*="PaleBox"]')
        .within(() => {
          cy.contains("Scores unlocked").should("be.visible");
          cy.contains("Contact us to update your payment plan").should(
            "be.visible"
          );
          cy.contains("Contact us").should("be.visible");
        });
    }
  );
  describe.skip(
    "Enrichment - ring usage ", { tags: ["@ITA", "@GER", "@CHE"] },
    () => {
      beforeEach(() => {
        cy.loginWithPageSession();
        if(environment === "int"){
          const newPortfolioName = "Portfolio_Enrich_test_" + Date.now();
          const identificationIds = Cypress.env("moduleAccount")["companyTaxCode"];
          const country = Cypress.env("modulePortfolio")["simplified_upload_country"];
          cy.createPortfolioWithCompaniesAPI(
            newPortfolioName,
            identificationIds,
            "newPortfolioId",
            apiUrl,
            country
          );
          cy.wrap(newPortfolioName).as("newPortfolioName");
        }
      });
  
      it.skip("Enrichment - ring usage ", () => {
        if(environment === "int"){
          const company = Cypress.env("moduleAccount")["enrich_company"];
          const companyId = Cypress.env("moduleAccount")["enrich_company_id"];
          cy.getNumberOfRings(apiEnrichUrl, "ringsBefore");
          cy.visit(company);
          cy.contains("Unlock CRIF data").click();
          cy.pageIsLoaded();
          cy.findByText("Confirm").click();
          cy.findByText("Confirm").click();
          cy.pageIsLoaded();
          cy.visit(company);
          cy.contains("Unlock CRIF data").should("not.exist");
          cy.companyInfo(apiUrl, companyId);
          cy.get(String("@response")).should("eq", true); 
          cy.getNumberOfRings(apiEnrichUrl, "ringsAfter");
          cy.get("@ringsBefore").then((ringssBefore) => {
            cy.get("@ringsAfter").should('be.below', ringssBefore);
          })
        }
      });
  
      afterEach(() => {
        if(environment === "int"){
          cy.get("@newPortfolioId").then((id) => {
            cy.deletePortfolioAPI(String(id), apiUrl);
          });
          const companyVatCode = Cypress.env("moduleAccount")["enrich_company_vat_code"];
          cy.companyUnenrichment(companyVatCode ,apiEnrichUrl);
        }
      });
    }
  );
});
