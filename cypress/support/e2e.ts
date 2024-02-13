import "./commands";
const addContext = require("mochawesome/addContext");
const registerCypressGrep = require("@cypress/grep");
registerCypressGrep();

beforeEach(() => {
  window.logCalls = 1;
  window.testFlow = [];

  cy.viewport(1920, 1080);

  if (Cypress.env("autoLogin")) {
    cy.loginWithPageSession();
    cy.pageIsLoaded();
  }
});

Cypress.on("fail", (err) => {
  err.message += `${"\n\n" + "Test flow was:\n\n"}${window.testFlow.join(
    "\n"
  )}`;
  throw err;
});

Cypress.Commands.overwrite("log", (...args) => {
  const msg: string = args[1];

  Cypress.log({
    displayName: `--- ${window.logCalls}. ${msg} ---`,
    message: "\n",
  });

  window.testFlow.push(`${window.logCalls}. ${msg}`);
  window.logCalls++;
});

/*            Hooks               */
/* append cy.log messages to the window error message */
Cypress.on("test:after:run", (test, runnable) => {
  const titleToFileName = (title: string) => title.replace(/[:\/]/g, "");

  if (test.state === "failed") {
    let parent = runnable.parent;
    let filename = "";

    // get screenshot name
    while (parent && parent.title) {
      filename = `${titleToFileName(parent.title)} -- ${filename}`;
      parent = parent.parent;
    }
    filename += `${titleToFileName(test.title)} (failed).png`;
    addContext(
      { test },
      {
        title: "Report video",
        value: "VideoPath: " + Cypress.spec.absolute.replace(/\\/g, "/"),
      }
    );
  }
});
