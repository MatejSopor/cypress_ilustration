import "../support/commandsProspecting";

export const ProspectingPage = {
  visit() {
    cy.visit("/");
    cy.headerMenuNavigateTo("prospecting");
  },
};
