'use client'

import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'

import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider } from '@vidstack/react'
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default'

import { useCourseStore } from '@repo/supabase/providers/course-provider'
import { createClient } from '@repo/supabase/lib/client'
// import { VideoPlayer } from './video-player'
import { siteConfig } from '../../../siteConfig';


// STORAGE_URL / course_id / level_id / [room_id] / [recording_id] / filename
//const STORAGE_URL = 'https://fgbs.nyc3.cdn.digitaloceanspaces.com/directus-tvp/recordings'
//const STORAGE_URL = 'https://cdn.cloud.fgbs.io/directus-tvp/recordings'

const useCourse = () => {
  return useCourseStore(
    useShallow((store) => ({
      course: store.course,
      level: store.level,
      target: store.target,
    }))
  )
}

export interface iRoom {
  id: string; 
  room_name: string | null; 
  status: string | null; 
  course_id: string | null;
}


export function RecordingRender({ room }: { room: iRoom }) {
  const supabase = createClient()
  const [recording, setRecording] = useState({src: '', type: ''})
  const { course, level } = useCourse()

  useEffect(() => {
    const getDefaultRecording = async (id: string) => {
      try {
        const { data, error } = await supabase
          .from('recordings')
          .select('filename, content_type')
          .eq('room_id', id)
          .eq('default', true)
          .single()

        if (error) {
          throw error
        }

        // console.log('url', course, level, room, data.filename)

        const tmp = {
          src: `${siteConfig.storage.record}/${room.course_id}/${room.id}/${data.filename}`,
          type: `${data.content_type}`,
        }
        setRecording(tmp)
      } catch (error) {
        console.log('Error downloading image: ', error)
      }
    }

    if (room) getDefaultRecording(room.id)
  }, [course, level, room])

  if (course && level && recording.src === '') {
    return <div>Cargando...</div>
  }


  return (
    <>
      <MediaPlayer 
        title={ room.room_name || '' } 
        src={ recording.src }
        crossOrigin
        playsInline
        autoPlay
      >
        <MediaProvider />
        <DefaultVideoLayout icons={defaultLayoutIcons} />
      </MediaPlayer>
      {/* <VideoPlayer media={ recording } /> */}
    </>
  );
}