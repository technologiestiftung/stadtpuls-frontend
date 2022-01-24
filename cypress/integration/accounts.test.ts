describe("The Accounts page", () => {
  it("successfully loads", () => {
    cy.visit("/accounts");

    cy.findByRole("heading", { name: /Alle Accounts/i }).should("exist");
  });
});
