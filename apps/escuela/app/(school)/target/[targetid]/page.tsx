import { redirect } from "next/navigation";

import { createClient } from "@repo/supabase/lib/server";
import { getTargetsByTargetGroupId } from '@repo/supabase/models/targets'
import { BackButton } from "@repo/ui/components/back-button";
import { ContentRender } from "@repo/ui/components/content-render";
import { BiblioList } from "@repo/ui/components/biblio-list";
import { Sidebar } from "../../../../components/ui/sidebar";
import { RoomButton } from "../../../../components/room-button";


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
    .select('id, name, content, sort_index, rooms(id), target_group_id')
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
              { data && `Día ${data.sort_index}` }
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
              <ContentRender content={ data && data.content } />
            </div>

            <div className="px-4 py-4 col-span-1 bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="text-sm font-medium text-gray-800">
                Bibliografía
              </div>

              <BiblioList target={ targetid } />
            </div>
          </div>

        </div>
      </Sidebar>
    </>
  )
}
