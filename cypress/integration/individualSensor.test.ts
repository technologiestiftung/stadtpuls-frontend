import { definitions } from '@technologiestiftung/stadtpuls-supabase-definitions';

describe("Individual Sensor Page - Logged Out", () => {
  it("should share username with URL", () => {
    cy.viewport("macbook-13");
    cy.visit("/sensors");
    const items = cy.get("[data-cy='sensors-list-item']");
    const firstItem = items.first();
    firstItem.find("a")
      .invoke('attr', 'href')
      .then((href) => {
        if (!href) throw new Error("No href found");
        const stringId = href.split("/")[3] || "1";
        const id = parseInt(stringId, 10);
        cy.visit(href);
        cy.url().should("include", id);
        cy.get(`h1`).should("exist");
      });
  });
});

describe("Individual Sensor Page - Logged In", () => {
  beforeEach(() => {
    cy.task('deleteUser', Cypress.env('email'))
    cy.signUp();
    cy.signIn();
  });

  it("should Show title and API URLs", () => {
    cy.viewport("macbook-13");
    cy.visit("/sensors");
    const items = cy.get("[data-cy='sensors-list-item']");
    const firstItem = items.first();
    firstItem.find("a")
      .invoke('attr', 'href')
      .then((href) => {
        if (!href) throw new Error("No href found");
        const stringId = href.split("/")[3] || "1";
        const id = parseInt(stringId, 10);
        cy.getSensor(id).then(response => {
          const data = response.body;
          if (!data) throw new Error("No data found");
          const sensor = data[0] as definitions['sensors'];
          cy.visit(href);
          cy.url().should("include", id);
          cy.get(`h1`).should("exist").and("contain", sensor.name);
          cy.findByRole('textbox', { name: 'API Schnittstelle' })
            .should("exist")
            .and("contain.value", `/api/v3/sensors/${id}/records`);
        });
      });
  });
});
