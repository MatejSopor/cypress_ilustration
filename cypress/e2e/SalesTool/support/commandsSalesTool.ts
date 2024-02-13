import { UserAccountInfo } from "../../Prospecting/utils/userAccountInfoUtils";

const requestLink =
  "/api/portfolio/select-list?withEnrichedCompanies=true&orderBy=UpdatedAtDesc&minCountOfCompanies=1";

Cypress.Commands.add("clickOnCreateCampaign", () => {
  cy.pageIsLoaded();
  cy.get("div[wrap='nowrap']").findAllByText("Create campaign").click();
  cy.pageIsLoaded();
});

Cypress.Commands.add("fillCampaignName", (name) => {
  cy.get("h1").should("have.text", "Create campaign");

  cy.get("h2").find("span").eq(0).should("have.text", "1");
  cy.get("h2")
    .find("span")
    .eq(2)
    .should("have.text", "Enter a representative name for the campaign");
  cy.get("[data-testid='wizard-nextbtn']").should("be.disabled");
  cy.get("[aria-label='Campaign Name']").click().type(name);
  cy.get("[data-testid='wizard-nextbtn']").should("be.enabled");
  cy.get("[data-testid='wizard-nextbtn']").click();
});

Cypress.Commands.add("selectTheStartAndEndDate", () => {
  cy.intercept("GET", requestLink).as("waitForequest");

  cy.get("h2").find("span").eq(0).should("have.text", "2");
  cy.get("h2")
    .find("span")
    .eq(2)
    .should("have.text", "Select the start date and the end date");
  cy.get(".ant-picker-input").eq(1).trigger("mousedown");

  cy.get("[aria-label='close-circle']").eq(1).click();

  cy.get("div[class^=ant-picker-dropdown]")

    .should("be.visible")
    .within(() => {
      cy.get("span[class='ant-picker-next-icon']").click();

      cy.get("tr:nth-child(4)").find("td:nth-child(1)").click();
    });

  cy.get("div[class=ant-picker-input]")
    .last()
    .children()
    .invoke("attr", "value")
    .then((string) => {
      cy.wrap(string).as("endDate");
    });
  cy.get("[data-testid='wizard-nextbtn']").click();
  cy.wait("@waitForequest"); //it spies for portfolio requests
  return cy.get("@endDate");
});

Cypress.Commands.add("choosingPortfolio", (portfolioName) => {
  cy.get("h1").should("have.text", "Create campaign");

  cy.get("h2").find("span").eq(0).should("have.text", "3");
  cy.get("h2")
    .find("span")
    .eq(2)
    .should(
      "have.text",
      "Choose portfolio you want to associate to the campaign"
    );
  cy.get("input[class='ant-radio-input'][type='radio']")
    .eq(0)
    .should("have.attr", "value", "1");
  cy.get("input[class='ant-radio-input'][type='radio']").eq(1).click();
  cy.get(".ant-select-selector")
    .click()
    .type(portfolioName + "{enter}");
  cy.get(".ant-select-selector").click();

  cy.get("[data-testid='wizard-nextbtn']").click({ force: true });
});

Cypress.Commands.add("choosingGoal", () => {
  cy.get("h1").should("have.text", "Create campaign");

  cy.get("h2").find("span").eq(0).should("have.text", "4");
  cy.get("h2")
    .find("span")
    .eq(2)
    .should("have.text", "Choose a goal for the campaign");
  cy.findAllByText("Select a goal, allocated to some defined tasks.");
  cy.get("span").contains("Goal");
  cy.get("label").contains(
    'Do you want to make the "Sales performance" chart visible for Sales users?'
  );
  cy.get("label").contains("Enable the chart");
  cy.get(".ant-select-selector").click();
  cy.findAllByText("Goal1").click();
  cy.get("[data-testid='wizard-nextbtn']").click();
});

Cypress.Commands.add("enterDescriptionAndSetConversionRate", () => {
  cy.get("h1").should("have.text", "Create campaign");

  cy.get("h2").find("span").eq(0).should("have.text", "5");
  cy.get("h2")
    .find("span")
    .eq(2)
    .should("have.text", "Enter a description and set conversion rate");

  cy.findAllByText(
    "Enter a description about the campaign you are creating, it will give more information on the goal you want to achieve."
  );
  cy.get("[data-testid='wizard-nextbtn']").click();
});

