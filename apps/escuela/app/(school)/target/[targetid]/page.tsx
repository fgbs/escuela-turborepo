import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from '@repo/supabase/lib/server'
import { ContentRender } from "@repo/ui/components/content-render"
import { BackButton } from "@repo/ui/components/back-button";


export default async function TargetPage({ params }: { params: { targetid: string }}) {
  const supabase = await createClient()
  const targetid = (await params).targetid

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth/login");
  }

  const { data, error } = await supabase
    .from('targets')
    .select('id, title, description, content, sort_index, rooms(id)')
    .eq('id', targetid)
    .single()

  if (error) {
    throw error
  }

  return (
    <>
      <main className="py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
          <div className="flex items-center space-x-5">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{ data.title }</h1>
              <p className="text-sm font-medium text-gray-500">
                { `Día ${data.sort_index}` }
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
            {/* <Link
              href={`/target/${targetid}/room`}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            >
              Ingresar a la Sala
            </Link> */}
            <Link
              href={`/target/${targetid}/record`}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            >
              Ver Grabación
            </Link>
            <BackButton />
          </div>
        </div>

        <div className="container mx-auto sm:px-6 lg:px-8">

          <div className="mt-8 bg-white shadow sm:rounded-lg">
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <ContentRender content={ data.content } />
            </div>
          </div>

        </div>
      </main>
    </>
  )
}