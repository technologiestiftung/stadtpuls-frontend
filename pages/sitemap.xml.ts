import { getPublicSensors, PublicSensors } from "@lib/hooks/usePublicSensors";
import { NextPage, NextApiResponse } from "next";
import { Component } from "react";

const publicURL = process.env.NEXT_PUBLIC_WEB_URL || "";
const createFullUrl: (path: string) => string = path => `${publicURL}${path}`;

const formatDate: (dateStr?: string) => string = dateStr => {
  const date = dateStr ? new Date(dateStr) : new Date();
  return `${date.getUTCFullYear()}-${
    date.getUTCMonth() + 1
  }-${date.getUTCDate()}`;
};

export const getSitemap: (sensors: PublicSensors) => string = ({
  sensors,
}) => `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${createFullUrl("/")}</loc>
    <lastmod>${formatDate()}</lastmod>
  </url>
  ${sensors
    .map(
      ({ id }) => `
  <url>
    <loc>${createFullUrl(`/sensors/${id}`)}</loc>
    <lastmod>${formatDate()}</lastmod>
  </url>`
    )
    .join("")}
</urlset>`;

class Sitemap extends Component<NextPage> {
  static async getInitialProps({
    res,
  }: {
    res: NextApiResponse;
  }): Promise<void> {
    const sensors = await getPublicSensors();
    res.setHeader("Content-Type", "text/xml");
    res.write(getSitemap(sensors));
    res.end();
  }
}

export default Sitemap;
