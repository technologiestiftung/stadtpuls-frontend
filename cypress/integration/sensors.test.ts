describe("The Sensors page - Desktop", () => {
  it("should show sensors and paging", () => {
    cy.viewport("macbook-13");
    cy.visit("/sensors");

    cy.findByRole("heading", { name: /Alle Sensoren/i }).should("exist");
    cy.findByRole("button", { name: /1/i }).should("exist");
    
    cy.get("ul.flex").findAllByRole("listitem").should("have.length", 30);

    cy.findByRole("button", { name: /2/i }).should("exist").click();
  });
  it("should highlight items in map on list hover", () => {
    cy.viewport("macbook-13");
    cy.visit("/sensors");

    cy.wait(8000);
    cy.get("canvas.mapboxgl-canvas").should("exist");
    cy.get("button.rounded-full.bg-blue").should("have.length", 6);

    const list = cy.get("ul.flex");
    const items = list.findAllByRole("listitem");
    items.should("have.length", 30);
    
    // Cluster
    const firstItem = items.first();
    firstItem.scrollIntoView();
    firstItem.trigger("mouseover");
    cy.findByRole("button", { name: /5/i }).should("have.class", "bg-green");
    firstItem.get("a.border-green").should("exist");

    // Single dot
    const fadilItem = cy.get("ul.flex > li:nth-child(23)").first();
    fadilItem.scrollIntoView();
    fadilItem.trigger("mouseover");
    cy.get("button.rounded-full.bg-green").should("exist");
    fadilItem.get("a.border-green").should("exist");
  });
  it("should expand cluster on click", () => {
    cy.viewport("macbook-13");
    cy.visit("/sensors");

    cy.wait(8000);
    cy.get("canvas.mapboxgl-canvas").should("exist");
    cy.get("button.rounded-full.bg-blue").should("have.length", 6);

    const list = cy.get("ul.flex");
    list.findAllByRole("listitem").should("have.length", 30);
    
    // Cluster
    cy.findByRole("button", { name: /5/i }).click();
    cy.wait(2000);

    cy.get("div.mapboxgl-marker").should("have.length", 3);
    
    // Cluster 2
    cy.findByRole("button", { name: /3/i }).click();
    cy.wait(2000);

    cy.get("div.mapboxgl-marker").should("have.length", 5);
  });
  it.only("should expand multiple dots on same spot", () => {
    cy.viewport("macbook-13");
    cy.visit("/sensors");

    cy.wait(8000);
    cy.get("canvas.mapboxgl-canvas").should("exist");
    cy.get("button.rounded-full.bg-blue").should("have.length", 6);

    const list = cy.get("ul.flex");
    list.findAllByRole("listitem").should("have.length", 30);
    
    // Cluster
    cy.findByRole("button", { name: /16/i }).click();
    cy.wait(2000);

    cy.findByRole("button", { name: /15/i }).click();
    cy.wait(2000);

    cy.findByRole("button", { name: /7/i }).click();
    cy.wait(2000);

    cy.get(".mapboxgl-marker:nth-child(5) button").first().click();
    cy.wait(2000);
    
    cy.get("[data-cy='same-position-markers-group']").should("exist");
  });
  it("should scroll element into view when map bubble is hovered", () => {
    cy.viewport("macbook-13");
    cy.visit("/sensors");

    cy.wait(8000);
    cy.get("canvas.mapboxgl-canvas").should("exist");
    cy.get("button.rounded-full.bg-blue").should("have.length", 6);

    const list = cy.get("ul.flex");
    list.findAllByRole("listitem").should("have.length", 30);

    // Single dot
    const fadilItem = cy.get("ul.flex > li:nth-child(23)").first();
    fadilItem.scrollIntoView();
    fadilItem.trigger("mouseover");
    cy.get("button.rounded-full.bg-green").should("exist");

    cy.scrollTo(0, 0);
    cy.wait(1000);
    cy.get("button.rounded-full.bg-green").trigger("mouseover");
    cy.wait(1000);
    cy.get("ul.flex > li:nth-child(23)").should("be.inViewport");
  });
  it("should zoom the map when using buttons", () => {
    cy.viewport("macbook-13");
    cy.visit("/sensors");

    cy.wait(8000);
    cy.get("canvas.mapboxgl-canvas").should("exist");
    cy.get("button.rounded-full.bg-blue").should("have.length", 6);

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

    const list = cy.get("ul.flex");
    const items = list.findAllByRole("listitem");
    items.should("have.length", 30);
    cy.findByRole("button", { name: /1/i }).should("exist");
    
    cy.get("ul.flex").findAllByRole("listitem").should("have.length", 30);

    cy.findByRole("button", { name: /2/i }).should("exist").click();

    cy.get("#headlessui-switch-1").click();

    cy.findByText(/Karte lädt.../i).should("exist");
    cy.wait(4000);
    cy.get("canvas.mapboxgl-canvas").should("exist");
    cy.get(".mapboxgl-marker").should("have.length", 5);
  });
  it("should be able to search for a place", () => {
    cy.viewport("iphone-3");
    cy.visit("/sensors");

    cy.get("#headlessui-switch-1").click();

    cy.wait(8000);
    cy.get("canvas.mapboxgl-canvas").should("exist");

    cy.findByRole("textbox").type("Platz d. Luftbrücke 4, 12101 Berlin, Germany");

    cy.get("ul.bg-white.shadow > li:first-child > button").click();
    
    cy.get("div.mapboxgl-marker").should("have.length", 3);
  });
});
