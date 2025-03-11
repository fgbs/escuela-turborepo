'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'


import { type CourseStore, createCourseStore } from '../store/course-store'

export type CourseStoreApi = ReturnType<typeof createCourseStore>

export const CourseStoreContext = createContext<CourseStoreApi | undefined>(
  undefined,
)

export interface CourseStoreProviderProps {
  children: ReactNode
}

export const CourseStoreProvider = ({
  children,
}: CourseStoreProviderProps) => {
  const storeRef = useRef<CourseStoreApi>()

  if (!storeRef.current) {
    storeRef.current = createCourseStore()
  }

  return (
    <CourseStoreContext.Provider value={storeRef.current}>
      {children}
    </CourseStoreContext.Provider>
  )
}

export const useCourseStore = <T,>(selector: (state: CourseStore) => T): T => {
  const courseStoreContext = useContext(CourseStoreContext)

  if (!courseStoreContext) {
    throw new Error(`useCourseStore must be used within CourseStoreProvider`)
  }

  return useStore(courseStoreContext, selector)
}
