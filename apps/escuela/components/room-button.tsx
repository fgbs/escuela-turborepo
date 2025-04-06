'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Loader, Presentation, Video } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { createClient } from "@repo/supabase/lib/client"
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

    return data?.id
}

export const RoomButton = ({ target }: { target: string }) => {
  const [loading, setLoading] = useState(true)
  const [roomDisabled, setRoomDisabled] = useState(true)
  const [recordDisabled, setRecordDisabled] = useState(true)
  const [room, setRoom] = useState(null)
  const [record, setRecord] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const getRoom = async (id: string) => {
      const supabase = await createClient()

      const { data, error } = await supabase
        .from('rooms')
        .select(`id, room_url, active, status`)
        .eq('target_id', id)
        .maybeSingle()

      if (error) throw error

      setRoom(data)

      if (data?.active && data?.status === 'open') {
        setRoomDisabled(false)
      }

      if (data?.active && data?.status === 'ended') {
        setRoomDisabled(true)

        const rec = await getRecords(data?.id)
        if (rec) {
          setRecordDisabled(false)
          setRecord(rec)
        }

      }

      setLoading(false)
    }

    getRoom(target)
  }, [target])

  return(
    <>
      <Link
        href={room?.room_url || '#'}
        rel="noopener noreferrer"
        target="_blank"
        className={cx(
          roomDisabled ? 'pointer-events-none text-white bg-green-400 disabled:opacity-25' : 'text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500',
          "inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md sm:order-1 sm:ml-3"
        )}
        aria-disabled={roomDisabled}
        tabIndex={roomDisabled ? -1 : undefined}
      >
        {
          loading ? <Loader className="-ml-0.5 mr-2 h-4 w-4 animate-spin" aria-hidden="true"/> : <Presentation className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true"/>
        }
        Ir a Sala
      </Link>  

      <Link
        href={`/record/${record?.id}`}
        className={cx(
          recordDisabled ? 'pointer-events-none text-white bg-purple-400 disabled:opacity-25' : 'text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500',
          "inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md sm:order-1 sm:ml-3"
        )}
        aria-disabled={recordDisabled}
        tabIndex={recordDisabled ? -1 : undefined}
      >
        {
          loading ? <Loader className="-ml-0.5 mr-2 h-4 w-4 animate-spin" aria-hidden="true"/> : <Video className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true"/>
        }
        Ver Grabación
      </Link>  
    </>
  )
}
