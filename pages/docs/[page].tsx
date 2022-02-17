import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { Accordion } from "@components/Accordion";
import { Button } from "@components/Button";
import DocsLayout from "@components/layouts/docs";
import { ReactNode } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXFrontmatterType } from "@common/types/MDXLayout";
import path from "path";
import fs from "fs";
import matter from "gray-matter";

const components = { Accordion, Button };

interface Props {
  source: MDXRemoteSerializeResult;
  frontmatter: MDXFrontmatterType;
  slug: string;
}

export default function DocsPage({
  source,
  frontmatter,
  slug,
}: Props): ReactNode {
  return (
    <DocsLayout frontMatter={frontmatter} slug={slug}>
      <MDXRemote {...source} components={components} />
    </DocsLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (typeof params?.page !== "string") return { notFound: true };
  const slug = params.page;
  const { content, data } = loadPage(slug);

  const mdxSource = await serialize(content);
  return { props: { source: mdxSource, frontmatter: data, slug } };
};

export const getStaticPaths: GetStaticPaths = () => {
  const slugs = loadPageSlugs();
  return {
    paths: slugs.map(page => ({ params: { page } })),
    fallback: false,
  };
};

function loadPage(slug: string): ReturnType<typeof matter> {
  const pagePath = path.join(process.cwd(), `content/${slug}.mdx`);
  const fileContent = fs.readFileSync(pagePath, "utf8");

  return matter(fileContent);
}

function loadPageSlugs(): string[] {
  const postsDirectory = path.join(process.cwd(), "content");
  const filenames = fs.readdirSync(postsDirectory);

  return filenames
    .filter(n => n !== "index.mdx")
    .map(n => n.replace(".mdx", ""));
}
