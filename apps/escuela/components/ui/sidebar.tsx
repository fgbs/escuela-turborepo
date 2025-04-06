'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { MenuIcon, X } from "lucide-react"

import { cx } from "@repo/ui/utils/cx"
import { siteConfig } from '../../app/siteConfig'
import { BulletListDesktop, BulletListMobile, iSteps } from './bullet-list'

interface iSidebarMenu {
  name: string;
  path: string;
  steps: iSteps[];
}


export const Sidebar = ({
  menu,
  children,
}: Readonly<{
  menu: iSidebarMenu | null;
  children: React.ReactNode;
}>) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return(
    <>
      <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" open={sidebarOpen} onClose={setSidebarOpen}>
        <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6 text-black" aria-hidden="true" />
            </button>
          </div>

          <div className="flex-shrink-0 flex items-center px-4">
            <img
              className="h-8 w-auto"
              src="https://dabrdpdopssigtsyzrbx.supabase.co/storage/v1/object/public/media/tvp-logo.svg"
              alt="Escuela TVP"
            />
          </div>

          <div className="mt-5 flex-1 h-0 overflow-y-auto">
            <nav className="h-full flex flex-col">
              <div className="space-y-1">
                {siteConfig.navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cx(
                      item.href === pathname
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                      'group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    <item.icon
                      className={cx(
                        item.href === pathname ? 'text-white' : 'text-gray-600 group-hover:text-gray-900',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="mt-8">
                {
                  menu && <BulletListMobile name={ menu.name } path={ menu.path } steps={ menu.steps } />
                }
              </div>

              <div className="mt-auto pt-10 space-y-1">
                {siteConfig.userNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cx(
                      item.href === pathname ? 'bg-gray-900 text-white' : 'text-gray-300 hover:text-gray-700 hover:text-white',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                  >
                    <item.icon
                      className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </div>

            </nav>
          </div>
        </div>
        <div className="flex-shrink-0 w-14" aria-hidden="true">
          {/* Dummy element to force sidebar to shrink to fit close icon */}
        </div>
      </Dialog>
    
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:pt-5 lg:pb-4 lg:bg-gray-800">
        <div className="flex items-center flex-shrink-0 px-6">
          <img
            className="h-8 w-auto"
            src="https://dabrdpdopssigtsyzrbx.supabase.co/storage/v1/object/public/media/tvp-logo.svg"
            alt="Escuela TVP"
          />
        </div>

        <div className="mt-6 h-0 flex-1 flex flex-col overflow-y-auto">
          {/*<ProfileDropdownDesktop />*/}

          {/* 
          <div className="px-3 mt-8">
            <SearchbarDesktop />
          </div>
          */}

          <nav className="px-3 mt-6 flex-grow">
            <div className="space-y-1">
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cx(
                    item.href === pathname ? 'bg-gray-900 text-white' : 'text-gray-300 hover:text-gray-700 hover:text-white',
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  <item.icon
                    className={cx(
                      item.href === pathname ? 'text-white' : 'text-gray-400 group-hover:text-gray-300',
                      'mr-3 flex-shrink-0 h-6 w-6'
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="mt-8">
              {
                menu && <BulletListDesktop name={ menu.name } path={ menu.path } steps={ menu.steps } />
              }
            </div>
          </nav>

          <div className="flex-shrink-0 block px-3 mt-6">
            {siteConfig.userNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cx(
                  item.href === pathname ? 'bg-gray-900 text-white' : 'text-gray-300 hover:text-gray-700 hover:text-white',
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                )}
              >
                <item.icon className="text-gray-400 group-hover:text-gray-300 mr-3 h-6 w-6" aria-hidden="true" />
                {item.name}
              </Link>
            ))}
          </div>

        </div>
      </div>

      <div className="lg:pl-64 flex flex-col">
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden">

          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex-1 flex">
              {/*<SearchbarMobile />*/}
            </div>

            <div className="flex items-center">
              {/* <ProfileDropdownMobile /> */}
            </div>
          </div>
        </div>

        <main className="flex-1">
          {children}
        </main>
      </div>
    </>
  )
}