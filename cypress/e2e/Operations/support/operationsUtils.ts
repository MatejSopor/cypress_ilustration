Cypress.Commands.add("deleteQueryAPI", (queryId, apiUrl) => {
    const payload = {
        "types": [
            "Queries",
            "OperationQueries"
        ],
        "selectedDocumentIds": [
            queryId
        ]
    };
    const user = JSON.parse(window.localStorage.getItem("persist:user"));
    const token = user.token.replace("'", "").replace('"', "");
    const Authorization = `Bearer ${token}`.replace('"', "");
    cy.request({
        url: apiUrl + "/api/Documents/filter-queries",
        method: "DELETE",
        headers: {
            Authorization,
            Accept: "application/json, text/plain, */*",
            ["Accept-Language"]: "en-GB",
            ["Content-Type"]: "application/json",
        },
        body: JSON.stringify(payload),
    });
});

Cypress.Commands.add("deletePortfolioAPI", (portfolioId, apiUrl) => {
    const user = JSON.parse(window.localStorage.getItem("persist:user"));
    const token = user.token.replace("'", "").replace('"', "");
    const Authorization = `Bearer ${token}`.replace('"', "");
    cy.request({
        url: apiUrl + "/api/portfolio/" + portfolioId,
        method: "DELETE",
        headers: {
            Authorization,
            Accept: "application/json, text/plain, */*",
            ["Accept-Language"]: "en-GB",
            ["Content-Type"]: "application/json",
        },
    });
});

Cypress.Commands.add("deleteExcelAPI", (excelId, apiUrl) => {
    const payload = {
        "filter": {
            "types": [
                "ExportedPortfolio"
            ],
            "selectedDocuments": [
                excelId
            ]
        }
    };
    const user = JSON.parse(window.localStorage.getItem("persist:user"));
    const token = user.token.replace("'", "").replace('"', "");
    const Authorization = `Bearer ${token}`.replace('"', "");
    cy.request({
        url: apiUrl + "/api/Documents",
        method: "DELETE",
        headers: {
            Authorization,
            Accept: "application/json, text/plain, */*",
            ["Accept-Language"]: "en-GB",
            ["Content-Type"]: "application/json",
        },
        body: JSON.stringify(payload),
    });
});