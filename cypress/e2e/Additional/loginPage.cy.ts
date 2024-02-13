/// <reference types="Cypress" />
import msg from "./support/languageMutations";
describe("Additional - Logs in user", { env: { autoLogin: false } }, () => {
  beforeEach(() => {
    cy.visit("/");
    window.localStorage.setItem("uc_user_interaction", "true");
    window.localStorage.setItem("uc_ui_version", "3.22.0");
    window.localStorage.setItem(
      "uc_settings",
      JSON.stringify(Cypress.env("uc_settings"))
    );
  });

  // changes language to english
  it(
    "changes language to english",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      cy.get("div[class^='components__LanguageSwitchWrapper']")
        .find("button:visible")
        .trigger("mouseover")
        .then(() => {
          cy.get("li").contains("EN").click();
          cy.get("form")
            .contains("Sign in to Margò")
            .should("exist")
            .and("be.visible");
          cy.get("form")
            .contains("Enter your details below")
            .should("exist")
            .and("be.visible");
        });
    }
  );

  // requires username
  it("requires username", { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] }, () => {
    cy.get("#ta-login").should("be.disabled");
  });

  const langs: string[] = Cypress.env("lang_array");
  langs.forEach((lang) => {
    context(`Testing in language ${lang} `, () => {
      it(
        `tell user to sign in in ${lang} and instrucs user to fill username and password`,
        { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
        () => {
          cy.setLanguage(lang);
          cy.get("form")
            .contains(msg.enterYourDetails[lang])
            .should("exist")
            .and("be.visible");
        }
      );

      // requires password
      it(
        "requires password",
        { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
        () => {
          cy.setLanguage(lang);
          cy.get("#ta-username").click().type("johdoe");
          cy.get("#ta-login").click().should("be.enabled");
          cy.get("form")
            .contains(msg.passwordRequired[lang])
            .should("have.class", "ant-form-item-explain-error")
            .and("be.visible")
            .and("have.css", "color", "rgb(255, 77, 79)");
        }
      );

      // requires valid password
      it(
        "requires valid password",
        { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
        () => {
          cy.setLanguage(lang);
          cy.get("#ta-username").click().type("johdoe");
          cy.get("#ta-password").type("WrongPassw@rd!");
          cy.get("#ta-login").click().should("be.enabled");
          cy.get("form")
            .first()
            .within(() => {
              cy.get("div[class*='ant-form-item-explain']").should(
                "be.visible"
              );
            });
        }
      );

      // links to forgot password subpage
      it(
        "contains link to forgot password subpage",
        { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
        () => {
          cy.setLanguage(lang);
          cy.get("form")
            .contains(msg.forgotPasswordButton[lang])
            .should("be.visible")
            .click()
            .then(() => {
              cy.get("form")
                .contains(msg.backToLoginPageButton[lang])
                .should("have.attr", "href", "#");
            });
        }
      );

      // links to cookie policy
      it(
        "links to cookie policy",
        { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
        () => {
          cy.setLanguage(lang);
          cy.get("div[id='footer']:visible")
            .contains(msg.cookiePolicyButton[lang])
            .should("be.visible")
            .and("have.attr", "href", "/cookie-policy");
        }
      );

      // links to Contact Us
      it(
        "links to Contact Us",
        { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
        () => {
          cy.setLanguage(lang);
          cy.get("div[id='footer']:visible")
            .contains(msg.contactUsButton[lang])
            .should("be.visible")
            .and("have.attr", "href", "/contact");
        }
      );
    });
  });
});
