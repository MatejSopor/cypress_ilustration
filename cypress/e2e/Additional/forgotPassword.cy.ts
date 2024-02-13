/// <reference types="Cypress" />
describe("Additional - Forgot Pasword", { env: { autoLogin: false } }, () => {
  beforeEach(() => {
    window.localStorage.setItem("uc_user_interaction", "true");
    window.localStorage.setItem("uc_ui_version", "3.22.0");
    window.localStorage.setItem(
      "uc_settings",
      JSON.stringify(Cypress.env("uc_settings"))
    );
    cy.visit("/");
    // changes language to EN
    cy.setLanguage("EN");
    cy.get("form")
      .contains("Sign in to Margò")
      .should("exist")
      .and("be.visible");
    cy.get("form")
      .contains("Enter your details below")
      .should("exist")
      .and("be.visible");

    // visits Forgot Password page
    cy.get("form")
      .contains("Forgot your password?")
      .should("be.visible")
      .click()
      .then(() => {
        cy.get("a").contains("Back to login").should("have.attr", "href", "#");
      });
  });

  // contains instructions on how to reset password
  it(
    "contains instructions on how to reset password",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      cy.get("form")
        .contains(
          "Insert your Username and the email address associated to your account. An email will be sent to you with the link to complete the reset password"
        )
        .should("be.visible");
    }
  );

  // requires username and email
  it("requires username", { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] }, () => {
    cy.get("#ta-resetPassword").should("be.disabled");
  });

  // requires valid username and email
  it(
    "requires valid email",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      cy.get("#ta-userCode").click().type("johndoe");
      cy.get("#ta-email").click().type("invalidemail@john.com");
      cy.get("#ta-resetPassword").should("be.enabled").click();
      cy.get("form")
        .contains(
          "The password has not been reset. Username/email invalid. Please, retry or contact the customer service."
        )
        .should("have.class", "ant-form-item-explain-error")
        .and("be.visible")
        .and("have.css", "color", "rgb(255, 77, 79)");
    }
  );
});
