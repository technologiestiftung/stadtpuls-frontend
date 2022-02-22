import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { Accordion } from "@components/Accordion";
import { Button } from "@components/Button";
import DocsLayout from "@components/layouts/docs";
import { ReactNode } from "react";
import { GetStaticProps } from "next";
import { MDXFrontmatterType } from "@common/types/MDXLayout";
import path from "path";
import fs from "fs";
import matter from "gray-matter";

const components = {
  Accordion,
  Button,
};
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

export const getStaticProps: GetStaticProps = async () => {
  const pagePath = path.join(process.cwd(), `content/index.mdx`);
  const fileContent = fs.readFileSync(pagePath, "utf8");

  const { content, data } = matter(fileContent);
  const mdxSource = await serialize(content);
  return { props: { source: mdxSource, frontmatter: data, slug: "index" } };
};
