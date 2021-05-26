import { FC } from "react";

interface MDXFrontmatterType extends Record<string, unknown> {
  title: string;
  metaTitle: string;
  metaDescription: string;
}

interface MDXLayoutProps {
  frontMatter: MDXFrontmatterType;
}

export type MDXLayoutType = FC<MDXLayoutProps>;
