import Link from 'next/link'

import { createClient } from '@repo/supabase/lib/server'
import { BackButton } from '@repo/ui/components/back-button'
import { cx } from "@repo/ui/utils/cx"
import { ChangePassword } from './change-password'
import { Sidebar } from '../../../components/ui/sidebar'


export default async function Account() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const tabs = [
    { name: 'General', href: '/settings', current: false },
    { name: 'Contraseña', href: '/settings/password', current: true },
    { name: 'Certificados', href: '/settings/achievement', current: false },
  ]
  
  return (
    <>
      <Sidebar menu={ null }>
        <div className="bg-white border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
              Configuración
            </h1>
          </div>
          <div className="mt-4 flex sm:mt-0 sm:ml-4">
            <BackButton />
          </div>
        </div>

        <div className="container mx-auto px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8">
          <div className="lg:hidden">
            <label htmlFor="selected-tab" className="sr-only">
              Select a tab
            </label>
            <select
              id='tabs'
              name='tabs'
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
              defaultValue={tabs.find((tab) => tab.current).name}
            >
              {tabs.map((tab) => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>

          <div className="hidden lg:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label='Tabs'>
                {tabs.map((tab) => (
                  <Link
                    key={tab.name}
                    href={tab.href}
                    className={cx(
                      tab.current
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                      'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                    )}
                  >
                    {tab.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <div className="mt-10 divide-y divide-gray-200">
            <ChangePassword user={user} />
          </div>
        </div>
      </Sidebar>
    </>
  )
}