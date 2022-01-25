describe("The Sensors page", () => {
  it("successfully loads", () => {
    cy.visit("/sensors");

    cy.findByRole("heading", { name: /Alle Sensoren/i }).should("exist");
  });
});
