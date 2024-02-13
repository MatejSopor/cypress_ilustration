declare namespace Cypress {
    interface Chainable {
      /**
       * @description return number of rings
       */
      getNumberOfRings(apiUrl: string, availableRings: string): void;
      companyUnenrichment(id: string, apiEnrichUrl: string): void;
      companyInfo(apiUrl: string, id: string):void;
    }
}  