import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@repo/supabase/lib/server"
import { ContentRender } from "@repo/ui/components/content-render"
import { Sidebar } from "../../../../components/ui/sidebar";
import { SessionParams } from "../../../../components/session-params"
import { siteConfig } from "../../../siteConfig";
import { BackButton } from "@repo/ui/components/back-button";


const getLevels = async (id: string) => {
  const supabase = await createClient();

  try {
    // const { data, error } = await supabase
    //   .from('levels')
    //   .select('id, name, target_groups(id, name)')
    //   .eq('course_id', id)
    //   .order('number', { ascending: true })

    const { data, error } = await supabase
      .from('target_groups')
      .select(`
        id, name, visibility, sort_index,
        levels!inner(id, name)
      `)
      .eq('levels.course_id', id)
      .order('sort_index', { ascending: true })

    if (error) throw error

    return data
  } catch (error) {
    console.log('Error downloading image: ', error)
  }
}

export default async function CoursePage({ params }: { params: { courseid: string }}) {
  const supabase = await createClient();
  const courseid = (await params).courseid

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth/login");
  }

  const { data, error } = await supabase
    .from('courses')
    .select('name, description, about, cover')
    .eq('id', courseid)
    .single()
  
  if (error) throw error

  const levels = await getLevels(courseid)
  const menu = {
    name: 'Módulos',
    path: '/group',
    steps: levels
  }

  return (
    <>  
      <SessionParams id={ courseid } />

      <Sidebar menu={ menu }>
        <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
              { data && data.name }
            </h1>
          </div>
          <div className="mt-4 flex sm:mt-0 sm:ml-4">
            <BackButton />
            <Link
              href={`${menu.path}/${menu.steps[0].id}`}
              className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
            >
              Comenzar
            </Link>
          </div>
        </div>

        <div className="h-32 w-full lg:h-48">
          <img 
            src={`${siteConfig.storage.media}/${data.cover}`} 
            className="h-32 w-full object-cover lg:h-48" 
            alt="" 
          />
        </div>

        {/* 
        <div className="px-4 mt-6 sm:px-6 lg:px-8">
          <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">Módulos</h2>
          <CourseTimeline course={ courseid } />
        </div>
        */}

        <div className="container mx-auto px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8">
          <ContentRender content={ data.about } />
        </div>
      </Sidebar>
    </>
  )
}