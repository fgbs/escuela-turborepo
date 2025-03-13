'use client'

import { Fragment, useEffect, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { Disclosure, DisclosureButton, Menu, MenuButton, MenuItems, MenuItem, Transition, DisclosurePanel, Popover, PopoverButton, PopoverPanel, TransitionChild, Dialog } from '@headlessui/react'
import { X, Menu as MenuIcon, Bell, Search } from 'lucide-react'

import { useProfileStore } from '@repo/supabase/providers/user-provider'
import { createClient } from '@repo/supabase/lib/client'
import { cx } from '@repo/ui/utils/cx'
import { Avatar } from './avatar'

const useProfile = () => {
  return useProfileStore(
    useShallow((store) => ({
      profile: store.profile,
      setProfile: store.setProfile,
    }))
  )
}


export const Header = () => {
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

  const navigation = [
    { name: 'Inicio', href: '/', current: false },
    { name: 'Mis Cursos', href: '/school', current: true },
  ]

  const userNavigation = [
    { name: 'Mi Perfíl', href: '/profile' },
    { name: 'Salir', href: '/auth/logout' },
  ]

  return(
    <Transition show={sidebarOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setSidebarOpen}>
        <TransitionChild
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {/*<Dialog className="fixed inset-0 bg-gray-600 bg-opacity-75" />*/}
        </TransitionChild>
        <TransitionChild
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
            <Transition
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <X className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </Transition>
            <div className="flex-shrink-0 flex items-center px-4">
              <img
                className="h-8 w-auto"
                src="https://dabrdpdopssigtsyzrbx.supabase.co/storage/v1/object/public/media/tvp-logo.svg"
                alt="Escuela TVP"
              />
            </div>
            <div className="mt-5 flex-1 h-0 overflow-y-auto">
              <nav className="px-2">
                <div className="space-y-1">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={cx(
                        item.current
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                        'group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      <item.icon
                        className={cx(
                          item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                          'mr-3 flex-shrink-0 h-6 w-6'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="mt-8">
                  <h3
                    className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                    id="mobile-teams-headline"
                  >
                    Teams
                  </h3>
                  <div className="mt-1 space-y-1" role="group" aria-labelledby="mobile-teams-headline">
                    {/* teams.map((team) => (
                      <a
                        key={team.name}
                        href={team.href}
                        className="group flex items-center px-3 py-2 text-base leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                      >
                        <span
                          className={cx(team.bgColorClass, 'w-2.5 h-2.5 mr-4 rounded-full')}
                          aria-hidden="true"
                        />
                        <span className="truncate">{team.name}</span>
                      </a>
                    )) */}
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </TransitionChild>
        <div className="flex-shrink-0 w-14" aria-hidden="true">
          {/* Dummy element to force sidebar to shrink to fit close icon */}
        </div>
      </Dialog>
    </Transition>
  )
}