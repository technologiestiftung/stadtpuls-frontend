import { MDXLayoutType } from "@common/types/MDXLayout";

const DocsLayout: MDXLayoutType = ({ children, frontMatter }) => (
  <div className='container mx-auto max-w-prose px-8 py-12'>
    <h1>{frontMatter.title}</h1>
    {children}
  </div>
);

export default DocsLayout;
