Cypress.Commands.add("visitOperationsAndAddRule", () => {
    cy.visit('/operations');
    cy.get('button').contains("Add rule").click();
});

Cypress.Commands.add("checkMarkerCount", () => {
    cy.get("[data-icon='environment']").click();
    for(var i = 0; i < 6; i++){
        cy.get("[aria-label='Zoom out']").click();
    }
    cy.pageIsLoaded();
    cy.get("[class^='leaflet-marker-icon'][role='button']").children().then(($marker) => {
        cy.findByText("Companies in the list").prev().should('have.text', $marker.text());
    });
});

Cypress.Commands.add("switchAndToOr", () => {
    cy.findByTitle("And").click();
    cy.findAllByText("Or").eq(1).click();
});

Cypress.Commands.add("checkLoadedFilter", () => {
    cy.get("div[class^='components__RuleBox']").within(() => {
        cy.findByText("Company Filters");
        cy.findByText(Cypress.env("moduleOperations")["valueFilter"]["type"]);
        cy.findByText(Cypress.env("moduleOperations")["valueFilter"]["comparsion"]);
        cy.get("input[value='200']");
    });
});

Cypress.Commands.add("countFilterResults", () => {
    cy.intercept('POST', '/api/companies/companies-by-query').as("Search");
    cy.get("button[type='button']").contains("Search").should("be.visible").click(); 
    cy.wait(`@Search`).then(() => {
        cy.pageIsLoaded();
        cy.findByText("Companies in the list").prev().invoke('text').should("not.eql","-").then(text => text.replace(",", "")).then(parseInt).then(number => {
            if(number < 50){
                let loadMore = Math.floor(number / 10); 
                Cypress._.times(loadMore, () => { cy.contains("button[type='button']", "Load more").click({ timeout: 10000 }) });
                cy.get("tbody.ant-table-tbody").find("tr").should("have.length", number); 
            }
        });
    });
});

Cypress.Commands.add("groupAction", (name) => {
    cy.get('button[class^="ant-switch"]').first().click();
    cy.get('tr').eq(1).within(() => {
        cy.get('td').first().get('input').click();
    });
    cy.contains("Select").click();
    cy.get('ul').within(() => {
        cy.contains(name).click();
    });
});

Cypress.Commands.add("createNewGroupAndResetFilter", () => {
    cy.contains("Add group").click();
    cy.get('[class^="components__CompoundExpressionBox"]').last().within(() => {
        cy.contains("Add rule").click();
    });
    cy.findByText("Select Group").prev().click();
    cy.findAllByText("Company Filters").eq(2).click();
    cy.findByText("Select Filter").prev().type(Cypress.env("moduleOperations")["email"]);
    cy.findByText(Cypress.env("moduleOperations")["email"]).click();;
    cy.contains("True").click();
});

