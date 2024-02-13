import "./support/commandsProspectingAPI";

const env = Cypress.env("configCountry");
const apiUrl = Cypress.env("apiUrl");
const identificationIds = Cypress.env("modulePortfolio")["ids"]["group_action"];
const country = Cypress.env("modulePortfolio")["simplified_upload_country"];
const tabsArray: String[] = ["Companies", "Portfolios", "Campaigns"];

describe(
  "Prospecting - Only portfolio and campaigns",
  { tags: ["@ITA", "@GER", "@CHE"] },
  () => {
    beforeEach(() => {
      cy.visit("/");
      cy.loginWithPageSession();
      const newPortfolioName = "newUniqName" + Date.now();
      cy.createPortfolioWithCompaniesAPI(
        newPortfolioName,
        identificationIds,
        "newPortfolioId",
        apiUrl,
        country
      );
      cy.wrap(newPortfolioName).as("newPortfolioName");

      const goalName = "goalName" + Date.now();
      const taskName = "taskName" + Date.now();
      cy.createGaolAPI(goalName, taskName, "goalIdName", apiUrl);
      cy.wait(10000);

      const newCampaignName = "newUniqName" + Date.now();
      cy.get("@newPortfolioId").then((portfolioId) => {
        cy.get("@goalIdName").then((goalIdName) => {
          cy.createCampaignFromPortfolioAPI(
            newCampaignName,
            String(portfolioId),
            String(goalIdName),
            "newCampaignId",
            apiUrl
          );
        });
      });
    });
    it(
      "FreeSearch - Only portfolio and campaigns",
      { tags: ["@ITA", "@GER", "@CHE"] },
      () => {
        cy.visit("/");
        cy.get("div[data-testid='search-icon']").click();
        cy.get("div[class*='MainMenu']").within(() => {
          cy.get("input[type='search']").type("newUniqName" + "{enter}");
        });
        tabsArray.forEach((val) => {
          cy.findByText(String(val)).click();
          cy.pageIsLoaded();
          if (val === "Companies") {
            cy.get("table").should("not.exist");
          } else {
            cy.get("table").should("exist");
          }
        });
      }
    );
    afterEach(() => {
      cy.get("@newCampaignId").then((id) => {
        cy.stopCampaignAPI(String(id), apiUrl);
        cy.deleteCampaignAPI(String(id), apiUrl);
      });
      cy.get("@newPortfolioId").then((id) => {
        cy.deletePortfolioAPI(String(id), apiUrl);
      });
      cy.get("@goalIdName").then((id) => {
        cy.deleteGoalAPI(String(id), apiUrl);
      });
    });
  }
);

describe("Prospecting - FreeSearch", () => {
  it("FreeSearch - Empty", { tags: ["@ITA", "@GER", "@CHE"] }, () => {
    const newUniqName = "newUniqName" + Date.now();
    cy.visit("/");
    cy.get("div[data-testid='search-icon']").click();
    cy.get("div[class*='MainMenu']").within(() => {
      cy.get("input[type='search']").type(newUniqName + "{enter}");
    });
    tabsArray.forEach((val) => {
      cy.findByText(String(val)).click();
      cy.get("table").should("not.exist");
    });
  });

  it("FreeSearch - Only company", { tags: ["@ITA", "@GER", "@CHE"] }, () => {
    cy.visit("/");
    cy.get("div[data-testid='search-icon']").click();
    cy.get("div[class*='MainMenu']").within(() => {
      cy.get("input[type='search']").type("Hotel" + "{enter}");
    });
    tabsArray.forEach((val) => {
      cy.findByText(String(val)).click();
      if (val === "Companies") {
        cy.get("table").should("exist");
      } else {
        cy.get("table").should("not.exist");
      }
    });
  });

  it("FreeSearch - Info", { tags: ["@ITA", "@GER", "@CHE"] }, () => {
    cy.visit("/");
    cy.get("div[data-testid='search-icon']").click();
    cy.get("div[data-testid='open-info-dialog']").click();
    cy.get("div[class='ant-modal-content']").within(() => {
      if (env === "che") {
        const companiesBySwiss: String[] =
          Cypress.env("moduleProspecting")["freeSearch"]["companiesBySwiss"];
        const companiesByAustria: String[] =
          Cypress.env("moduleProspecting")["freeSearch"]["companiesByAustria"];

        cy.get("ul")
          .eq(0)
          .within(() => {
            var i = 0;
            companiesBySwiss.forEach((val) => {
              cy.get("li").eq(i).should("have.text", val);
              i++;
            });
          });
        cy.get("ul")
          .eq(1)
          .within(() => {
            var i = 0;
            companiesByAustria.forEach((val) => {
              cy.get("li").eq(i).should("have.text", val);
              i++;
            });
          });
      } else {
        const companiesBy: String[] =
          Cypress.env("moduleProspecting")["freeSearch"]["companiesBy"];
        const findText: String[] =
          Cypress.env("moduleProspecting")["freeSearch"]["findText"];

        cy.get("ul").within(() => {
          var i = 0;
          companiesBy.forEach((val) => {
            cy.get("li").eq(i).should("have.text", val);
            i++;
          });
        });
        findText.forEach((val) => {
          cy.findByText(String(val));
        });
      }
    });
  });

  it("FreeSearch - Suggestions", { tags: ["@ITA", "@GER", "@CHE"] }, () => {
    cy.visit("/");

    //PORTFOLIO
    const portfolio = Cypress.env("modulePortfolio")["enrich_test_name"];
    cy.get("div[data-testid='search-icon']").click();
    cy.get("div[class*='MainMenu']").within(() => {
      cy.get("input[type='search']").type(portfolio);
    });
    cy.get("div[class*='rc-virtual-list-holder-inner']").within(() => {
      cy.findByText("Portfolio").click();
    });
    cy.get("h1").should("have.text", portfolio);

    //COMPANY
    const company =
      Cypress.env("moduleProspecting")["freeSearch"]["companyName"];
    cy.get("div[data-testid='search-icon']").click();
    cy.get("div[class*='MainMenu']").within(() => {
      cy.get("input[type='search']").type(company);
    });
    cy.get("div[class*='rc-virtual-list-holder-inner']").within(() => {
      cy.findByText("Company").click();
    });
    cy.get("h2").eq(0).should("have.text", company);

    //CAMPAIGN
    const campaign =
      Cypress.env("moduleProspecting")["freeSearch"]["campaignName"];
    cy.get("div[data-testid='search-icon']").click();
    cy.get("div[class*='MainMenu']").within(() => {
      cy.get("input[type='search']").type(campaign);
    });
    cy.get("div[class*='rc-virtual-list-holder-inner']").within(() => {
      cy.findByText("Campaign").click();
    });
    cy.get("h1").eq(0).should("have.text", campaign);
  });
});
