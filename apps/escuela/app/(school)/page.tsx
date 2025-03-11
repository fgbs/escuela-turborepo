import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@repo/supabase/lib/server";


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
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-3 lg:max-w-none">
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
      </main>
    </>
  )
}