Cypress.Commands.add("checkIfSalestoolWasLoaded", () => {
  cy.get("h1").should("have.text", "Sales Tool");
});

Cypress.Commands.add("clickOnCampaignMenuButton", (buttonName) => {
  cy.get("button").contains(buttonName).click();
});

Cypress.Commands.add("assignSales", () => {
  cy.get('tbody[class="ant-table-tbody"]')
    .find("tr")
    .first()
    .find("input[type='search']")
    .first()
    .click();
  cy.findByTitle(Cypress.env("sale_user_name")).click();
  cy.get('tbody[class="ant-table-tbody"]')
    .find("tr")
    .first()
    .next()
    .find("input[type='search']")
    .first()
    .click();

  cy.get("div[class*='ant-select-dropdown']")
    .last()
    .within(() => {
      cy.contains(Cypress.env("sale_user_name")).click({ force: true });
    });
});

Cypress.Commands.add("assignProduct", () => {
  cy.get('tbody[class="ant-table-tbody"]')
    .find("tr")
    .first()
    .find("input[type='search']")
    .eq(1)
    .click();
  cy.findByTitle("Not assigned").click();
});

Cypress.Commands.add("onActualTab", (tabName) => {
  const tabs = ["To assign", "Not yet started", "Started"];
  tabs.forEach((tab) =>
    cy.get("div[role='tab']").contains(tab).should("be.visible")
  );
  cy.get("div[role='tab']")
    .contains(tabName)
    .should("be.visible")
    .parent()
    .should(
      "have.css",
      "background",
      "rgb(241, 245, 248) none repeat scroll 0% 0% / auto padding-box border-box"
    );
});

Cypress.Commands.add("addGoal", (goalName, extraTask) => {
  cy.get("div[data-testid='account-page']").within(() => {
    cy.get("button[type='button']").should("have.text", "Add goal").click();
  });
  cy.get("h2").contains("Create goal");
  cy.get("button[data-testid='wizard-nextbtn']").should("be.disabled");
  cy.get("input[aria-label='Goal name']")
    .click()
    .type(goalName + "{enter}");
  cy.get("button[data-testid='wizard-nextbtn']").should("be.enabled").click();
  cy.get("h2").contains("Choose the tasks to reach your goal");
  cy.get("input[aria-label='Task number 1']").click().type("task1");
  cy.get("input[aria-label='Task number 2']").click().type("task2");
  cy.get("input[aria-label='Task number 3']").click().type("task3");
  if (extraTask) {
    cy.get("button[type='button']").contains("Add task").click();
    cy.get("input[aria-label='Task number 4']")
      .should("exist")
      .click()
      .type("extraTask");
    cy.get("input[placeholder='Insert task name']").each(($element) => {
      cy.wrap($element).siblings("img[alt='delete']").should("be.visible");
    });
  }
  cy.get("button[data-testid='wizard-nextbtn']").should("be.enabled").click();
  cy.pageIsLoaded();
  cy.get("table").within(() => {
    cy.findByText(goalName).should("be.visible");
  });
});

Cypress.Commands.add("deleteGoal", (goalName) => {
  cy.get("tbody")
    .find("td")
    .contains(goalName)
    .closest("tr")
    .find("img[alt='delete']")
    .click();
  cy.pageIsLoaded();
  cy.get("h3").contains("Delete goal").should("be.visible");
  cy.get("div[class='buttons']").within(() => {
    cy.get("button[type='button']").last().click();
  });
  cy.get("p").should("have.text", "Goal was successfully deleted.");
  cy.get("div[class='buttons']").within(() => {
    cy.get("button[type='button']").click();
  });
});

Cypress.Commands.add("removeCampaignFromArchive", (campaignName) => {
  cy.get("span")
    .contains(campaignName)
    .closest("tr")
    .find("button[aria-label='menu-button']")
    .click();
  cy.get("span").contains("Delete").should("be.visible").click();
  cy.get("h3").contains("Delete Campaign");
  cy.get("div[class='buttons']").within(() => {
    cy.get("button[type='button']")
      .last()
      .should("have.text", "Delete")
      .click();
  });
  cy.pageIsLoaded();
  cy.get("div[class='ant-modal-body']").contains("deleted correctly.");
  cy.findByText("Ok").click();
});

