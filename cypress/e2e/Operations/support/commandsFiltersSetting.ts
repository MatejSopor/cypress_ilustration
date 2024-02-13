Cypress.Commands.add("setGeoFilter", () => {
    cy.findByText("Select Group").prev().click();
    cy.findByText("Company Filters").click();
    cy.findByText("Select Filter").prev().click().type("Geographic area");
    cy.findByText("Geographic area").click();
    cy.findByText("Select").prev().click();
    cy.findByText("Is one Of").click();
    cy.get("[aria-label='open filter selection']").click();
    cy.clickOnArrowIcon(Cypress.env("moduleOperations")["geolocation"]);
    cy.contains(Cypress.env("moduleOperations")["geolocation_town"]).click();
});

Cypress.Commands.add("setCheckBoxFilter", () => {
    cy.findByText("Select Group").prev().click();
    cy.findByText("Company Filters").click();
    cy.findByText("Select Filter").prev().type(Cypress.env("moduleOperations")["email"]);
    cy.findByText(Cypress.env("moduleOperations")["email"]).click();
    cy.get('input[value="False"]').should('be.checked');
    cy.contains("True").click();
});

Cypress.Commands.add("setMinMaxFilterBegin", () => {
    cy.findByText("Select Group").prev().click();
    cy.findByText("Company Filters").click();
    cy.findByText("Select Filter").prev().type(Cypress.env("moduleOperations")["min_max"]);
    cy.findByText(Cypress.env("moduleOperations")["min_max"]).click();
});

Cypress.Commands.add("setMinMaxFilterEnd", () => {
    cy.findByText("Select").prev().click();
    cy.findByText("Between").click();
    cy.get('input[placeholder="Min value"]').type("216");
    cy.get('input[placeholder="Max value"]').type("500");
});

Cypress.Commands.add("setDateFilterBegin", () => {
    cy.findByText("Select Group").prev().click();
    cy.findByText("Company Filters").click();
    cy.findByText("Select Filter").prev().type(Cypress.env("moduleOperations")["date"]);
    cy.findByText(Cypress.env("moduleOperations")["date"]).click();
});

Cypress.Commands.add("setDateFilterEnd", () => {
    cy.findByText("Select").prev().click();
    cy.findByText("Between").click();
    cy.get("input[placeholder='From']").click().type("1/5/2021{enter}");
    cy.get("input[placeholder='To']").click().type("3/22/2021{enter}");
});

Cypress.Commands.add("setTwoFilters", () => {
    cy.findByText("Select Group").prev().click();
    cy.findByText("Company Filters").click();
    cy.findByText("Select Filter").prev().type(Cypress.env("moduleOperations")["doubleFilter1"]["row1_type"]);
    cy.findByText(Cypress.env("moduleOperations")["doubleFilter1"]["row1_type"]).click();
    cy.findByText("Select").prev().click();
    cy.findByText("Is one Of").click();
    cy.get("[aria-label='open filter selection']").click();
    cy.contains(Cypress.env("moduleOperations")["doubleFilter1"]["row1_class"]).click();
    cy.contains("Add rule").click();
    cy.findByText("Select Group").prev().click();
    cy.findAllByText("Company Filters").eq(2).click();
    cy.findByText("Select Filter").prev().type(Cypress.env("moduleOperations")["doubleFilter1"]["row2_type"]);
    cy.findByText(Cypress.env("moduleOperations")["doubleFilter1"]["row2_type"]).click();;
    cy.contains(Cypress.env("moduleOperations")["doubleFilter1"]["row2_bool"]).click();
});

Cypress.Commands.add("setTwoFilters2", () => {
    cy.findByText("Select Group").prev().click();
    cy.findByText("Company Filters").click();
    cy.findByText("Select Filter").prev().type(Cypress.env("moduleOperations")["doubleFilter2"]["row1_type"]);
    cy.findByText(Cypress.env("moduleOperations")["doubleFilter2"]["row1_type"]).click();
    cy.contains(Cypress.env("moduleOperations")["doubleFilter2"]["row1_bool"]).click();
    cy.contains("Add rule").click();
    cy.findByText("Select Group").prev().click();
    cy.findAllByText(Cypress.env("moduleOperations")["doubleFilter2"]["row2_type"]).eq(1).click();
    cy.findByText("Select Filter").prev().type(Cypress.env("moduleOperations")["doubleFilter2"]["row2_class"]);
    cy.findByText(Cypress.env("moduleOperations")["doubleFilter2"]["row2_class"]).click();
    cy.findByText("Select").prev().click();
    cy.findByText("Is one Of").click()
    cy.get('[aria-label="open filter selection"]').click();
    cy.findByText(Cypress.env("moduleOperations")["doubleFilter2"]["row2_value"]).click();
});

Cypress.Commands.add("setValueFilter", () => {
    cy.findByText("Select Group").prev().click();
    cy.findByText("Company Filters").click();
    cy.findByText("Select Filter").prev().type(Cypress.env("moduleOperations")["valueFilter"]["type"]);
    cy.findByText(Cypress.env("moduleOperations")["valueFilter"]["type"]).click();
    cy.findByText("Select").prev().click();
    cy.findByText(Cypress.env("moduleOperations")["valueFilter"]["comparsion"]).click()
    cy.get('[name="root.rule-1.numericFilter.numericField"]').type(Cypress.env("moduleOperations")["valueFilter"]["value"]);;
});