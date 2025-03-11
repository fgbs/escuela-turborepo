import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@repo/supabase/lib/server"
import { TargetGroupTimeline } from "./timeline";
import { ContentRender } from "@repo/ui/components/content-render";
import { SessionParams } from "../../../../components/session-params";
import { BackButton } from "@repo/ui/components/back-button";


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

  return (
    <>
      <SessionParams id={ tgroupid } />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
          <div className="flex items-center space-x-5">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{ data.name }</h1>
              <p className="text-sm font-medium text-gray-500">
                { `Módiulo ${data.sort_index}` }
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
            {/* <Link
              href={`/target/${targetid}/room`}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            >
              Ingresar a la Sala
            </Link>
            <Link
              href={`/target/record`}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            >
              Ver Grabación
            </Link>*/}
            <BackButton />
          </div>
        </div>


        <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-start-1 lg:col-span-2">

            {/* Description list*/}
            <section aria-labelledby="applicant-information-title">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 id="applicant-information-title" className="text-lg leading-6 font-medium text-gray-900">
                    { data && data.name }
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    
                  </p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <dd className="mt-1 text-sm text-gray-900">
                        <ContentRender content={ data.description } />
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
                Objetivos
              </h2>

              <TargetGroupTimeline tgroup={ tgroupid } />
            </div>
          </section>
        </div>
      </main>
    </>
  )
}