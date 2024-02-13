import "./Support/commandsPortfolio";
import "../SalesTool/support/commandsSalesTool";
import "./Support/commandsPortfolioAPI";
import msg from "../Static/messages_eng";
const env = Cypress.env("configCountry");
const apiUrl = Cypress.env("apiUrl");
const country = Cypress.env("modulePortfolio")["simplified_upload_country"];

describe("Portfolio - Top action buttons", () => {
  it(
    "15 - Disabled if all companies have already been enriched; otherwise it will be enabled (enrich flow)",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      cy.visitEnrichedPortfolio();
      cy.get("button[role='switch']")
        .should("have.attr", "aria-checked", "true")
        .and("be.disabled");
    }
  );

  it(
    "16 - User can select the status and switch 'on' on the semantic cluster toggle (if enabled to semantic clusters)",
    { tags: "@ITA" },
    () => {
      cy.visitEnrichedPortfolio();
      cy.findByText("Generate Similarity").click();
      cy.contains("h3", "Generate Similarity").should("be.visible");
      cy.contains("Include Margo Semantic Clusters")
        .siblings("div[class^='Switch']")
        .find("button[role='switch']")
        .as("switch")
        .contains("Off");
      cy.get("@switch").click();
      cy.get("@switch").contains("On");
      cy.get('button[aria-label="Close"]').click();
      cy.contains("h3", "Generate Similarity", { matchCase: false }).should(
        "not.exist"
      );
    }
  );

  it(
    "17 - Generate Similarity - User lands into baseUrl/prospecting/analysis",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      cy.visitEnrichedPortfolio();
      cy.findByText("Generate Similarity", { exact: false }).click();
      cy.contains("h3", "Generate Similarity")
        .closest(".ant-modal-content")
        .as("modal");
      cy.get("@modal").find("input[role='combobox']").click();
      cy.get(".rc-virtual-list").contains("Prospect").click();
      cy.get("@modal").contains("button", "Select").click();
      cy.location("pathname").should("eq", "/prospecting");
    }
  );

  it(
    "19 - User can add note, change name, delete portfolio",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      // create dummy portfolio
      const portfolioName = "Test Note + Delete " + Date.now();
      const renamed = "Renamed " + Date.now();
      const noteText = "test note" + Date.now();
      cy.createPortfolioAPI(portfolioName, "linkToPortfolio", apiUrl);

      cy.get("@linkToPortfolio").then((link) => {
        cy.visit("/portfolio-management/portfolio/" + link);
      });

      cy.pageIsLoaded();
      cy.get("h1")
        .contains(portfolioName)
        .siblings("span[class^=Tooltip]")
        .last()
        .find("[aria-label='menu-button']")
        .as("menubtn");
      cy.get("@menubtn").click();
      cy.get("ul[class^='ant-dropdown']", { timeout: 15000 }).as("menu");

      // add note
      cy.get("@menu", { timeout: 15000 })
        .get("li")
        .contains("Add note")
        .click();
      cy.get(".ant-modal-content")
        .contains("h3", "Add note")
        .closest(".ant-modal-content")
        .as("addNoteModal");
      cy.get("@addNoteModal").contains("Add a note to describe the portfolio");
      cy.get("@addNoteModal")
        .find("textarea[aria-label='Note']")
        .click()
        .type(noteText, { delay: 0 });
      cy.get("@addNoteModal").contains("Save").click();
      cy.contains("span", noteText);

      // change name
      cy.get("@menubtn").click();
      cy.get("@menu", { timeout: 15000 })
        .get("li")
        .contains("Change name")
        .click();
      cy.get(".ant-modal-content")
        .contains("h3", "Change Portfolio name")
        .closest(".ant-modal-content")
        .as("changeNameModal");
      cy.get("@changeNameModal").contains(
        "Enter a representative name for the portfolio"
      );
      cy.get("@changeNameModal")
        .find('[aria-label="Portfolio name"]')
        .click()
        .type(renamed, { delay: 0 });
      cy.get("@changeNameModal").find("button").contains("Save").click();
      cy.get("@changeNameModal").find("button").contains("Ok").click();

      // delete note
      cy.get("h1")
        .contains(renamed)
        .siblings("span[class^=Tooltip]")
        .last()
        .find("[aria-label='menu-button']")
        .click();
      cy.get("@menu", { timeout: 15000 })
        .get("li")
        .contains("Delete portfolio")
        .click();
      cy.get(".ant-modal-content")
        .contains("h3", "Delete portfolio")
        .closest(".ant-modal-content")
        .as("deleteModal");
      cy.get("@deleteModal").contains(
        `Are you sure you want to delete ${renamed}?`
      );
      cy.get("@deleteModal").find("button").contains("Delete").click();
      cy.get("@deleteModal")
        .find("button")
        .contains("Ok")
        .click({ timeout: 15000 });
    }
  );

  it("22 - Loads query", { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] }, () => {
    const enrichedQuery = "Enriched Query";
    const enrichedCompanyCount =
      Cypress.env("modulePortfolio")["enriched_company_count"];
    cy.visitEnrichedPortfolio();
    cy.clickOnTopActionButton("left-action-0", "Load query");
    cy.get(".ant-modal-content").as("modal");
    cy.get("@modal").then(($modal) => {
      if ($modal.find("button").eq(1).text().includes("Skip save")) {
        cy.get("@modal").findByText("Skip save").click();
      }
    });
    cy.get("@modal")
      .find("input[type='search']")
      .click()
      .type(enrichedQuery, { delay: 0 });
    cy.findByText(enrichedQuery, { exact: false }).click();
    cy.get("@modal").find("button").contains("Load").click();
    cy.pageIsLoaded();
    cy.get("div[data-testid='AllCompanies']")
      .find("h4")
      .should((h4) => {
        const companyCountAfterQuery = h4.text().replace(/\D/g, "");
        expect(companyCountAfterQuery).to.eq(enrichedCompanyCount);
      });
  });

  it(
    "23 - Saves and updates query",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      const queryName = "Portfolio query " + Date.now();
      let filter: string, filterSwitchId: string;
      switch (env) {
        case "ita":
          filter = "Phone number";
          filterSwitchId = "[id='businessInfo.contacts.telephoneValidity']";
          break;
        case "cz":
          filter = "Phone number";
          filterSwitchId = "[id='businessInfo.contacts.hasPhoneNumber']";
          break;
        case "ger":
          filter = "Telephone";
          filterSwitchId = "[id='businessInfo.hasTelephone']";
          break;
        case "che":
          filter = "Phone number";
          filterSwitchId = "[id='businessInfo.hasPhoneNumber']";
          break;
      }
      cy.visitEnrichedPortfolio();
      const groupFilterSearchbar = 'input[type="search"]';
      cy.clickOnFilter("standardFilters", "Company Filters");
      cy.applyFilter(groupFilterSearchbar, filter);
      cy.get(filterSwitchId).find("button").click();

      // Saves query
      cy.findByText("Save Query").click();
      cy.get(".ant-modal-content").as("modal");
      cy.get("@modal")
        .find("[class^='ant-radio-group']")
        .contains("Create New")
        .click();
      cy.get("@modal")
        .find("[class^='ant-input']")
        .click()
        .type(queryName, { delay: 0 });
      cy.get("@modal").findByText("Save").click();
      cy.get("@modal").find("button").contains("Ok").click();

      // Updates query
      cy.get("[data-pf-id='exclusions-box']")
        .as("exclBox")
        .contains("Exclude enriched companies")
        .click();
      cy.get("@exclBox").find("button[role='switch']").click().click();
      cy.clickOnTopActionButton("left-action-1", "Save query");
      cy.get(".ant-modal-content").as("modal");
      cy.get("@modal")
        .find("[class^='ant-radio-group']")
        .contains("Update existing")
        .click();
      cy.visit("/account/portfolio-management/");
      cy.get("div[role='tab']").contains("Queries").click();
      cy.get("tr")
        .contains(queryName)
        .parent("tr")
        .find('[data-testid="delete-action"]')
        .click();
      cy.get(".ant-modal-content").as("modal");
      cy.get("@modal").find("button").contains("Delete").click();
      cy.get("@modal").find("button").contains("Ok").click();
    }
  );

  it(
    "34' - Sends portfolio to analyze market",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      const portfolioLink: string =
        Cypress.env("modulePortfolio")["links"]["send_to_analyze_market"];
      cy.visit(portfolioLink);
      cy.findByText("Send to Other Modules").click();
      cy.get("label").contains("Analyze market").click();
      cy.findByText("Send")
        .closest("button")
        .click({ waitForAnimations: true });
      cy.get("h1").contains("Market Analysis");
    }
  );

  it(
    "38' - Sends portfolio to sales tool",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      const name = "Test Campaign" + Date.now();
      cy.visitEnrichedPortfolio();
      cy.findByText("Send to Other Modules").click();
      cy.get("label").contains("Sales tool").click();
      cy.findByText("Send")
        .closest("button")
        .click({ waitForAnimations: true });
      cy.fillCampaignName(name);
    }
  );
});

