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
  if (!token) throw new Error(`No valid token provided: ${String(token)}`)
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

Cypress.Commands.add("createSensor", sensor => {
  if (!sensor) throw new Error(`No valid sensor provided: ${JSON.stringify(sensor)}`)
  return cy.getSession()
    .then(response => {
      const accessToken = response?.body?.access_token;
      if (!accessToken) throw new Error(`No valid token provided: ${String(accessToken)}`)
      return cy.request({
        method: "POST",
        url: `${supabaseUrl}/rest/v1/sensors`,
        headers: {
          apikey: Cypress.env("apikey"),
          Authorization: `Bearer ${response.body.access_token}`,
        },
        body: {
          ...sensor,
          user_id: response.body.user.id,
        },
        failOnStatusCode: true,
      });
    })
});

Cypress.Commands.add("getSensorByName", name => {
  if (!name) throw new Error(`No valid name provided: ${String(name)}`)
  return cy.getSession()
    .then(response => {
      const accessToken = response?.body?.access_token;
      if (!accessToken) throw new Error(`No valid token provided: ${String(accessToken)}`)
      return cy.request({
        method: "GET",
        url: `${supabaseUrl}/rest/v1/sensors?name=eq.${encodeURI(name)}`,
        headers: {
          apikey: Cypress.env("apikey"),
          Authorization: `Bearer ${response.body.access_token}`,
        },
        failOnStatusCode: true,
      });
    })
});

Cypress.Commands.add("createSensorRecord", sensorId => {
  if (!sensorId) throw new Error(`No valid sensorId provided: ${JSON.stringify(sensorId)}`)
  return cy.getSession()
    .then(response => {
      const accessToken = response?.body?.access_token;
      if (!accessToken) throw new Error(`No valid token provided: ${String(accessToken)}`)
      return cy.request({
        method: "POST",
        url: `${supabaseUrl}/rest/v1/records`,
        headers: {
          apikey: Cypress.env("apikey"),
          Authorization: `Bearer ${response.body.access_token}`,
        },
        body: {
          sensor_id: sensorId,
          measurements: [Math.random() * 100],
          recorded_at: new Date().toISOString(),
        },
        failOnStatusCode: true,
      });
    })
});

Cypress.Commands.add("getSensor", id => {
  if (!id) throw new Error(`No valid id provided: ${String(id)}`)
  return cy.getSession()
    .then(response => {
      return cy.request({
        method: "GET",
        url: `${supabaseUrl}/rest/v1/sensors?id=eq.${id}`,
        headers: {
          apikey: Cypress.env("apikey"),
          Authorization: `Bearer ${response.body.access_token}`,
        },
        failOnStatusCode: true,
      });
    })
});

Cypress.Commands.add("getAllSensors", () => {
  return cy.request({
    method: "GET",
    url: `${supabaseUrl}/rest/v1/sensors?created_at.asc.nullslast`,
    headers: {
      apikey: Cypress.env("apikey"),
    },
    failOnStatusCode: true,
  });
});

Cypress.Commands.add("getSensorRecords", sensorId => {
  if (!sensorId) throw new Error(`No valid sensorId provided: ${String(sensorId)}`)
  return cy.getSession()
    .then(response => {
      return cy.request({
        method: "GET",
        url: `${supabaseUrl}/rest/v1/records?sensor_id=eq.${sensorId}`,
        headers: {
          apikey: Cypress.env("apikey"),
          Authorization: `Bearer ${response.body.access_token}`,
        },
        failOnStatusCode: true,
      });
    })
});