Cypress.Commands.add("getNumberOfCampaignCompanies", (campaignName) => {
  cy.contains("th", "Number of companies")
    .invoke("index")
    .then((i) => {
      cy.get("tbody").within(() => {
        cy.get("td")
          .eq(i)
          .invoke("text")
          .then((value) => {
            let totalNumberOfCompanies = parseInt(value.replace(/\D/g, ""));
            cy.wrap(totalNumberOfCompanies).as("numOfCompanies");
          });
      });
    });

  return cy.get("@numOfCompanies");
});

Cypress.Commands.add("validateCampaign", (endDate, numOfCompanies) => {
  cy.get("span[class='date']").last().invoke("text").should("equal", endDate);
  cy.get("div[id='companies-map']")
    .find("h3")
    .contains("Geographical distribution");
  cy.get("div[id='companies-on-tasks']").within(() => {
    cy.get("h3").contains("Companies on task");
    cy.get("div[class='info']")
      .first()
      .children()
      .first()
      .invoke("text")
      .should("eq", numOfCompanies);
  });
});

Cypress.Commands.add("addNoteCampaign", (note) => {
  cy.get("button[aria-label='menu-button']").click();
  cy.get("span").contains("Add note").should("be.visible").click();
  cy.get("span")
    .contains("Enter a note to describe the conversion rate.")
    .should("be.visible");
  cy.get("button[type='button']").last().should("be.disabled");
  cy.get("textarea[name='note']").click().type(note);
  cy.get("button[type='button']").last().should("be.enabled").click();
  cy.get("div[class='ant-spin-container']").within(() => {
    cy.contains("Note added correctly " + note);
  });
  cy.get("button[type='button']").last().click();
  cy.pageIsLoaded();
  cy.get("span[class*='campaign-note']").should("have.text", note);
});

Cypress.Commands.add("deleteNoteCampaign", () => {
  cy.get("span[class*='campaign-note']").siblings().last().click();
  cy.get("textarea[name='note']").type("{selectAll}{backspace}");
  cy.get("button[type='button']").last().click();
});

Cypress.Commands.add("returnManageCampaignCompanies", () => {
  cy.pageIsLoaded();
  cy.get("[data-testid='spin']").should("not.exist");
  cy.get(".ant-spin-dot ant-spin-dot-spin").should("not.exist");
  cy.get("h4")
    .first()
    .invoke("text")
    .then((value) => {
      let totalNumberOfCompanies = parseInt(value.replace(/\D/g, ""));
      cy.wrap(totalNumberOfCompanies).as("numOfCompanies");
    });
  return cy.get("@numOfCompanies");
});

Cypress.Commands.add("getFilterInput", () => {
  cy.get("input[role='spinbutton']").as("filterInput");
  return cy.get("@filterInput");
});

Cypress.Commands.add("openFirstCompanyDetailsInTheList", () => {
  cy.get("tbody").within(() => {
    cy.get("td").first().find("a").click();
  });
  cy.pageIsLoaded();
  cy.get("h2").contains("Preview");
});

Cypress.Commands.add("navigateToCompanyDetailsSection", (sectionName) => {
  cy.get("div[data-pf-id='side-menu']").within(() => {
    cy.findByText(sectionName).click();
  });
  cy.get("h2").contains(sectionName);
});

Cypress.Commands.add("extractCompanyDetail", (type) => {
  cy.get("span")
    .contains(type)
    .siblings()
    .first()
    .invoke("text")
    .then((value) => {
      cy.wrap(value).as("data");
    });
  return cy.get("@data");
});

Cypress.Commands.add("chooseFromOrderBySection", function (orderBy) {
  const companyBeforeSwitch =
    Cypress.env("moduleSalesTool")["firstCompanyInTable"];

  cy.get("div[class='right-side']").within(() => {
    cy.get("input[type='search']").click();
  });
  cy.get("div[class='rc-virtual-list-holder-inner']").within(() => {
    cy.get(`div[title='${orderBy}']`).click();
  });

  cy.get("tbody").within(() => {
    cy.get("tr")
      .eq(0)
      .find("div[class^='Text']")
      .first()
      .invoke("text")
      .as("companyAfterSwitch");
  });

  cy.get("@companyAfterSwitch").should("not.eq", companyBeforeSwitch);
});

