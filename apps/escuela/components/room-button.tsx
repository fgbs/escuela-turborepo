'use client'
import { useState, useEffect } from 'react'
import { Loader, Presentation, Video } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { createClient } from "@repo/supabase/lib/client"


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
        .select(`id, active, status`)
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
        console.log('room', data, 'rec', rec)
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
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-25 sm:order-1 sm:ml-3"
        disabled={roomDisabled}
        aria-disabled={roomDisabled}
        onClick={() => router.push(`/room/${room?.id}`)}
      >
        {
          loading ? <Loader className="-ml-0.5 mr-2 h-4 w-4 animate-spin" aria-hidden="true"/> : <Presentation className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true"/>
        }
        Ir a Sala
      </button>

      <button
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-25 sm:order-1 sm:ml-3"
        disabled={recordDisabled}
        aria-disabled={recordDisabled}
        onClick={() => router.push(`/record/${record?.id}`)}
      >
        {
          loading ? <Loader className="-ml-0.5 mr-2 h-4 w-4 animate-spin" aria-hidden="true"/> : <Video className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true"/>
        }
        Ver Grabación
      </button>
    </>
  )
}
