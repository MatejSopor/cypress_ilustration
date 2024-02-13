Cypress.Commands.add("createNewAppointment", () => {
  cy.get('[aria-label="appointment menu"]').click();
  cy.get('[aria-label="Create new appointment"]').click();
  cy.pageIsLoaded();
});

Cypress.Commands.add("fillOutAppointmentForm", () => {
  const companyName: string =
    Cypress.env("moduleMemo")["appointmentCompanyName"];
  const companyVatCode: string =
    Cypress.env("moduleMemo")["appointmentCompanyVatCode"];
  cy.get("h1").should("have.text", "Create appointment");
  cy.get("h2").eq(0).should("have.text", "1");

  cy.get("h2")
    .eq(1)
    .should(
      "have.text",
      "Insert name, date and place related to your new appointment"
    );
  cy.get("[data-testid='wizard-nextbtn']").should("be.disabled");

  if (Cypress.env("configCountry").toUpperCase() === "CHE") {
    cy.get("input[type='search']").first().click();
    cy.get("div[class*='-select-item-option']").contains("Switzerland").click();
    cy.get('[aria-label*="CRIF Id /  Vat Code / "]')
      .click()
      .type(companyVatCode);
  } else {
    cy.get('[aria-label^="Tax code/VAT code"]').click().type(companyVatCode);
  }

  cy.get('[aria-label="Appointment name"]').should(
    "have.attr",
    "value",
    companyName + " - Headquarter"
  );
  cy.get('[aria-label="Start date"]')
    .click()
    .then(() => {
      cy.get("div[class^=ant-picker-dropdown]")
        .eq(0)
        .should("be.visible")
        .within(() => {
          cy.get("span[class='ant-picker-next-icon']").click();

          cy.get("tr:nth-child(4)").find("td:nth-child(1)").click();
          cy.findAllByText("OK").click();
        });
    });
  cy.get('[aria-label="End date"]')
    .click()
    .then(() => {
      cy.get("div[class^=ant-picker-dropdown]")
        .eq(1)
        .should("be.visible")
        .within(() => {
          cy.get("span[class='ant-picker-next-icon']").click();

          cy.get("tr:nth-child(4)").find("td:nth-child(2)").click();
          cy.findAllByText("OK").click();
        });
    });
  cy.get('[aria-label="Place"]').click().type("Office");
  cy.get('[aria-label="Appointment description"]').click().type("Cypress test");
  cy.get("[data-testid='wizard-nextbtn']").click();
});

Cypress.Commands.add("selectRecipients", () => {
  cy.get("h2").eq(0).should("have.text", "2");

  cy.get("h2").eq(1).should("have.text", "Select recipients");
  cy.get("span").contains(
    "Select the users to whom you want to forward the appointment or enter the email address of the recipients, separated by commas"
  );
  cy.get("input[type='search']").click().type("Matej Sopor{enter}");
  cy.findByText("Continue").click();
});

Cypress.Commands.add("confirmOperation", () => {
  cy.get("h2").eq(0).should("have.text", "3");
  cy.get("h2").eq(1).should("have.text", "Confirm operation");

  cy.get("span").contains(
    "Do you want to send this appointment to your calendar? Selecting ON: Margò will send you an email which will contain all information just added"
  );

  cy.get("span").contains("Send details to my calendar and notify recipient");

  cy.get("button[role='switch']").should("have.attr", "aria-checked", "true");
  cy.get("span").contains("Create appointment").click();
});

Cypress.Commands.add("checkIfAppointmentWasCreated", () => {
  cy.pageIsLoaded();
  cy.get("span").contains("Create new appointment");
  cy.get("span").contains("All").click();
  cy.get("tbody tr").should("have.length", 1);
  cy.get("tbody").within(() => {
    cy.get("span").contains(
      Cypress.env("moduleMemo")["appointmentCompanyName"]
    );
    cy.get("[aria-label='show']").last().should("be.enabled");
    cy.get("button[aria-label='edit']").last().should("be.enabled");
    cy.get("button[aria-label='delete']").last().should("be.enabled");
  });
});

Cypress.Commands.add("visualizeTheAppointment", () => {
  const companyName: string =
    Cypress.env("moduleMemo")["appointmentCompanyName"];
  const companyVatCode: string =
    Cypress.env("moduleMemo")["appointmentCompanyVatCode"];
  cy.get("[aria-label='show']").last().click();
  cy.pageIsLoaded();
  cy.get("h1").should("have.text", "Appointment");

  if (Cypress.env("configCountry").toUpperCase() === "CHE") {
    cy.get('[aria-label*="CRIF Id /  Vat Code / "]')
      .should("have.attr", "value", companyVatCode)
      .should("be.disabled");
  } else {
    cy.get('[aria-label^="Tax code/VAT code"]')
      .should("have.attr", "value", companyVatCode)
      .should("be.disabled");
  }
  cy.get('[aria-label="Appointment name"]')
    .should("have.attr", "value", companyName + " - Headquarter")
    .should("be.disabled");
  cy.get('[aria-label="Appointment description"]')
    .should("have.attr", "value", "Cypress test")
    .should("be.disabled");
  cy.get('[aria-label="Place"]')
    .should("have.attr", "value", "Office")
    .should("be.disabled");
  cy.get("button[name='edit']").click();
  cy.get("h1").should("have.text", "Edit appointment");
  cy.get("span").contains("Close").click();
  cy.get("h1").should("have.text", "Appointment");
  cy.get("span").contains("Close").click();
  cy.get("h1").should("have.text", "Your account"); // see if we are in the My account page
});

