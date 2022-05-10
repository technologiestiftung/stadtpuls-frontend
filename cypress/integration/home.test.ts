import { CurrentSessionType } from "../support";

describe("The Home Page", () => {
  before(() => {
    cy.signUp();
  });
  beforeEach(() => {
    cy.signIn();
  });

  afterEach(() => {
    cy.window().then(win => {
      const currentSession = JSON.parse(
        win.localStorage.getItem("supabase.auth.token")
      ).currentSession as CurrentSessionType;

      cy.deleteUser(currentSession.access_token);
    });
  });

  it("successfully loads", () => {
    cy.visit("/");
    cy.findByRole("link", { name: /Sensoren ansehen/i }).should("exist");
  });
});
