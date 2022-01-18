import { ParsedAccountType } from "@lib/hooks/usePublicAccounts";
import { ParsedSensorType } from "@lib/hooks/usePublicSensors";
import { getPublicAccounts } from "@lib/requests/getPublicAccounts";
import { getPublicSensors } from "@lib/requests/getPublicSensors";
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

export const getSitemap: (params: {
  sensors: ParsedSensorType[];
  accounts: ParsedAccountType[];
}) => string = ({
  sensors,
  accounts,
}) => `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${createFullUrl("/")}</loc>
    <lastmod>${formatDate()}</lastmod>
  </url>
  <url>
    <loc>${createFullUrl("/sensors")}</loc>
    <lastmod>${formatDate()}</lastmod>
  </url>
  ${sensors
    .map(
      ({ id, authorUsername }) => `
  <url>
    <loc>${createFullUrl(`/${authorUsername}/sensors/${id}`)}</loc>
    <lastmod>${formatDate()}</lastmod>
  </url>`
    )
    .join("")}
  <url>
    <loc>${createFullUrl("/accounts")}</loc>
    <lastmod>${formatDate()}</lastmod>
  </url>
  ${accounts
    .map(
      ({ username }) => `
  <url>
    <loc>${createFullUrl(`/${username}/sensors`)}</loc>
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
    const { sensors } = await getPublicSensors();
    const accounts = await getPublicAccounts();
    res.setHeader("Content-Type", "text/xml");
    res.write(getSitemap({ sensors, accounts }));
    res.end();
  }
}

export default Sitemap;
