import { MDXLayoutType } from "@common/types/MDXLayout";
import { DocsSidebar } from "@components/DocsSidebar";
import Head from "next/head";

const DocsLayout: MDXLayoutType = ({ children, frontMatter }) => (
  <div className='grid grid-cols-12'>
    <DocsSidebar />
    <article className='col-span-9'>
      <Head>
        <title>
          {frontMatter.metaTitle} | Berlin IoT Hub | Technologiestiftung Berlin
        </title>
        <meta name='description' content={frontMatter.metaDescription} />
      </Head>
      <div className='container mx-auto prose lg:prose-lg prose-blue px-4 py-6 sm:px-8 sm:py-12 md:px-12 md:py-18 lg:px-18 lg:py-24'>
        <h1>{frontMatter.title}</h1>
        {children}
      </div>
    </article>
  </div>
);

export default DocsLayout;
