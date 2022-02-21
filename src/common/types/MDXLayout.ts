import { FC } from "react";

export interface MDXFrontmatterType extends Record<string, unknown> {
  title: string;
  metaTitle: string;
  metaDescription: string;
}

interface MDXLayoutProps {
  frontMatter: MDXFrontmatterType;
  slug: string;
}

export type MDXLayoutType = FC<MDXLayoutProps>;