Cypress.Commands.add("renewCampaign", (campaignName) => {
  cy.get("[data-testid='wizard-nextbtn']").should("be.disabled");
  cy.get("[aria-label='Campaign Name']").click().type(campaignName);
  cy.get("input[name='restoreData']").click();
  cy.get("[data-testid='wizard-nextbtn']").should("be.enabled");
  cy.get("[data-testid='wizard-nextbtn']").click();

  cy.get("h2").find("span").eq(0).should("have.text", "2");
  cy.get("h2")
    .find("span")
    .eq(2)
    .should("have.text", "Select the start date and the end date");
  cy.get(".ant-picker-input").eq(1).trigger("mousedown");

  cy.get("[aria-label='close-circle']").eq(1).click();

  cy.get("div[class^=ant-picker-dropdown]")

    .should("be.visible")
    .within(() => {
      cy.get("span[class='ant-picker-next-icon']").click();

      cy.get("tr:nth-child(4)").find("td:nth-child(1)").click();
    });

  cy.get("[data-testid='wizard-nextbtn']").should("be.enabled");
  cy.get("[data-testid='wizard-nextbtn']").click();

  cy.get("div[class='ant-modal-content']").within(() => {
    cy.get("h3").contains("Campaign creation");
    cy.get("button[aria-label='Close']").should("be.visible");
    cy.findByText("Ok").should("be.visible").click();
  });
  cy.pageIsLoaded();
  cy.get("h1").contains("Sales Tool");
  cy.clickOnTab("Not yet started");
});

Cypress.Commands.add("downloadCampaignPdf", () => {
  cy.clickOnCampaignMenuButton("Download PDF/Excel");
  cy.pageIsLoaded();
  cy.get("body").then(($body) => {
    if ($body.find("div[class='ant-modal-content']").length > 0) {
      cy.get("div[class='ant-modal-content']")
        .find("button[type='button']")
        .contains("Confirm")
        .click();
    }
  });

  cy.get("button[data-testid='wizard-nextbtn']").should("be.disabled");
  cy.get("div[class='download-first']").first().children().first().click();
  cy.get("button[data-testid='wizard-nextbtn']").should("be.enabled").click();

  cy.get("h1").contains("Download PDF");
  cy.pageIsLoaded();
  cy.get("div[id='campaign-header']").should("be.visible", { timeout: 20000 });
});

Cypress.Commands.add("downloadCampaignXlsx", () => {
  cy.clickOnCampaignMenuButton("Download PDF/Excel");
  cy.pageIsLoaded();
  cy.get("body").then(($body) => {
    if ($body.find("div[class='ant-modal-content']").length > 0) {
      cy.get("div[class='ant-modal-content']")
        .find("button[type='button']")
        .contains("Confirm")
        .click();
    }
  });
  cy.get("span").contains("Excel").siblings().first().click();
  cy.get("button[data-testid='wizard-nextbtn']").should("be.enabled").click();

  cy.get("div[class='download-first']")
    .children()
    .first()
    .children()
    .first()
    .click();
  cy.get("button[data-testid='wizard-nextbtn']").should("be.enabled").click();
  cy.pageIsLoaded();
  cy.get("button[data-testid='wizard-nextbtn']").should("be.enabled").click();

  cy.get("div[class='ant-modal-content']").within(() => {
    cy.get("h3").contains("Download Excel");
    cy.findByText("Ok").click();
  });
  cy.get("div[id='campaign-header']").should("be.visible", {
    timeout: 20000,
  });
});

Cypress.Commands.add("changeFirstTask", (taskName) => {
  cy.pageIsLoaded();
  cy.get("tbody")
    .children()
    .first()
    .within(() => {
      cy.get("span[class*='ant-select-selection-search']").click({
        force: true,
      });
    });
  cy.get("div").contains(taskName).should("be.visible").click();
  cy.pageIsLoaded();

  cy.get("h3").contains("Assign task");
  cy.get("button[type='button']").last().should("be.enabled").click();
  cy.pageIsLoaded();
  cy.get("button").contains("Ok").click();

  cy.get("tbody")
    .children()
    .first()
    .within(() => {
      cy.get("span").contains(taskName).should("be.visible");
    });
});

