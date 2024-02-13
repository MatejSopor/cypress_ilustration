Cypress.Commands.add(
  "createPortfolioWithCompaniesAPI",
  (name, companies, portfolioId, apiUrl, country) => {
    const user = JSON.parse(window.localStorage.getItem("persist:user"));
    const authToken = user.token.replace(/[\"]/g, "");
    const Authorization = `Bearer ${authToken}`;
    
    // if country is set to empty string dont send it in payload
    const payload =
    country === ""
      ? {
          companyIds: companies,
          portfolioName: name,
          status: "client",
        }
      : {
          companyIds: companies,
          portfolioName: name,
          country: country,
          status: "client",
        };
    cy.request({
      url: apiUrl + "/api/PortfolioActions/create-from-company-ids",
      method: "POST",
      headers: {
        Authorization,
        Accept: "application/json, text/plain, */*",
        ["Content-Type"]: "application/json",
      },
      body: JSON.stringify(payload),
    }).then((response) => {
      cy.wrap(response.body.destinationId).as(portfolioId);
    });
  }
);

Cypress.Commands.add("deletePortfolioAPI", (portfolioId, apiUrl) => {
  const user = JSON.parse(window.localStorage.getItem("persist:user"));
  const authToken = user.token.replace(/[\"]/g, "");
  const Authorization = `Bearer ${authToken}`;
  cy.request({
    url: apiUrl + "/api/portfolio/" + portfolioId,
    method: "DELETE",
    headers: {
      Authorization,
      Accept: "application/json, text/plain, */*",
      ["Content-Type"]: "application/json",
    },
  });
});

Cypress.Commands.add(
  "downloadPortfolioAPI",
  (
    portfolioId: string,
    options: {
      portfolioType: "Base" | "Standard" | "Complete";
      language: "cs-CZ" | "sk-SK" | "en-GB";
      currency: "czk" | "eur";
    }
  ) => {
    const user = JSON.parse(window.localStorage.getItem("persist:user"));
    const authToken = user.token.replace(/[\"]/g, "");
    const selectedLanguage = options.language;
    const selectedCurrency = options.currency;
    const bearerToken = `Bearer ${authToken}`;
    const body = {
      selection: {
        portfolioGridQuery: {
          query: {
            $type: "CompoundExpression",
            childExpressions: [],
            condition: "And",
          },
          excludedPortfoliosIds: [],
        },
        templateOnly: false,
        exportType: options.portfolioType,
        sourceContainerItemId: portfolioId,
        destinationContainerItemId: portfolioId,
        dataPackets: [],
        jsonPaths: [],
      },
    };
    cy.request({
      url: `${Cypress.env(
        "apiUrl"
      )}/api/PortfolioActions/download-portfolio-selection`,
      method: "POST",
      headers: {
        authorization: bearerToken,
        selectedLanguage: selectedLanguage,
        "x-accept-currency": selectedCurrency,
      },
      body: body,
    });
  }
);

Cypress.Commands.add(
  "createPortfolioAPI",
  (portfolioName, portfolioId, apiUrl) => {
    const user = JSON.parse(window.localStorage.getItem("persist:user"));
    const token = user.token.replace("'", "").replace('"', "");
    const Authorization = `Bearer ${token}`.replace('"', "");
    const payload = {
      companyIds: [],
      portfolioName: portfolioName,
      status: "Client",
    };
    cy.request({
      url: apiUrl + "/api/PortfolioActions/create-from-company-ids",
      method: "POST",
      headers: {
        Authorization,
        Accept: "application/json, text/plain, */*",
        ["Accept-Language"]: "en-GB",
        ["Content-Type"]: "application/json",
      },
      body: JSON.stringify(payload),
    }).then((response) => {
      cy.wrap(response.body.destinationId).as(portfolioId);
    });
  }
);

Cypress.Commands.add(
  "addCompaniesToPortfolioAPI",
  (companiesId, identificationCodes, portfolioId, apiUrl) => {
    const user = JSON.parse(window.localStorage.getItem("persist:user"));
    const token = user.token.replace("'", "").replace('"', "");
    const Authorization = `Bearer ${token}`.replace('"', "");
    const payload = {
      numberOfCompanies: 3,
      selectedItems: [
        {
          companyUnitId: companiesId[0],
          identificationCode: identificationCodes[0],
        },
        {
          companyUnitId: companiesId[1],
          identificationCode: identificationCodes[1],
        },
        {
          companyUnitId: companiesId[2],
          identificationCode: identificationCodes[2],
        },
      ],
      portfolioId: portfolioId,
    };
    cy.request({
      url:
        apiUrl +
        "/api/Portfolio/" +
        portfolioId +
        "/add-companies-by-compound-expression",
      method: "POST",
      headers: {
        Authorization,
        Accept: "application/json, text/plain, */*",
      },
      body: payload,
    });
  }
);

Cypress.Commands.add(
  "addCompanyToPortfolioAPI",
  (companiesId, identificationCodes, portfolioId, apiUrl) => {
    const user = JSON.parse(window.localStorage.getItem("persist:user"));
    const token = user.token.replace("'", "").replace('"', "");
    const Authorization = `Bearer ${token}`.replace('"', "");
    const payload = {
      numberOfCompanies: 1,
      selectedItems: [
        {
          companyUnitId: companiesId[0],
          identificationCode: identificationCodes[0],
        },
      ],
      portfolioId: portfolioId,
    };
    cy.request({
      url:
        apiUrl +
        "/api/Portfolio/" +
        portfolioId +
        "/add-companies-by-compound-expression",
      method: "POST",
      headers: {
        Authorization,
        Accept: "application/json, text/plain, */*",
      },
      body: payload,
    });
  }
);
