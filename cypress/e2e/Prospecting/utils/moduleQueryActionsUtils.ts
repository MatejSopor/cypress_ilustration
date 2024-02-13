
export const ModuleQueryActions = {
  /**
   * Select <Save Query> option from menu and verify
   * @returns reference to a dialog with Save Query
   */
  actionSaveQuery() {
    cy.get('button[data-pf-id="Action-saveQuery"]').click();
    cy.get('[role="dialog"][aria-modal="true"]').within(($saveQueryModal) => {
      cy.wrap($saveQueryModal).as("saveQueryModal");
      // verify Modal Info
      cy.wrap($saveQueryModal).contains("h3", "Save research");
      cy.wrap($saveQueryModal).contains(
        "Insert the name you want to use to save your research or select an existing query to override it."
      );
      cy.wrap($saveQueryModal).contains("label", "Update existing");
      cy.wrap($saveQueryModal).contains("label", "Create New");
    });
    // TODO: verify other Modal Info
    return cy.get("@saveQueryModal");
  },
  // TODO:
  actionDownloadExcel() {},
};
