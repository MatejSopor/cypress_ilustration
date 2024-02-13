import translations from "./translations";
import {
  sanitizeAndStringifySchema,
  generateChecksum,
  printSchemaToConsole,
} from "../helpers";

Cypress.Commands.add("visitEnrichedPortfolio", () => {
  const url: string = Cypress.env("modulePortfolio")["links"]["enriched"];
  cy.visit(url);
  cy.pageIsLoaded();
  cy.get("h1").contains("Enriched");
});

Cypress.Commands.add(
  "clickOnTopActionButton",
  (actionButtonSelector, buttonText) => {
    return cy
      .get(`button[data-pf-id=${actionButtonSelector}]`)
      .contains(buttonText, { matchCase: false })
      .click();
  }
);

Cypress.Commands.add("selectExcelType", (type: string) => {
  cy.get("label.ant-radio-wrapper").contains(type).click();
});

Cypress.Commands.add(
  "waitForAlertBoxAndDownload",
  (downloadBtnText: string) => {
    cy.get("div[role='alert']", { timeout: 60000 })
      .find("button")
      .contains(downloadBtnText)
      .click();
  }
);

Cypress.Commands.add("clickButton", (buttonText: string) => {
  return cy
    .get("button")
    .contains(buttonText, { matchCase: false, timeout: 15000 })
    .click();
});

Cypress.Commands.add("downloadExcelTemplate", (templateType: string) => {
  cy.get("label.ant-radio-wrapper")
    .contains(templateType)
    .closest(".download-first")
    .find("button[class$='download-button']")
    .click();
});

Cypress.Commands.add(
  "verifyDownloadedPortfolio",
  (downloadedPortfolioName, comparisonSchemaType) => {
    cy.verifyDownload(downloadedPortfolioName, { softMatch: true })
      .then(() => {
        return cy.getFirstDownloadedFileName();
      })
      .then((fileName) => {
        return cy.parseExcelToJSON(fileName);
      })
      .then((parsedData: responseSchemaType) => {
        // order rows
        const orderedParsedSchema = Cypress._.orderBy(parsedData[0].data, [0]);
        const orderedComparisonSchema = Cypress._.orderBy(
          comparisonSchemaType,
          [0]
        );

        // print to console
        printSchemaToConsole("Parsed result: ", orderedParsedSchema);
        printSchemaToConsole("Comparison schema: ", orderedComparisonSchema);

        // remove spaces and *
        const parsedSanitizedSchemaString =
          sanitizeAndStringifySchema(orderedParsedSchema);
        const comparisonSanitizedSchemaString = sanitizeAndStringifySchema(
          orderedComparisonSchema
        );

        // create hashes
        const parsedExcelChecksum = generateChecksum(
          parsedSanitizedSchemaString
        );
        const comparisonExcelChecksum = generateChecksum(
          comparisonSanitizedSchemaString
        );

        //compare hashes
        expect(parsedExcelChecksum, "Comparing hashes of 2 JSON schemas.").eq(
          comparisonExcelChecksum
        );
      });
  }
);

Cypress.Commands.add("checkMarkerCount", () => {
  cy.get("[data-icon='environment']").click();
  cy.get("[aria-label='Zoom out']").click().click().click().click().click();
  cy.pageIsLoaded();
  cy.get("[class^='leaflet-marker-icon'][role='button']")
    .children()
    .then(($marker) => {
      cy.get('div[data-testid="AllCompanies"]').within(() => {
        cy.pageIsLoaded();
        cy.contains('[class^="ant-typography"]', /[\d+]/)
          .invoke("text")
          .then((text) => {
            var number = parseInt(text.replace(/\D+/g, ""));
            cy.wrap(number)
              .as("companies")
              .should("eq", parseInt($marker.text()));
          });
      });
    });
});

Cypress.Commands.add("getNumOfCompanies", (tab, wrap) => {
  cy.get("div[data-testid='" + tab + "']").within(() => {
    cy.contains('[class^="ant-typography"]', /[\d+]/)
      .invoke("text")
      .then((text) => {
        var number = parseInt(text.replace(/\D+/g, ""));
        cy.wrap(number).as(wrap).should("be.finite");
      });
  });
});

Cypress.Commands.add("checkGridResult", (numOfCompanies) => {
  let loadMore = Math.floor(numOfCompanies / 20);
  Cypress._.times(loadMore, () => {
    cy.contains("button[type='button']", "Load more").click({
      timeout: 10000,
    });
  });
  numOfCompanies === 0
    ? cy.log("total is 0, skip checking the table")
    : cy
        .get("tbody.ant-table-tbody")
        .find("tr")
        .should("have.length", numOfCompanies);
});

