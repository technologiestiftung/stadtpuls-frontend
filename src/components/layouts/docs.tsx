import { MDXLayoutType } from "@common/types/MDXLayout";
import Head from "next/head";

const DocsLayout: MDXLayoutType = ({ children, frontMatter }) => (
  <article className='px-4 py-6 sm:px-8 sm:py-12 md:px-12 md:py-18 lg:px-18 lg:py-24'>
    <Head>
      <title>
        {frontMatter.metaTitle} | Berlin IoT Hub | Technologiestiftung Berlin
      </title>
      <meta name='description' content={frontMatter.metaDescription} />
    </Head>
    <div className='container mx-auto prose lg:prose-lg prose-blue'>
      <h1>{frontMatter.title}</h1>
      {children}
    </div>
  </article>
);

export default DocsLayout;
