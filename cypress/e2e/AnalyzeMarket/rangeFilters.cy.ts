import "./support/commandsAnalyzeMarket";
describe("Analyze Market - Range filters ", () => {
  let totalNumberOfCompanies;
  let numberOfCompaniesAfterChange;
  const groupFilterSearchbar = 'input[type="search"]';
  const filterData = Cypress.env("moduleTargeting")["filters"];

  it(
    "19 - Range filter - Employees",
    { tags: ["@ITA", "@GER", "@CHE"] },
    () => {
      /**
       * @description Applying the Employees filter, then adjusting the selection in a multiple ways to verify the correct behavior of the filter
       */
      cy.visit("/targeting");
      cy.pageIsLoaded();
      cy.findAllCompaniesLabel();
      cy.returnNumOfCompanies().then((value) => {
        //storing a number of all companies before starting to make changes
        totalNumberOfCompanies = value;
      });

      cy.clickOnFilter("standardFilters", "Company Filters"); //choosing Employees filter
      cy.applyFilter(groupFilterSearchbar, "Employees");
      cy.returnNumOfCompanies().then((value) => {
        //assertion - num of companies should not change
        numberOfCompaniesAfterChange = value;
        expect(numberOfCompaniesAfterChange).to.eq(totalNumberOfCompanies);
      });

      cy.get(`div[id='${filterData.employees_id_getter}']`).within(() => {
        cy.getFilterInput().eq(1).clear().type("10{enter}"); //setting max value to 10
      });
      cy.returnNumOfCompanies().then((value) => {
        //expecting num of companies to be less than before
        numberOfCompaniesAfterChange = value;
        expect(numberOfCompaniesAfterChange).is.lessThan(
          totalNumberOfCompanies
        );
      });

      cy.findAllByText("Reset").click(); //reseting selected filter using Reset button
      cy.returnNumOfCompanies().then((value) => {
        //expecting num of companies to be same as at the beginning
        numberOfCompaniesAfterChange = value;
        expect(numberOfCompaniesAfterChange).to.eq(totalNumberOfCompanies);
      });

      cy.get(`div[id='${filterData.employees_id_getter}']`).within(() => {
        //adjusting min value to 95
        cy.getFilterInput().eq(0).clear().type("95{enter}");
      });
      cy.returnNumOfCompanies().then((value) => {
        //expecting num of companies to be less than before
        numberOfCompaniesAfterChange = value;
        expect(numberOfCompaniesAfterChange).is.lessThan(
          totalNumberOfCompanies
        );
      });

      cy.clickOnFilter("standardFilters", "Company Filters"); //removing Employees filter
      cy.applyFilter(groupFilterSearchbar, "Employees");
      cy.returnNumOfCompanies().then((value) => {
        //checking whether number of companies are equal to the companies at the start
        numberOfCompaniesAfterChange = value;
        expect(numberOfCompaniesAfterChange).to.eq(totalNumberOfCompanies);
      });
    }
  );

  it("41 - Range filter - Turnover", { tags: ["@ITA", "@GER", "@CHE"] }, () => {
    /**
     * @description Applying the Turnover filter, then adjusting the selection in a multiple ways to verify the correct behavior of the filter
     */
    cy.visit("/targeting");
    cy.pageIsLoaded();
    cy.findAllCompaniesLabel();
    cy.pageIsLoaded();
    cy.returnNumOfCompanies().then((value) => {
      //storing a number of all companies before starting to make changes
      totalNumberOfCompanies = value;
    });

    cy.clickOnFilter("standardFilters", "Company Filters"); //choosing Turnover filter
    cy.get("[data-pf-id='selection-filters']").within(() => {
      cy.get(groupFilterSearchbar).click().type("Turnover{enter}");
      cy.findAllByText("Turnover").click();
      cy.findAllByText("Save filters & close").click();
    });

    cy.returnNumOfCompanies().then((value) => {
      //assertion - num of companies should not change
      numberOfCompaniesAfterChange = value;
      expect(numberOfCompaniesAfterChange).to.eq(totalNumberOfCompanies);
    });

    cy.get(`div[id='${filterData.turnover_id_getter}']`).within(() => {
      cy.getFilterInput().eq(1).clear().type("200000{enter}"); //setting max value to 200 000
    });
    cy.returnNumOfCompanies().then((value) => {
      //expecting num of companies to be less than before
      numberOfCompaniesAfterChange = value;
      expect(numberOfCompaniesAfterChange).is.lessThan(totalNumberOfCompanies);
    });

    cy.findAllByText("Reset").click(); //reseting selected filter using Reset button
    cy.returnNumOfCompanies().then((value) => {
      //expecting num of companies to be same as at the beginning
      numberOfCompaniesAfterChange = value;
      expect(numberOfCompaniesAfterChange).to.eq(totalNumberOfCompanies);
    });

    cy.get(`div[id='${filterData.turnover_id_getter}']`).within(() => {
      cy.getFilterInput()
        .eq(0)
        .then(function ($sliderButton) {
          const sliderBoundary: number = Number(
            $sliderButton.attr(`aria-valuemax`)
          );
          cy.getFilterInput().eq(0).clear().type(`${sliderBoundary}{enter}`); //setting max value to 200 000
        });
      cy.findByText("Minimum value is out of range.").should("be.visible"); //assertion of a text that should be displayed when min value excesses max value
    });

    cy.clickOnFilter("standardFilters", "Company Filters"); //deletion of Turnover filter
    cy.get("[data-pf-id='selection-filters']").within(() => {
      cy.get(groupFilterSearchbar).click().type("Turnover{enter}");
      cy.findAllByText("Turnover").click();
      cy.findAllByText("Save filters & close").click();
    });
    cy.returnNumOfCompanies().then((value) => {
      //checking whether number of companies are equal to the companies at the start
      numberOfCompaniesAfterChange = value;
      expect(numberOfCompaniesAfterChange).to.eq(totalNumberOfCompanies);
    });
  });
});
