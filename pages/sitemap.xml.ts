import { ProjectType } from "@common/interfaces";
import { getAllProjects } from "@lib/requests/getAllProjects";
import { NextPage, NextApiResponse } from "next";
import { Component } from "react";

const publicURL = process.env.NEXT_PUBLIC_WEB_URL;
const createFullUrl: (path: string) => string = path => `${publicURL}${path}`;

const formatDate: (dateStr?: string) => string = dateStr => {
  const date = dateStr ? new Date(dateStr) : new Date();
  return `${date.getUTCFullYear()}-${
    date.getUTCMonth() + 1
  }-${date.getUTCDate()}`;
};

const getSitemap: (
  projects: ProjectType[]
) => string = projects => `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${createFullUrl("/")}</loc>
    <lastmod>${formatDate()}</lastmod>
  </url>
  ${projects
    .map(
      ({ id }) => `
  <url>
    <loc>${createFullUrl(`/${id}`)}</loc>
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
    const projects = await getAllProjects();
    res.setHeader("Content-Type", "text/xml");
    res.write(getSitemap(projects));
    res.end();
  }
}

export default Sitemap;
