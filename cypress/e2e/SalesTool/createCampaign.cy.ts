import "./support/commandsSalesTool";
import "../AnalyzeMarket/support/commandsAnalyzeMarket";
const name = `Test ${Date.now()}`;
const renewedCampaign = name + "Renewed";
import messages from "../Static/messages_eng";
import modals from "../Static/modals_eng";

describe("Sales Tool - Create campaign ", () => {
  it("Create Campaign", { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] }, () => {
    cy.checkIfOnDashboard();
    cy.clickOnModule("salestool", "Sales Tool");
    cy.pageIsLoaded();

    cy.clickOnCreateCampaign();
    /// wizzard 1/5   /////
    cy.fillCampaignName(name);

    /// wizzard 2/5   /////

    cy.selectTheStartAndEndDate();

    /// wizzard 3/5   /////
    cy.choosingPortfolio("SalesToolPortfolio");

    /// wizzard 4/5   /////
    cy.choosingGoal();
    /// wizzard 5/5   /////

    cy.enterDescriptionAndSetConversionRate();
    cy.confirmModalContent(
      modals.campaignCreationHeading(),
      modals.campaignCreation(),
      modals.buttonOk()
    );
    cy.checkIfSalestoolWasLoaded();
    cy.waitForAlertBox(
      messages.createCampaign(name),
      name,
      "Go to campaign",
      "salestool"
    );
  });

  it(
    "Assign and start campaign",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      cy.visit("/salestool");
      cy.pageIsLoaded();

      //using searchbar in order to find a particular company by its literal name, opening it, clicking to Assign sales and finally saving it
      cy.findItemThroughSearch(name, "Search for name of campaign");
      cy.clickOnCampaignPortfolioCompany(name);
      cy.clickOnCampaignMenuButton("Assign Campaign");
      cy.pageIsLoaded();
      //cy.assignSales(); // assigning sales to first two companies displayed in the company list
      cy.assignSalesGroupActions(Cypress.env("sale_user_name"));
      cy.clickOnCampaignMenuButton("Save");
      cy.confirmModalContent(
        modals.campaignSavingHeading(),
        modals.campaignSaving(),
        modals.buttonOk()
      );
      //confirming whether everything was correcly saved by verifying the content of incoming alert box
      cy.waitForAlertBox(
        messages.completedAssignment(name),
        name,
        "Go to campaign",
        "salestool"
      );
      cy.visit("/salestool");
      cy.pageIsLoaded();
      cy.clickOnTab("Not yet started");
      cy.findItemThroughSearch(name, "Search for name of campaign");
      cy.clickOnCampaignPortfolioCompany(name);
      cy.clickOnCampaignMenuButton("Start Campaign");
      cy.get("span").contains("Continue").click();
      cy.get(".ant-modal-content").within(() => {
        cy.findByText("Ok").click();
      });
    }
  );

  it("logInAsAreaManager", { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] }, () => {
    cy.visit("/account");
    cy.pageIsLoaded();
    cy.logAsUser(Cypress.env("user_code_as_areaManager"));
    cy.visit("/salestool");
    cy.clickOnTab("Started");
    cy.findItemThroughSearch(name, "Search for name of campaign");
    cy.clickOnCampaignPortfolioCompany(name);
    cy.checkCampaignOverviewAsAreaManager();
  });

  it("logInAsSale", { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] }, () => {
    cy.visit("/account");
    cy.pageIsLoaded();

    cy.logAsUser(Cypress.env("user_code_as_sale"));
    cy.visit("/salestool");
    cy.clickOnCampaignPortfolioCompany(name);
    cy.pageIsLoaded();
    cy.checkCampaignOverviewAsSale();
    cy.downloadCampaignPdf();
    cy.verifyDownload(".pdf", { softMatch: true });
    cy.getFirstDownloadedFileName().then((name) => {
      cy.removeDownloadedFile(name);
    });
  });

  it(
    "Changing tasks as Sale",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      /**
       * @description Logging in as a Sale by "Login as another user" button, then traversing into "Manage campaign section", changing task of first displayed company,
       * then using group action in order to change tasks of both companies to the third one
       * when searching for the campaign back in Sales Tool module, data displayed in the row should report that 100% companies assigned to task 3
       */
      cy.visit("/account");
      cy.pageIsLoaded();
      cy.logAsUser(Cypress.env("user_code_as_sale"));

      cy.clickOnModule("salestool", Cypress.env("sale_user_name"));
      cy.findItemThroughSearch(name, "Search for name of campaign");
      cy.clickOnCampaignPortfolioCompany(name);

      cy.clickOnCampaignMenuButton("Manage Campaign");
      //selecting first company and updating it to task 2
      cy.changeFirstTask("222");
      //selecting Group actions and updating all of the tasks for task 3
      cy.changeAllTasks("333");
      cy.clickOnModule("salestool", Cypress.env("sale_user_name"));
      cy.findItemThroughSearch(name, "Search for name of campaign");
      cy.findByText(name)
        .closest("tr")
        .within(() => {
          cy.get("span").contains("333: 100%");
        });
    }
  );

  it(
    "Save the campaign inside the Dashboard box",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      /**
       * @description Logging in as a Sale, selecting a particular campaign to be displayed in the Dashboard module, verifying whether displayed correctly
       */
      cy.visit("/account");
      cy.pageIsLoaded();
      cy.logAsUser(Cypress.env("user_code_as_sale"));

      cy.get("a[data-pf-id='margo-logo']").click();
      cy.checkIfOnDashboard();
      cy.intercept("POST", "/api/DashboardItems/dashboard-items").as(
        "dashItems"
      );
      cy.addCampaignToDashboard(name);
      cy.wait("@dashItems").then((req) => {
        cy.wrap(req.response.body.item.id).as("id");
      });

      cy.get("@id").then((id) => {
        const user = JSON.parse(window.localStorage.getItem("persist:user"));
        const authToken = user.token.replace(/[\"]/g, "");
        const Authorization = `Bearer ${authToken}`;
        cy.request({
          url:
            Cypress.env("apiUrl") +
            "/api/DashboardItems/dashboard-items/" +
            String(id),
          method: "DELETE",
          headers: {
            Authorization,
            Accept: "application/json, text/plain, */*",
            ["Content-Type"]: "application/json",
          },
        });
      });
    }
  );

  it("Stop campaign", { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] }, () => {
    /**
     * @description Stopping a started campaign, verifying modal content and checking whether the campaign has moved
     */
    cy.visit("/salestool");
    cy.pageIsLoaded();
    cy.pageIsLoaded();
    cy.clickOnTab("Started");
    cy.clickOnCampaignPortfolioCompany(name);

    cy.clickOnCampaignMenuButton("Stop Campaign");
    cy.confirmModalContent(
      modals.campaignStoppingHeading(),
      modals.campaignStopping_1(),
      modals.buttonContinue()
    );
    cy.pageIsLoaded();
    cy.get(".ant-modal-content").within(() => {
      cy.findByText(modals.campaignStopped(name)).should("be.visible");

      cy.findByText("Ok").click();
    });
    cy.pageIsLoaded();

    cy.clickOnTab("Started");
    cy.findItemThroughSearch(name, "Search for name of campaign");
    cy.get("h3").contains("Sorry we couldn't find any matches");
    cy.clickOnTab("Not yet started");
  });

  it("Renew campaign", { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] }, () => {
    cy.visit("/salestool");
    cy.pageIsLoaded();
    cy.clickOnCampaignMenuButton("Campaign archive");
    cy.get('tbody[class="ant-table-tbody"]').find("tr").first();
    cy.contains(name)
      .closest("tr")
      .find("span")
      .contains("Renew campaign")
      .click();
    cy.renewCampaign(renewedCampaign);
    cy.waitForAlertBox(
      messages.campaignRenewed(renewedCampaign),
      renewedCampaign
    );

    cy.get("h1").contains("Sales Tool");
    cy.clickOnTab("Not yet started");
    cy.get('tbody[class="ant-table-tbody"]')
      .find("span")
      .contains(renewedCampaign);
  });

  it("Removing a campaign", { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] }, () => {
    cy.visit("/salestool");
    cy.pageIsLoaded();
    cy.clickOnTab("Not yet started");
    cy.findItemThroughSearch(name, "Search for name of campaign");
    cy.clickOnCampaignPortfolioCompany(name);
    cy.clickOnCampaignMenuButton("Stop Campaign");
    cy.confirmModalContent(
      modals.campaignStoppingHeading(),
      modals.campaignStopping_1(),
      modals.buttonContinue()
    );
    cy.pageIsLoaded();
    cy.get(".ant-modal-content").within(() => {
      cy.findByText(modals.campaignStopped(renewedCampaign)).should(
        "be.visible"
      );
      cy.findByText("Ok").click();
    });
    cy.pageIsLoaded();
    cy.clickOnCampaignMenuButton("Campaign archive");
    cy.removeCampaignFromArchive(renewedCampaign);
  });
});
