import { getSensorRecords } from '@mocks/supabaseData/records';
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

describe.only("Individual Sensor Page - Logged In", () => {
  before(() => {
    cy.task('openPool');
    cy.task('deleteUser', Cypress.env('email'))
    cy.signUp();
  });
  beforeEach(() => {
    cy.signIn();
  });
  after(() => {
    cy.getSession().then(session =>
      cy.deleteUser(session.body.access_token)
    );
    cy.task('closePool');
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
  it.only("should share username with URL", () => {
    cy.viewport("macbook-13");
    cy.getSession()
      .then(sessionRes => {
        const userId = sessionRes.body.user.id;
        const sensor = {
          name: `Sensor ${Date.now()}`,
          description: "Test Sensor description",
          created_at: new Date().toISOString(),
          connection_type: "http" as const,
          category_id: 1,
          user_id: userId,
        };
        cy.task('createSensor', sensor)
          .then((newSensor) => {
            const id = (newSensor as definitions['sensors']).id;
            const fakeRecords = getSensorRecords({
              sensorId: id,
              numberOfRecords: 10,
            }).map(({ id, ...r }, idx) => ({
              ...r,
              measurements: [`999${idx}`]
            }));
            cy.task('createRecords', fakeRecords)
            cy.visit(`/sensors/${id}`);
            cy.get(`h1`).should("exist").and("contain", sensor.name);
            cy.findByText(sensor.description).should("exist").and("contain", sensor.description);
            cy.findByRole('textbox', { name: 'API Schnittstelle' })
              .should("exist")
              .and("contain.value", `/api/v3/sensors/${id}/records`);
            cy.findByText(`9.990`).should("exist");
            // TODO: Create records for the sensors
            // TODO: Delete 1 record
            // TODO: Delete all records using checkbox
          })
      });
      })
});
