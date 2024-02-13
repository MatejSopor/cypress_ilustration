import { ProspectingPage } from "./utils/prospectingPageUtils";
import { Slider } from "./utils/buttons";

const filterData = Cypress.env("moduleProspecting")["filters"];

describe("Prospecting: Filters", () => {
  beforeEach(() => {
    ProspectingPage.visit();
    cy.prospectingCompaniesAmount().as("initialCompaniesAmount");
  });

  it(
    "Companies without negative effects",
    { tags: ["@ITA", "@CZSK", "@GER"] },
    () => {
      cy.clickOnFilter("standardFilters", "Company Filters");

      cy.applyFilter(
        "[placeholder='Search']",
        filterData["companieWithoutNegativeEffects"]
      );

      cy.contains(
        "[id^='businessInfo']",
        filterData["companieWithoutNegativeEffects"]
      )
        .find("button[role='switch']")
        .within(($el) => {
          cy.wrap($el).should("have.attr", "aria-checked", "false");
          cy.wrap($el).click();
          cy.wrap($el).should("have.attr", "aria-checked", "true");
          cy.wrap($el).click();
        });
      cy.prospectingCompaniesAmount().then((currentCompaniesAmount) => {
        cy.get("@initialCompaniesAmount").should("eq", currentCompaniesAmount);
      });
    }
  );

  context(
    "Geographic Area filter",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      beforeEach(() => {
        cy.clickOnFilter("standardFilters", "Company Filters");
        cy.applyFilter("[placeholder='Search']", "Geographic area");
      });

      it(
        "Number Of Companies should not change after selecting Geo Area filter ",
        { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
        function () {
          cy.prospectingCompaniesAmount().then((currentNumberOfCompanies) => {
            expect(this.initialCompaniesAmount).to.eq(currentNumberOfCompanies);
          });
        }
      );

      it(
        "Use the search bar but use the arrow in order to enter \
      inside this filter till CAP number is displayed.",
        {
          tags: ["@ITA", "@CZSK", "@GER", "@CHE"],
        },
        () => {
          cy.contains('[id*="geo"]', "Geographic area", {
            timeout: 14000,
          }).within(() => {
            cy.get("[aria-label='open filter selection']").click({
              force: true,
            });
          });

          cy.clickOnArrowIcon(filterData["arrowIconsGeoFilter"]);
          /*
          Number of companyes have to be the same it was indicate near the CAP in the filter
        */
          cy.contains(
            "[data-pf-id='selection-filters'] span",
            filterData["cityPart"]
          ).click();
          cy.getFilterResultAmount(filterData["cityPart"]).as(
            "filterResultAmount"
          );
          cy.get('[data-pf-id="selection-filters"]')
            .findAllByText("Save filters & close")
            .click();

          cy.get("@filterResultAmount").then((filterResultAmount) => {
            cy.prospectingCompaniesAmount().should("eq", filterResultAmount);
          });

          /*
          The funnel bar has to report the compaies indicated inside the filter
          */
          cy.validateFunnelTooltips(filterData["geoFilterFunnelTooltips"]);

          /* Remove previously selected City from filter by clicking on X near the name. */
          cy.deleteSelectedFilter(filterData["cityPart"]);

          cy.prospectingCompaniesAmount().then((currentCompaniesAmount) => {
            cy.get("@initialCompaniesAmount").should(
              "eq",
              currentCompaniesAmount
            );
          });

          cy.validateFunnelTooltips(filterData["defaultFunnelTooltips"]);
          cy.checkIfFiltersAreApplied([]);
        }
      );

      it(
        "Enter inside Geo Area using the search bar and insert a CAP number",
        { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
        () => {
          const CAP_NUMBER =
            Cypress.env("moduleProspecting")["filters"]["cityPart"];

          cy.contains('[id*="geo"]', "Geographic area", {
            timeout: 14000,
          }).within(() => {
            cy.get("[aria-label='open filter selection']").click({
              force: true,
            });
          });
          // enter filter
          cy.get('[data-pf-id="selection-filters"]')
            .find('[aria-label="search text area"]')
            .click()
            .clear()
            .type(`${CAP_NUMBER}{enter}`);

          cy.getFilterResultAmount(`${CAP_NUMBER}`).as("filterResultAmount");

          cy.get("span").contains(CAP_NUMBER).click();
          cy.findAllByText("Save filters & close").click();

          cy.prospectingCompaniesAmount().then((actualCompaniesAmount) => {
            cy.get("@filterResultAmount").should("eq", actualCompaniesAmount);
          });

          cy.validateFunnelTooltips(filterData["geoFilterFunnelTooltips"]);

          cy.contains("[data-pf-id='standardFilters'] h3", "Company Filters");
          cy.clickOnFilter("standardFilters", "Company Filters");
          cy.removeFilter("[placeholder='Search']", "Geographic area");

          cy.prospectingCompaniesAmount().then((prospectingCompaniesAmount) => {
            cy.get("@initialCompaniesAmount").should(
              "eq",
              prospectingCompaniesAmount
            );
          });
        }
      );
    }
  );

  context("Turnover filter", () => {
    beforeEach(() => {
      cy.clickOnFilter("standardFilters", "Company Filters");
      cy.applyFilter(
        'input[type="search"]',
        filterData["turnoverFilter"]["filterName"]
      );
    });

    it(
      "Select turnover from filters - No. Of companies has to become what was before",
      { tags: ["@ITA", "@CZSK", "@GER"] },
      () => {
        cy.prospectingCompaniesAmount().then((currentCompaniesAmount) => {
          cy.get("@initialCompaniesAmount").should(
            "eq",
            currentCompaniesAmount
          );
        });
      }
    );

    it(
      "A) Insert inside the right range (not with slider) to the half of \
          the maximum allowed value. \
       B) And use Restore Button to restore data.",
      { tags: ["@ITA", "@CZSK", "@GER"] },
      function () {
        const turnoverSelector: string =
          filterData.turnoverFilter.filterSelector;

        // set minimum input boundary
        Slider.getAllowedBoundary(turnoverSelector, "max").then(
          (allowedMax) => {
            const inputValue: string = `${allowedMax / 2}`;
            Slider.getInputLow(turnoverSelector)
              .clear()
              .type(`${inputValue}{enter}`);
            cy.validateFunnelTooltips(
              filterData.turnoverFilter.expectedFunnelTooltips
            );
          }
        );

        Slider.reset(turnoverSelector);

        // set maximum input boundary
        Slider.getAllowedBoundary(turnoverSelector, "max").then(
          (allowedMax) => {
            const inputValue: string = `${allowedMax / 2}`;
            Slider.getInputHigh(turnoverSelector)
              .clear()
              .type(`${inputValue}{enter}`);
            cy.validateFunnelTooltips(
              filterData.turnoverFilter.expectedFunnelTooltips
            );
          }
        );

        cy.clickOnFilter("standardFilters", "Company Filters");
        cy.removeFilter(
          'input[type="search"]',
          filterData.turnoverFilter.filterName
        );

        // Number of companies should be same as before test
        cy.prospectingCompaniesAmount().then((currentCompaniesAmount) => {
          cy.get("@initialCompaniesAmount").should(
            "eq",
            currentCompaniesAmount
          );
        });
      }
    );

    it(
      "Remove turnover from filters",
      { tags: ["@ITA", "@CZSK", "@GER"] },
      () => {
        cy.prospectingCompaniesAmount().then((currentCompaniesAmount) => {
          cy.get("@initialCompaniesAmount").should(
            "eq",
            currentCompaniesAmount
          );
        });
      }
    );
  });

  context("VAT Code filter", () => {
    beforeEach(() => {
      cy.clickOnFilter("standardFilters", "Company Filters");
      cy.applyFilter(
        "input[type='search']",
        filterData.vatCodeFilter.filterName
      );
    });

    it(
      "A) The funnel bar has to report selected filters \
        B) One company has to be displayed",
      { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
      () => {
        const vatCodeDataDefs = filterData.vatCodeFilter;
        // Number of companies do not have to change
        cy.prospectingCompaniesAmount().then((currentCompaniesAmount) => {
          cy.get("@initialCompaniesAmount").should(
            "eq",
            currentCompaniesAmount
          );
        });

        /* Insert a VAT Code inside the filter */
        cy.contains("[id^='businessInfo']", filterData.vatCodeFilter.filterName)
          .find("input")
          .click()
          .type(`${vatCodeDataDefs.filterVatCode}{enter}`);

        // The funnel bar has to report selected filters
        cy.validateFunnelTooltips(
          filterData.vatCodeFilter.expectedFunnelTooltips
        );

        cy.prospectingCompaniesAmount().then((currentCompaniesAmount) => {
          expect(currentCompaniesAmount).to.eq(1);
        });

        /* Remove Vat Code form filter */
        cy.clickOnFilter("standardFilters", "Company Filters");
        cy.removeFilter(
          "[placeholder='Search']",
          filterData.vatCodeFilter.filterName
        );
        // No. Of companies has to become what was before
        cy.prospectingCompaniesAmount().then((prospectingCompaniesAmount) => {
          cy.get("@initialCompaniesAmount").should(
            "eq",
            prospectingCompaniesAmount
          );
        });
      }
    );
  });
});
