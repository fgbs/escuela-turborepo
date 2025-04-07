
import { redirect } from "next/navigation";

import { createClient } from "@repo/supabase/lib/server"
import { ContentRender } from "@repo/ui/components/content-render"
import { BackButton } from "@repo/ui/components/back-button";
import { Sidebar } from "../../../../components/ui/sidebar";
import { SessionParams } from "../../../../components/session-params"
import { siteConfig } from "../../../siteConfig";


const getTargetGroupsByCourseId = async (course_id: string) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from('target_groups')
      .select(`
        id, name, visibility, sort_index,
        levels!inner(id, name)
      `)
      .eq('levels.course_id', course_id)
      .order('sort_index', { ascending: true })

    if (error) throw error

    return data
  } catch (error) {
    console.log('Error downloading image: ', error)
    return []
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

  const levels = await getTargetGroupsByCourseId(courseid)
  const menu = {
    name: 'Módulos',
    path: '/group',
    steps: levels
  }

  return (
    <>  
      <SessionParams id={ courseid } />

      <Sidebar menu={ menu }>
        <div className="bg-white border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
              { data && data.name }
            </h1>
          </div>
          <div className="mt-4 flex sm:mt-0 sm:ml-4">
            <BackButton />
            {
              menu && (
                <a
                  href={`${menu.path}/${menu?.steps[0]?.id}`}
                  className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
                >
                  Comenzar
                </a>  
              )
            }
          </div>
        </div>

        <div className="h-32 w-full lg:h-48">
          <img 
            src={`${siteConfig.storage.media}/${data.cover}`} 
            className="h-32 w-full object-cover lg:h-48" 
            alt="" 
          />
        </div>

        <div className="container mx-auto px-4 pt-4 pb-4 sm:px-6 sm:pt-6 sm:pb-6 lg:px-8 lg:pt-8 lg:pb-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <ContentRender content={ data.about } />
            </div>
          </div>
        </div>
      </Sidebar>
    </>
  )
}