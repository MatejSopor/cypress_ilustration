import "./support/commandsAnalyzeMarket";
let totalNumberOfCompanies;
let numberOfCompaniesAfterChange;
const groupFilterSearchbar = 'input[type="search"]';
const subFilterSearchbar = "textarea[aria-label='search text area']";
const filterData = Cypress.env("moduleTargeting")["filters"];

describe("Analyze Market - Other filters ", () => {
  it(
    "2 - Boolean filter - Companies without negative events",
    { tags: ["@ITA", "@CZSK", "@GER"] },
    () => {
      /**
       * @description Applying Companies without negative events filter, turning button ON and OFF and verifying changes in number of displayed companies
       * ITA - Companies without negative "events" , CZSK - Companies without negative "information"
       */
      cy.visit("/targeting");
      cy.pageIsLoaded();
      cy.clickOnFilter("standardFilters", "Company Filters");
      cy.applyFilter(groupFilterSearchbar, filterData.compNegEvents_name);
      cy.filterSectionIsPresent(filterData.compNegEvents_id_getter)
        .find('button[type="button"]')
        .should("have.attr", "aria-checked", "false");

      cy.returnNumOfCompanies().then((value) => {
        totalNumberOfCompanies = value;
      });

      cy.get(`[id='${filterData.compNegEvents_id_getter}']`)
        .find('button[type="button"]')
        .click(); //turning ON the button

      cy.returnNumOfCompanies().then((value) => {
        numberOfCompaniesAfterChange = value;
        expect(numberOfCompaniesAfterChange).is.lessThan(
          totalNumberOfCompanies
        ); //expected number to be less than before
      });

      cy.get(`[id='${filterData.compNegEvents_id_getter}']`)
        .find('button[type="button"]')
        .click(); //turning OFF the button

      cy.returnNumOfCompanies().then((value) => {
        numberOfCompaniesAfterChange = value;
        expect(numberOfCompaniesAfterChange).to.eq(totalNumberOfCompanies); //expecting new number to equal number at the start
      });
    }
  );

  it(
    "5 - String filter - VAT Code",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      /**
       * @description Applying VAT Code filter, using it to find a 1 existing company, finally removing filter and checking whether the number of companies was
       * displayed correctly while using such functionality
       */
      cy.visit("/targeting");
      cy.pageIsLoaded();

      cy.returnNumOfCompanies().then((value) => {
        //storing a number of all companies before starting to make changes
        totalNumberOfCompanies = value;
      });

      cy.clickOnFilter("standardFilters", "Company Filters"); //choosing VAT code filter. verifying whether is present
      cy.applyFilter(groupFilterSearchbar, filterData.vatCode_name);
      cy.filterSectionIsPresent(filterData.vatCode_id_getter);

      cy.returnNumOfCompanies().then((value) => {
        //checking whether number of companies are equal to the companies at the start
        numberOfCompaniesAfterChange = value;
        expect(numberOfCompaniesAfterChange).to.eq(totalNumberOfCompanies);
      });

      cy.get("input[type='text']").type(Cypress.env("company_vatCode"));
      //using filter, selecting just one particular company
      cy.findAllByText(
        "The numbers shown are related to the administrative headquarter"
      )
        .siblings()
        .children()
        .first()
        .contains("Company")
        .should("be.visible");

      cy.clickOnFilter("standardFilters", "Company Filters"); //removing selected filter to see whether number returns as it was before
      cy.applyFilter(groupFilterSearchbar, filterData.vatCode_name);

      cy.returnNumOfCompanies().then((value) => {
        //checking whether number of companies are equal to the companies at the start
        numberOfCompaniesAfterChange = value;
        expect(numberOfCompaniesAfterChange).to.eq(totalNumberOfCompanies);
      });
    }
  );

  it("8 - Date filter - Start Date", { tags: ["@ITA", "@GER"] }, () => {
    /**
     * @description Applying Start Date filter, adjusting the "From" field and watching for number of companies changes
     */
    cy.visit("/targeting");
    cy.pageIsLoaded();

    cy.returnNumOfCompanies().then((value) => {
      //storing a number of all companies before starting to make changes
      totalNumberOfCompanies = value;
    });

    cy.clickOnFilter("standardFilters", "Company Filters"); //choosing Start Date filter. verifying whether is present
    cy.applyFilter(groupFilterSearchbar, "Start date");
    cy.filterSectionIsPresent(filterData.startDate_id_getter);

    cy.returnNumOfCompanies().then((value) => {
      //checking whether number of companies are equal to the companies at the start
      numberOfCompaniesAfterChange = value;
      expect(numberOfCompaniesAfterChange).to.eq(totalNumberOfCompanies);
    });

    cy.get(`div[id='${filterData.startDate_id_getter}']`).within(() => {
      //inserting particular date to the filter
      cy.get("[aria-label='From']")
        .click()
        .type(filterData.analyzeMarket_date_from + "{enter}");
    });

    cy.returnNumOfCompanies().then((value) => {
      //checking whether number of companies got lower in comparison with number at the start
      numberOfCompaniesAfterChange = value;
      expect(numberOfCompaniesAfterChange).is.lessThan(totalNumberOfCompanies);
    });

    cy.clickOnFilter("standardFilters", "Company Filters"); //removing the filter, expecting number of companies to be as at the start
    cy.applyFilter(groupFilterSearchbar, "Start date");
    cy.returnNumOfCompanies().then((value) => {
      numberOfCompaniesAfterChange = value;
      expect(numberOfCompaniesAfterChange).to.eq(totalNumberOfCompanies);
    });
  });

  it("16 - CRIBIS D&B Rating", { tags: "@ITA" }, () => {
    /**
     * @description Applying CRIBIS filter, choosing the particular subfilter and verifying whether number of companies displayed both at the top of the page
     * and in the subfilter are displayed correctly
     */
    cy.visit("/targeting");
    cy.pageIsLoaded();
    cy.returnNumOfCompanies().then((value) => {
      //storing a number of all companies before starting to make changes
      totalNumberOfCompanies = value;
    });

    cy.clickOnFilter("customFilters", "Custom Indexes"); //choosing CRIBIS filter from Custom filters selection
    cy.applyFilter(groupFilterSearchbar, "CRIBIS D&B Rating");
    cy.filterSectionIsPresent("Tree-cribisDeBrating");
    cy.openFilterSelection("Tree-cribisDeBrating");
    cy.applyFilter(groupFilterSearchbar, "4 - Maximum risk"); //applying the Maximum risk filter from CRIBIS filter selection
    cy.checkIfFiltersAreApplied(["4 - Maximum risk"]); //checking whether is applied or not

    cy.returnNumOfCompanies().then((value) => {
      //extracting number of companies next to the Maximum risk label selection
      numberOfCompaniesAfterChange = value; //and comparing the number of companies at top of the page as it should be the same
      cy.get("[id='Tree-cribisDeBrating']").within(() => {
        cy.get("span")
          .contains("4 - Maximum risk")
          .then(($string) => {
            let filteredCompaniesAmount = Number(
              $string
                .text()
                .match(/\([^()]+\)/g)[0]
                .replace("(", "")
                .replace(")", "")
                .replace(",", "")
            );
            expect(numberOfCompaniesAfterChange).to.eq(filteredCompaniesAmount);
          });
      });
    });

    cy.clickOnFilter("customFilters", "Custom Indexes"); //removing filter, in the next step checking whether number of companies returned as it should be
    cy.applyFilter(groupFilterSearchbar, "CRIBIS D&B Rating");
    cy.returnNumOfCompanies().then((value) => {
      numberOfCompaniesAfterChange = value;
      expect(numberOfCompaniesAfterChange).to.eq(totalNumberOfCompanies);
    });
  });

  it("28 - Primary Ateco Code (2007)", { tags: "@ITA" }, () => {
    /**
     * @description After applying Primary Ateco Code, firstly using the arrow icons for traversing to a particular subfilter, then deleting a subfilter
     * and using searchbar in order to obtain a particular subfilter watching for company number changes
     */
    cy.visit("/targeting");
    cy.pageIsLoaded();
    cy.returnNumOfCompanies().then((value) => {
      //storing a number of all companies before starting to make changes
      totalNumberOfCompanies = value;
    });

    cy.clickOnFilter("standardFilters", "Company Filters"); //choosing Primary Ateco Code (2007) filter. verifying whether is present
    cy.applyFilter(groupFilterSearchbar, "Primary Ateco code");
    cy.filterSectionIsPresent("Tree-ateco");
    cy.returnNumOfCompanies().then((value) => {
      //checking whether number of companies are equal to the companies at the start
      numberOfCompaniesAfterChange = value;
      expect(numberOfCompaniesAfterChange).to.eq(totalNumberOfCompanies);
    });

    cy.filterSectionIsPresent("Tree-ateco");
    cy.openFilterSelection("Tree-ateco");
    cy.clickOnArrowIcon(filterData.anlyzeMarket_ateco_traverse_sections);
    cy.get("span").contains(filterData.analyzeMarket_ateco_code).click();
    cy.getNumberAtFilter(filterData.analyzeMarket_ateco_code).as(
      "numberAtFilter"
    );
    cy.findAllByText("Save filters & close").click();
    cy.checkIfFiltersAreApplied([filterData.analyzeMarket_ateco_code]);
    cy.get("@numberAtFilter").then((numberAtFilter) => {
      cy.returnNumOfCompanies().then((value) => {
        //assertion - num of companies display at the top of the page should be the same as num at chosen filter
        numberOfCompaniesAfterChange = value;
        expect(numberOfCompaniesAfterChange).to.eq(Number(numberAtFilter));
      });
    });
    cy.deleteSelectedFilter(filterData.analyzeMarket_ateco_code);

    cy.returnNumOfCompanies().then((value) => {
      //checking whether number of companies after filter deletion are equal to the companies at the start
      numberOfCompaniesAfterChange = value;
      expect(numberOfCompaniesAfterChange).to.eq(totalNumberOfCompanies);
    });

    cy.openFilterSelection("Tree-ateco");
    cy.get(subFilterSearchbar).type(
      filterData.analyzeMarket_ateco_code + "{enter}"
    );
    cy.getNumberAtFilter(filterData.analyzeMarket_ateco_code).as(
      "numberAtFilter"
    );
    cy.get("span").contains(filterData.analyzeMarket_ateco_code).click();
    cy.findAllByText("Save filters & close").click();
    cy.get("@numberAtFilter").then((numberAtFilter) => {
      cy.returnNumOfCompanies().then((value) => {
        //assertion - num of companies display at the top of the page should be the same as num at chosen filter
        numberOfCompaniesAfterChange = value;
        expect(numberOfCompaniesAfterChange).to.eq(Number(numberAtFilter));
      });
    });

    cy.clickOnFilter("standardFilters", "Company Filters"); //removing Ateco filter
    cy.applyFilter(groupFilterSearchbar, "Primary Ateco code");
    cy.returnNumOfCompanies().then((value) => {
      //checking whether number of companies are equal to the companies at the start
      numberOfCompaniesAfterChange = value;
      expect(numberOfCompaniesAfterChange).to.eq(totalNumberOfCompanies);
    });
  });

  it("36 - Semantic Cluster", { tags: "@ITA" }, () => {
    /**
     * @description Using Semantic Cluster filter to apply a subfilter both by using arrow icons and searchbar, verifying whether number of companies are
     * displayed correctly
     */
    cy.visit("/targeting");
    cy.pageIsLoaded();
    cy.findAllCompaniesLabel();
    cy.returnNumOfCompanies().then((value) => {
      //storing a number of all companies before starting to make changes
      totalNumberOfCompanies = value;
    });

    cy.get('[data-pf-id="exclusions-box"]')
      .siblings()
      .children()
      .first()
      .click(); //clicking on an orange box and moving Margo Semantic Clusters filter to the top
    cy.returnNumOfCompanies().then((value) => {
      numberOfCompaniesAfterChange = value;
      expect(numberOfCompaniesAfterChange).to.eq(totalNumberOfCompanies);
    });

    cy.filterSectionIsPresent("Tree-semanticClusters");
    cy.openFilterSelection("Tree-semanticClusters");
    cy.clickOnArrowIcon(
      filterData.analyzeMarket_semantic_cluster_traverse_section
    ); //traversing through filter groups using arrows, saving the last level choice
    cy.get("span")
      .contains(filterData.analyzeMarket_semantic_cluster_subfilter)
      .click();
    cy.getNumberAtFilter(
      filterData.analyzeMarket_semantic_cluster_subfilter
    ).as("numberAtFilter");
    cy.findAllByText("Save filters & close").click();
    cy.checkIfFiltersAreApplied([
      filterData.analyzeMarket_semantic_cluster_subfilter,
    ]);
    cy.get("@numberAtFilter").then((numberAtFilter) => {
      cy.returnNumOfCompanies().then((value) => {
        //assertion - num of companies display at the top of the page should be the same as num at chosen CAP filter
        numberOfCompaniesAfterChange = value;
        expect(numberOfCompaniesAfterChange).to.eq(Number(numberAtFilter));
      });
    });

    cy.deleteSelectedFilter(
      filterData.analyzeMarket_semantic_cluster_subfilter
    ); //deleting particular subfilter, asserting whether num of companies after deletion is the same as in the beginning
    cy.returnNumOfCompanies().then((value) => {
      numberOfCompaniesAfterChange = value;
      expect(numberOfCompaniesAfterChange).to.eq(totalNumberOfCompanies);
    });

    cy.get("[id='Tree-semanticClusters']");
    cy.openFilterSelection("Tree-semanticClusters");
    cy.get("[data-pf-id='selection-filters']").within(() => {
      cy.get(subFilterSearchbar)
        .click()
        .type(filterData.analyzeMarket_semantic_cluster_subfilter + "{enter}");
      cy.get("span")
        .contains(filterData.analyzeMarket_semantic_cluster_subfilter)
        .click();

      cy.findAllByText("Save filters & close").click();
    });
    cy.returnNumOfCompanies().then((value) => {
      //extracting number of companies next to the Children...  label selection
      numberOfCompaniesAfterChange = value; //and comparing the number of companies at top of the page as it should be the same
      cy.get("[id='Tree-semanticClusters']").within(() => {
        cy.get("span")
          .contains(filterData.analyzeMarket_semantic_cluster_subfilter)
          .then(($string) => {
            let filteredCompaniesAmount = Number(
              $string
                .text()
                .match(/\([^()]+\)/g)[0]
                .replace("(", "")
                .replace(")", "")
                .replace(",", "")
            );
            expect(numberOfCompaniesAfterChange).to.eq(filteredCompaniesAmount);
          });
      });
    });

    cy.deleteSelectedFilter(
      filterData.analyzeMarket_semantic_cluster_subfilter
    ); //deleting particular subfilter, asserting whether num of companies after deletion is the same as in the beginning
    cy.returnNumOfCompanies().then((value) => {
      numberOfCompaniesAfterChange = value;
      expect(numberOfCompaniesAfterChange).to.eq(totalNumberOfCompanies);
    });
  });

  it(
    "77 - Custom variable filters",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      /**
       * @description Loading portfolio with custom variables
       */
      cy.visit("/targeting");
      cy.pageIsLoaded();

      cy.clickOnMenuButton("Load Portfolio", "h3", "Load portfolio"); //loading desired portfolio
      cy.loadPortfolio("SalesToolPortfolio", "Client");

      cy.clickOnFilter("userFilters", "User Filters");
      cy.get("div[data-pf-id='selection-filters']").within(() => {
        cy.contains("Var Custom 1");
        cy.contains("Var Custom 2");
        cy.contains("Var Custom 3");
        cy.contains("Var Custom 11");
        cy.contains("Var Custom 21");
      });
    }
  );
});
