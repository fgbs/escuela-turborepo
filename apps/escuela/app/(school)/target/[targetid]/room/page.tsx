import { redirect } from "next/navigation";

import { createClient } from '@repo/supabase/lib/server'
import { BackButton } from "@repo/ui/components/back-button";
import { Sidebar } from "../../../../../components/ui/sidebar";


export default async function TargetRoomPage({ params }: { params: { targetid: string }}) {
  const supabase = await createClient()
  const targetid = (await params).targetid

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth/login");
  }

  const { data, error } = await supabase
    .from('rooms')
    .select('id, room_name, active, status')
    .eq('target_id', targetid)
    .single()

  if (error) {
    throw error
  }

  return(
    <>
      <Sidebar menu={null}>
        <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
              { data && data.room_name }
            </h1>
            <p className="text-sm font-medium text-gray-500">

            </p>
          </div>
          <div className="mt-4 flex sm:mt-0 sm:ml-4">
            <BackButton />
          </div>
        </div>

        <div className="container mx-auto px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8">
          soon
        </div>
      </Sidebar>
    </>
  )
}
