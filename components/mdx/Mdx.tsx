import {MDXRemote} from 'next-mdx-remote/rsc';
import rehypeSlug from 'rehype-slug';
// @ts-expect-error — lokal plugin utan typer
import rehypeWrapTables from '@/lib/rehype-wrap-tables.mjs';
import remarkGfm from 'remark-gfm';
import mdxComponents from './MdxComponents';

export default function Mdx({source, hideDrill = false}: {source: string; hideDrill?: boolean}) {
  const components = hideDrill
    ? {...mdxComponents, Drill: () => null}
    : mdxComponents;

  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug, rehypeWrapTables],
        },
      }}
    />
  );
}
