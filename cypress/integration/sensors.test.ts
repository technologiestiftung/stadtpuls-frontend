describe("The Sensors page - Desktop", () => {
  it("should show sensors and paging", () => {
    cy.viewport("macbook-13");
    cy.visit("/sensors");

    cy.findByRole("heading", { name: /Alle Sensoren/i }).should("exist");
    cy.findByRole("button", { name: /1/i }).should("exist");
    
    cy.get("[data-cy='sensors-list-item']").should("have.length", 30);

    cy.findByRole("button", { name: /2/i }).should("exist").click();
  });
  it("should highlight items in map on list hover", () => {
    cy.viewport("macbook-13");
    cy.visit("/sensors");

    cy.get("[data-cy='marker-map-loaded']", { timeout: 16000 }).should("exist");
    cy.get("[data-cy^='marker-circle']").should("have.length", 6);

    const items = cy.get("[data-cy='sensors-list-item']");
    items.should("have.length", 30);
    
    // Cluster
    const firstItem = items.first();
    firstItem.scrollIntoView();
    firstItem.trigger("mouseover");
    cy.findByRole("button", { name: /5/i }).should("have.class", "bg-green");
    firstItem.get("a.border-green").should("exist");

    // Single dot
    const fadilItem = cy.get("[data-cy='sensors-list-item']:nth-child(23)").first();
    fadilItem.scrollIntoView();
    fadilItem.trigger("mouseover");
    cy.get("[data-cy^='marker-circle'].bg-green").should("exist");
    fadilItem.get("a.border-green").should("exist");
  });
  it("should expand cluster on click", () => {
    cy.viewport("macbook-13");
    cy.visit("/sensors");

    cy.get("[data-cy='marker-map-loaded']", { timeout: 16000 }).should("exist");
    cy.get("[data-cy^='marker-circle']").should("have.length", 6);
    cy.get("[data-cy='sensors-list-item']").should("have.length", 30);
    
    // Cluster
    cy.findByRole("button", { name: /5/i }).click();
    cy.wait(2000);

    cy.get("[data-cy^='marker-circle']").should("have.length", 3);
    
    // Cluster 2
    cy.findByRole("button", { name: /3/i }).click();
    cy.wait(2000);

    cy.get("[data-cy^='marker-circle']").should("have.length", 5);
  });
  it("should expand multiple dots on same spot", () => {
    cy.viewport("macbook-13");
    cy.visit("/sensors");

    const map = cy.get("[data-cy='marker-map-loaded']", { timeout: 16000 });
    map.should("exist");
    cy.get("[data-cy^='marker-circle']").should("have.length", 6);

    cy.get("[data-cy='sensors-list-item']").should("have.length", 30);
    
    // Cluster
    cy.findByRole("button", { name: /16/i }).click();
    cy.findByRole("button", { name: /15/i }).click();
    cy.findByRole("button", { name: /7/i }).click();
    cy.wait(1000);
    cy.get("[data-cy='marker-circle-cluster']").eq(3).click();
    
    map.get("[data-cy='same-position-markers-group']").should("exist");
  });
  it("should scroll element into view when map bubble is hovered", () => {
    cy.viewport("macbook-13");
    cy.visit("/sensors");

    cy.get("[data-cy='marker-map-loaded']", { timeout: 16000 }).should("exist");
    cy.get("[data-cy^='marker-circle']").should("have.length", 6);

    cy.get("[data-cy='sensors-list-item']").should("have.length", 30);

    // Single dot
    const fadilItem = cy.get("[data-cy='sensors-list-item']:nth-child(23)").first();
    fadilItem.scrollIntoView();
    fadilItem.trigger("mouseover");
    cy.get("[data-cy^='marker-circle'].bg-green").should("exist");

    cy.scrollTo(0, 0);
    cy.wait(1000);
    cy.get("[data-cy^='marker-circle'].bg-green").trigger("mouseover");
    cy.wait(1000);
    cy.get("[data-cy='sensors-list-item']:nth-child(23)").should("be.inViewport");
  });
  it("should zoom the map when using buttons", () => {
    cy.viewport("macbook-13");
    cy.visit("/sensors");

    cy.get("[data-cy='marker-map-loaded']", { timeout: 16000 }).should("exist");
    cy.get("[data-cy^='marker-circle']").should("have.length", 6);

    cy.get("button.mapboxgl-ctrl-zoom-in").click();
    cy.wait(1000);
    cy.get("button.mapboxgl-ctrl-zoom-out").click();
  });
});
describe("The Sensors page - Mobile", () => {
  it("should allow to switch between list and map", () => {
    cy.viewport("iphone-3");
    cy.visit("/sensors");

    cy.findByRole("heading", { name: /Alle Sensoren/i }).should("exist");

    cy.get("[data-cy='sensors-list-item']").should("have.length", 30);
    cy.findByRole("button", { name: /1/i }).should("exist");
    
    cy.get("ul.flex").findAllByRole("listitem").should("have.length", 30);

    cy.findByRole("button", { name: /2/i }).should("exist").click();

    cy.get("[data-cy='map-list-switch-map-link']").click({ waitForAnimations: false });

    cy.get("[data-cy='marker-map-loaded']", { timeout: 16000 }).should("exist");
  });
  it("should be able to search for a place", () => {
    cy.viewport("iphone-3");
    cy.visit("/sensors");

    cy.get("[data-cy='map-list-switch-map-link']").click();

    cy.get("[data-cy='marker-map-loaded']", { timeout: 16000 }).should("exist");

    cy.findByRole("textbox").type("Platz d. Luftbrücke 4, 12101 Berlin, Germany");

    cy.get("[data-cy='map-search-result']")
      .first()
      .click({ waitForAnimations: false });
    
    cy.get("[data-cy^='marker-circle']").should("have.length", 3);
  });
  it("should show a sensor thumbnail when marker is clicked on mobile", () => {
    cy.viewport("iphone-3");
    cy.visit("/sensors");

    cy.get("[data-cy='map-list-switch-map-link']").click();

    cy.get("[data-cy='marker-map-loaded']", { timeout: 16000 }).should("exist");

    cy.get("[data-cy='marker-circle-single']").first().click({ waitForAnimations: false });
    
    cy.get("[data-cy='map-thumbnail-sensor']").should("exist");
    
    cy.get("[data-cy='marker-map-loaded']").click();

    cy.get("[data-cy='map-thumbnail-sensor']").should("not.exist");
  });
});
