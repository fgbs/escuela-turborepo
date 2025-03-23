'use client'
import { useEffect, useState } from 'react'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { ChevronsUpDown } from 'lucide-react'
import { useShallow } from 'zustand/react/shallow'

import { useProfileStore } from '@repo/supabase/providers/user-provider'
import { createClient } from '@repo/supabase/lib/client'
import { Avatar } from './avatar'
import { cx } from "@repo/ui/utils/cx"
import { siteConfig } from '../../app/siteConfig'

const useProfile = () => {
  return useProfileStore(
    useShallow((store) => ({
      profile: store.profile,
      setProfile: store.setProfile,
    }))
  )
}

export const ProfileDropdownMobile = () => {
  const supabase = createClient()
  const { profile, setProfile } = useProfile()
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const downloadImage = async (path: string) => {
      const { data, error } = await supabase.storage
        .from('avatars').download(path)

      if (error) throw error

      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
    }

    if (profile?.avatar) downloadImage(profile.avatar)
  }, [profile, supabase])

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        const { data, error } = await supabase
        .from('profiles')
        .select(`full_name, avatar_url`)
        .eq('id', user?.id)
        .single()

        if (error) throw error

        if (data) setProfile({
          id: user.id,
          email: user.email,
          full_name: data.full_name,
          avatar: data.avatar_url
        })
      }
    }

    if (!profile.id) getProfile()
  }, [profile, supabase])

  return(
    <>
      <Menu as="div" className="ml-3 relative">
        <div>
          <MenuButton className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
            <span className="sr-only">Open user menu</span>
            <Avatar image={avatarUrl} size={8} alt={ profile && profile.full_name } />
          </MenuButton>
        </div>
          <MenuItems className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
            <div className="py-1">
              {
                siteConfig.userNavigation.map((item) => (
                  <MenuItem key={item.name}>
                    {({ active }) => (
                      <a
                        href={item.href}
                        className={cx(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm'
                        )}
                      >
                        {item.name}
                      </a>
                    )}
                  </MenuItem>
                ))
              }
            </div>
          </MenuItems>
      </Menu>
    </>
  )
}


export const ProfileDropdownDesktop = () => {
  const supabase = createClient()
  const { profile, setProfile } = useProfile()
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined)

  useEffect(() => {
    const downloadImage = async (path: string) => {
      const { data, error } = await supabase.storage
        .from('avatars').download(path)

      if (error) throw error

      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
    }

    if (profile?.avatar) downloadImage(profile.avatar)
  }, [profile, supabase])

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        const { data, error } = await supabase
        .from('profiles')
        .select(`full_name, avatar_url`)
        .eq('id', user?.id)
        .single()

        if (error) throw error

        if (data) setProfile({
          id: user.id,
          email: user.email,
          full_name: data.full_name,
          avatar: data.avatar_url
        })
      }
    }

    if (!profile.id) getProfile()
  }, [profile, supabase])

  return(
    <>
      <Menu as="div" className="px-3 mt-3 relative inline-block text-left">
        <div>
          <MenuButton className="group w-full bg-gray-100 rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500">
            <span className="flex w-full justify-between items-center">
              <span className="flex min-w-0 items-center justify-between space-x-3">
                <Avatar image={avatarUrl} size={10} alt={ profile && profile.full_name } />
                <span className="flex-1 flex flex-col min-w-0">
                  <span className="text-gray-900 text-sm font-medium truncate">{ profile && profile.full_name }</span>
                  {/*<span className="text-gray-500 text-sm truncate">{ profile && profile.email }</span>*/}
                </span>
              </span>
              <ChevronsUpDown
                className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
            </span>
          </MenuButton>
        </div>
        <MenuItems className="z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
          <div className="py-1">
            {
              siteConfig.userNavigation.map((item) => (
                <MenuItem key={item.name}>
                {({ active }) => (
                  <a
                    href={item.href}
                    className={cx(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm'
                    )}
                  >
                    {item.name}
                  </a>
                )}
                </MenuItem>  
              ))
            }
          </div>
        </MenuItems>
      </Menu>    
    </>
  )
}