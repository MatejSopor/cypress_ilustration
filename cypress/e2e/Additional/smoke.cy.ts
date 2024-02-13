const langs: string[] = Cypress.env("lang_array");
const additionalData = Cypress.env("moduleAdditional");

describe("Additional - Smoke tests ", () => {
  it(
    "Test navigation icons",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      cy.checkIfOnDashboard();
      var navigateTo = (path) => {
        cy.pageIsLoaded();
        cy.get(`button[data-pf-id='${path}']`).click();
        cy.pageIsLoaded();
      };

      additionalData.navigationPaths.forEach((path) => navigateTo(path));
    }
  );

  it("Language change", { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] }, () => {
    cy.visit("/");
    cy.pageIsLoaded();
    cy.setLanguage(langs[0]);
    cy.setLanguage("EN");
    cy.get("span")
      .contains("Use the boxes to see all your data at a glance!")
      .should("be.visible");
  });

  it("Appointments", { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] }, () => {
    cy.visit("/");
    cy.pageIsLoaded();
    cy.get('[aria-label="appointment menu"]').click();
    cy.get('[aria-label="Create new appointment"]').click();
    cy.pageIsLoaded();
    cy.get("h1").should("have.text", "Create appointment");
    cy.visit("/");
    cy.get('[aria-label="appointment menu"]').click();
    cy.get('[aria-label="Manage appointment"]').click();
    cy.pageIsLoaded();
    cy.get("h1").should("have.text", "Your account");
  });

  it("Logout", { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] }, () => {
    cy.visit("/");
    cy.pageIsLoaded();
    cy.logOutUser();
  });
});