Cypress.Commands.add("getDestinationId", (linkName: string) => {
  cy.location("pathname").then((pathname) => {
    const parts = pathname.split("/");
    const lastPart = parts[parts.length - 1];
    return cy.wrap(lastPart).as(linkName);
  });
});

Cypress.Commands.add("clickLoadMore", (total: number) => {
  if (total <= 0) {
    cy.log("total is 0, skip checking the table");
  } else {
    const loadMore = Math.floor((total - 1) / 20);
    Cypress._.times(loadMore, () => {
      cy.contains("button[type='button']", "Load more").click({
        timeout: 10000,
      });
    });
  }
});

Cypress.Commands.add("assertCompanyCountAfterQuery", (updatedCompanyCount) => {
  cy.get("div[data-testid='AllCompanies']")
    .find("h4")
    .should((h4) => {
      const companyCountAfterQuery = h4.text().replace(/\D/g, "");
      expect(parseInt(companyCountAfterQuery)).eq(parseInt(updatedCompanyCount));
    });
});

Cypress.Commands.add(
  "checkPortfolioIndicator",
  (shouldExist, portfolioInterceptAlias) => {
    cy.wait(`@${portfolioInterceptAlias}`).then((req) => {
      const total = req.response.body.totalCount;
      cy.clickLoadMore(total);
      cy.get("tbody.ant-table-tbody")
        .findByText("Enriched Portfolio", { exact: false })
        .closest("div")
        .find("svg")
        .should(shouldExist);
    });
  }
);

Cypress.Commands.add(
  "togglePortfolioSharing",
  (typeOfOperationSelector, areaManager) => {
    cy.get("h1")
      .contains("Enriched Portfolio")
      .parent("div")
      .find(typeOfOperationSelector)
      .click();
    cy.get("td").contains(areaManager).closest("tr").find("input").click();
    cy.clickButton("Continue");
    cy.clickButton("Close");
  }
);

Cypress.Commands.add("clickOnPortfolioListTab", (tabName) => {
  cy.get("div[role='tab']").contains(tabName).should("be.visible").click();
});

Cypress.Commands.add("selectOneCustomProperty", (propertyLabel) => {
  cy.get("li")
    .find(`[aria-label="${propertyLabel}"]`)
    .click({ waitForAnimations: true });
});

Cypress.Commands.add("selectCustomTrackCategory", (categoryName) => {
  return cy
    .get("li")
    .contains(categoryName)
    .click({ waitForAnimations: true });
});

Cypress.Commands.add("selectCustomTrackProperties", (lang) => {
  const country: string = Cypress.env("configCountry");
  const properties = translations.customTrackProperties[country];
  switch (country) {
    case "ita":
      cy.selectCustomTrackCategory(properties.companyIdentification[lang]).then(
        () =>
          cy
            .selectCustomTrackCategory(properties.geoArea[lang])
            .then(() => cy.selectOneCustomProperty(properties.postCode[lang]))
      );
      cy.selectCustomTrackCategory(properties.companySize[lang]).then(() => {
        cy.selectOneCustomProperty(properties.turnover[lang]);
        cy.selectOneCustomProperty(properties.employees[lang]);
      });
      cy.selectCustomTrackCategory(properties.foreignTrade[lang]).then(() => {
        cy.selectOneCustomProperty(properties.import[lang]);
        cy.selectOneCustomProperty(properties.export[lang]);
      });
      break;
    case "ger":
      cy.selectCustomTrackCategory(properties.companySize[lang]).then(() => {
        cy.selectOneCustomProperty(properties.employeeRange[lang]);
        cy.selectOneCustomProperty(properties.turnover[lang]);
      });
      cy.selectCustomTrackCategory(properties.contacts[lang]).then(() => {
        cy.selectOneCustomProperty(properties.emails[lang]);
        cy.selectOneCustomProperty(properties.website[lang]);
      });
      cy.selectCustomTrackCategory(properties.kpiBalance[lang]).then(() =>
        cy.selectOneCustomProperty(properties.sales[lang])
      );
      break;
    case "che":
      cy.selectCustomTrackCategory(properties.companyIdentification[lang]).then(
        () =>
          cy
            .selectCustomTrackCategory(properties.geoArea[lang])
            .then(() => cy.selectOneCustomProperty(properties.postCode[lang]))
      );
      cy.selectCustomTrackCategory(properties.companySize[lang]).then(() => {
        cy.selectOneCustomProperty(properties.turnover[lang]);
        cy.selectOneCustomProperty(properties.employees[lang]);
      });
      cy.selectCustomTrackCategory(properties.foreignTrade[lang]).then(() => {
        cy.selectOneCustomProperty(properties.importPartners[lang]);
        cy.selectOneCustomProperty(properties.exportPartners[lang]);
      });
      break;
    case "cz":
      break;
    default:
      assert.fail("Wrong country code.");
  }
});
