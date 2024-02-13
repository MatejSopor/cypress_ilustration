declare namespace Cypress {
  interface Chainable {
    /**
     * @description Open the new appointment form from the header
     */
    clickOnCreateCampaign(): void;
    /**
     * @description Filling the particular campaign name while creating a new campaign
     * @param {string} name - Name that we want to use
     */
    fillCampaignName(name: string): void;
    /**
     * @description Selecting the start and end date while creating a new campaign
     */
    selectTheStartAndEndDate(): Cypress.Chainable<JQuery<HTMLElement>>;
    /**
     * @description Choosing the particular portfolio while creating new campaign
     * @param {string} portfolioName - Name of the portfolio that we want to associate with campaign
     */
    choosingPortfolio(portfolioName: string): void;
    /**
     * @description Choosing a goal while creating a new campaign
     */
    choosingGoal(): void;
    /**
     * @description Validating whether Description and Conversion rate page was displayed correctly
     */
    enterDescriptionAndSetConversionRate(): void;
    /**
     * @description Validating whether page has displayed correctly
     */
    checkIfSalestoolWasLoaded(): void;
    /**
     * @description Clicking on particular button by the name provided in the method argument
     * @param {string} buttonName - Name of a particular button
     */
    clickOnCampaignMenuButton(buttonName: string): void;
    /**
     * @description Assigning sales to "Third QA"
     */
    assignSales(): void;
    assignProduct(): void;
    /**
     * @description Testing whether user landed in the desired tab
     * @param {string} tabName - Name of desired tab
     */
    onActualTab(tabName: string): void;
    /**
     * @description Creating a new goal for testing in My Account section
     * @param {string} goalName - Name of the goal
     * @param {boolean} extraTask - Boolean value deciding whether goal should contain an additional task
     */
    addGoal(goalName: string, extraTask: boolean): void;
    /**
     * @description- Deleting a goal in My Account section with selection based on its name
     * @param {string} goalName - Name of a goal that we want to delete
     */
    deleteGoal(goalName: string): void;
    /**
     * @description Deletion of a particular campaign by its name, Campaign archive module must be opened before
     * @param {string} campaignName - Name of a particular campaign that we want to delete
     */
    removeCampaignFromArchive(campaignName: string): void;
    /**
     * @description Extracting of a number of companies at the campaign from the row in the Sales tool module
     * @param {string} campaignName - Name of the campain we want to select and get the number from
     */
    getNumberOfCampaignCompanies(
      campaignName: string
    ): Chainable<JQuery<HTMLElement>>;
    /**
     * @description Validating whether information about campaign are displaying correctly, validation based on end date and number of companies displayed in SalesTool module before and after opening the campaign
     * @param {string} endDate - End date saved in string - value previously extracted for example from the "To assign" section
     * @param {number} numOfCompanies - Number extracted before, must be the same as when opening campain
     */
    validateCampaign(endDate: string, numOfCompanies: string): void;
    /**
     * @description Adding note to a campaign - campaign has to be opened before using this command
     * @param {string} note - Particular note that we want to add to a campaign
     */
    addNoteCampaign(note: string): void;
    /**
     * @description Extracting number of companies from "Manage campaign" section
     * @example cy.returnManageCampaignCompanies().then((value) => {
        totalNumberOfCompanies = value;
      });
     */
    returnManageCampaignCompanies(): Chainable<JQuery<HTMLElement>>;
    /**
     * @description Command used for accessing slider inputs at filters
     * @example cy.getFilterInput().eq(1).clear().type("10{enter}"); //setting max value to 10
     */
    getFilterInput(): Chainable<JQuery<HTMLElement>>;
    /**
     * @description Opening the first company displayed in Manage campaign section and verifying whether the page has responded correctly
     */
    openFirstCompanyDetailsInTheList(): void;
    /**
     * @description When opened company details, this command is used to navigate to a particular section that is desired to be visited
     * @param {string} sectionName - Name of the section that we want to visit
     */
    navigateToCompanyDetailsSection(sectionName: string): void;
    /**
     * @description When opened Company details section, extracting the particular data that we want to obtain - possible to choose the section in the command argument
     * @param {string} type - Name/type of an information that we want to obtain
     */
    extractCompanyDetail(type: string): Chainable<JQuery<HTMLElement>>;
    /**
     * @description When in Manage Campaign section, sorting of a table is possible by using the filter as an argument in the method
     * @param {string} orderBy - Name of a filter how we want to sort the table
     */
    chooseFromOrderBySection(orderBy: string): void;
    /**
     * @description Renewing campaign from Archive section with name "campaignToBeRenewed"
     * @param {string} campaignName - Name of the campaign to be renewed
     */
    renewCampaign(campaignName: string): void;
    /**
     * @description When campaign opened, clicking on Download PDF/Excel button and downloading PDF
     */
    downloadCampaignPdf(): void;
    /**
     * @description When Manage campaign section opened, changing task of the first displayed company to (sub)string provided in an argument
     * @param {string} taskName - Task to be selected
     */
    changeFirstTask(taskName: string): void;
    /**
     * @description When Manage campaign section opened, changing task of all companies to (sub)string provided in an argument by using Group actions functionality
     * @param taskName - Task to be selected
     */
    changeAllTasks(taskName: string): void;
    /**
     * @description When on Dashboard module, selecting a campaign to be displayed in a widget - name of campaign provided in an argument
     * @param campaignName - Name of the campaign to be selected
     */
    addCampaignToDashboard(campaignName: string): void;
    /**
     * @description Selecting custom variable with name provided in method argument
     * @param {string} varName - Name of particular custom variable
     */
    selectCustomVariable(varName: string): void;
    /**
     * @description Assigning 2 sales using Group actions
     * @param {string} username - Name of a particular Sales that we want to assign companies to
     */
    assignSalesGroupActions(username: string): void;
    /**
     * @description Deletion of note in campaign overview
     */
    deleteNoteCampaign(): void;
    /**
     * @description Validating various data displayed when opening campaign overview as a Sale
     */
    checkCampaignOverviewAsSale(): void;
    /**
     * @description Validating various data displayed when opening campaign overview as an Area Manager
     */
    checkCampaignOverviewAsAreaManager(): void;
    /**
     * @description Downloading campaign Excel file
     */
    downloadCampaignXlsx(): void;
    /**
     * @description Toggling the switch in Exclusion box -> Exclude enriched companies
     */
    excludeEnrichedCompanies(): void;
  }
}
