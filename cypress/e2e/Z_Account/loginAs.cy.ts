describe("Account - Login-As Test", () => {
  it(
    "Checks Account info section and Login-As",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      cy.visit("/account");
      cy.pageIsLoaded();
      cy.logAsUser(Cypress.env("user_code_as_sale"));
    }
  );
});
