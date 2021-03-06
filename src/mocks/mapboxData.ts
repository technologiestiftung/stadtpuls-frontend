export const fakeGeocondingData = {
  type: "FeatureCollection",
  query: ["berlin"],
  features: [
    {
      id: "place.14094307404564380",
      type: "Feature",
      place_type: ["region", "place"],
      relevance: 1,
      properties: { wikidata: "Q64", short_code: "DE-BE" },
      text: "Berlin",
      place_name: "Berlin, Germany",
      bbox: [
        13.0883590415111, 52.3382670008426, 13.761131997363, 52.6755029827484,
      ],
      center: [13.38333, 52.51667],
      geometry: { type: "Point", coordinates: [13.38333, 52.51667] },
      context: [
        {
          id: "country.11437281100480410",
          wikidata: "Q183",
          short_code: "de",
          text: "Germany",
        },
      ],
    },
    {
      id: "poi.644245173809",
      type: "Feature",
      place_type: ["poi"],
      relevance: 1,
      properties: {
        wikidata: "Q9689",
        landmark: true,
        address: "Flughafen 1",
        category: "airport",
        foursquare: "4adcda91f964a520ae4b21e3",
        maki: "airport",
      },
      text: "Berlin-Schönefeld Airport (SXF)",
      place_name:
        "Berlin-Schönefeld Airport (SXF), Flughafen 1, Schönefeld, Brandenburg 12529, Germany",
      center: [13.5113245, 52.374990249999996],
      geometry: {
        coordinates: [13.5113245, 52.374990249999996],
        type: "Point",
      },
      context: [
        { id: "postcode.2433431496756920", text: "12529" },
        {
          id: "place.2433431495324050",
          wikidata: "Q521475",
          text: "Schönefeld",
        },
        {
          id: "region.7840720301387540",
          wikidata: "Q1208",
          short_code: "DE-BB",
          text: "Brandenburg",
        },
        {
          id: "country.11437281100480410",
          wikidata: "Q183",
          short_code: "de",
          text: "Germany",
        },
      ],
    },
    {
      id: "place.12959694684564380",
      type: "Feature",
      place_type: ["place"],
      relevance: 1,
      properties: { wikidata: "Q614184" },
      text: "Berlin",
      place_name: "Berlin, Maryland, United States",
      bbox: [
        -75.3649909958882, 38.1936800041133, -75.1034160570714,
        38.4063819953552,
      ],
      center: [-75.2177, 38.3226],
      geometry: { type: "Point", coordinates: [-75.2177, 38.3226] },
      context: [
        {
          id: "district.11109646370967900",
          wikidata: "Q494072",
          text: "Worcester County",
        },
        {
          id: "region.10710475061772660",
          wikidata: "Q1391",
          short_code: "US-MD",
          text: "Maryland",
        },
        {
          id: "country.19678805456372290",
          wikidata: "Q30",
          short_code: "us",
          text: "United States",
        },
      ],
    },
    {
      id: "place.9636476836564380",
      type: "Feature",
      place_type: ["place"],
      relevance: 1,
      properties: {},
      text: "Berlin",
      place_name: "Berlin, Connecticut, United States",
      bbox: [
        -72.8402459371898, 41.5541930667714, -72.7123370424466,
        41.6527077409123,
      ],
      center: [-72.7457, 41.6215],
      geometry: { type: "Point", coordinates: [-72.7457, 41.6215] },
      context: [
        {
          id: "district.3741183510865380",
          wikidata: "Q54236",
          text: "Hartford County",
        },
        {
          id: "region.9926898961180480",
          wikidata: "Q779",
          short_code: "US-CT",
          text: "Connecticut",
        },
        {
          id: "country.19678805456372290",
          wikidata: "Q30",
          short_code: "us",
          text: "United States",
        },
      ],
    },
    {
      id: "place.17511903694564380",
      type: "Feature",
      place_type: ["place"],
      relevance: 1,
      properties: { wikidata: "Q1086827" },
      text: "Berlin",
      place_name: "Berlin, New Jersey, United States",
      bbox: [
        -74.9845526381569, 39.7005030425031, -74.8813642893549,
        39.8091761778664,
      ],
      center: [-74.9291, 39.7912],
      geometry: { type: "Point", coordinates: [-74.9291, 39.7912] },
      context: [
        {
          id: "district.4965904302304240",
          wikidata: "Q497810",
          text: "Camden County",
        },
        {
          id: "region.8524001885700330",
          wikidata: "Q1408",
          short_code: "US-NJ",
          text: "New Jersey",
        },
        {
          id: "country.19678805456372290",
          wikidata: "Q30",
          short_code: "us",
          text: "United States",
        },
      ],
    },
  ],
  attribution:
    "NOTICE: © 2021 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service (https://www.mapbox.com/about/maps/). This response and the information it contains may not be retained. POI(s) provided by Foursquare.",
};
