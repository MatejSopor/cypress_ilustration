import { formatCompaniesAmount } from "../helpers";

Cypress.Commands.add("headerMenuNavigateTo", (location) => {
  location = `/${location}`;
  cy.get(`button[data-pf-id='${location}']`, { timeout: 20_000 }).click();
});

Cypress.Commands.add("prospectingCompaniesAmount", () => {
  return cy
    .get("[data-pf-id='funnel']")
    .contains(/Compan(y|ies) in the list/)
    .prev()
    .contains(/[0-9]+/, { timeout: 10_000 })
    .invoke("text")
    .then(formatCompaniesAmount)
    .as("companiesAmount")
    .should("be.finite");
});

Cypress.Commands.add("getFilterResultAmount", (filterName) => {
  cy.contains('[data-pf-id="selection-filters"] span', filterName).then(
    ($span) => {
      let filteredCompaniesAmount = Number(
        $span
          .text()
          .match(/\((,|\d)+\)/g)[0]
          .replace(/\(|\)/g, "")
      );

      cy.wrap(filteredCompaniesAmount).as("filteredCompaniesAmount");
    }
  );
  return cy.get("@filteredCompaniesAmount");
});

Cypress.Commands.add("removeFilter", (path, filterName) => {
  cy.applyFilter(path, filterName);
});

Cypress.Commands.add("validateFunnelTooltips", (expectedCompanyFilters) => {
  cy.get('[data-pf-id="funnel"] svg[preserveAspectRatio="none"]')
    .first()
    .next()
    .children()
    .as("funnelTooltips");

  cy.get("@funnelTooltips").should(
    "have.length",
    expectedCompanyFilters.length
  );

  cy.get("@funnelTooltips").each(($funnelItem, funnelItemIndex) => {
    const expectedFilter = expectedCompanyFilters[funnelItemIndex];

    cy.wrap($funnelItem).trigger("mouseover");
    cy.get('[role="tooltip"]').should("contain.text", expectedFilter);
    cy.wrap($funnelItem).trigger("mouseout");
  });
});
