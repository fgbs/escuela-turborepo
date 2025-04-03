import Link from "next/link";
import { CassetteTape, ExternalLink, Paperclip } from "lucide-react";
import { SiYoutube } from '@icons-pack/react-simple-icons';

import { getDocumentsByTargetId } from '@repo/supabase/models/library'
import { storage } from '@repo/supabase/lib/storage'


export const BiblioList = async ({ target }: { target: string }) => {
  const documents = await getDocumentsByTargetId(target)

  const getLink = (doc) => {
    if (doc.type === 'document' || doc.type === 'audio') {
      return `${storage.bucket.media}/${doc.course_id}/${target}/${doc.id}.${doc.ext}`
    }

    if (doc.type === 'youtube') {
      return `https://www.youtube.com/watch?v=${doc.filename}`
    }

    if (doc.type === 'link') {
      return `${doc.filename}`
    }

    return '#'
  }

  return(
    <ul role="list" className="mt-4 divide-y divide-gray-200">
    {
      documents.map((doc) => (
        <li key={doc.id}>
          <Link 
            href={getLink(doc)} 
            rel="noopener noreferrer"
            target="_blank"
            aria-label="Downlod"
            className="block hover:bg-gray-50"
          >
            <div className="px-2 py-2 sm:px-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-indigo-600 truncate">
                  {doc.name}
                </p>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    {doc.author}
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  {
                    doc.type === 'document' 
                    ? <Paperclip className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                    : doc.type === 'youtube' 
                    ? <SiYoutube className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                    : doc.type === 'audio' 
                    ? <CassetteTape className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                    : <ExternalLink className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                  }
                </div>
              </div>
            </div>
          </Link>
        </li>  
      ))
    }
  </ul>
)
} 