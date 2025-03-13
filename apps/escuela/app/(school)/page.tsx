import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@repo/supabase/lib/server";
import { Sidebar } from "../../components/ui/sidebar";


export default async function SchoolPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth/login");
  }

  const { data, error } = await supabase
    .from('courses')
    .select('id, name, description, thumb')
  
  if (error) throw error

  return (
    <>
      <Sidebar menu={ null }>
        <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
              Inicio
            </h1>
          </div>
          <div className="mt-4 flex sm:mt-0 sm:ml-4">
            <button
              type="button"
              className="order-1 ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-0 sm:ml-0"
            >
              Share
            </button>
            <button
              type="button"
              className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
            >
              Create
            </button>
          </div>
        </div>

        <div className="container mx-auto px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8">
          <div className="grid gap-5 lg:grid-cols-2 lg:max-w-none">
            {
              data.map((course) => (
                <div key={course.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                  <div className="flex-shrink-0">
                    <img
                      src={`https://dabrdpdopssigtsyzrbx.supabase.co/storage/v1/object/public/media/${course.thumb}`}  
                      className="h-48 w-full object-cover" alt="" />
                  </div>
                  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <div className="block mt-2">
                        <p className="text-xl font-semibold text-gray-900">{course.name}</p>
                        <p className="mt-3 text-base text-gray-500">{course.description}</p>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center">
                      <Link 
                        href={`/course/${course.id}`} 
                        className="mt-8 block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
                      >
                        Entrar
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </Sidebar>
   </>
  )
}