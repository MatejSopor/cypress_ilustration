import "./Support/commandsMemo";

describe("Appointment from header", () => {
  it.skip("Create appointment", { tags: ["@ITA", "@GER", "@CHE"] }, () => {
    cy.pageIsLoaded();
    cy.checkIfOnDashboard();
    cy.createNewAppointment();
    cy.fillOutAppointmentForm();
    cy.selectRecipients();
    cy.confirmOperation();
    cy.get("h1").should("have.text", "Your Dashboard"); // see if we are in dashboard page
  });

  it.skip("Manage appointment", { tags: ["@ITA", "@GER", "@CHE"] }, () => {
    cy.visit("/account/appointments");
    cy.pageIsLoaded();
    cy.get("h1").should("have.text", "Your account"); // see if we are in the My account page
    cy.checkIfAppointmentWasCreated();
    cy.visualizeTheAppointment();
    cy.get("h1").should("have.text", "Your account"); // see if we are in the My account page
    cy.deleteTheAppointment();
  });

  it("Appointment from Portfolio", { tags: ["@ITA", "@GER", "@CHE"] }, () => {
    const enrichedPortfolio: string =
      Cypress.env("modulePortfolio")["links"]["enrich_test"];
    const companyName: string =
      Cypress.env("moduleMemo")["appointmentCompanyName"];
    cy.visit(enrichedPortfolio);
    cy.pageIsLoaded();
    //open company appointment creation wizzard from table
    cy.get('tbody[class="ant-table-tbody"]')
      .find("tr")
      .contains(companyName)
      .closest("tr")
      .find("button[data-testid='portfolio-appointment-menu']")
      .click({ force: true })
      .then(() => {
        cy.get("span").contains("Create new appointment").click();
      });
    cy.fillOutAppointmentFormForPortfolio();
    cy.selectRecipients();
    //after creation we are back in the same portfolio
    cy.confirmOperation();
    //open company manage appointment wizzard from table
    cy.get('tbody[class="ant-table-tbody"]')
      .find("tr")
      .contains(companyName)
      .closest("tr")
      .find("button[data-testid='portfolio-appointment-menu']")
      .click({ force: true })
      .then(() => {
        cy.get("span").contains("Manage appointment").click();
      });
    cy.get("[data-testid='report-title']").contains(companyName); // see if we are in the company report page
    cy.checkIfAppointmentWasCreated();
    cy.editAppointment();
    cy.get("[data-testid='report-title']").contains(companyName);
    cy.deleteTheAppointment();
  });
});
