import { redirect } from "next/navigation";
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider } from '@vidstack/react'
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default'

import { createClient } from '@repo/supabase/lib/server'
import { BackButton } from "@repo/ui/components/back-button";
import { EmptyState } from "@repo/ui/components/empty-state";
import { Sidebar } from "../../../../components/ui/sidebar";
import { siteConfig } from '../../../siteConfig';


export default async function TargetRecordPage({ params }: { params: { roomid: string }}) {
  const supabase = await createClient()
  const roomid = (await params).roomid
  let media = null

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth/login");
  }

  const { data, error } = await supabase
    .from('rooms')
    .select(`
      id, room_name, status, course_id,
      recordings(id, filename, content_type)`)
    .eq('id', roomid)
    .eq('recordings.default', true)
    .single()

  if (error) throw error

  if (data) {
    const { recordings } = data

    if (recordings.length > 0) {
      media = {
        src: `${siteConfig.storage.record}/${data.course_id}/${data.id}/${recordings[0].filename}`,
        type: `${recordings[0].content_type}`,
      }  
    }
    // STORAGE_URL / course_id / [room_id] / [recording_id] / filename
  }

  return(
    <>
      <Sidebar menu={null}>
        <div className="bg-white border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
              { data && data.room_name }
            </h1>
            <p className="text-sm font-medium text-gray-500">

            </p>
          </div>
          <div className="mt-4 flex sm:mt-0 sm:ml-4">
            <BackButton />
          </div>
        </div>

        <div className="container mx-auto px-2 pt-2 pb-2 lg:px-4 lg:pt-4 lg:pb-4">
          {
            media ? (
              <MediaPlayer 
                title={ data.room_name || '' } 
                src={ media.src }
                crossOrigin
                playsInline
                autoPlay
              >
                <MediaProvider />
                <DefaultVideoLayout icons={defaultLayoutIcons} />
              </MediaPlayer>
            ) : (
              <EmptyState title={'Grabación'} subtitle={'No hay grabaciones disponibles.'} />
            )
          }
        </div>
      </Sidebar>
    </>
  )
}
