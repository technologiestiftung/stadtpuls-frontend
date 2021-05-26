import { FC } from "react";

interface MDXFrontmatterType extends Record<string, unknown> {
  title: string;
}

interface MDXLayoutProps {
  frontMatter: Record<string, MDXFrontmatterType>;
}

export type MDXLayoutType = FC<MDXLayoutProps>;
