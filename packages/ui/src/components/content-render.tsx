import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

import remarkEmbedder, {TransformerInfo} from '@remark-embedder/core'
import oembedTransformer from '@remark-embedder/transformer-oembed'
import rehypeRaw from 'rehype-raw'


export const ContentRender = async ({ content }: { content: string }) => {
  const GoogleDocsTransformer = {
    name: 'GoogleDocs',
    shouldTransform(url: string) {
      const {host, pathname} = new URL(url)
  
      return (
        ['docs.google.com'].includes(host) &&
        pathname.includes('/presentation/')
      )
    },
    // getHTML can also be async
    getHTML(url: string) {
      const iframeUrl = url.replace('/pub', '/embed')
  
      return `<iframe src="${iframeUrl}" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>`
    },
  }

  const handleHTML = (html: string, info: TransformerInfo) => {
    const {url, transformer} = info

    if (
      transformer.name === '@remark-embedder/transformer-oembed' ||
      url.includes('youtube.com')
    ) {
      return `<div class="embed-youtube aspect-w-16 aspect-h-9">${html}</div>`
    }

    if (
      transformer.name === '@remark-embedder/transformer-oembed' ||
      url.includes('google.com')
    ) {
      return `<div class="aspect-w-1 aspect-h-1">${html}</div>`
    }

    return html
  }

  const html = (
    await unified()
      .use(remarkParse)
      .use(remarkEmbedder, {
        transformers: [oembedTransformer, GoogleDocsTransformer],
        handleHTML,
      })
      .use(remarkRehype, {allowDangerousHtml: true})
      .use(rehypeRaw) // *Parse* the raw HTML strings embedded in the tree
      .use(rehypeStringify)
      .process(content)
  ).toString()

  return(
    <>
      <article className='ui-prose min-w-full' dangerouslySetInnerHTML={{__html: html }} />
    </>
  )
}
