import Link from "next/link";
import { redirect } from "next/navigation";

import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import remarkEmbedder, {TransformerInfo} from '@remark-embedder/core'
import oembedTransformer from '@remark-embedder/transformer-oembed'
import rehypeRaw from 'rehype-raw'

import { createClient } from '@repo/supabase/lib/server'
import { BackButton } from "@repo/ui/components/back-button";
import { Sidebar } from "../../../../components/ui/sidebar";
import { Paperclip } from "lucide-react";


const getTargets = async (id: string) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('targets')
      .select('id, name, visibility, sort_index')
      .eq('target_group_id', id)
      .order('sort_index', { ascending: true })

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.log('Error downloading image: ', error)
  }
}

export default async function TargetPage({ params }: { params: { targetid: string }}) {
  const supabase = await createClient()
  const targetid = (await params).targetid
  let menu = null

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth/login");
  }

  const { data, error } = await supabase
    .from('targets')
    .select('id, name, description, content, sort_index, rooms(id), target_group_id')
    .eq('id', targetid)
    .single()

  if (error) throw error

  if (data) {
    const levels = await getTargets(data.target_group_id)
    menu = {
      name: "Objetivos",
      path: '/target',
      steps: levels
    }
  }

  const GoogleDocsTransformer = {
    name: 'GoogleDocs',
    shouldTransform(url) {
      const {host, pathname} = new URL(url)
  
      return (
        ['docs.google.com'].includes(host) &&
        pathname.includes('/presentation/')
      )
    },
    // getHTML can also be async
    getHTML(url) {
      const iframeUrl = url.replace('/pub/', '/embed/')
  
      return `<iframe src="${iframeUrl}" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden" referrerpolicy="strict-origin-when-cross-origin"  sandbox="allow-presentation allow-same-origin allow-scripts" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>`
    },
  }

  const handleHTML = (html: string, info: TransformerInfo) => {
    const {url, transformer} = info

    console.log(html)

    if (
      transformer.name === '@remark-embedder/transformer-oembed' ||
      url.includes('youtube.com')
    ) {
      return `<div class="embed-youtube aspect-w-16 aspect-h-9">${html}</div>`
    }
    return html
  }

  const content = await unified()
    .use(remarkParse)
    .use(remarkEmbedder, {
      transformers: [oembedTransformer, GoogleDocsTransformer],
    })
    .use(remarkRehype, {allowDangerousHtml: true})
    .use(rehypeRaw) // *Parse* the raw HTML strings embedded in the tree
    .use(rehypeStringify)
    .process(data.content)
  
  return (
    <>
      <Sidebar menu={menu}>
        <div className="bg-white border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
              { data && data.name }
            </h1>
            <p className="text-sm font-medium text-gray-500">
              { `Día ${data.sort_index}` }
            </p>
          </div>
          <div className="mt-4 flex sm:mt-0 sm:ml-4">

            <Link
              type="button"
              href={`/room/${targetid}`}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:order-1 sm:ml-3"
            >
              Ir a Sala
            </Link>

            <Link
              type="button"
              href={`/record/${targetid}`}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
            >
              Ver Grabación
            </Link>

            <BackButton />
          </div>
        </div>

        <div className="container mx-auto px-4 pt-4 pb-4 sm:px-6 sm:pt-6 sm:pb-6 lg:px-8 lg:pt-8 lg:pb-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <article className='ui-prose min-w-full' dangerouslySetInnerHTML={{__html: content.toString() }} />
              {/* <ContentRender content={ data.content } /> */}
            </div>

            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">
                    Bibliografía
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <ul role="list" className="border border-gray-200 rounded-md divide-y divide-gray-200">
                      <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                        <div className="w-0 flex-1 flex items-center">
                          <Paperclip className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                          <span className="ml-2 flex-1 w-0 truncate">resume_back_end_developer.pdf</span>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Download
                          </a>
                        </div>
                      </li>
                      <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                        <div className="w-0 flex-1 flex items-center">
                          <Paperclip className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                          <span className="ml-2 flex-1 w-0 truncate">coverletter_back_end_developer.pdf</span>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Download
                          </a>
                        </div>
                      </li>
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </Sidebar>
    </>
  )
}