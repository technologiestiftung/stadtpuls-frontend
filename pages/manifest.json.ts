import { NextApiResponse } from "next";
import { Component } from "react";

const getManifest = (): string => `{
  "short_name": "Berlin IoT Hub",
  "name": "Berlin IoT Hub",
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
`;

class Sitemap extends Component {
  static async getInitialProps({
    res,
  }: {
    res: NextApiResponse;
  }): Promise<void> {
    res.setHeader("Content-Type", "application/manifest+json");
    res.write(getManifest());
    res.end();
  }
}

export default Sitemap;
