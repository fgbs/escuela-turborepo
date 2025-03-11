'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname, useSelectedLayoutSegment } from 'next/navigation'
import { useShallow } from 'zustand/react/shallow'

import { useCourseStore } from '@/lib/providers/course-provider'
import { createClient } from '@/lib/supabase/client'
import { cx, focusRing } from "@/lib/utils"
import { LevelSelect } from './LevelSelect'

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


export const CourseCurriculumDesktop = () => {
  const supabase = createClient()
  const [selected, setSelected] = useState<string | null>(null)
  const [levels, setLevels] = useState([])
  const [tgroup, setTgroup] = useState()
  const [targets, setTargets] = useState()

  const { course, level, target, setCourse, setLevel, setTarget } = useCourse()
  const segment = useSelectedLayoutSegment() || ''
  const pathname = usePathname()

  if (pathname.startsWith("/course")) {
    if (course !== segment || course === '')
      setCourse(segment)
  }

  if (pathname.startsWith("/target")) {
    if (target !== segment || target === '')
      setTarget(segment)
  }

  useEffect(() => {
    const getLevels = async (id: string) => {
      try {
        const { data, error } = await supabase
          .from('levels')
          .select('id, name, target_groups(id, name)')
          .eq('course_id', id)
          .order('number', { ascending: true })

        if (error) {
          throw error
        }

        setLevel(data[0].id)
        setLevels(data)
      } catch (error) {
        console.log('Error downloading image: ', error)
      }
    }

    if (course) getLevels(course)
  }, [course, supabase])

  const levelSelected = (value: string) => {
    setSelected(value)
    setLevel(value)

    const level = levels.find(item => item.id === value)
    setTgroup(level.target_groups[0])
  }

  useEffect(() => {
    async function getTargets(id: string) {
      try {
        const { data, error } = await supabase
          .from('targets')
          .select('id, title')
          .eq('target_group_id', id)
          .order('sort_index', { ascending: true })

        if (error) {
          throw error
        }

        setTargets(data)
      } catch (error) {
        console.log('Error downloading image: ', error)
      }
    }

    if (tgroup) getTargets(tgroup.id)
  }, [tgroup, supabase])

  return(
    <>
      course: [{course}]<br />
      level: [{level}]<br />
      target: [{target}]<br />
      
      {
        levels && <LevelSelect levels={ levels } selected={ selected } onLevelSelected={ levelSelected } />
      }

      <div>
        <span className="text-sm font-medium leading-6 text-gray-700">
          {
            tgroup && tgroup.name
          }
        </span>

        <nav
          aria-label="core navigation links"
          className="flex flex-1 flex-col space-y-4"
        >
          <ul role="list" className="space-y-0.5">
            {
              targets && targets.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/target/${item.id}`}
                    className={cx(
                      (target === item.id)
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                      "flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900",
                      focusRing,
                    )}
                  >
                    <span className="text-xs font-medium leading-6">
                      {item.title}
                    </span>
                  </Link>
                </li>
              ))
            }
          </ul>
        </nav>
      </div>
    </>
  )
}