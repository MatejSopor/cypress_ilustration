type boundaryType = "min" | "max";

export const Slider = {
  /**
   * Get minimum or maximum allowed value for a Range Filter
   * @param {string} filterGroupSelector : filter group selector
   * @param {boundaryType} boundaryType: get minimum or maximum allowed value for filter
   * @returns {Cypress.Chainable<number>} allowed amount
   * @example Slider.getAllowedBoundary("[id='businessInfo.turnover']", "max")
   */
  getAllowedBoundary(
    filterGroupSelector: string,
    boundaryType: boundaryType
  ): Cypress.Chainable<number> {
    cy.get(filterGroupSelector).within(function () {
      cy.get("[role='slider'][aria-valuemax][aria-valuemin]").then(
        function ($sliderButton) {
          const sliderBoundary: number = Number(
            $sliderButton.attr(`aria-value${boundaryType}`)
          );
          cy.wrap(sliderBoundary).as("sliderBoundary");
        }
      );
    });
    return cy.get("@sliderBoundary").then(Number);
  },

  /**
   * Get a reference to slider's Left Input that is used to setup a maximum filter range
   * @param filterGroupSelector : filter group selector
   * @returns reference to slider's left input
   * @example Slider.getInputLow("[id='businessInfo.turnover']")
   */
  getInputLow(
    filterGroupSelector: string
  ): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(filterGroupSelector).find('input[role="spinbutton"]').first();
  },

  /**
   * Get a reference to slider's Right Input that is used to setup a maximum filter range
   * @param filterGroupSelector : filter group selector
   * @returns reference to slider's right input
   * @example Slider.getInputHigh("[id='businessInfo.turnover']")
   */
  getInputHigh(
    filterGroupSelector: string
  ): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(filterGroupSelector).find('input[role="spinbutton"]').last();
  },

  /**
   * Resets the slider to it's initial state
   * @param filterGroupSelector : filter group selector
   * @example Slider.reset("[id='businessInfo.turnover']")
   */
  reset(filterGroupSelector: string): void {
    cy.contains(`${filterGroupSelector} button`, "Reset").click();
  },
};
