'use client'

import { usePathname } from 'next/navigation'
import { useShallow } from 'zustand/react/shallow'

import { useCourseStore } from '@repo/supabase/providers/course-provider'
import { createClient } from '@repo/supabase/lib/client'
import { useEffect } from 'react'


const useCourse = () => {
  return useCourseStore(
    useShallow((store) => ({
      course: store.course,
      level: store.level,
      target: store.target,
      setCourse: store.setCourse,
      setLevel: store.setLevel,
      setTarget: store.setTarget
    }))
  )
}


export const SessionParams = ({ id }: { id: string }) => {
  const { course, level, target, setCourse, setLevel, setTarget } = useCourse()
  const pathname = usePathname()


  useEffect(() => {
    const getLevel = async (id: string) => {
      const supabase = await createClient();

      try {
        const { data, error } = await supabase
          .from('target_groups')
          .select('level_id')
          .eq('id', id)
          .single()

        if (error) {
          throw error
        }

        setLevel(data.level_id)
      } catch (error) {
        console.log('Error downloading image: ', error)
      }
    }

    if (pathname.startsWith("/group") && id) {
      getLevel(id)
    }

    if (pathname.startsWith("/course")) {
      setCourse(id)
    }
  
    if (pathname.startsWith("/target")) {
      setTarget(id)
    }
  }, [id])

  console.log(`course: ${course}, level: ${level}, target: ${target}`)

  return(
    <>
      {/* `course: ${course}, level: ${level}, target: ${target}` */}
    </>
  )
}