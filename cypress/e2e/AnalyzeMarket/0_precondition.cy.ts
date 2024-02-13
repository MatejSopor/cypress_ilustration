import "./support/commandsAnalyzeMarket";
const preconditionData = Cypress.env("moduleTargeting")["filters"];

describe("Analyze Market - Precondition", () => {
  it("Precondition", { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] }, () => {
    /**
     * @description Opens Targeting module & performs few basic checks
     */
    cy.visit("/");
    cy.get("button[data-pf-id='/targeting']").click();
    cy.pageIsLoaded();
    cy.findAllCompaniesLabel(); // check if the Based on is set to "All italian companies"

    cy.findAllByText(
      "The numbers shown are related to the administrative headquarter"
    )
      .siblings()
      .children()
      .first()
      .contains("Compan")
      .should("be.visible"); //universal waiter
    cy.checkIfFiltersAreApplied(preconditionData.applied_precondition_filters);

    if (
      Cypress.env("configCountry").toUpperCase() !== "GER" &&
      Cypress.env("configCountry").toUpperCase() !== "CHE"
    ) {
      cy.get(`div[id='${preconditionData.stateOwnedComp_id_getter}']`).within(
        () => {
          //check if stateOwnedCompany switch is OFF
          cy.get("button[role='switch']", { timeout: 5000 }).should(
            "have.attr",
            "aria-checked",
            "false"
          );
        }
      ); //check if the switch value is set to "false"
    }

    if (Cypress.env("configCountry") === "ITA") {
      cy.get("div[id='Tree-semanticClusters']").within(() => {
        //check if semantic cluster multiselection switch is ON
        cy.get("button[role='switch']", { timeout: 5000 }).should(
          "have.attr",
          "aria-checked",
          "true"
        );
      });
    }
  });
});
