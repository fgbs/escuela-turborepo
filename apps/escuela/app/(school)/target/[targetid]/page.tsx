import Link from "next/link";
import { redirect } from "next/navigation";
import { Paperclip } from "lucide-react";

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

        <div className="container mx-auto px-4 pt-4 pb-4 sm:px-6 sm:pt-6 sm:pb-6 lg:px-8 lg:pt-8 lg:pb-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <ContentRender content={ data.content } />
            </div>

            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">
                    Bibliografía
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <ul role="list" className="border border-gray-200 rounded-md divide-y divide-gray-200">
                      {
                        documents.map((doc) => (
                          <li key={doc.id} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                            <div className="w-0 flex-1 flex items-center">
                              <Paperclip className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                              <span className="ml-2 flex-1 w-0 truncate">{ doc.filename }</span>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <Link 
                                href={`${siteConfig.storage.media}/${doc.course_id}/${targetid}/${doc.id}.pdf`} 
                                rel="noopener noreferrer"
                                target="_blank"
                                aria-label="Downlod"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Descargar
                              </Link>
                            </div>
                          </li>  
                        ))
                      }
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
