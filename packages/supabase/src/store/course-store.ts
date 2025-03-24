import { createStore } from 'zustand/vanilla'
import { persist, createJSONStorage } from 'zustand/middleware';


export type CourseState = {
  course: string
  level: string
  target: string
}

export type CourseActions = {
  setCourse: (course: CourseState['course']) => void
  setLevel: (level: CourseState['level']) => void
  setTarget: (target: CourseState['target']) => void
}

export type CourseStore = CourseState & CourseActions

export const defaultInitState: CourseState = {
  course: '',
  level: '',
  target: '',
}

export const createCourseStore = (
  initState: CourseState = defaultInitState,
) => {
  return createStore<CourseStore>()(
    persist(
      (set) => ({
        ...initState,
        setCourse: (course) => set(() => ({ course: course })),
        setLevel: (level) => set(() => ({ level: level })),
        setTarget: (target) => set(() => ({ target: target })),
      }),
    {
      name: 'tvp-data',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    })
  )
}
