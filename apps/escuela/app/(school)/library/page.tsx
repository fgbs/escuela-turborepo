import { redirect } from "next/navigation";

import { createClient } from "@repo/supabase/lib/server";
import { BackButton } from '@repo/ui/components/back-button'
import { Sidebar } from '../../../components/ui/sidebar'


export default async function LibraryPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth/login");
  }
  
  return(
    <>
      <Sidebar menu={ null }>
        <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
              Bibliografía
            </h1>
          </div>
          <div className="mt-4 flex sm:mt-0 sm:ml-4">
            <BackButton />
          </div>
        </div>

        <div className="container mx-auto px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8">
          soon
        </div>
      </Sidebar>
    </>
  )
}