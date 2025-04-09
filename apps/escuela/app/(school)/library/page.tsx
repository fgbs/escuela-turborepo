
import { redirect } from "next/navigation";
import { UserIcon } from "lucide-react";

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
    .select(`id, name, author, filename, type, course_id, target_id, ext, targets!inner(id, name, sort_index)`)
    .in('targets.visibility', ['current', 'completed'])

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
            <div className="container mx-auto px-2 pt-2 pb-2 lg:px-4 lg:pt-4 lg:pb-4">

              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                  {data.map((lib) => (
                    <li key={lib.id}>
                      <a 
                        href={getLink(lib)} 
                        rel="noopener noreferrer"
                        target="_blank"
                        aria-label="Downlod"
                        className="block hover:bg-gray-50"
                      >
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-indigo-600 truncate">{lib.name}</p>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p className="px-2 inline-flex text-xs leading-5">
                                <DocumentTypeIcon type={lib.type} className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <p className="flex items-center text-sm text-gray-500">
                                <UserIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                                {lib.author}
                              </p>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                              <p>
                                {`Día ${lib.targets?.sort_index}: ${lib.targets?.name}`}
                              </p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ) : (
            <EmptyState title={'Bibliografía'} subtitle={'No hay bibliografía disponibles.'} />
          )
        }
      </Sidebar>
    </>
  )
}