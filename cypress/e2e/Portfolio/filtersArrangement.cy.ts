import "./Support/commandsPortfolio";
describe("Portfolio - Filters arrangement", () => {
  it(
    "42 List, map and semantic search guide check",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      const url: string =
        Cypress.env("modulePortfolio")["links"]["test_var_cus"];
      const address: string =
        Cypress.env("modulePortfolio")["filters_arrangement_address"];
      cy.visit(url);

      cy.get("div[class*='PortfolioListView']");
      cy.get("[data-icon='environment']").click();
      cy.get("div[class*='PortfolioMapView']");
      cy.get("[aria-label='Zoom in']").click();

      cy.get("[data-pf-id='standardFilters']").within(() => {
        cy.findByText("Select filter").parent().parent().click();
      });
      cy.get("div[data-pf-id='selection-filters']").within(() => {
        cy.get("input[type='search']").type("Map search{enter}");
        cy.findByText("Map search").prev().click();
        cy.findByText("Save filters & close").click();
      });
      cy.get("[data-pf-id='standardFilters']").within(() => {
        cy.get("input[class*='search-input']").click().type(address);
      });
      cy.findByText(address, {
        timeout: 15000,
      }).click();
      cy.get("[data-pf-id='standardFilters']").within(() => {
        cy.get("div[class='ant-slider-rail']").trigger("mousedown");
        cy.get("div[class='ant-slider-rail']").trigger("mouseup", {
          force: true,
        });
      });
      cy.findByText("Confirm")
        .click()
        .then(() => {
          cy.checkMarkerCount();
        });
      cy.get("span[aria-label='unordered-list']").click();

      cy.get("button[class*='LanguageSwitch']")
        .children()
        .children()
        .then(($span) => {
          cy.findAllByText("Advanced").first().parent().parent().next().click();
          const txt = $span.text();
          if (txt === "EN") {
            cy.verifyDownload("Documentation_en-GB.pdf", { softMatch: true });
          } else if (txt === "IT") {
            cy.verifyDownload("Documentation_it-IT.pdf", { softMatch: true });
          }
        });
    }
  );

  it(
    "45 Advance Semantic search",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      const url: string =
        Cypress.env("modulePortfolio")["links"]["enrich_test"];
      cy.visit(url);
      cy.findAllByText("Advanced").first().parent().click();

      cy.pageIsLoaded();
      cy.get("[data-testid='AllCompanies']")
        .find("h4")
        .invoke("text")
        .then(parseInt)
        .then((num) => {
          cy.get("input[placeholder^='Find companies by keyword']").type(
            "a{Enter}"
          );
          cy.pageIsLoaded();
          cy.get("[data-testid='AllCompanies']")
            .find("h4")
            .invoke("text")
            .then(parseInt)
            .should("be.below", num);
        });

      cy.pageIsLoaded();
      cy.get("[data-testid='AllCompanies']")
        .find("h4")
        .invoke("text")
        .then(parseInt)
        .then((num) => {
          cy.findByText("All").click();
          cy.findByText("Web & Social").click();
          cy.pageIsLoaded();
          cy.get("[data-testid='AllCompanies']")
            .find("h4")
            .invoke("text")
            .then(parseInt)
            .should("be.below", num);
        });

      cy.pageIsLoaded();
      cy.wait(500);
      cy.get("[data-testid='AllCompanies']")
        .find("h4")
        .invoke("text")
        .then(parseInt)
        .then((num) => {
          cy.get("input[value='a']").next().children().children().click();
          cy.pageIsLoaded();
          cy.get("[data-testid='AllCompanies']")
            .find("h4")
            .invoke("text")
            .then(parseInt)
            .should("be.above", num);
        });
    }
  );

  it("48 Semantic cluster and Exclude filters", { tags: "@ITA" }, () => {
    //  check default filters settings
    const url: string = Cypress.env("modulePortfolio")["links"]["enrich_test"];
    cy.visit(url);
    cy.get("#Tree-semanticClusters").within(() => {
      cy.get("span[class^='ant-tag']");
    });

    const filters = [
      "standardFilters",
      "userFilters",
      "analyticsFilters",
      "retailIndexes",
    ];
    filters.forEach((string) => {
      cy.get("[data-pf-id='" + string + "']").within(() => {
        cy.findByText("Select filter");
      });
    });

    // check order of filters
    var filtersOrder = [
      "Company Filters",
      "Custom Indexes",
      "User Filters",
      "Analytics Filters",
      "Retails Filters",
    ];
    cy.get('div[data-pf-id="standardFilters"]')
      .parent()
      .within(($filter) => {
        cy.wrap($filter).as("elements");
        for (let i = 0; i < 5; i++) {
          cy.get("@elements").children().eq(i).findByText(filtersOrder[i]);
        }
      });

    let columns = [
      "Tax code / Vat code",
      "Name",
      "Status in portfolio",
      "Amount",
      "Primary Ateco (2007)",
      "Enriched",
    ];
    cy.get("thead.ant-table-thead")
      .find("tr")
      .within(() => {
        columns.forEach((column) => {
          cy.findByText(column);
        });
      });
    cy.get("button[aria-label='menu-button']").eq(2).should("be.enabled");

    // check Exclude filters
    cy.findByText("Exclude portfolio").click();
    cy.get('div[id="Tree-portfolioIds:sql-domain:portfolioIds"]').click();
    cy.get('input[class="ant-checkbox-input"]').eq(1).click();
    cy.get('div[data-pf-id="save-button"]').click();
    cy.getNumOfCompanies("AllCompanies", "companies");
    cy.get("@companies")
      .then(Number)
      .then((num) => {
        cy.checkGridResult(num);
      });
    cy.get("span[aria-label='close']").first().click();

    cy.findByText("Exclude campaign").click();
    cy.get('div[id="Tree-campaignIds:sql-domain:campaignIds"]').click();
    cy.get('input[class="ant-checkbox-input"]').eq(0).click();
    cy.get('div[data-pf-id="save-button"]').click();
    cy.getNumOfCompanies("AllCompanies", "companies");
    cy.get("@companies")
      .then(Number)
      .then((num) => {
        cy.checkGridResult(num);
      });
    cy.get("span[aria-label='close']").first().click();

    cy.findByText("Exclude enriched companies").click();
    cy.get('div[data-pf-id="exclusions-box"]').within(() => {
      cy.get('button[type="button"]').click();
    });
    cy.getNumOfCompanies("AllCompanies", "companies");
    cy.get("@companies")
      .then(Number)
      .then((num) => {
        cy.checkGridResult(num);
      });
    cy.get('div[data-pf-id="exclusions-box"]').within(() => {
      cy.get('button[type="button"]').click();
    });
  });

  it("62 Var custom", { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] }, () => {
    const url: string = Cypress.env("modulePortfolio")["links"]["test_var_cus"];
    cy.visit(url);
    cy.get("[data-pf-id='userFilters']").within(() => {
      cy.findByText("Select filter").click();
    });
    cy.findByText("year").prev().click();
    cy.findByText("Save filters & close").click();
    cy.get("[data-pf-id='userFilters']").within(() => {
      cy.get("input").first().clear().type("2010{enter}");
    });
    cy.getNumOfCompanies("AllCompanies", "companies");
    cy.get("@companies")
      .then(Number)
      .then((num3) => {
        cy.checkGridResult(num3);
      });
  });
});
