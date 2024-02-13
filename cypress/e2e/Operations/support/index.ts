declare namespace Cypress {
    interface Chainable {

        /**
        * @description custom command to redirect to Operations and click on Add rule
        */
        visitOperationsAndAddRule(): void

        /**
        * @description custom commands to set filters in Operations
        */
        setGeoFilter(): void
        setCheckBoxFilter(): void
        setMinMaxFilterBegin(): void
        setMinMaxFilterEnd(): void
        setDateFilterBegin(): void
        setDateFilterEnd(): void
        setTwoFilters(): void
        setTwoFilters2(): void
        setValueFilter(): void
        createNewGroupAndResetFilter():void

        /**
        * @description custom command to check number of filtered companies and number on marker on map
        */
        checkMarkerCount(): void

        /**
        * @description custom command to switch and/or in filter dropdown
        */
        switchAndToOr(): void

        /**
        * @description custom command to check, if values in saved and loaded filters are correct
        */
        checkLoadedFilter(): void

        /**
        * @description custom command to compare number of companies in top left box above table and companies in table
        */
        countFilterResults(): void
        
        /**
        * @description custom command to let to choose companies by checkbox in filtered companies list, which will be then included in list or excel
        * @param {string} action - can be "Save list" or "Download Excel", depends on expectations
        */
        groupAction(action: string): void

        /**
        * @description custom command to delete Query with API request
        */
        deleteQueryAPI(queryId: string, apiUrl: string): void

        /**
        * @description custom command to delete Portfolio with API request
        */
        deletePortfolioAPI(portfolioId: string, apiUrl: string): void

        /**
        * @description custom command to delete Excel with API request
        */
        deleteExcelAPI(excelId: string, apiUrl: string): void
    }
}