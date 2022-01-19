describe("The Home Page", () => {
  it("successfully loads", () => {
    cy.visit("/");

    cy.findByRole("link", { name: /Sensoren ansehen/i }).should("exist");
  });
});
