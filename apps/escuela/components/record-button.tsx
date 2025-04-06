'use client'
import { useState, useEffect } from 'react'
import { Loader, Video } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { createClient } from "@repo/supabase/lib/client"


export const RecordButton = ({ target }: { target: string }) => {
  const [loading, setLoading] = useState(true)
  const [disabled, setDisabled] = useState(true)
  const [record, setRecord] = useState()
  const router = useRouter()

  useEffect(() => {
    const getRecord = async (id: string) => {
      const supabase = await createClient()

      const { data, error } = await supabase
        .from('recordings')
        .select(`id, rooms(target_id)`)
        .eq('rooms.target_id', id)

      if (error) throw error

      setRecord(data)

      if(data) setDisabled(false)

      setLoading(false)
    }

    getRecord(target)
  }, [target])

  return(
    <>
      <button
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-25 sm:order-1 sm:ml-3"
        disabled={disabled}
        aria-disabled={disabled}
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