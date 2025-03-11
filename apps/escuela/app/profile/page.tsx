import { CreditCardIcon, KeyIcon, UserCircleIcon, TrophyIcon } from '@heroicons/react/24/outline'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'

import { createClient } from '@/lib/supabase/server'
import { cx } from '@/lib/utils'
import { AccountForm } from './account-form'
import { ChangePassword } from './change-password'
import { Achievement } from './achievement'

export default async function Account() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const navigation = [
    { name: 'Cuenta', href: '#', icon: UserCircleIcon, current: true },
    { name: 'Contraseña', href: '#', icon: KeyIcon, current: false },
    { name: 'Certificados', href: '#', icon: TrophyIcon, current: false },
//    { name: 'Plan & Billing', href: '#', icon: CreditCardIcon, current: false },
  ]
  
  return (
    <>
      <main className="max-w-7xl mx-auto pb-10 lg:py-12 lg:px-8">
        <TabGroup vertical defaultIndex={0}>
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
            <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
              <TabList className="flex flex-col">
                {
                  navigation.map((item, idx) => (
                    <Tab 
                      key={idx}
                      className="
                        data-[selected]:bg-gray-50 data-[selected]:text-indigo-700 
                        data-[hover]:bg-white 
                        group rounded-md px-3 py-2 flex items-center text-sm font-medium mb-2
                      "
                    >
                      <item.icon className="flex-shrink-0 -ml-1 mr-3 h-6 w-6" aria-hidden="true" />
                      <span className="truncate">{item.name}</span>
                    </Tab>
                  ))
                }
              </TabList>
            </aside>

            <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
              <TabPanels>
                <TabPanel>
                  <AccountForm user={user} />
                </TabPanel>
                <TabPanel>
                  <ChangePassword user={user} />
                </TabPanel>
                <TabPanel>
                  <Achievement user={user} />
                </TabPanel>
              </TabPanels>
            </div>
          </div>
        </TabGroup>
      </main>
    </>
  )
}