import "./support/commandsAnalyzeMarket";
let totalNumberOfCompanies;
let numberOfCompaniesAfterChange;
const groupFilterSearchbar = 'input[type="search"]';
const subFilterSearchbar = "textarea[aria-label='search text area']";
const filterData = Cypress.env("moduleTargeting")["filters"];

describe("Analyze Market - Domain filters ", () => {
  it(
    "11 - Domain filter -  Geographic area",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      /**
       * @description Applying Geo filter, using arrow icons to obtain a particular path, then deleting applied subfilters and using searchbar to obtain and apply
       * the particular CAP num
       */
      cy.visit("/targeting");
      cy.pageIsLoaded();
      cy.findAllCompaniesLabel();
      cy.returnNumOfCompanies().then((value) => {
        //storing a number of all companies before starting to make changes
        totalNumberOfCompanies = value;
      });
      cy.clickOnFilter("standardFilters", "Company Filters"); //choosing Greographic area filter
      cy.applyFilter(groupFilterSearchbar, "Geographic area");
      cy.filterSectionIsPresent(filterData.geoFilter_id_getter);
      cy.returnNumOfCompanies().then((value) => {
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
        cy.returnNumOfCompanies().then((value) => {
          //assertion - num of companies display at the top of the page should be the same as num at chosen CAP filter
          numberOfCompaniesAfterChange = value;
          expect(numberOfCompaniesAfterChange).to.eq(Number(numberAtFilter));
        });
      });

      cy.deleteSelectedFilter(filterData.analyzeMarket_CAP_num);

      cy.returnNumOfCompanies().then((value) => {
        //removing the filter, expecting number of companies to be as at the start
        numberOfCompaniesAfterChange = value;
        expect(numberOfCompaniesAfterChange).to.eq(totalNumberOfCompanies);
      });
      cy.openFilterSelection(filterData.geoFilter_id_getter);
      cy.applyFilter(subFilterSearchbar, filterData.analyzeMarket_CAP_num);
      cy.checkIfFiltersAreApplied([filterData.analyzeMarket_CAP_num]);
      cy.get("@numberAtFilter").then((numberAtFilter) => {
        cy.returnNumOfCompanies().then((value) => {
          //assertion - num of companies display at the top of the page should be the same as num at chosen CAP filter
          numberOfCompaniesAfterChange = value;
          expect(numberOfCompaniesAfterChange).to.eq(Number(numberAtFilter));
        });
      });

      cy.deleteSelectedFilter(filterData.analyzeMarket_CAP_num); //removing the filter, expecting number of companies to be as at the start
      cy.returnNumOfCompanies().then((value) => {
        numberOfCompaniesAfterChange = value;
        expect(numberOfCompaniesAfterChange).to.eq(totalNumberOfCompanies);
      });
    }
  );

  it(
    "33 - Domain filter - Legal Form",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      /**
       * @description Applying Legal Form filter, then choosing Individual company subfilter and asserting the number of companies whether are displayed correctly both
       * at the top of the page and in parentheses in the subfilter
       */
      cy.visit("/targeting");
      cy.pageIsLoaded();
      cy.findAllCompaniesLabel();
      cy.returnNumOfCompanies().then((value) => {
        //storing a number of all companies before starting to make changes
        totalNumberOfCompanies = value;
      });

      cy.clickOnFilter("standardFilters", "Company Filters"); //choosing Legal Form filter
      cy.applyFilter(groupFilterSearchbar, filterData.legalForm_name);
      cy.returnNumOfCompanies().then((value) => {
        //assertion - num of companies should not change
        numberOfCompaniesAfterChange = value;
        expect(numberOfCompaniesAfterChange).to.eq(totalNumberOfCompanies);
      });
      cy.filterSectionIsPresent(filterData.legalForm_id_getter);
      cy.openFilterSelection(filterData.legalForm_id_getter);

      if (Cypress.env("configCountry").toUpperCase() === "CHE") {
        cy.applyFilter(subFilterSearchbar, filterData.legalForm_subfilter); //applying subfilter and checking whether is applied or not
      } else {
        cy.applyFilter(groupFilterSearchbar, filterData.legalForm_subfilter); //applying subfilter and checking whether is applied or not
      }

      cy.checkIfFiltersAreApplied([filterData.legalForm_subfilter]);

      cy.returnNumOfCompanies().then((value) => {
        //extracting number of companies next to the Individual company label selection
        numberOfCompaniesAfterChange = value; //and comparing the number of companies at top of the page as it should be the same
        cy.get(`[id='${filterData.legalForm_id_getter}']`).within(() => {
          cy.get("span")
            .contains(filterData.legalForm_subfilter)
            .then(($string) => {
              let filteredCompaniesAmount = Number(
                $string
                  .text()
                  .match(/\([^()]+\)/g)[0]
                  .replace("(", "")
                  .replace(")", "")
                  .replace(",", "")
              );
              expect(numberOfCompaniesAfterChange).to.eq(
                filteredCompaniesAmount
              );
            });
        });
      });

      cy.clickOnFilter("standardFilters", "Company Filters"); //removing filter, in the next step checking whether number of companies returned as it should be
      cy.applyFilter(groupFilterSearchbar, filterData.legalForm_name);
      cy.returnNumOfCompanies().then((value) => {
        numberOfCompaniesAfterChange = value;
        expect(numberOfCompaniesAfterChange).to.eq(totalNumberOfCompanies);
      });
    }
  );
});
