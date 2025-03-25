import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from '@repo/supabase/lib/server'
import { ContentRender } from "@repo/ui/components/content-render"
import { BackButton } from "@repo/ui/components/back-button";
import { Sidebar } from "../../../../components/ui/sidebar";


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

  return (
    <>
      <Sidebar menu={menu}>
        <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
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

        <div className="container mx-auto px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8">
          <ContentRender content={ data.content } />
        </div>
      </Sidebar>
    </>
  )
}