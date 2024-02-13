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

Cypress.Commands.add(
  "createGaolAPI",
  (goalName, taskName, goalIdName, apiUrl) => {
    const user = JSON.parse(window.localStorage.getItem("persist:user"));
    const authToken = user.token.replace(/[\"]/g, "");
    const Authorization = `Bearer ${authToken}`;

    const payload = {
      name: goalName,
      tasks: [
        {
          name: taskName,
        },
      ],
    };
    cy.request({
      url: apiUrl + "/api/goals",
      method: "POST",
      headers: {
        Authorization,
        Accept: "application/json, text/plain, */*",
        ["Content-Type"]: "application/json",
      },
      body: JSON.stringify(payload),
    }).then((response) => {
      cy.wrap(response.body.id).as(goalIdName);
    });
  }
);

Cypress.Commands.add(
  "createCampaignFromPortfolioAPI",
  (name, portfolioId, goalId, campaignIdName, apiUrl) => {
    const user = JSON.parse(window.localStorage.getItem("persist:user"));
    const authToken = user.token.replace(/[\"]/g, "");
    const Authorization = `Bearer ${authToken}`;

    const date = require("moment");
    const currentDate = date();
    const nextDate = currentDate.add(1, "days");
    const date2 = nextDate.format("YYYY-MM-DD");

    const payload = {
      campaignName: name,
      portfolioIds: [portfolioId],
      startDate: date,
      endDate: date2,
      goalId: goalId,
      conversionRate: 0,
      conversionRateRelatedTask: "",
      note: "",
      enableSalesPerformanceChart: false,
      isRestorePreviousData: false,
    };
    cy.request({
      url: apiUrl + "/api/SalesToolActions/create-campaign",
      method: "POST",
      headers: {
        Authorization,
        Accept: "application/json, text/plain, */*",
        ["Content-Type"]: "application/json",
      },
      body: JSON.stringify(payload),
    }).then((response) => {
      cy.wrap(response.body.destinationId).as(campaignIdName);
    });
  }
);

Cypress.Commands.add("stopCampaignAPI", (campaignId, apiUrl) => {
  const user = JSON.parse(window.localStorage.getItem("persist:user"));
  const authToken = user.token.replace(/[\"]/g, "");
  const Authorization = `Bearer ${authToken}`;

  const payload = {
    targetCampaignStatus: "Stopped",
  };
  cy.request({
    url: apiUrl + "/api/SalesTool/" + campaignId + "/archive",
    method: "POST",
    headers: {
      Authorization,
      Accept: "application/json, text/plain, */*",
      ["Content-Type"]: "application/json",
    },
    body: JSON.stringify(payload),
  });
});

Cypress.Commands.add("deleteCampaignAPI", (campaignId, apiUrl) => {
  const user = JSON.parse(window.localStorage.getItem("persist:user"));
  const authToken = user.token.replace(/[\"]/g, "");
  const Authorization = `Bearer ${authToken}`;
  cy.request({
    url: apiUrl + "/api/SalesTool/campaign/" + campaignId,
    method: "DELETE",
    headers: {
      Authorization,
      Accept: "application/json, text/plain, */*",
      ["Content-Type"]: "application/json",
    },
  });
});

Cypress.Commands.add("deleteGoalAPI", (goalId, apiUrl) => {
  const user = JSON.parse(window.localStorage.getItem("persist:user"));
  const authToken = user.token.replace(/[\"]/g, "");
  const Authorization = `Bearer ${authToken}`;
  cy.request({
    url: apiUrl + "/api/goals/" + goalId,
    method: "DELETE",
    headers: {
      Authorization,
      Accept: "application/json, text/plain, */*",
    },
  });
});

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
