import { redirect } from "next/navigation";

import { createClient } from "@repo/supabase/lib/server";
import { BackButton } from '@repo/ui/components/back-button'
import { Sidebar } from '../../../components/ui/sidebar'


export default async function RecordingPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth/login");
  }

  // const { data, error } = await supabase
  //   .from('recordings')
  //   .select(`
  //     id, filename, content_type, size,
  //     rooms!inner(
  //       id, room_name,
  //       targets!inner(
  //         id, name,
  //         target_groups!inner(
  //           id, name,
  //           levels!inner(
  //             id, name,
  //             courses!inner(id, name, description)
  //           )
  //         )
  //       )
  //     )
  //   `)
  //   .eq('default', true)

  // if (error) throw error

  const files = [
    {
      title: 'IMG_4985.HEIC',
      size: '3.9 MB',
      source:
        'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
    },
    // More files...
  ]

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

        <div className="px-4 py-4 sm:px-6 bg-gray-100">
          <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">Projects</h2>
        </div>

        <div className="container mx-auto px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8">
        
          <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {files.map((file) => (
              <li key={file.source} className="relative">
                <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                  <img src={file.source} alt="" className="object-cover pointer-events-none group-hover:opacity-75" />
                  <button type="button" className="absolute inset-0 focus:outline-none">
                    <span className="sr-only">View details for {file.title}</span>
                  </button>
                </div>
                <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{file.title}</p>
                <p className="block text-sm font-medium text-gray-500 pointer-events-none">{file.size}</p>
              </li>
            ))}
          </ul>

        </div>
      </Sidebar>
    </>
  )
}