import { NextApiResponse } from "next";
import { Component } from "react";

const getManifest = (): string => `
# https://www.robotstxt.org/robotstxt.html
User-agent: *
Disallow:
`;

class Sitemap extends Component {
  static getInitialProps({ res }: { res: NextApiResponse }): void {
    res.setHeader("Content-Type", "text/txt");
    res.write(getManifest());
    res.end();
  }
}

export default Sitemap;
