import { redirect } from "next/navigation";

import { createClient } from "@repo/supabase/lib/server"
import { BackButton } from "@repo/ui/components/back-button";
import { ContentRender } from "@repo/ui/components/content-render";
import { Sidebar } from "../../../../components/ui/sidebar";
import { SessionParams } from "../../../../components/session-params";
import { getTargetsByTargetGroupId } from "@repo/supabase/models/targets";


export default async function TargetGroupPage({ params }: { params: { tgroup: string }}) {
  const supabase = await createClient();
  const tgroupid = (await params).tgroup

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth/login");
  }

  const { data, error } = await supabase
    .from('target_groups')
    .select('id, name, description, sort_index')
    .eq('id', tgroupid)
    .single()
  
  if (error) throw error

  const levels = await getTargetsByTargetGroupId(tgroupid)
  const menu = {
    name: "Objetivos",
    path: '/target',
    steps: levels
  }

  return (
    <>
      <SessionParams id={ tgroupid } />

      <Sidebar menu={ menu }>
        <div className="bg-white border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
              { data && data.name }
            </h1>
            <p className="text-sm font-medium text-gray-500">
              { `Módiulo ${data.sort_index}` }
            </p>
          </div>
          <div className="mt-4 flex sm:mt-0 sm:ml-4">
            <BackButton />
          </div>
        </div>

        <div className="container mx-auto px-4 pt-4 pb-4 sm:px-6 sm:pt-6 sm:pb-6 lg:px-8 lg:pt-8 lg:pb-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <ContentRender content={ data.description } />
            </div>
          </div>
        </div>
      </Sidebar>
    </>
  )
}