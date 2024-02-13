describe("Account - Contact Us Form Test", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.pageIsLoaded();
  });

  it(
    "Submits the Contact Us Form for Logged-In User",
    { tags: ["@ITA", "@CZSK", "@GER", "@CHE"] },
    () => {
      cy.setLanguage("EN");
      cy.get("body").then(($body) => {
        if($body.find("button[class=ant-alert-close-icon]").length > 0){
          cy.get("button[class='ant-alert-close-icon']").click();
        }
      })
      cy.handleFooterElement("Contact Us", true);

      cy.sendContactUs();
      cy.checkContactUsModal();
    }
  );
});
