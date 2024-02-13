import "./support/commandsSalesTool";
import "../AnalyzeMarket/support/commandsAnalyzeMarket";
describe("Sales Tool - Goals", () => {
  it(
    "Creating and deleting a Goal",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      cy.checkIfOnDashboard();
      cy.openModuleInMyAccount("Goal and Tasks");
      cy.addGoal("testGoal", true);
      cy.deleteGoal("testGoal");
    }
  );
});
