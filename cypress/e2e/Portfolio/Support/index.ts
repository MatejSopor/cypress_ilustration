interface innerSchema {
  data: string[][]
}

type responseSchemaType = innerSchema[]

type basePortfolioSchemaType = string[][]
type marketingPortfolioSchemaType = (string | number)[][]

type completePortfolioSchemaType = (string | number)[][]

type comparisonSchemaType =
  | basePortfolioSchemaType
  | marketingPortfolioSchemaType
  | completePortfolioSchemaType

type schemasNameType =
  | "czIntPortfolioSchemas"
  | "czQaPortfolioSchemas"
  | "gerIntPortfolioSchemas"
  | "gerQaPortfolioSchemas"
  | "itaIntPortfolioSchemas"
  | "itaQaPortfolioSchemas"
  | "itaUatPortfolioSchemas"
  | "cheIntPortfolioSchemas"
  | "cheUatPortfilioSchemas"

type localesType = "cs-CZ" | "sk-SK" | "en-GB" | "it-IT" | "de-DE"

type langType = "CZ" | "EN" | "SK" | "IT" | "DE"

type currencyType = "eur" | "czk"

declare namespace Cypress {
  interface Chainable {
    /**
     * @description visits premade enriched portfolio
     */
    visitEnrichedPortfolio(): void

    /**
     * @description clicks on top portfolio action button with specified data-pf-id slector and returns it
     * @example cy.clickOnTopActionButton("left-action-1", "Some Text")
     */
    clickOnTopActionButton(
      actionButtonSelector: string,
      buttonText: string
    ): Chainable<JQuery<HTMLElement>>

    /**
     * @description selects type of excel file to download
     * @example
     *  cy.selectExcelType("Base")
     */
    selectExcelType(type: string): void

    /**
     * @description waits for portfolio download notification alert box to appear and clicks download
     */
    waitForAlertBoxAndDownload(downloadBtnText: string): void

    /**
     * @description globally looks for button with specified text and clicks it
     * @example
     *  cy.clickButton("Continue")
     */
    clickButton(buttonText: string): Chainable<JQuery<HTMLElement>>

    /**
     * @description Fucntion verifies porfolio excel headers or data to specified comparison schema.
     */
    verifyDownloadedPortfolio(
      downloadedPortfolioName: string,
      comparisonSchema: comparisonSchemaType
    ): void

    /**
     * @description fuction for locating and clicking download button for specified portfolio template type
     */
    downloadExcelTemplate(templateType: string): void

    /**
     * @description fuction for checking number on marker on map with number in list
     */
    checkMarkerCount(): void

    /**
     * @description fuction for getting number of companies from wrapper (Companies, Enriched, Not enriched...)
     */
    getNumOfCompanies(tag: string, wrap: string): void

    /**
     * @description fuction for checking number of companies in table and total number
     */
    checkGridResult(numOfCompanies: number): void

    /**
     * @description custom command to create portfolio with API
     */
    createPortfolioWithCompaniesAPI(
      name: string,
      companies: string[],
      id: string,
      apiUrl: string,
      country: string
    ): any

    /**
     * @description custom command to delete portfolio with API
     */
    deletePortfolioAPI(portfolioId: string, apiUrl: string): void

    /**
     * @description function for cleaning up temporary portfolios with timestamp
     */
    portfolioCleanup(): void

    /**
     * @description funciton for getting the portfolio destination id from location pathname, this id can be then used to send
     *  request to delete / update the portfolio programmaticly
     */
    getDestinationId(linkName: string): void

    /**
     * @description function for downloading portfolio with API request
     */
    downloadPortfolioAPI(
      portfolioId: string,
      options: {
        portfolioType: "Base" | "Standard" | "Complete"
        language: "cs-CZ" | "sk-SK" | "en-GB"
        currency: "czk" | "eur"
      }
    ): void

    /**
     * @description funciton for creating portfolio without companies
     */
    createPortfolioAPI(
      portfolioName: string,
      portfolioId: string,
      apiUrl: string
    ): void

    /**
     * @description funciton for adding companies to portfolio
     */
    addCompaniesToPortfolioAPI(
      companiesId: string[],
      identificationCodes: string[],
      portfolioId: string,
      apiUrl: string
    ): void

    /**
     * @description selects portfolio properties when creating custom track
     */
    selectCustomTrackProperties(lang: langType): void

    /**
     * @description selects custom track property
     */
    selectOneCustomProperty(propertyLabel: string): void

    /**
     * @description selects custom track property category
     */
    selectCustomTrackCategory(
      categoryName: string
    ): Chainable<JQuery<HTMLElement>>
    /**
     * @description clicks load more button until all portfolios are displayed
     * @param {number} total total number of portfolios from json response body
     */
    clickLoadMore(total: number): void

    /**
     * @description adding company to portfolio
     */
    addCompanyToPortfolioAPI(
      companiesId: string[],
      identificationCodes: string[],
      portfolioId: string,
      apiUrl: string
    ): void

    /**
     * @description clicks on porfolio list tab
     */
    clickOnPortfolioListTab(tabName: string)

    /**
     * @description checks if portfolio sharing indicator or exlude portfolio from sharing exists
     */
    checkPortfolioIndicator(
      shouldExist: "exist" | "not.exist",
      portfolioIntercetpAlias: string
    )

    /**
     * @description turn on sharing or exlude from sharing
     */
    togglePortfolioSharing(typeOfOperationSelector: string, areaManager: string)

    /**
     *
     * @description assert company count after upload or update portfolio
     */
    assertCompanyCountAfterQuery(updatedCompanyCount: string)
  }
}