Cypress.Commands.add("changeAllTasks", (taskName) => {
  cy.get("div[class='ant-card-head']").within(() => {
    cy.get("button[type='button']")
      .should("be.visible")
      .and("have.attr", "aria-checked", "false")
      .click();
  });
  cy.get("div[class='padded-content']").within(() => {
    cy.get("span").contains("Select all").should("be.visible").click();
    cy.findByText("Assign task").should("be.visible");
    cy.get("input[type='search']").first().click();
  });
  cy.get("div").contains(taskName).click();
  cy.get("h3").contains("Assign task");
  cy.get("button[type='button']").last().should("be.enabled").click();
  cy.pageIsLoaded();
  cy.get("button").contains("Ok").click();
});

Cypress.Commands.add("addCampaignToDashboard", (campaignName) => {
  cy.get("div[data-testid='widget-empty']")
    .should("exist")
    .within(() => {
      cy.get("h3")
        .contains("Choose what to display in this box")
        .should("be.visible");
      cy.get("div[data-testid='widgets-add-portfolio']").click();
    });

  cy.get("div[data-testid='widget-empty']").within(() => {
    cy.get("span").contains("Select campaign").click();
    cy.pageIsLoaded();
    cy.get("input[type='search']").type(campaignName);
    cy.document().its("body").findByText(campaignName).click();
    cy.get("button[data-testid='select-submit-button']")
      .should("be.enabled")
      .click();
  });

  cy.pageIsLoaded();
  cy.get("div[data-testid='widget-SalesTool']")
    .find("div[class*='title']")
    .contains(campaignName);
});

Cypress.Commands.add("selectCustomVariable", (varName) => {
  cy.get("div[class='left-side']").find("button").click();
  cy.get("li").find("span").contains(varName).click();
  cy.get("div[class='left-side']").find("button").click();
});

Cypress.Commands.add("assignSalesGroupActions", (username) => {
  cy.get("div[class='ant-card-head']").within(() => {
    cy.get("button[role='switch']").click();
  });
  cy.get("tbody").within(() => {
    cy.get("tr").first().find("input").click();
    cy.get("tr").first().next().find("input").click();
  });

  cy.get("div[class='padded-content']").within(() => {
    cy.get("input[type='search']").first().click().type(username);
  });
  cy.get("div[class*=holder-inner]")
    .first()
    .within(() => {
      cy.findAllByText(username).first().click();
    });
});

Cypress.Commands.add("checkCampaignOverviewAsSale", () => {
  cy.get("div[id='companies-map']").should("be.visible");
  cy.get("div[id='companies-on-tasks']")
    .should("be.visible")
    .within(() => {
      cy.get("div[orientation='vertical']").children().should("have.length", 3);
    });
  cy.get("div[class*='ButtonRow']").within(() => {
    cy.get("button[type='button']").first().should("be.enabled");
    cy.get("button[type='button']").last().should("be.enabled");
  });
  cy.get("div[class='ant-card-body']")
    .last()
    .findByText(Cypress.env("sale_user_name"));
  cy.get("g[class*='recharts-cartesian-axis-tick']")
    .first()
    .within(() => {
      cy.get("tspan").contains("2");
      cy.get("tspan").contains("Companies");
    });
});

Cypress.Commands.add("checkCampaignOverviewAsAreaManager", () => {
  cy.get("div[id='companies-map']").should("be.visible");
  cy.get("div[id='companies-on-tasks']")
    .should("be.visible")
    .within(() => {
      cy.get("div[orientation='vertical']").children().should("have.length", 3);
    });
  cy.get("h3").contains("Assignee performance").should("be.visible");
  cy.get("div[class*='ButtonRow']").within(() => {
    cy.get("button[type='button']").first().should("be.enabled");
    cy.get("button[type='button']").last().should("be.enabled");
  });
  cy.get("div[class='ant-card-body']")
    .last()
    .findByText(Cypress.env("sale_user_name"));
  cy.get("g[class*='recharts-cartesian-axis-tick']")
    .first()
    .within(() => {
      cy.get("tspan").contains("2");
      cy.get("tspan").contains("Companies");
    });
});
