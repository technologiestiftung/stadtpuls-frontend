describe("The Docs page", () => {
  it("successfully loads", () => {
    cy.visit("/docs");

    cy.findByRole("heading", { name: /Willkommen bei Stadtpuls/i }).should(
      "exist"
    );
  });
});
