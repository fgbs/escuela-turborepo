import { redirect } from "next/navigation";

import { createClient } from "@repo/supabase/lib/server"
import { CourseTimeline } from "./timeline"
import { ContentRender } from "@repo/ui/components/content-render"
import { SessionParams } from "../../../../components/session-params"


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

  return (
    <>  
      <SessionParams id={ courseid } />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

        <div className="max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-start-1 lg:col-span-2">

            {/* Description list*/}
            <section aria-labelledby="applicant-information-title">
              <div className="bg-white shadow sm:rounded-lg">
                <div>

                  <div className="h-32 w-full lg:h-48">
                    <img 
                      src={`https://dabrdpdopssigtsyzrbx.supabase.co/storage/v1/object/public/media/${data.cover}`} 
                      className="h-32 w-full object-cover lg:h-48" alt="" />
                  </div>

                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <dd className="mt-1 text-sm text-gray-900">
                        <ContentRender content={ data.about } />
                      </dd>
                    </div>
                  </dl>
                </div>
                {/* <div>
                  <a
                    href="#"
                    className="block bg-gray-50 text-sm font-medium text-gray-500 text-center px-4 py-4 hover:text-gray-700 sm:rounded-b-lg"
                  >
                    Read full application
                  </a>
                </div> */}
              </div>
            </section>
          </div>

          <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
              <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                Módulos
              </h2>

              <CourseTimeline course={ courseid } />
            </div>
          </section>
        </div>
      </main>
    </>
  )
}