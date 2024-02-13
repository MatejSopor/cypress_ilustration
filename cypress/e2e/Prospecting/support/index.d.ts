declare namespace Cypress {
  interface Chainable {
    /**
     * @desc : navigates to a given location in Header Menu
     * @param location Menu location
     */
    headerMenuNavigateTo(location: string): void;

    /**
     * @returns The number of filtered companies
     */
    prospectingCompaniesAmount(): Cypress.Chainable<Number>;

    /**
     * Get the amount of companies inside active filter menu
     * @param filterName: string
     * @return Amount of filtered companies
     */
    getFilterResultAmount(filterName: string): Chainable<JQuery<HTMLElement>>;

    /**
     * @description Removes filter from the filter menu
     * @param path Selector to a search box
     * @param filterName Name of the filter which will be typed into
     *                   search box that is selected by path
     * @example cy.removeFilter("[placeholder='Search']", "Geographic area");
     */
    removeFilter(path: string, filterName: string): void;

    /**
         * @param expectedCompanyFilters List of filter names which should be visible in the Funnel in Prospecting
         * @example
         *  const expectedCompanyFilters = [
                "Status company",
                "Office type",
                "Geographic area",
            ];
            cy.validateFunnelTooltips(expectedCompanyFilters);
         *
         */
    validateFunnelTooltips(expectedCompanyFilters: Array<string>): void;

    /**
     * @description creating campaign using API and portfolio and goal
     */
    createCampaignFromPortfolioAPI(
      name: string,
      portfolioId: string,
      goalId: string,
      campaignIdName: string,
      apiUrl: string
    ): void;

    /**
     * @description creating Goal using API
     */
    createGaolAPI(
      goalName: string,
      taskName: string,
      goalIdName: string,
      apiUrl: string
    ): void;

    /**
     * @description deleting Goal using API
     */
    deleteGoalAPI(goalId: string, apiUrl: string): void;

    /**
     * @description stopping campaign using API
     */
    stopCampaignAPI(campaignId: string, apiUrl: string): void;

    /**
     * @description deleting campaign using API
     */
    deleteCampaignAPI(id: string, apiUrl: string): void;
  }
}
