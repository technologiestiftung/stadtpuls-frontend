import "@testing-library/cypress/add-commands";

const supabaseUrl = Cypress.env("supabaseUrl");

Cypress.Commands.add("signUp", () => {
  cy.request({
    method: "POST",
    url: `${supabaseUrl}/auth/v1/signup`,
    headers: {
      apikey: Cypress.env("apikey"),
    },
    body: {
      email: Cypress.env("email"),
      password: Cypress.env("password"),
    },
    failOnStatusCode: true,
  });
});

Cypress.Commands.add("signIn", () => {
  cy.getSession().then(response => {
    cy.window().then(win => {
      win.localStorage.setItem(
        "supabase.auth.token",
        JSON.stringify({
          currentSession: response.body,
          expiresAt: response.body.expires_at,
        })
      );
    });
  });

  cy.visit("/");
});

Cypress.Commands.add("getSession", () => {
  return cy.request({
    // TODO: why does only v1 work? Should be v3
    method: "POST",
    url: `${supabaseUrl}/auth/v1/token?grant_type=password`,
    headers: {
      apikey: Cypress.env("apikey"),
    },
    body: {
      email: Cypress.env("email"),
      password: Cypress.env("password"),
    },
    failOnStatusCode: true,
  });
});

Cypress.Commands.add("deleteUser", token => {
  cy.request({
    method: "POST",
    url: `${supabaseUrl}/rest/v1/rpc/delete_user`,
    headers: {
      apikey: Cypress.env("apikey"),
      Authorization: `Bearer ${token}`,
    },
    failOnStatusCode: true,
  });
});
