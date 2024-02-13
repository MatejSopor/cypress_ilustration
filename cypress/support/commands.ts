/// <reference types="@testing-library/cypress" />
/// <reference types="@walmyr-filho/cy-press" />
import "@testing-library/cypress/add-commands";
import "cypress-real-events";
import "@walmyr-filho/cy-press";

Cypress.Commands.add("loginWithPageSession", () => {
  cy.session(
    [],
    () => {
      let persistUser = {
        token: "",
        claims: "111",
        products: "[]",
        _persist: '{"version":-1,"rehydrated":true}',
        selectedLanguage: '"en-GB"',
        selectedCurrency: '"eur"',
      };

      cy.request({
        method: "POST",
        url: `${Cypress.env("apiUrl")}/api/session/login`,
        body: {
          username: Cypress.env("username"),
          password: Cypress.env("password"),
          forceLogoutPreviousSessions: false,
        },
      }).then((resp) => {
        persistUser.token = `\"${resp.body.token}\"`;
        // set session token in local storage
        window.localStorage.setItem(
          "persist:user",
          JSON.stringify(persistUser)
        );
        // set other application settings

        // accept user centric
        window.localStorage.setItem("uc_user_interaction", "true");
        window.localStorage.setItem("uc_ui_version", "3.22.0");
        window.localStorage.setItem(
          "uc_settings",
          JSON.stringify(Cypress.env("uc_settings"))
        );

        window.localStorage.setItem("tabs", JSON.stringify({ "": 1 }));
      });
    },
    {
      validate() {
        // get session token
        expect(window.localStorage).to.have.property("persist:user");
        const user = JSON.parse(window.localStorage.getItem("persist:user"));
        expect(user.token).to.not.eq("null");

        let authToken = user.token.replace(/[\"]/g, "");
        authToken = `Bearer ${authToken}`;

        // Ensure that session token did not expired
        cy.request({
          url: `${Cypress.env("apiUrl")}/api/session`,
          headers: {
            authorization: authToken,
          },
        }).should("have.property", "status", 200);
      },
      cacheAcrossSpecs: true,
    }
  );
});

Cypress.Commands.add("findAllCompaniesLabel", () => {
  cy.findByText(Cypress.env("allCompaniesLabel")).should("be.visible");
});

Cypress.Commands.add("checkIfOnDashboard", () => {
  cy.visit("/");
  cy.get('[data-testid="dashboard-title"]', { timeout: 15000 }).should(
    "have.text",
    "Your Dashboard"
  );
});

Cypress.Commands.add("clickOnModule", (path, moduleName) => {
  cy.get(`[data-pf-id='/${path}'`).click();
  cy.pageIsLoaded();
  cy.get("h1").should("have.text", moduleName);
});

Cypress.Commands.add("clickOnFilter", (filterPath, filterGroup) => {
  cy.get(`[data-pf-id="${filterPath}"]`).within(() => {
    cy.get("h3").should("have.text", filterGroup).click();
  });
});

Cypress.Commands.add("applyFilter", (path, filterName) => {
  const regexPattern = new RegExp(
    `^${filterName}(\\s\\([\\d,]+\\))?\\s*$`,
    "gm"
  );
  cy.get("[data-pf-id='selection-filters']").within(() => {
    cy.get(path).click().type(`${filterName}{enter}`);
    cy.contains("span", regexPattern).click();
    cy.findAllByText("Save filters & close").click();
  });
});

Cypress.Commands.add("filterSectionIsPresent", (filterSection) => {
  return cy.get(`[id*='${filterSection}'`).should("be.visible");
});

Cypress.Commands.add("checkIfFiltersAreApplied", (spanArray) => {
  cy.pageIsLoaded();
  cy.get('[class^="Drawer__DrawerComponent"]').within(() => {
    spanArray.forEach((span) => {
      cy.get("span").contains(span).should("be.visible");
    });
  });
});

Cypress.Commands.add("clickOnArrowIcon", (spanArray) => {
  cy.get("[data-pf-id='selection-filters']").within(() => {
    spanArray.forEach((span) => {
      cy.get("span")
        .contains(span)
        .siblings("[aria-label='expand tree node']")
        .click();
    });
  });
});

Cypress.Commands.add("deleteSelectedFilter", (span) => {
  cy.get("span").contains(span).siblings().click();
});

Cypress.Commands.add("returnNumOfCompanies", () => {
  cy.pageIsLoaded();
  cy.get("[data-testid='spin']").should("not.exist");
  cy.get(".ant-spin-dot ant-spin-dot-spin").should("not.exist");
  cy.get("[class*='TabsContainer']").within(() => {
    cy.get("span").contains("Compan").as("tabWithCompaniesNumber");
  });
  cy.get("@tabWithCompaniesNumber")
    .invoke("text")
    .then((value) => {
      let totalNumberOfCompanies = parseInt(value.replace(/\D/g, ""));
      cy.wrap(totalNumberOfCompanies).as("numOfCompanies");
    });
  return cy.get("@numOfCompanies");
});

Cypress.Commands.add("pageIsLoaded", () => {
  const elements = [
    '[data-testid="loading-overlay-page"]',
    '[data-testid="loading-screen-fallback"]',
    ".ant-btn-loading-icon",
    ".ant-skeleton",
    ".ant-spin-dot",
    ".ant-spin-spinning",
    ".anticon-loading",
  ];
  cy.wrap(elements).each((element: string) => {
    cy.get(element, { timeout: 30000 }).should("not.exist");
  });
});

Cypress.Commands.add("getLanguage", () => {
  cy.pageIsLoaded();
  cy.get("button[class*='LanguageSwitch']").then(($button) => {
    const languageCode = $button.text().trim().substring(0, 2);
    cy.log("Current getLanguage: " + languageCode);
    return cy.wrap(languageCode);
  });
});

Cypress.Commands.add("setLanguage", (language) => {
  cy.pageIsLoaded();
  cy.getLanguage().then((languageCode) => {
    if (languageCode !== language) {
      cy.get("button[class*='LanguageSwitch']")
        .should("be.visible")
        .click({ multiple: true, force: true })
        .then(() => {
          cy.get(".ant-dropdown-menu-item")
            .contains(language)
            .should("be.visible")
            .click({ multiple: true, force: true })
            .then(() => {
              cy.pageIsLoaded();
              cy.get(".ant-dropdown-trigger.ant-btn")
                .should("be.visible")
                .should("contain", language);
              cy.log("Current setLanguage: " + language);
            });
        });
    } else {
      cy.log("Language is already set to: " + language);
    }
  });
});

Cypress.Commands.add("saveLanguage", (languageValue, languageText) => {
  cy.pageIsLoaded();
  cy.setLanguage("EN");
  cy.pageIsLoaded();
  cy.visit("/account");
  cy.contains("Language")
    .parents('[class*="PaleBox"]')
    .within(() => {
      cy.contains("Edit").click({ force: true });
    });
  cy.get("div[class='ant-modal-body").within(() => {
    cy.findByText(languageText);
    cy.get(`input[value='${languageValue}']`).click();
  });
  cy.findByText("Save").click();
});

Cypress.Commands.add("handleFooterElement", (element, shouldExist) => {
  if (shouldExist == true) {
    cy.get("div[id='footer']:visible")
      .contains(element)
      .should("be.visible")
      .click();
    cy.pageIsLoaded();
  }
  if (shouldExist == false) {
    cy.get("div[id='footer']:visible").contains(element).should("not.exist");
  }
});

Cypress.Commands.add("sendContactUs", () => {
  cy.get('input[aria-label="Name"]').clear().type("Test");
  cy.get('input[aria-label="Surname"]').clear().type("Automation");
  cy.get('input[aria-label="Company"]').clear().type("CRIF SK");
  cy.get('input[aria-label="Job Title"]').clear().type("QA LEAD");
  cy.get('input[aria-label="Email"]').clear().type("no@reply.com");
  cy.get('input[aria-label="Telephone number"]').clear().type("00421123456789");
  cy.get('textarea[name="message"]')
    .clear()
    .type("CYPRESS TEST{enter}{enter}https://www.deleteme.com");
  cy.get('input[name="agree"]').check();
  cy.get('button[type="submit"]').click();
  cy.pageIsLoaded();
});

Cypress.Commands.add("checkContactUsModal", () => {
  cy.get("div.ant-modal-content").within(() => {
    cy.get(".ant-modal-close")
      .should("have.attr", "aria-label", "Close")
      .should("be.visible");
    cy.get(".ant-modal-header").within(() => {
      cy.get(".ant-modal-title").contains("Contact us").should("be.visible");
    });
    cy.get(".ant-modal-body").within(() => {
      cy.contains(Cypress.env("contact_us_message")).should("be.visible");
      cy.get('img[src="/assets/ok-0813f1b0.svg"]').should("be.visible");
    });
    cy.get(".ant-modal-footer")
      .find(".ant-btn")
      .contains("Ok")
      .should("be.visible")
      .click();
    cy.get("div.ant-modal-content").should("not.exist");
  });
});

Cypress.Commands.add("getNumberAtFilter", (filterName) => {
  cy.contains('[data-pf-id="selection-filters"] span', filterName).then(
    ($span) => {
      let filteredCompaniesAmount = $span.text().match(/\(([\d,]+)\)/g)[0];
      filteredCompaniesAmount = filteredCompaniesAmount
        .replace(",", "")
        .replace("(", "")
        .replace(")", "");
      cy.wrap(filteredCompaniesAmount).as("filteredCompaniesAmount");
    }
  );
  return cy.get("@filteredCompaniesAmount");
});

Cypress.Commands.add("confirmModalContent", (heading, text, confirmButton) => {
  cy.get(".ant-modal-content").within(() => {
    cy.get("h3").should("have.text", heading);

    cy.findByText(text).should("be.visible");
    cy.findByText(confirmButton).click();
  });
});

Cypress.Commands.add(
  "waitForAlertBox",
  (message, name, buttonName, moduleName) => {
    cy.get("div[role='alert']", {
      timeout: 60000,
    })
      .as("alertBox")
      .within(() => {
        if (buttonName) {
          cy.contains(buttonName).click();
        }
      })
      .then(() => {
        if (moduleName) {
          cy.get(`a[href='/${moduleName}']`).should("be.visible");
          cy.get("h1").contains(name);
        }
      });
    cy.pageIsLoaded();
    cy.get("body").then(($body) => {
      if ($body.find("div[role='alert']").length > 0) {
        cy.get("div[role='alert']")
          .find("div[class*='CloseButton']")
          .click({ multiple: true });
      }
    });
  }
);

Cypress.Commands.add("buttonsAreVisible", (buttonsArray) => {
  buttonsArray.forEach((button) => {
    cy.findByText(button).should("be.visible");
  });
});

Cypress.Commands.add("openFilterSelection", (id) => {
  cy.get(`[id*='${id}']`).within(() => {
    cy.get("[aria-label='open filter selection']").click({ force: true });
  });
});

Cypress.Commands.add("logOutUser", () => {
  cy.pageIsLoaded();
  cy.get('[data-testid="profile-icon"]').should("be.visible").click();
  cy.get("#ta-account-info").should("be.visible");
  cy.get("#ta-logout").should("be.visible").click();
  cy.pageIsLoaded();
});

Cypress.Commands.add("clickOnTab", (tabName) => {
  cy.get("div[role='tab']").contains(tabName).click();
});

Cypress.Commands.add("getTotalNumberOfTableRows", (totalNumber) => {
  cy.get("tbody.ant-table-tbody").find("tr").should("have.length", totalNumber); // checks if they rendered correctly
});

Cypress.Commands.add("navigateToAccount", () => {
  cy.get('[data-testid="profile-icon"]').should("be.visible").click();
  cy.contains(Cypress.env("user_name")).should("be.visible");
  cy.get("div[class^='AccountInfo']").first().click();
  cy.pageIsLoaded();
});

Cypress.Commands.add("logAsUser", (asUser) => {
  cy.contains("Login as another user").should("be.visible").click();

  cy.pageIsLoaded();
  cy.intercept("GET", Cypress.env("apiUrl") + "/api/session").as("request");
  cy.get("#ta-username").click().type(Cypress.env("username"));
  cy.get("#ta-password").click().type(Cypress.env("password"));
  cy.get("#ta-login-as").click().type(asUser);
  cy.get("#ta-login").click();
  cy.wait("@request").then((req) => {
    cy.wrap(req.response.body.user.userCode).as("userCode");
  });
  cy.get("@userCode").then((userCode) => {
    expect(userCode).to.eq(asUser);
  });
  cy.pageIsLoaded();
  cy.setLanguage("EN");
});

Cypress.Commands.add("changePassword", (oldPassword, newPassword) => {
  cy.pageIsLoaded();
  cy.contains("Password")
    .should("be.visible")
    .parents('[class*="PaleBox"]')
    .within(() => {
      cy.contains("Current:")
        .next()
        .contains("************")
        .should("be.visible");
      cy.contains("Edit").should("be.visible").click();
    });
  cy.get("div.ant-modal-content").within(() => {
    cy.get(".ant-modal-close")
      .should("have.attr", "aria-label", "Close")
      .should("be.visible");
    cy.get(".ant-modal-header").within(() => {
      cy.get(".ant-modal-title")
        .contains("Change password")
        .should("be.visible");
    });
    cy.get(".ant-modal-body").within(() => {
      cy.contains("The password will remain valid for 90 days");
      cy.get('[aria-label="Old password"]')
        .should("be.visible")
        .type(oldPassword);
      cy.get('[aria-label="New password"]')
        .should("be.visible")
        .type(newPassword);
      cy.get('[aria-label="Confirm password"]')
        .should("be.visible")
        .type(newPassword);
    });
    cy.get(".ant-modal-footer")
      .find(".ant-btn")
      .contains("Cancel")
      .should("be.visible");
    cy.get(".ant-modal-footer")
      .find(".ant-btn")
      .contains("Change password")
      .should("be.visible")
      .click();
  });
  cy.pageIsLoaded();
  cy.get("div.ant-modal-content").should("not.exist");
  cy.logOutUser();
  cy.get("#ta-username").click().type(Cypress.env("username"));
  cy.get("#ta-password").click().type(newPassword);
  cy.get("#ta-login").click();
  cy.pageIsLoaded();
});

Cypress.Commands.add("buttonsAreEnabled", (buttonsArray) => {
  buttonsArray.forEach((button) => {
    cy.contains("button[class^='ant-btn']", button);
  });
});

Cypress.Commands.add("buttonsAreDisabled", (buttonsArray) => {
  buttonsArray.forEach((button) => {
    cy.contains("button[class^='ant-btn'][disabled]", button, {
      matchCase: false,
    }).should("be.disabled");
  });
});

Cypress.Commands.add("saveNewQuery", (name) => {
  cy.contains("Save Query").click();
  cy.get('[placeholder="Research name"]').type(name);
  cy.findByText("Save").click();
  cy.contains("Ok").click();
});

Cypress.Commands.add("checkQueryExistance", (name) => {
  cy.get('[data-testid="profile-icon"]').click();
  cy.get("#ta-account-info").click();
  cy.get('[type="primary"]').contains("Operation").click();
  cy.contains("tr", name);
});

Cypress.Commands.add("loadQuery", (name) => {
  cy.contains("Load Query").click();
  cy.get(".ant-modal-content").within(() => {
    cy.get("input").click();
    cy.get("input").type(name).type("{enter}");
  });
  cy.findByText("Load").click();
});

Cypress.Commands.add("newPortfolioWizzard", (name) => {
  cy.findByText("Create new").click();
  cy.contains("Continue").click();
  cy.get('[aria-label="Portfolio name"]').type(name);
  cy.contains("Continue", { timeout: 35000 }).click();
  cy.contains("Continue").click();
  cy.contains("Continue").click();
});

Cypress.Commands.add("downloadExcelWizzard", () => {
  cy.pageIsLoaded();
  cy.findByText("Base").click();
  cy.contains("Continue").click();
  cy.findByText("Download").click();
  cy.get('[class^="ant-modal-content"]', { timeout: 35000 }).within(() => {
    cy.findByText("Ok").click();
  });
  cy.get('[class^="NotificationEventDefaultLayout"]')
    .first()
    .within(() => {
      cy.findByText("Download list", { timeout: 35000 }).get("button").click();
    });
});

Cypress.Commands.add("getCompanyCount", () => {
  return cy
    .findByText("Companies in the list")
    .prev()
    .invoke("text")
    .should("not.eql", "-")
    .then((text) => text.replace(",", ""))
    .then((text) => text.replace(",", ""))
    .then(parseInt);
});

Cypress.Commands.add("clickOnCampaignPortfolioCompany", (name) => {
  cy.get('tbody[class="ant-table-tbody"]').find("span").contains(name).click(); // checks if they rendered correctly
});

Cypress.Commands.add(
  "verifyDownload",
  (
    fileName: string,
    options: { timeout?: number; softMatch?: boolean } = {}
  ) => {
    const downloadsFolder: string = Cypress.config("downloadsFolder");
    const { timeout = 10000, softMatch = false } = options;
    const interval = 1000;
    let retries: number = Math.floor(timeout / interval);

    function recursivelyFindFile() {
      return cy
        .task(
          "findFile",
          { downloadsFolder, fileName, softMatch },
          { log: false }
        )
        .then((exists: boolean) => {
          if (exists) return true;
          if (retries < 1) return false;

          cy.wait(interval).then(() => {
            retries--;
            return recursivelyFindFile();
          });
        });
    }

    return recursivelyFindFile().then((res) => {
      expect(res, "Expect to find file.").to.eq(true);
    });
  }
);

Cypress.Commands.add("getFirstDownloadedFileName", () => {
  const downloadsFolder: string = Cypress.config("downloadsFolder");
  return cy.task("getFirstDownloadedFileName", downloadsFolder);
});

Cypress.Commands.add("deleteDownloads", () => {
  const downloadsFolder: string = Cypress.config("downloadsFolder");
  return cy.task("deleteDownloads", downloadsFolder);
});

Cypress.Commands.add("parseExcelToJSON", (fileName: string) => {
  const downloadsFolder: string = Cypress.config("downloadsFolder");
  return cy.task(
    "parseExcelToJSON",
    { downloadsFolder, fileName },
    { timeout: 30000 }
  );
});

Cypress.Commands.add("removeDownloadedFile", (fileName: string) => {
  const downloadsFolder: string = Cypress.config("downloadsFolder");
  return cy.task("removeDownloadedFile", { downloadsFolder, fileName });
});

Cypress.Commands.add("findItemThroughSearch", (portfolioName: string) => {
  cy.get("div[aria-label='search']").click();
  cy.get("input[type='search']").type(portfolioName + "{enter}");
});

Cypress.Commands.add(
  "findItemThroughSearch",
  (portfolioName: string, placeholder: string) => {
    cy.get(`div[aria-label='search']`).click();
    cy.get(`input[type='search'][placeholder='${placeholder}']`).type(
      portfolioName + "{enter}"
    );
  }
);
