import { Presentation, Video } from 'lucide-react'

import { createClient } from "@repo/supabase/lib/server"
import { cx } from '@repo/ui/utils/cx'


const getRecords = async(id: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('recordings')
    .select(`id`)
    .eq('room_id', id)
    .eq('default', true)
    .maybeSingle()

    if (error) throw error

    return data
}

export const RoomButton = async ({ target }: { target: string }) => {
  const supabase = await createClient()
  let room = {}
  let roomDisabled = true
  let recordDisabled = true
  let record = null

  const { data, error } = await supabase
    .from('rooms')
    .select(`id, room_url, active, status`)
    .eq('target_id', target)
    .maybeSingle()

  if (error) throw error

  if (data?.active && data?.status === 'open') {
    roomDisabled = false
    room = data
  }

  if (data?.active && data?.status === 'ended') {
    roomDisabled = true

    const rec = await getRecords(data?.id)
    if (rec) {
      recordDisabled = false
      record = rec
    }

  }

  return(
    <>
      <a
        href={room?.room_url}
        rel="noopener noreferrer"
        target="_blank"
        className={cx(
          roomDisabled ? 'pointer-events-none text-white bg-green-400 disabled:opacity-25' : 'text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500',
          "inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md sm:order-1 sm:ml-3"
        )}
        aria-disabled={roomDisabled}
        tabIndex={roomDisabled ? -1 : undefined}
      >
        <Presentation className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true"/>
        Ir a Sala
      </a>  

      <a
        href={`/record/${data?.id}`}
        className={cx(
          recordDisabled ? 'pointer-events-none text-white bg-purple-400 disabled:opacity-25' : 'text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500',
          "inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md sm:order-1 sm:ml-3"
        )}
        aria-disabled={recordDisabled}
        tabIndex={recordDisabled ? -1 : undefined}
      >
        <Video className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true"/>
        Ver Grabación
      </a>  
    </>
  )
}
