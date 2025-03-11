'use client'

import Link from 'next/link'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'

import { createClient } from '@/lib/supabase/client'
import { type User } from '@supabase/supabase-js'


export const Achievement = ({ user }: { user: User | null }) => {
  const supabase = createClient()
  const [achievements, setAchievements] = useState([])

  const STORAGE_URL='https://dabrdpdopssigtsyzrbx.supabase.co/storage/v1/object/public/certs'

  useEffect(() => {
    const getAchievements = async (id: string) => {
      const { data, error} = await supabase
        .from('achievements')
        .select('id, status, created_at, cohorts(id, name)')
        .eq('user_id', id)
      
      if (error) throw error

      setAchievements(data)
    }

    getAchievements(user?.id)
  }, [user, supabase])

  return(
    <>
      <div className="bg-white pt-6 shadow sm:rounded-md sm:overflow-hidden">
        <div className="px-4 sm:px-6">
          <h3 className="text-md leading-4 font-medium text-gray-900">
            Mis certificados
          </h3>
        </div>
        <div className="mt-6 flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden border-t border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="bg-white divide-y divide-gray-200">
                    {
                      achievements.length > 0 ? (
                        achievements.map((a) => (
                          <tr key={a.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {format(a.created_at, 'MMM dd, yyyy')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {a.cohorts.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                                {a.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Link href={`${STORAGE_URL}/${a.cohorts.id}/${user.id}.pdf`} target='_blank' className="text-indigo-600 hover:text-indigo-900">
                                Descargar
                              </Link>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            No tienes certificados emitidos.
                          </td>
                        </tr>
                      )
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
