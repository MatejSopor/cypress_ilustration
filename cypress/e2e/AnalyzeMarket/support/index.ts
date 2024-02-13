declare namespace Cypress {
  interface Chainable {
    /**
     * @description Command used for accessing slider inputs at filters
     * @example cy.getFilterInput().eq(1).clear().type("10{enter}"); //setting max value to 10
     */
    getFilterInput(): Chainable<JQuery<HTMLElement>>;
    /**
     * @description Download of Semantic search guide
     */
    downloadSemanticSearchGuide(): void;
    /**
     * @description Toggling button of Advanced semantic search
     */
    clickAdvancedSemanticSearch(): void;
    /**
     * @description Accessing the Semantic search searchbar
     * @example cy.getSemanticSearchSearchbar().next().click(); //clearing the searchbar,
     * @example cy.getSemanticSearchSearchbar().type("pesca").press("enter"); //writing keyword "pesca" into semantic search searchbar
     */
    getSemanticSearchSearchbar(): Chainable<JQuery<HTMLElement>>;
    /**
     * @description Clicking on Save query button after creating a query in Analyze Market and verifying whether newly displayed window is correctly displayed
     */
    clickOnSaveQueryButton(): void;
    /**
     * @description Creating and saving new query with name chosen in argument, QUERY NAME - analyzeMarketNewQuery1
     */
    saveNewQuery(queryName: string): void;
    /**
     * @description Clicking on the top-right side of a page menu, opening My Account, then moving to custom section provided in an argument
     * @param {string} moduleName - name of a section that we want to open
     */
    openModuleInMyAccount(moduleName: string): void;
    /**
     * @description Clicking on Resume query button of created query analyzeMarketNewQuery1 in My Account
     */
    clickOnResumeQuery(queryName: string): void;
    /**
     * @description Loading of query with name analyzeMarketNewQuery1
     */
    loadExistingQuery(queryName: string): void;
    /**
     * @description Clicking on Download PDF/Excel button in Analyze Market module and verifying whether newly displayed window is correctly displayed
     */
    clickOnDownloadPdfExcelButton(): void;
    /**
     * @description Download of PDF file
     * @param {string} comparisonAlias - Number of companies which will be compared with number got in Download section, has to be equal
     */
    downloadPdf(comparisonAlias: string): void;
    /**
     * @description Download of Excel file
     * @param {string} comparisonAlias - Number of companies which will be compared with number got in Download section, has to be equal
     */
    downloadExcel(comparisonAlias: string): void;
    /**
     * @description Clicking on button in the upper menu bar in Analyze Market module
     * @param {string} name - Name of a particular button
     * @param {string} headlineElement - Headline element selector
     * @param {string} headlineText - Text displayed on headline
     */
    clickOnMenuButton(
      name: string,
      headlineElement: string,
      headlineText: string
    ): void;
    /**
     * @description Loading portfolio - selecting by name and confirming - usage after clicking on Load portfolio button in Analyze Market module
     * @param {string} portfolioName
     */
    loadPortfolio(portfolioName: string, status: string): void;
    /**
     * @description Excluding portfolio in Analyze Market module by selected name and path to a searchbar
     * @param {string} portfolioName - Name of desired portfolio to exclude
     * @param {string} portfolioSearchPath - Selector of searchbar element to exclude portfolio
     */
    excludePortfolio(portfolioName: string, portfolioSearchPath: string): void;
    /**
     * @description Excluding selected campaign in Analyze Market module
     * @param portfolioName - Name of desired campaign to exclude
     */
    excludeCampaign(portfolioName: string, portfolioSearchPath: string): void;
    /**
     * @description Clicking on Start new search or Reset all filters above Exclusion box
     * @param buttonName - Literal name of selected button to click
     */
    clickOnResetAllFiltersButton(): void;
    /**
     * @description Creating new portfolio from Analyze Market section query
     * @param {string} buttonId - ID of the button that we want to select
     * @param {string} portfolioName - Desired name of portfolio to be saved
     * @param {string} comparisonAlias - Number of companies which will be compared with number got in final section of creating
     */
    saveList(
      buttonId: string,
      portfolioName: string,
      comparisonAlias: string
    ): void;
    /**
     * @description Sending loaded query to prospecting
     */
    sendQueryToProspecting(): void;
    /**
     * @description Extracting number of displayed companies in Prospecting section
     */
    getNumOfCompsProspecting(): Chainable<JQuery<HTMLElement>>;
    /**
     * @description Clicking on a side button of a graph section and opening graph details
     * @param {string} name - Name of selected graph that we want to access details about
     */
    openGraphDetails(name: string): void;
    /**
     * @description Using the right side button to send the portfolio to the "Other modules" with desired module specified in the argument
     * @param {string} module - Name of module that we want to send the portfolio to
     */
    sendToOtherModules(module: string): void;
    /**
     * @description Verifying whether portfolio is correctly opened in Analyze Market by checking "Based on" section and whether the companies number got lowered
     * @param {string} portfolioName - Portfolio that is currently opened
     * @param comparisonAlias - Initial number of companies that we want to compare in order to assert the change of numbers by opening portfolio
     */
    verifyPortfolioInAnalyzeMarketModule(
      portfolioName: string,
      comparisonAlias: string
    ): void;
    /**
     * @description Comparing the number of statuses that can be possibly select when opening portfolio in Analyze Market module
     * @param {number} num - Number that should be lower than our number of statuses
     */
    compareAMStatusCount(num: number): void;
    /**
     * @description Finding particular field in "Show by" section can be possibly select when opening portfolio in Analyze Market module
     * @param {string} string - Name of a field that we want to find in "Show by" section
     */
    findFieldInPortfolioShowBy(string: string): void;
    /**
     * @description Deleting query with a particular name when Your account section opened
     * @param {string} queryName - Name of a particular query that we want to delete
     */
    deleteQuery(queryName: string): void;
  }
}
