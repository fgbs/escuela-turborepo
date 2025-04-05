import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@repo/supabase/lib/server";
import { BackButton } from '@repo/ui/components/back-button'
import { EmptyState } from '@repo/ui/components/empty-state'
import { DocumentTypeIcon } from "@repo/ui/components/document-type";
import { Sidebar } from '../../../components/ui/sidebar'
import { siteConfig } from "../../siteConfig";


export default async function LibraryPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth/login");
  }
  
  const getLink = (doc) => {
    if (doc.type === 'document' || doc.type === 'audio') {
      return `${siteConfig.storage.media}/${doc.course_id}/${doc.target_id}/${doc.id}.${doc.ext}`
    }

    if (doc.type === 'youtube') {
      return `https://www.youtube.com/watch?v=${doc.filename}`
    }

    if (doc.type === 'link') {
      return `${doc.filename}`
    }

    return '#'
  }

  const { data, error } = await supabase
    .from('library')
    .select(`id, name, author, filename, size, content_type, type, ext, course_id, target_id, targets!inner(id)`)
    .eq('targets.visibility', 'current')

  if (error) throw error

  return(
    <>
      <Sidebar menu={ null }>
        <div className="bg-white border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
              Bibliografía
            </h1>
          </div>
          <div className="mt-4 flex sm:mt-0 sm:ml-4">
            <BackButton />
          </div>
        </div>

        {
          data ? (
            <div className="container mx-auto px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8">
              <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              {
                data.map((lib) => {
                  return(
                    <Link 
                      key={lib.id}
                      href={getLink(lib)} 
                      rel="noopener noreferrer"
                      target="_blank"
                      aria-label="Downlod"
                      className="block hover:bg-gray-50"
                    >        
                      <li key={lib.id} className="relative">
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                          <DocumentTypeIcon type={lib.type} className="h-5 w-5 text-gray-400 group-hover:opacity-75" />
                        </div>
                        <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                          {lib.name}
                        </p>
                        <p className="block text-sm font-medium text-gray-500 pointer-events-none">
                          {lib.type}
                        </p>
                      </li>
                    </Link>
                  )
                })
              }
              </ul>
            </div>
          ) : (
            <EmptyState title={'Bibliografía'} subtitle={'No hay bibliografía disponibles.'} />
          )
        }
      </Sidebar>
    </>
  )
}