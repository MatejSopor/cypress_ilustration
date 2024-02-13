import "./support/commandsOperations";
import "./support/commandsFiltersSetting";
describe("Operations - Filters", () => {
  it("2 Basic filter", { tags: ["@ITA", "@CZSK", "@GER"] }, () => {
    cy.visit("/");
    cy.visitOperationsAndAddRule();
    cy.buttonsAreEnabled(["Start new search", "Load Query"]);
    cy.buttonsAreDisabled([
      "Save Query",
      "Save List",
      "Download Excel",
      "Add rule",
      "Add group",
      "Search",
    ]);
    cy.setGeoFilter();
    cy.countFilterResults();
    cy.buttonsAreEnabled([
      "Load Query",
      "Save Query",
      "Save List",
      "Download Excel",
      "Show Query",
    ]);
    cy.checkMarkerCount();
  });

  it("6 Checkbox filter", { tags: ["@ITA", "@CZSK", "@GER"] }, () => {
    cy.visitOperationsAndAddRule();
    cy.setCheckBoxFilter();
    cy.buttonsAreDisabled(["Save List", "Download Excel"]);
    cy.get("button[type='button']")
      .contains("Search")
      .should("be.visible")
      .click();
    cy.buttonsAreEnabled([
      "Load Query",
      "Save Query",
      "Save List",
      "Download Excel",
      "Show Query",
    ]);
  });

  it("8 Min Max filter", { tags: ["@ITA", "@CZSK", "@GER"] }, () => {
    cy.visitOperationsAndAddRule();
    cy.setMinMaxFilterBegin();
    cy.buttonsAreEnabled(["Start new search", "Load Query"]);
    cy.buttonsAreDisabled([
      "Save Query",
      "Save List",
      "Download Excel",
      "Add rule",
      "Add group",
      "Search",
    ]);
    cy.setMinMaxFilterEnd();
    cy.get("button[type='button']")
      .contains("Search")
      .should("be.visible")
      .click();
    cy.buttonsAreEnabled([
      "Load Query",
      "Save Query",
      "Save List",
      "Download Excel",
      "Show Query",
    ]);
  });

  it("10 Date filter", { tags: ["@ITA", "@CZSK", "@GER"] }, () => {
    cy.visitOperationsAndAddRule();
    cy.setDateFilterBegin();
    cy.buttonsAreEnabled(["Start new search", "Load Query"]);
    cy.buttonsAreDisabled([
      "Save Query",
      "Save List",
      "Download Excel",
      "Add rule",
      "Add group",
      "Search",
    ]);
    cy.setDateFilterEnd();
    cy.get("button[type='button']")
      .contains("Search")
      .should("be.visible")
      .click();
    cy.buttonsAreEnabled([
      "Load Query",
      "Save Query",
      "Save List",
      "Download Excel",
      "Show Query",
    ]);
  });

  it("12 And/Or operator filter", { tags: ["@ITA", "@CZSK", "@GER"] }, () => {
    cy.visitOperationsAndAddRule();
    cy.setTwoFilters();
    cy.get("button[type='button']")
      .contains("Search")
      .should("be.visible")
      .click();
    cy.buttonsAreEnabled([
      "Load Query",
      "Save Query",
      "Save List",
      "Download Excel",
      "Show Query",
    ]);
    cy.pageIsLoaded();
    cy.getCompanyCount().as("firstResult");
    cy.findByText("Show Query").click();
    cy.switchAndToOr();
    cy.get("button[type='button']")
      .contains("Search")
      .should("be.visible")
      .click();
    cy.buttonsAreEnabled([
      "Load Query",
      "Save Query",
      "Save List",
      "Download Excel",
      "Show Query",
    ]);
    cy.pageIsLoaded();
    cy.getCompanyCount().then((secondResult: number) => {
      cy.get("@firstResult").then((firstResult) => {
        expect(firstResult, "compare counters").to.be.below(secondResult);
      });
    });
  });

  it("14 And/Or operator filter 2", { tags: ["@ITA", "@CZSK", "@GER"] }, () => {
    cy.visitOperationsAndAddRule();
    cy.setTwoFilters2();
    cy.get("button[type='button']")
      .contains("Search")
      .should("be.visible")
      .click();
    cy.buttonsAreEnabled([
      "Load Query",
      "Save Query",
      "Save List",
      "Download Excel",
      "Show Query",
    ]);
    cy.pageIsLoaded();
    cy.getCompanyCount().as("firstResult");
    cy.findByText("Show Query").click();
    cy.switchAndToOr();
    cy.get("button[type='button']")
      .contains("Search")
      .should("be.visible")
      .click();
    cy.buttonsAreEnabled([
      "Load Query",
      "Save Query",
      "Save List",
      "Download Excel",
      "Show Query",
    ]);
    cy.pageIsLoaded();
    cy.getCompanyCount().then((secondResult: number) => {
      cy.get("@firstResult").then((firstResult) => {
        expect(firstResult, "compare counters").to.be.below(secondResult);
      });
    });
  });

  it("24 Start new search", { tags: ["@ITA", "@CZSK", "@GER"] }, () => {
    cy.visitOperationsAndAddRule();
    cy.setValueFilter();
    cy.createNewGroupAndResetFilter();
    cy.contains("Start new search").click();
    cy.get('[class^="components__FilterExpressionBox"]').should("not.exist");
  });
});
