Cypress.Commands.add("getFilterInput", () => {
  cy.get("input[role='spinbutton']").as("filterInput");
  return cy.get("@filterInput");
});

Cypress.Commands.add("downloadSemanticSearchGuide", () => {
  cy.get("div[class^='styled__StackGroup-']").children().last().click();
});

Cypress.Commands.add("clickAdvancedSemanticSearch", () => {
  cy.get("div[class^='styled__StackGroup-']").children().first().click();
});

Cypress.Commands.add("getSemanticSearchSearchbar", () => {
  cy.get(
    "input[placeholder='Find companies by keyword about business activity or product (e.g. solar panels)']"
  );
});

Cypress.Commands.add("clickOnSaveQueryButton", () => {
  cy.get("button").contains("Save Query").should("be.visible").click();
  cy.findByText("Save research").should("be.visible");
  cy.get("div[class^='ant-modal-content']").within(() => {
    cy.get("button[type='button']")
      .should("have.attr", "aria-label", "Close")
      .should("be.visible");
  });
  cy.get("div[class^='ant-modal-body']").within(() => {
    cy.findByText("Update existing").should("be.visible");
    cy.findByText("Create New").should("be.visible");
    cy.findByText("Create New")
      .parent()
      .prev()
      .children("input")
      .should("be.checked");
    cy.findByText("Query name").should("be.visible");
  });
});

Cypress.Commands.add("saveNewQuery", (queryName) => {
  cy.get("input[type='text']").type(queryName);
  cy.get("div[class^='ant-modal-footer']").within(() => {
    cy.get("button[type='button']").last().should("be.enabled").click();
  });
  cy.pageIsLoaded();
  cy.findByText(
    "You will find the query saved in the repository related to the reference area."
  ).should("be.visible");
  cy.get("div[class^='ant-modal-footer']").within(() => {
    cy.get("button[type='button']").should("be.enabled").click();
  });
});

Cypress.Commands.add("openModuleInMyAccount", (moduleName) => {
  cy.get("div[data-testid='profile-icon']").click();
  cy.get("div[id='ta-account-info']").click();
  cy.get("div[class='ant-card-body']")
    .last()
    .within(() => {
      cy.findByText(moduleName).click();
    });
});

Cypress.Commands.add("clickOnResumeQuery", (queryName) => {
  cy.contains("td", queryName).parent().find("td:nth-last-child(1)").click();
});

Cypress.Commands.add("loadExistingQuery", (queryName) => {
  cy.get("button").contains("Load Query").click();
  cy.pageIsLoaded();
  cy.get("div[class^='ant-modal-body']").within(() => {
    cy.get("input[role='combobox']")
      .should("be.visible")
      .click()
      .type(queryName)
      .press("enter");
  });
  cy.get("div[class^='ant-modal-footer']").within(() => {
    cy.get("button[type='button']").last().should("be.enabled").click();
  });
  cy.get("div[data-pf-id='exclusions-box']").within(() => {
    cy.findByText(queryName).should("exist");
  });
});

Cypress.Commands.add("clickOnDownloadPdfExcelButton", () => {
  cy.pageIsLoaded();
  cy.get("button[data-pf-id='button-2']").as("button").click();
  cy.pageIsLoaded();
  cy.findByText("Select format").should("be.visible");
  cy.get("div[class='nav-buttons']").within(() => {
    cy.get("button[data-testid='wizard-prevbtn']").should("be.enabled");
    cy.get("button[data-testid='wizard-nextbtn']").should("be.disabled");
  });
});

Cypress.Commands.add("downloadPdf", (comparisonAlias) => {
  cy.get("span[class*='ant-radio']").first().click();
  cy.get("button[data-testid='wizard-nextbtn']").should("be.enabled").click();
  cy.findByText("Download your analysis").should("be.visible");
  cy.get("span[aria-label='statistics count']")
    .should("be.visible")
    .invoke("text")
    .then((value) => {
      cy.get(comparisonAlias).should("eq", Number(value));
    });
  cy.get("button[data-testid='wizard-nextbtn']").should("be.enabled").click();
  cy.findByText("Download PDF");
});

