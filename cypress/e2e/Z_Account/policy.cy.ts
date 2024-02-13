describe("Account - Cookies and Privacy Policy Link Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.pageIsLoaded();
  });

  it(
    "Opens and checks the links inside Cookies and Privacy policy for Logged-In User",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      cy.setLanguage("EN");

      cy.handleFooterElement("Privacy policy", true);
      cy.get("h1").should("have.text", " policy");

      cy.handleFooterElement("Cookies policy", true);
      cy.get("h1").should(
        "have.text",
        Cypress.env("moduleAccount")["cookies_policy_h1"]
      );
    }
  );

  it(
    "Opens and checks the links inside Cookies and Privacy policy for Logged-Out User",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"], env: { autoLogin: false } },
    () => {
      cy.setLanguage("EN");
      cy.handleFooterElement("Privacy policy", false);
      cy.handleFooterElement("Cookies policy", true);
      cy.get("h1").should(
        "have.text",
        Cypress.env("moduleAccount")["cookies_policy_h1"]
      );
    }
  );
});
