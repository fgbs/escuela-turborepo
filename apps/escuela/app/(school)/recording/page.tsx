import { redirect } from "next/navigation";

import { createClient } from "@repo/supabase/lib/server";
import { BackButton } from '@repo/ui/components/back-button'
import { EmptyState } from '@repo/ui/components/empty-state'
import { Sidebar } from '../../../components/ui/sidebar'


export default async function RecordingPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth/login");
  }

  const course_id = '7829808c-991e-4b0a-b81f-4fddfde2a142'

  const { data, error } = await supabase
    .from('rooms')
    .select(`
      id, room_name, room_start_at,
      recordings!inner(id)
    `)
    .eq('course_id', course_id)
    .order('room_start_at', { ascending: false })

  if (error) throw error

  return(
    <>
      <Sidebar menu={ null }>
        <div className="bg-white border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
              Grabaciones
            </h1>
          </div>
          <div className="mt-4 flex sm:mt-0 sm:ml-4">
            <BackButton />
          </div>
        </div>

        {/*<div className="px-4 py-4 sm:px-6 bg-gray-100">
          <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">

          </h2>
        </div>*/}

        <div className="container mx-auto px-2 pt-2 pb-2 lg:px-4 lg:pt-4 lg:pb-4">
          {
            data ? (
              <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                {data.map((file) => (
                  <li key={file.id} className="relative">
                    <a href={`/record/${file.id}`}>
                      <div className="group block w-full aspect-w-10 aspect-h-7 shadow rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                        <img src="https://dabrdpdopssigtsyzrbx.supabase.co/storage/v1/object/public/media//fondo-recording.png" alt="" className="object-cover pointer-events-none group-hover:opacity-75" />
                        <button type="button" className="absolute inset-0 focus:outline-none">
                          <span className="sr-only">View details for {file.room_name}</span>
                        </button>
                      </div>
                    </a>
                    <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                      {file.room_name}
                    </p>
                    <p className="block text-sm font-medium text-gray-500 pointer-events-none">
                      <time dateTime="YYYY-MM-DD">{file.room_start_at}</time>
                    </p>
                  </li>
                ))}
              </ul>  
            ) : (
              <EmptyState title={'Grabación'} subtitle={'No hay grabaciones disponibles.'} />
            )
          }        
        </div>
      </Sidebar>
    </>
  )
}