describe(
  "Portfolio - Add local units + cleanup",
  () => {
    const apiUrl = Cypress.env("apiUrl");
    it("32, 33 - Add local units - ", { tags: ["@ITA", "@CHE"] }, () => {
      const portfolioName = "LocalUnits " + Date.now();
      const { companyId, noOfLocalUnits, country } =
        Cypress.env("modulePortfolio")["local_units"];
      const allBranchTypes = "All the Branch types";

      cy.createPortfolioWithCompaniesAPI(
        portfolioName,
        companyId,
        "linkToPortfolio",
        apiUrl,
        country
      );
      cy.get("@linkToPortfolio").then((link) => {
        cy.visit("/portfolio-management/portfolio/" + link);
      });
      cy.pageIsLoaded();
      cy.get("[data-testid='AllCompanies']").contains("1 Company");
      cy.clickOnTopActionButton("right-action-10", "Add Local Units");

      if (env === "ita") {
        cy.get(".ant-select-selector")
          .click()
          .type(allBranchTypes, { delay: 0 });
        cy.get(".rc-virtual-list-holder-inner")
          .findByText(allBranchTypes)
          .click();
        cy.get("h1").click({ force: true });
        cy.clickButton("Continue");
        cy.get(".ant-select-selection-search-input").click();
        cy.get(".ant-select-item-option-content")
          .contains("Supplier", {
            matchCase: false,
          })
          .click();
        cy.findByText("Continue").click();
      } else if (env === "che") {
        cy.get(".ant-select-selector").click();
        cy.findByText("Client").click();
        cy.findByText("Continue").click();
      }

      cy.get("h2").contains("Create tag.", { matchCase: false });
      cy.clickButton("Continue");
      cy.waitForAlertBox(
        msg.portfolioLocalUnits(noOfLocalUnits),
        "Non existant h1"
      );
      cy.get("[data-testid='AllCompanies']").contains(noOfLocalUnits + 1);
    });

    afterEach(() => {
      cy.get("@linkToPortfolio").then((id) => {
        cy.deletePortfolioAPI(String(id), apiUrl);
      });
    });
  }
);
