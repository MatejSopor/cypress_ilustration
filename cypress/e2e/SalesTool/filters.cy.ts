import "./support/commandsSalesTool";
const campaignName = "ManageCampaignTest2";
let endDate = "09/30/2024";
const groupFilterSearchbar = 'input[type="search"]';
const subFilterSearchbar = "textarea[aria-label='search text area']";
const filterData = Cypress.env("moduleSalesTool")["filters"];
const manage_campaign_link =
  Cypress.env("moduleSalesTool")["manage_campaign_link"];
let totalNumberOfCompanies;
let numberOfCompaniesAfterChange;

describe("Sales Tool - Filters", () => {
  it(
    "Basic checks and adding note",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      cy.visit("/salestool");
      cy.pageIsLoaded();
      cy.clickOnTab("Not yet started");

      cy.findItemThroughSearch(campaignName, "Search for name of campaign");
      cy.pageIsLoaded();
      cy.getNumberOfCampaignCompanies(campaignName).as("salesToolCompanies", {
        type: "static",
      });
      cy.clickOnCampaignPortfolioCompany(campaignName);
      cy.get("@salesToolCompanies").then((salesToolCompanies) => {
        cy.validateCampaign(endDate, salesToolCompanies.toString());
      });

      cy.addNoteCampaign("TestingNote");
      cy.deleteNoteCampaign();
    }
  );

  context("Working with filters in Campaign", () => {
    beforeEach(() => {
      cy.visit(`/${manage_campaign_link}`);
      cy.pageIsLoaded();
    });

    it(
      "Boolean filer - Companies without negative events ",
      { tags: ["@ITA", "@CZSK", "@GER"] },
      () => {
        cy.clickOnFilter("standardFilters", "Company Filters");
        cy.applyFilter(groupFilterSearchbar, filterData.compNegEvents_name);
        cy.filterSectionIsPresent(filterData.compNegEvents_id_getter)
          .find('button[type="button"]')
          .should("have.attr", "aria-checked", "false");
        cy.returnManageCampaignCompanies().then((value) => {
          totalNumberOfCompanies = value;
        });

        cy.get(`[id='${filterData.compNegEvents_id_getter}']`)
          .find('button[type="button"]')
          .click(); //turning ON the button

        cy.returnManageCampaignCompanies().then((value) => {
          numberOfCompaniesAfterChange = value;
          expect(numberOfCompaniesAfterChange).is.lessThan(
            totalNumberOfCompanies
          ); //expected number to be less than before
        });

        cy.get(`[id='${filterData.compNegEvents_id_getter}']`)
          .find('button[type="button"]')
          .click(); //turning OFF the button

        cy.returnManageCampaignCompanies().then((value) => {
          numberOfCompaniesAfterChange = value;
          expect(numberOfCompaniesAfterChange).to.eq(totalNumberOfCompanies); //expecting new number to equal number at the start
        });
      }
    );

    it(
      "Domain filter -  Geographic area",
      { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
      () => {
        cy.returnManageCampaignCompanies().then((value) => {
          //storing a number of all companies before starting to make changes
          totalNumberOfCompanies = value;
        });
        cy.clickOnFilter("standardFilters", "Company Filters"); //choosing Greographic area filter
        cy.applyFilter(groupFilterSearchbar, "Geographic area");
        cy.filterSectionIsPresent(filterData.geoFilter_id_getter);
        cy.returnManageCampaignCompanies().then((value) => {
          //assertion - num of companies should not change
          numberOfCompaniesAfterChange = value;
          expect(numberOfCompaniesAfterChange).to.eq(totalNumberOfCompanies);
        });

        cy.openFilterSelection(filterData.geoFilter_id_getter);
        cy.clickOnArrowIcon(filterData.analyzeMarket_CAP_path); //choosing particular CAP by using arrow icons at the side of the bar
        cy.get("span").contains(filterData.analyzeMarket_CAP_num).click();
        cy.getNumberAtFilter(filterData.analyzeMarket_CAP_num).as(
          "numberAtFilter"
        );
        cy.findAllByText("Save filters & close").click();

        cy.checkIfFiltersAreApplied([filterData.analyzeMarket_CAP_num]);

        cy.get("@numberAtFilter").then((numberAtFilter) => {
          cy.returnManageCampaignCompanies().then((value) => {
            //assertion - num of companies display at the top of the page should be the same as num at chosen CAP filter
            numberOfCompaniesAfterChange = value;
            expect(numberOfCompaniesAfterChange).to.eq(Number(numberAtFilter));
          });
        });

        cy.deleteSelectedFilter(filterData.analyzeMarket_CAP_num);

        cy.returnManageCampaignCompanies().then((value) => {
          //removing the filter, expecting number of companies to be as at the start
          numberOfCompaniesAfterChange = value;
          expect(numberOfCompaniesAfterChange).to.eq(totalNumberOfCompanies);
        });
        cy.openFilterSelection(filterData.geoFilter_id_getter);
        cy.applyFilter(subFilterSearchbar, filterData.analyzeMarket_CAP_num);
        cy.checkIfFiltersAreApplied([filterData.analyzeMarket_CAP_num]);
        cy.get("@numberAtFilter").then((numberAtFilter) => {
          cy.returnManageCampaignCompanies().then((value) => {
            //assertion - num of companies display at the top of the page should be the same as num at chosen CAP filter
            numberOfCompaniesAfterChange = value;
            expect(numberOfCompaniesAfterChange).to.eq(Number(numberAtFilter));
          });
        });

        cy.deleteSelectedFilter(filterData.analyzeMarket_CAP_num); //removing the filter, expecting number of companies to be as at the start
        cy.returnManageCampaignCompanies().then((value) => {
          numberOfCompaniesAfterChange = value;
          expect(numberOfCompaniesAfterChange).to.eq(totalNumberOfCompanies);
        });
      }
    );

    it("Range filter - Employees", { tags: ["@ITA", "@GER", "@CHE"] }, () => {
      cy.returnManageCampaignCompanies().then((value) => {
        //storing a number of all companies before starting to make changes
        totalNumberOfCompanies = value;
      });

      cy.clickOnFilter("standardFilters", "Company Filters"); //choosing Employees filter
      cy.applyFilter(groupFilterSearchbar, "Employees");
      cy.returnManageCampaignCompanies().then((value) => {
        //assertion - num of companies should not change
        numberOfCompaniesAfterChange = value;
        expect(numberOfCompaniesAfterChange).to.eq(totalNumberOfCompanies);
      });

      cy.get(`[id='${filterData.employees_id_getter}']`).within(() => {
        cy.getFilterInput().eq(1).clear().type("10{enter}"); //setting max value to 10
      });
      cy.returnManageCampaignCompanies().then((value) => {
        //expecting num of companies to be less than before
        numberOfCompaniesAfterChange = value;
        expect(numberOfCompaniesAfterChange).is.lessThan(
          totalNumberOfCompanies
        );
      });

      cy.findAllByText("Reset").click(); //reseting selected filter using Reset button
      cy.returnManageCampaignCompanies().then((value) => {
        //expecting num of companies to be same as at the beginning
        numberOfCompaniesAfterChange = value;
        expect(numberOfCompaniesAfterChange).to.eq(totalNumberOfCompanies);
      });

      cy.get(`[id='${filterData.employees_id_getter}']`).within(() => {
        //adjusting min value to 95
        cy.getFilterInput().eq(0).clear().type("10{enter}");
      });
      cy.returnManageCampaignCompanies().then((value) => {
        //expecting num of companies to be less than before
        numberOfCompaniesAfterChange = value;
        expect(numberOfCompaniesAfterChange).is.lessThan(
          totalNumberOfCompanies
        );
      });

      cy.clickOnFilter("standardFilters", "Company Filters"); //removing Employees filter
      cy.applyFilter(groupFilterSearchbar, "Employees");
      cy.returnManageCampaignCompanies().then((value) => {
        //checking whether number of companies are equal to the companies at the start
        numberOfCompaniesAfterChange = value;
        expect(numberOfCompaniesAfterChange).to.eq(totalNumberOfCompanies);
      });
    });

    it(
      "String filter - VAT Code",
      { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
      () => {
        cy.returnManageCampaignCompanies().then((value) => {
          //storing a number of all companies before starting to make changes
          totalNumberOfCompanies = value;
        });
        cy.clickOnFilter("standardFilters", "Company Filters"); //choosing VAT code filter. verifying whether is present
        cy.applyFilter(groupFilterSearchbar, filterData.vatCode_name);
        cy.filterSectionIsPresent(filterData.vatCode_id_getter).within(() => {
          cy.get("input[type='text']").type(Cypress.env("company_vatCode")); //using filter, selecting just one particular company
        });

        cy.get("h4").first().contains("Company");
      }
    );

    it("Date filter - Start Date", { tags: ["@ITA", "@GER"] }, () => {
      cy.returnManageCampaignCompanies().then((value) => {
        //storing a number of all companies before starting to make changes
        totalNumberOfCompanies = value;
      });

      cy.openFirstCompanyDetailsInTheList();
      cy.navigateToCompanyDetailsSection("Company Summary");
      //Date of foundation / Start date / Incorporation date
      cy.extractCompanyDetail(filterData.companySummary_startDate).as(
        "startDateValue",
        {
          type: "static",
        }
      );
      cy.get("span").contains("Close").click();

      cy.pageIsLoaded();
      cy.clickOnFilter("standardFilters", "Company Filters"); //choosing Start Date filter. verifying whether is present
      cy.applyFilter(groupFilterSearchbar, "Start date");
      cy.filterSectionIsPresent(filterData.startDate_id_getter);

      cy.returnManageCampaignCompanies().then((value) => {
        //checking whether number of companies are equal to the companies at the start
        numberOfCompaniesAfterChange = value;
        expect(numberOfCompaniesAfterChange).to.eq(totalNumberOfCompanies);
      });

      cy.get("@startDateValue").then((date) => {
        cy.get(`[id='${filterData.startDate_id_getter}']`).within(() => {
          //inserting particular date to the filter
          cy.get("[aria-label='From']")
            .click()
            .type("12/5/2007" + "{enter}");
        });
      });
      cy.returnManageCampaignCompanies().then((value) => {
        //checking whether number of companies are less than the companies at the start
        numberOfCompaniesAfterChange = value;
        expect(numberOfCompaniesAfterChange).is.lessThan(
          totalNumberOfCompanies
        );
      });
      cy.clickOnFilter("standardFilters", "Company Filters"); //choosing Start Date filter. verifying whether is present
      cy.applyFilter(groupFilterSearchbar, "Start date");
      cy.returnManageCampaignCompanies().then((value) => {
        //checking whether number of companies are equal to the companies at the start
        numberOfCompaniesAfterChange = value;
        expect(numberOfCompaniesAfterChange).to.eq(totalNumberOfCompanies);
      });
    });

    it(
      "Campaign filter - " + Cypress.env("sale_user_name"),
      { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
      () => {
        cy.returnManageCampaignCompanies().then((value) => {
          //storing a number of all companies before starting to make changes
          totalNumberOfCompanies = value;
        });

        cy.clickOnFilter("campaignFilters", "Campaign Filters");
        if (Cypress.env("configCountry").toUpperCase() === "ITA") {
          cy.applyFilter(groupFilterSearchbar, "Assigneee");
        } else {
          cy.applyFilter(groupFilterSearchbar, "Assignee");
        }

        cy.filterSectionIsPresent("Tree-campaign:sql-domain:assignedUser");
        cy.openFilterSelection("Tree-campaign:sql-domain:assignedUser");
        cy.applyFilter(groupFilterSearchbar, Cypress.env("sale_user_name"));
        cy.returnManageCampaignCompanies().then((value) => {
          //checking whether number of companies are less than the companies at the start
          numberOfCompaniesAfterChange = value;
          expect(numberOfCompaniesAfterChange).is.lessThan(
            totalNumberOfCompanies
          );
        });

        cy.clickOnFilter("campaignFilters", "Campaign Filters");
        if (Cypress.env("configCountry").toUpperCase() === "ITA") {
          cy.applyFilter(groupFilterSearchbar, "Assigneee");
        } else {
          cy.applyFilter(groupFilterSearchbar, "Assignee");
        }
        cy.returnManageCampaignCompanies().then((value) => {
          //checking whether number of companies are equal to the companies at the start
          numberOfCompaniesAfterChange = value;
          expect(numberOfCompaniesAfterChange).to.eq(totalNumberOfCompanies);
        });
      }
    );

    it("Custom variables", { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] }, () => {
      cy.returnManageCampaignCompanies().then((value) => {
        //storing a number of all companies before starting to make changes
        totalNumberOfCompanies = value;
      });

      cy.clickOnFilter("campaignFilters", "Campaign Filters");
      cy.applyFilter(groupFilterSearchbar, "Var Custom 1");
      cy.filterSectionIsPresent("0");
      cy.returnManageCampaignCompanies().then((value) => {
        //checking whether number of companies are equal the companies at the start
        numberOfCompaniesAfterChange = value;
        expect(numberOfCompaniesAfterChange).is.eql(totalNumberOfCompanies);
      });
      cy.intercept({
        method: "POST",
        url: "**/campaign-companies",
      }).as("request");
      cy.get("div[id='0']").find("input[type='text']").type("VC1");

      cy.wait("@request").its("response.statusCode").should("equal", 200);

      cy.returnManageCampaignCompanies().then((value) => {
        //checking whether number of companies are less than the companies at the start
        numberOfCompaniesAfterChange = value;
        expect(numberOfCompaniesAfterChange).is.lessThan(
          totalNumberOfCompanies
        );
      });
      cy.clickOnFilter("campaignFilters", "Campaign Filters");
      cy.applyFilter(groupFilterSearchbar, "Var Custom 1");
      cy.returnManageCampaignCompanies().then((value) => {
        //checking whether number of companies are equal than the companies at the start
        numberOfCompaniesAfterChange = value;
        expect(numberOfCompaniesAfterChange).is.eql(totalNumberOfCompanies);
      });

      cy.clickOnFilter("campaignFilters", "Campaign Filters");
      cy.applyFilter(groupFilterSearchbar, "Var Custom 11");
      cy.filterSectionIsPresent("10");
      cy.returnManageCampaignCompanies().then((value) => {
        //checking whether number of companies are equal than the companies at the start
        numberOfCompaniesAfterChange = value;
        expect(numberOfCompaniesAfterChange).is.eql(totalNumberOfCompanies);
      });
      cy.get("input[aria-label='To']")
        .click()
        .type("01/01/2020")
        .press("enter");
      cy.returnManageCampaignCompanies().then((value) => {
        //checking whether number of companies are less than the companies at the start
        numberOfCompaniesAfterChange = value;
        expect(numberOfCompaniesAfterChange).is.lessThan(
          totalNumberOfCompanies
        );
      });
      cy.clickOnFilter("campaignFilters", "Campaign Filters");
      cy.applyFilter(groupFilterSearchbar, "Var Custom 11");
      cy.returnManageCampaignCompanies().then((value) => {
        //checking whether number of companies are equal than the companies at the start
        numberOfCompaniesAfterChange = value;
        expect(numberOfCompaniesAfterChange).is.eql(totalNumberOfCompanies);
      });

      cy.clickOnFilter("campaignFilters", "Campaign Filters");
      cy.applyFilter(groupFilterSearchbar, "Var Custom 21");
      cy.filterSectionIsPresent("20");
      cy.returnManageCampaignCompanies().then((value) => {
        //checking whether number of companies are equal than the companies at the start
        numberOfCompaniesAfterChange = value;
        expect(numberOfCompaniesAfterChange).is.eql(totalNumberOfCompanies);
      });
      cy.get("div[id='20']").within(() => {
        cy.get("div[class='ant-form-item-control-input']")
          .last()
          .click()
          .type("{selectAll}{backspace}2500")
          .press("enter");
      });
      cy.returnManageCampaignCompanies().then((value) => {
        //checking whether number of companies are less than the companies at the start
        numberOfCompaniesAfterChange = value;
        expect(numberOfCompaniesAfterChange).is.lessThan(
          totalNumberOfCompanies
        );
      });
      cy.clickOnFilter("campaignFilters", "Campaign Filters");
      cy.applyFilter(groupFilterSearchbar, "Var Custom 21");
      cy.returnManageCampaignCompanies().then((value) => {
        //checking whether number of companies are equal than the companies at the start
        numberOfCompaniesAfterChange = value;
        expect(numberOfCompaniesAfterChange).is.eql(totalNumberOfCompanies);
      });
    });

    it(
      "Using 'Order by' dropdown",
      { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
      () => {
        /////////add check whether company name at the start has changed
        cy.chooseFromOrderBySection("Assignee (A-Z)");
        cy.selectCustomVariable("Var Custom 1");
        cy.get("tr").first().find("th").contains("Var Custom 1");
      }
    );
  });
});
