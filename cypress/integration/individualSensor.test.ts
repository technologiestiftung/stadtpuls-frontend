import { definitions } from "@technologiestiftung/stadtpuls-supabase-definitions/generated";
import { CurrentSessionType } from "../support";

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

describe.only("Individual Sensor Page - Logged In", () => {
  before(() => {
    cy.signUp();
  });
  beforeEach(() => {
    cy.signIn();
  });
  after(() => {
    cy.getSession().then(session =>
      cy.deleteUser(session.body.access_token)
    );
  })

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
  it("should share username with URL", () => {
    cy.viewport("macbook-13");
    const sensor = {
      name: `Sensor ${Date.now()}`,
      description: "Test Sensor description",
      created_at: new Date().toISOString(),
      connection_type: "http" as const,
      category_id: 1,
    };
    cy.createSensor(sensor)
      .then(() => cy.getSensorByName(sensor.name))
      .then(({ body }) => {
        const id = body[0].id;
        cy.visit(`/sensors/${id}`);
        cy.get(`h1`).should("exist").and("contain", sensor.name);
        cy.findByText(sensor.description).should("exist").and("contain", sensor.description);
        cy.findByRole('textbox', { name: 'API Schnittstelle' })
          .should("exist")
          .and("contain.value", `/api/v3/sensors/${id}/records`);
        // TODO: Create records for the sensors
        // TODO: Delete 1 record
        // TODO: Delete all records using checkbox
      })
  });
});