Cypress.Commands.add("downloadExcel", (comparisonAlias) => {
  cy.get("span[class*='ant-radio']").last().click({ force: true });
  cy.get("button[data-testid='wizard-nextbtn']").should("be.enabled").click();
  cy.findByText("Download your analysis").should("be.visible");
  cy.get("span[aria-label='statistics count']")
    .should("be.visible")
    .invoke("text")
    .then((value) => {
      cy.get(comparisonAlias).should("eq", Number(value));
    });
  cy.get("button[data-testid='wizard-nextbtn']").should("be.enabled").click();
});

Cypress.Commands.add(
  "clickOnMenuButton",
  (name, headlineElement, headlineText) => {
    cy.get("div[class*='ButtonsRow']").within(() => {
      cy.findByText(name).should("be.visible").click();
    });
    cy.pageIsLoaded();
    cy.get(headlineElement).contains(headlineText);
  }
);

Cypress.Commands.add("loadPortfolio", (portfolioName, status) => {
  cy.pageIsLoaded;
  cy.get("div[class='ant-select-selection-overflow']").as("dropdownbar");
  cy.get("span[class='ant-select-arrow']").should("exist");
  cy.get("@dropdownbar")
    .click({ force: true })
    .type("{selectall}{backspace}" + portfolioName + "{enter}");
  cy.findByText("Select a portfolio").click();
  cy.get("button[data-testid='wizard-nextbtn']").click();

  cy.get("h2").contains("Choose the status you want to analyze");
  cy.get("input[type='search']").last().click();
  cy.get("div[class*='ant-select-dropdown']").within(() => {
    cy.get(`div[title=${status}]`).click();
  });
  cy.get("button[data-testid='wizard-nextbtn']").click();
  cy.get("div[data-pf-id='exclusions-box']").within(() => {
    cy.findByText(portfolioName);
  });
});

Cypress.Commands.add(
  "excludePortfolio",
  (portfolioName, portfolioSearchPath) => {
    cy.get("div[data-pf-id='exclusions-box']").within(() => {
      cy.findByText("Exclude portfolio").click();
      cy.get("div[role='button']").click();
    });
    cy.applyFilter(portfolioSearchPath, portfolioName);
  }
);

Cypress.Commands.add(
  "excludeCampaign",
  (portfolioName, portfolioSearchPath) => {
    cy.get("div[data-pf-id='exclusions-box']").within(() => {
      cy.findByText("Exclude campaign").click();
      cy.get("div[id='Tree-campaignIds:sql-domain:campaignIds']")
        .find("div[role='button']")
        .click();
    });
    cy.applyFilter(portfolioSearchPath, portfolioName);
  }
);

Cypress.Commands.add("clickOnResetAllFiltersButton", () => {
  cy.get("span[class*=FilterController]").last().click();
});

Cypress.Commands.add("saveList", (buttonId, portfolioName, comparisonAlias) => {
  cy.get(`button[data-pf-id='${buttonId}']`)
    .as("button")
    .should("be.visible")
    .click();
  cy.pageIsLoaded();
  cy.get("h1").contains("Save list");
  cy.get("input[type='search']").should("be.enabled");
  cy.get("div[data-pf-id='create-new']").within(() => {
    cy.findByText("Create new").click();
  });
  cy.get("input[type='search']").should("be.disabled");

  cy.get("button[data-testid='wizard-prevbtn']").should("be.enabled");
  cy.get("button[data-testid='wizard-nextbtn']").should("be.enabled").click();
  cy.pageIsLoaded();
  cy.get("h1").contains("Save list");
  cy.get("h2").contains("Choose the name of the companies list");
  cy.get("button[data-testid='wizard-prevbtn']").should("be.enabled");
  cy.get("button[data-testid='wizard-nextbtn']").should("be.disabled");
  cy.get("input[aria-label='Portfolio name']").type(portfolioName);
  cy.get("button[data-testid='wizard-nextbtn']").should("be.enabled").click();

  cy.pageIsLoaded();
  cy.get("h2").contains("Create tag");
  cy.get("input[aria-label='Tag']").click().type("71-SaveList");
  cy.get("button[data-testid='wizard-nextbtn']").should("be.enabled").click();

  cy.pageIsLoaded();
  cy.get("h2").contains("Enrichment");
  cy.get("span[aria-label='statistics count']")
    .first()
    .should("be.visible")
    .invoke("text")
    .then((value) => {
      cy.get(comparisonAlias).should("eq", Number(value));
    });
  cy.get("button[data-testid='wizard-nextbtn']").should("be.enabled").click();
  cy.pageIsLoaded();
  cy.get("div[type='ghost']", { timeout: 15000 }).should("be.visible");
});

