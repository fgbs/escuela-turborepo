import { createStore } from 'zustand/vanilla'
import { persist, createJSONStorage } from 'zustand/middleware';


export type ProfileState = {
  profile: {}
}

export type ProfileActions = {
  setProfile: (profile: ProfileState['profile']) => void
}

export type ProfileStore = ProfileState & ProfileActions

export const defaultInitState: ProfileState = {
  profile: {},
}

export const createProfileStore = (
  initState: ProfileState = defaultInitState,
) => {
  return createStore<ProfileStore>()(
    persist(
      (set) => ({
        ...initState,
        setProfile: (profile) => set(() => ({ profile: profile })),
      }),
    {
      name: 'tvp-profile',
      storage: createJSONStorage(() => localStorage),
    })
  )
}
