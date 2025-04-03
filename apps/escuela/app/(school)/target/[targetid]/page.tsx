import Link from "next/link";
import { redirect } from "next/navigation";
import { ExternalLink, Paperclip } from "lucide-react";
import { SiYoutube } from '@icons-pack/react-simple-icons';

import { createClient } from "@repo/supabase/lib/server";
import { getTargetsByTargetGroupId } from '@repo/supabase/models/targets'
import { getDocumentsByTargetId } from '@repo/supabase/models/bibliographies'
import { BackButton } from "@repo/ui/components/back-button";
import { ContentRender } from "@repo/ui/components/content-render";
import { siteConfig } from "../../../siteConfig";
import { Sidebar } from "../../../../components/ui/sidebar";
import { RoomButton } from "../../../../components/room-button";
import { RecordButton } from "../../../../components/record-button";


export default async function TargetPage({ params }: { params: { targetid: string }}) {
  const supabase = await createClient()
  const targetid = (await params).targetid
  let menu = null
  let documents = []

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
    .maybeSingle()

  if (error) throw error

  if (data) {
    const levels = await getTargetsByTargetGroupId(data.target_group_id)
    
    menu = {
      name: "Objetivos",
      path: '/target',
      steps: levels
    }

    documents = await getDocumentsByTargetId(targetid)
  }

  const getLink = (doc) => {
    if (doc.type === 'document') {
      return `${siteConfig.storage.media}/${doc.course_id}/${targetid}/${doc.id}.${doc.ext}`
    }

    if (doc.type === 'youtube') {
      return `https://www.youtube.com/watch?v=${doc.filename}`
    }

    if (doc.type === 'link') {
      return `${doc.filename}`
    }

    return '#'
  }
  
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
            <RoomButton target={ targetid } />
            <BackButton />
          </div>
        </div>

        <div className="container mx-auto px-2 pt-2 pb-2 lg:px-4 lg:pt-4 lg:pb-4">

          <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">

            <div className="px-4 py-4 col-span-2 bg-white shadow overflow-hidden sm:rounded-lg">
              <ContentRender content={ data.content } />
            </div>

            <div className="px-4 py-4 bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="text-sm font-medium text-gray-800">
                Bibliografía
              </div>

              <ul role="list" className="mt-4 divide-y divide-gray-200">
                {
                  documents.map((doc) => (
                    <li key={doc.id}>
                      <Link 
                        href={getLink(doc)} 
                        rel="noopener noreferrer"
                        target="_blank"
                        aria-label="Downlod"
                        className="block hover:bg-gray-50"
                      >
                        <div className="px-2 py-2 sm:px-4">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-indigo-600 truncate">
                              {doc.name}
                            </p>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <p className="flex items-center text-sm text-gray-500">
                                {doc.author}
                              </p>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                              {
                                doc.type === 'document' 
                                ? <Paperclip className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                                : doc.type === 'youtube' 
                                ? <SiYoutube className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                                : <ExternalLink className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                              }
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>  
                  ))
                }
              </ul>

            </div>
          </div>

        </div>
      </Sidebar>
    </>
  )
}
