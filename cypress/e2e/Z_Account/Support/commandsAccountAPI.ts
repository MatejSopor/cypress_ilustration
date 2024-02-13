Cypress.Commands.add("getNumberOfRings", (apiEnrichUrl, availableRings) => {
  const user = JSON.parse(window.localStorage.getItem("persist:user"));
  const authToken = user.token.replace(/[\"]/g, "");
  const Authorization = `Bearer ${authToken}`;
  cy.request({
    url: apiEnrichUrl + "/api/consumption-limits/my-account",
    method: "GET",
    headers: {
      Authorization,
      Accept: "application/json, text/plain, */*",
      ["Content-Type"]: "application/json",
    },
  }).then((response) => {
    cy.wrap(response.body.consumptionLimits[0].availableAmount).as(
      availableRings
    );
  });
});

Cypress.Commands.add("companyUnenrichment", (id, apiEnrichUrl) => {
  const user = JSON.parse(window.localStorage.getItem("persist:user"));
  const token = user.token.replace("'", "").replace('"', "");
  const Authorization = `Bearer ${token}`.replace('"', "");
  cy.request({
    url: apiEnrichUrl + "/api/enriched-entities/remove-enrichment",
    method: "PUT",
    headers: {
      Authorization,
      Accept: "application/json, text/plain, */*",
    },
    body: [id],
  });
});

Cypress.Commands.add("companyInfo", (apiUrl, id) => {
  const user = JSON.parse(window.localStorage.getItem("persist:user"));
  const token = user.token.replace("'", "").replace('"', "");
  const Authorization = `Bearer ${token}`.replace('"', "");
  cy.request({
    url: apiUrl + `/api/PortfolioCompany/${id}/portfolio-company-detail`,
    method: "GET",
    headers: {
      Authorization,
      Accept: "application/json, text/plain, */*",
    },
  }).then((response) => {
    cy.wrap(response.body.company.isEnriched).as("response");
  });
});

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
