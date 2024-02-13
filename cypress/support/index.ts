export {};

// cypress/support/index.ts
Cypress.Commands.add("dataCy", (value) => {
  return cy.get(`[data-cy=${value}]`);
});

declare global {
  interface Window {
    logCalls: number;
    testFlow: string[];
  }

  namespace Cypress {
    interface Chainable {
      /**
       * @description Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<JQuery<HTMLElement>>;

      /**
       * @description - Logging to the webside with credentials providen in configuration file
       */
      loginWithPageSession(): void;

      /**
       * @description - When filter selection is correctly open, a box is displayed. This method finds particular filter via searchbar, checks it and saves it
       * @param {string} path - Searchbar selector
       * @param {string} filterName - Name of a particular filter that we want to apply (works best when the filter name exact)
       * @example cy.clickOnFilter("standardFilters", "Company Filters");
       */
      clickOnFilter(filterPath: string, filterGroup: string): void;

      /**
       * @description - Validating whether desired text is displayed when opening a particular module
       */
      findAllCompaniesLabel(): void;

      /**
       * @description - Checking whether login was succesfull and Dashboard is displayed
       */
      checkIfOnDashboard(): void;

      /**
       * @description - Switching to desired module by using ID and verifying module name after clicking
       * @param {string} path - ID of a desired module
       * @param {string} moduleName - Headline of a module which is currently active for user
       */
      clickOnModule(path: string, moduleName: string): void;

      /**
       * @description - When filter selection is correctly open, a box is displayed. This method finds particular filter via searchbar, checks it and saves it
       * @param {string} path - Searchbar selector
       * @param {string} filterName - Name of a particular filter that we want to apply (works best when the filter name exact)
       */
      applyFilter(path: string, filterName: string): void;

      /**
       * @description - Validates whether selected filter is correctly enabled and visible at the group of filters
       * @param {string} filterSection - ID of a filter we want to assert
       */
      filterSectionIsPresent(
        filterSection: string
      ): Chainable<JQuery<HTMLElement>>;

      /**
       * @description - Validating whether chosen filters are active - displayed. Searching by their exact names or substrings
       * @param {array} spanArray - Array of element names that we want to validate
       */
      checkIfFiltersAreApplied(spanArray: string[]): void;

      /**
       * @description - Traversing through array of element names (or their substrings) by clicking arrow icon at the side of the span, best usage when selecting a filters
       * @param {array} spanArray - Array of names or substrings of elements that we want to traverse through
       * @example cy.clickOnArrowIcon(["ABRUZZO", "CHIETI (PROVINCE)", "ATESSA"]);
       */
      clickOnArrowIcon(spanArray: string[]): void;

      /**
       * @description - Deleting particular subfilter by clicking on the X button next to the name of filter, selecting filter by name or substring
       * @param {string} span - Particular filter name that should be deleted
       */
      deleteSelectedFilter(span: string): void;

      /**
       * @description - Obtaining a particular number of companies displayed at the top of the page, storing number into a variable that can be later accessed
       */
      returnNumOfCompanies(): Chainable<JQuery<HTMLElement>>;

      /**
       * @description - Clicks on the ant-dropdown-trigger and sets language
       * @param {string} language - Language that we want to set
       */
      switchLanguage(language: string): void;

      /**
       * @description - Clicks on the Contact Us element to open the Contact Us Form
       */
      openContactUs(): void;

      /**
       * @description - Clears, sets and sends the Contact Us Form
       */
      sendContactUs(): void;

      /**
       * @description - Checks ant-modal-content class content
       */
      checkContactUsModal(): void;

      /**
       * @description - Clicks on the element with the id ta-logout
       * @example logoutUser()
       */
      logOutUser(): void;

      /**
       * @description - Checks that the loading fallback and spinning elements are not present
       */
      pageIsLoaded(): void;

      /**
       * @description - Get and cliks on the footer element, if it should exist
       * @param {string} element - Name of an element we want to select
       * @param {boolean} shouldExist - true/false
       */
      handleFooterElement(element: string, shouldExist: boolean): void;

      /**
       * @description - Creating a new appointment, filling out the form
       */
      createNewAppointment(): void;

      /**
       * @description - Filling out whole appointment form
       */
      fillOutAppointmentForm(): void;

      /**
       * @description - Obtaining a number next to a subfilter when selecting it , usage for comparison of numberOfCompaniesChange
       */
      getNumberAtFilter(filterName: string): Chainable<JQuery<HTMLElement>>;

      waitForAlertBox(
        message: string,
        name: string,
        buttonName?: string,
        moduleName?: string
      ): void;

      /**
       * @description Custom command handles and closes alert box which usualy appears after downloading a file or uploading a portfolio
       * @example
       *  cy.handleAlertBox('The portfolio has been uploaded successfully.')
       *  cy.handleAlertBox('The portfolio has been uploaded successfully.', { buttonName: "Open", moduleHeading: "Portfolio Management" });
       *  cy.handleAlertBox('The file has bed downloaded.', { moduleName: "portfolio-management"., timeout: 60000 });
       */
      handleAlertbox(
        message: string,
        options?: {
          buttonName: string;
          moduleName?: string;
          moduleHeading?: string;
          timeout?: number;
        }
      );

      confirmModalContent(
        heading: string,
        text: string,
        confirmButton: string
      ): void;

      /**
       * @description - Searching for the button names on website and validating whether they are visible
       * @param {Array} buttonsArray
       */
      buttonsAreVisible(buttonsArray: Array<string>): void;
      openFilterSelection(id: string): void;
      /**
       * @description - Waiting to apply filters
       */
      waitUntilFiltersAreApplied(): void;

      /**
       * @description - Select inside filter section
       * @param filterId
       */
      insideFilterSection(filterId: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to verify that file has been downloaded
       * @example
       *  cy.verifyDownload('filename.zip')
       *  cy.verifyDownload('filename.zip', { timeout: 20000 });
       *  cy.verifyDownload('.zip', { softMatch: true });
       */
      verifyDownload(
        fileName: string,
        options?: { timeout?: number; softMatch?: boolean }
      ): Chainable<boolean>;

      getFirstDownloadedFileName(): Cypress.Chainable<string>;

      deleteDownloads(): Cypress.Chainable<boolean>;

      /**
       * @description removes specified file from downloads folder
       * @example
       *  cy.removeDownloadedFile("PortfolioTemplate.xlsx")
       */
      removeDownloadedFile(fileName: string): Cypress.Chainable<null>;

      /**
       * @description Parses specified file from downloads folder to json 
       * format so it can udergo cell comparison. Cypress task with the same
       * name is dispatched under the hood that handles the parsing. This command 
       * is essentialy cy wrapper around that task.
       * @example
       *   cy.parseExcelToJSON("PortfolioTemplate.xlsx").then(json => {
       *      cy.log(JSON.stringify(json))
       *   })
       */
      parseExcelToJSON(fileName: string): Cypress.Chainable<null>;

      /**
       * @description checks ant-dropdown-trigger.ant-btn and gets the language
       */
      getLanguage(): Cypress.Chainable<string>;

      /**
       * @description  clicks on the ant-dropdown-trigger and sets language
       */
      setLanguage(language: string): void;

      /**
       * @description saves the languageValue, languageText language
       */
      saveLanguage(languageValue: string, languageText: string): void;

      /**
       * @description navigates to the account page
       */
      navigateToAccount(): void;

      /**
       * @description calls Login-As functionality
       */
      logAsUser(asUser: string): void;

      /**
       * @description calls Change Password functionality
       * @param oldPassword
       * @param newPassword
       */
      changePassword(oldPassword: string, newPassword: string): void;

      /**
       * @description click on module tab
       * @param tabName
       */
      clickOnTab(tabName: string): void;

      /**
       * @description checks if given numbers of rows correctly rendered
       * @param totalNumber
       */
      getTotalNumberOfTableRows(totalNumber: number): void;

      /**
       * @description verifys that parameter name is contained inside tbody
       * @param name
       */
      clickOnCampaignPortfolioCompany(
        name: string
      ): Chainable<JQuery<HTMLElement>>;

      /**
       * Custom command to verify, that buttons in input list are enabled
       * @param buttonsArray - string[]
       */
      buttonsAreEnabled(buttonsArray: string[]): void;

      /**
       * Custom command to verify, that buttons in input list are disabled
       * @param buttonsArray - string[]
       */
      buttonsAreDisabled(buttonsArray: string[]): void;

      /**
       * Custom command to return number of companies in table
       */
      getCompanyCount(): Chainable<number>;

      /**
       * Custom command to go trought query wizard
       * @param name - string
       */
      saveNewQuery(name: string): void;

      /**
       * Custom command to check, if query exists
       * @param name - string
       */
      checkQueryExistance(name: string): void;

      /**
       * Custom command for query loading
       * @param name - string
       */
      loadQuery(name: string): void;

      /**
       * Custom command to go trought portfolio wizard
       * @param name - string
       */
      newPortfolioWizzard(name: string): void;

      /**
       * Custom command to go trought excel download wizard
       */
      downloadExcelWizzard(): void;

      /**
       * @description When in Portfolio Management module, searching for portfolio provided in argument by using searchbar
       * @param {string} portfolioName - Name of the portfolio that we want to select
       */
      findItemThroughSearch(name: string, placeholder: string): void;
    }
  }
}