Cypress.Commands.add("sendQueryToProspecting", () => {
  cy.get("button[data-pf-id='send-to-prospect']").should("be.enabled").click();
  cy.pageIsLoaded();
  cy.get("h1").contains("Prospecting");
});

Cypress.Commands.add("getNumOfCompsProspecting", () => {
  cy.get("div[class*='ResultCounter']")
    .children()
    .first()
    .invoke("text")
    .then((value) => {
      let totalNumberOfCompanies = parseInt(value.replace(/\D/g, ""));
      cy.wrap(totalNumberOfCompanies).as("numOfCompanies");
    });
  return cy.get("@numOfCompanies");
});

Cypress.Commands.add("openGraphDetails", (name) => {
  cy.get("h3").contains(name).next().children().last().click();
  cy.get("h1").contains(name);
  cy.get("div[class*='Chart']").should("be.visible");
  cy.get("div[class*='Table']").should("be.visible");
  cy.get("span[class*='ChartCloseButton']").should("be.visible");
});

Cypress.Commands.add("sendToOtherModules", (module) => {
  cy.get(`button[type='button']`)
    .contains("Send to Other Modules")
    .as("actionButton");
  cy.get("@actionButton").click();

  cy.get("div[class=ant-modal-header]").within(() => {
    cy.get("h3").contains("Select module");
  });
  cy.get("div[class*=SendToOtherModulesDialog]").within(() => {
    cy.findAllByText(module).first().click();
  });
  cy.get("div[class='buttons']").children().last().should("be.enabled").click();
});

Cypress.Commands.add(
  "verifyPortfolioInAnalyzeMarketModule",
  (portfolioName, comparisonAlias) => {
    cy.get("div[data-pf-id='exclusions-box']").within(() => {
      cy.findByText(portfolioName).should("exist");
    });

    cy.returnNumOfCompanies().as("numOfCompsAfterJumpingOnAnalyzeMarket", {
      type: "static",
    });
    cy.get(comparisonAlias).then((numOfComps) => {
      cy.get("@numOfCompsAfterJumpingOnAnalyzeMarket").should(
        "be.lessThan",
        numOfComps
      );
    });
  }
);

Cypress.Commands.add("compareAMStatusCount", (number) => {
  cy.get("div[class*=CompanyPortfolioStatus]")
    .first()
    .within(() => {
      cy.get("span[class='ant-select-selection-item']").first().click();
    });
  cy.get("div[class='rc-virtual-list-holder-inner']")
    .children()
    .should("have.length.above", number);
});

Cypress.Commands.add("findFieldInPortfolioShowBy", (string) => {
  cy.get("div[class*=CompanyPortfolioStatus]")
    .first()
    .within(() => {
      cy.findByText("Show by").siblings().first().click();
    });
  cy.get("div[class*='rc-virtual-list-holder-inner']").within(() => {
    cy.findByText(string).click();
  });
});

Cypress.Commands.add("deleteQuery", (queryName) => {
  cy.contains("tr", queryName)
    .find("button[type='button']")
    .first()
    .parent()
    .siblings()
    .last()
    .click();
  cy.get("h3").contains("Delete saved query?");
  cy.get("div[class='buttons']").find("button[type='button']").last().click();
  cy.get("p").contains("Query was successfully deleted.");
  cy.findByText("Ok").click();
});

Cypress.Commands.add("excludeEnrichedCompanies", () => {
  cy.get("div[data-pf-id='exclusions-box']").within(() => {
    cy.findByText("Exclude enriched companies").should("be.visible").click();
  });
  cy.get("div[data-pf-id='exclusions-box']").within(() => {
    cy.get("button[role='switch']").click();
  });
});