Cypress.Commands.add("deleteTheAppointment", () => {
  cy.get("tbody").within(() => {
    cy.get("button[aria-label='delete']").last().click();
  });
  cy.get("div[role='dialog']").within(() => {
    cy.get("h3").should("have.text", "Delete appointment");
    cy.get("span").contains("Are you sure you want to delete the appointment?");
    cy.get("span").contains(
      "Send details to my calendar and notify recipients"
    );
    cy.get("button[role='switch']").should("have.attr", "aria-checked", "true");
    cy.get("span").contains("Delete").click();
  });
});

Cypress.Commands.add("checkIfTheAppointmentWasDeleted", () => {
  cy.get("h1").should("have.text", "Your account"); // see if we are in the My account page
  cy.get("span").contains("All").click();
  cy.get(".message")
    .children()
    .contains(
      "Here you will find all the appointments saved in your calendar."
    );
});

Cypress.Commands.add("fillOutAppointmentFormForPortfolio", () => {
  const companyName: string =
    Cypress.env("moduleMemo")["appointmentCompanyName"];
  const companyVatCode: string =
    Cypress.env("moduleMemo")["appointmentCompanyVatCode"];
  cy.get("h1").contains("Create appointment");
  cy.get("h2").eq(0).contains("1");

  cy.get("h2")
    .eq(1)
    .contains("Insert name, date and place related to your new appointment");
  cy.get("[data-testid='wizard-nextbtn']").should("be.disabled");

  if (Cypress.env("configCountry").toUpperCase() === "CHE") {
    cy.get("input[type='search']").first().click();
    cy.get('[aria-label*="CRIF Id /  Vat Code / "]').should(
      "have.attr",
      "value",
      companyVatCode
    );
  } else {
    cy.get('[aria-label^="Tax code/VAT code"]').should(
      "have.attr",
      "value",
      companyVatCode
    );
  }

  cy.get('[aria-label="Appointment name"]').should(
    "have.attr",
    "value",
    companyName + " - Headquarter"
  );

  cy.get('[aria-label="Start date"]')
    .click()
    .then(() => {
      cy.get("div[class^=ant-picker-dropdown]")
        .eq(0)
        .should("be.visible")
        .within(() => {
          cy.get("span[class='ant-picker-next-icon']").click();

          cy.get("tr:nth-child(4)").find("td:nth-child(1)").click();
          cy.findAllByText("OK").click();
        });
    });
  cy.get('[aria-label="End date"]')
    .click()
    .then(() => {
      cy.get("div[class^=ant-picker-dropdown]")
        .eq(1)
        .should("be.visible")
        .within(() => {
          cy.get("span[class='ant-picker-next-icon']").click();

          cy.get("tr:nth-child(4)").find("td:nth-child(2)").click();
          cy.findAllByText("OK").click();
        });
    });
  cy.get('[aria-label="Place"]').click().type("Office");
  cy.get('[aria-label="Appointment description"]').click().type("Cypress test");
  cy.get("[data-testid='wizard-nextbtn']").click();
});
Cypress.Commands.add("editAppointment", () => {
  const companyName: string =
    Cypress.env("moduleMemo")["appointmentCompanyName"];
  const companyVatCode: string =
    Cypress.env("moduleMemo")["appointmentCompanyVatCode"];
  cy.get("[aria-label='edit']").last().click();
  cy.pageIsLoaded();
  cy.get("h1").should("have.text", "Edit appointment");

  if (Cypress.env("configCountry").toUpperCase() === "CHE") {
    cy.get('[aria-label*="CRIF Id /  Vat Code / "]').should(
      "have.attr",
      "value",
      companyVatCode
    );
  } else {
    cy.get('[aria-label^="Tax code/VAT code"]').should(
      "have.attr",
      "value",
      companyVatCode
    );
  }
  cy.get('[aria-label="Appointment name"]').should(
    "have.attr",
    "value",
    companyName + " - Headquarter"
  );
  cy.get('[aria-label="Appointment description"]')
    .should("have.text", "Cypress test")
    .type(" -Edited");
  cy.get('[aria-label="Place"]').should("have.attr", "value", "Office");
  cy.get("[data-testid='wizard-nextbtn']").click();
  cy.get("[data-testid='wizard-nextbtn']").click();
  cy.get("span").contains("Edit appointment").click();
});
