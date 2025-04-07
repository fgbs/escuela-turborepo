'use client'


import { format } from 'date-fns'
import { useEffect, useState } from 'react'

import { createClient } from '@repo/supabase/lib/client'
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
      <div className="space-y-1">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Mis certificados
        </h3>
        <p className="max-w-2xl text-sm text-gray-500">
          This information will be displayed publicly so be careful what you share.
        </p>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Fecha
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nombre
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Estado
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
              </th>
            </tr>
          </thead>
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
                    <a href={`${STORAGE_URL}/${a.cohorts.id}/${user.id}.pdf`} target='_blank' className="text-indigo-600 hover:text-indigo-900">
                      Descargar
                    </a>
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
    </>
  )
}
