import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { ChevronsUpDown } from 'lucide-react'

import { cx } from "@repo/ui/utils/cx"
import { siteConfig } from '../../app/siteConfig'


export const ProfileDropdownMobile = () => {
  return(
    <>
      <Menu as="div" className="ml-3 relative">
        <div>
          <MenuButton className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
            <span className="sr-only">Open user menu</span>
            <img
              className="h-8 w-8 rounded-full"
              src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
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
  return(
    <>
      <Menu as="div" className="px-3 mt-3 relative inline-block text-left">
        <div>
          <MenuButton className="group w-full bg-gray-100 rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500">
            <span className="flex w-full justify-between items-center">
              <span className="flex min-w-0 items-center justify-between space-x-3">
                <img
                  className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                  src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                  alt=""
                />
                <span className="flex-1 flex flex-col min-w-0">
                  <span className="text-gray-900 text-sm font-medium truncate">Jessy Schwarz</span>
                  <span className="text-gray-500 text-sm truncate">@jessyschwarz</span>
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