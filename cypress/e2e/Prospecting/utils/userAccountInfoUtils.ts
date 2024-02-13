import '../support/commandsProspecting'

export const UserAccountInfo = {
  visit() {
    cy.get('[data-testid="profile-icon"]').click();
    cy.get('[id="ta-account-info"] [href="/account"]').click();
  },

  // Select menu tab within "Your Account"
  menuSelectModule(menuTab) {
    cy.get(`a[href="/account/${menuTab}/"]`).click();
  },

  /**
   * Remove saved query
   * @param queryName: string -> query name
   */
  moduleGetSavedQuery(queryName) {
    cy.get("h3").contains("Group Actions");
    cy.get('[data-testid="collapsible"]')
      .next()
      .within(($query) => {
        // Validate if <queryName> exist
        cy.wrap($query).findByText(queryName).parent().as("searchedQuery");
      });
    return cy.get("@searchedQuery");
  },

  /**
   * Removes query
   * @param queryToRemove Cypress.Chainable: reference to a query
   */
  moduleRemoveSavedQuery(queryToRemoveRef) {
    queryToRemoveRef.find('[alt="delete"]').click();
    // validate modal that shows info about: Query Removal Result
    cy.get('[aria-modal="true"]').find("button").contains("Delete").click();
    cy.get("[aria-modal='true']").within(($modal) => {
      cy.wrap($modal).find("h3").contains("Delete saved query?");
      cy.wrap($modal).find("p").contains("Query was successfully deleted.");

      cy.wrap($modal).find("button").contains("Cancel");
      cy.wrap($modal).find("button").contains("Ok").click();
    });
  },
};
