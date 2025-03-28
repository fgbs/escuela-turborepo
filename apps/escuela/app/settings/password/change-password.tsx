'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@repo/supabase/lib/client'
import { type User } from '@supabase/supabase-js'


export const ChangePassword = ({ user }: { user: User | null }) => {
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [newPassword, setNewPassword] = useState<string | null>(null)
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null)


  const updatePassword = () => {

  }

  return(
    <form>
      <div className="space-y-1">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Contraseña
        </h3>
        <p className="max-w-2xl text-sm text-gray-500">
          This information will be displayed publicly so be careful what you share.
        </p>
      </div>

      <div className="mt-6">
        <dl className="divide-y divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">
              Nueva contraseña
            </dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">
                <input
                  type="password"
                  id="newPassword"
                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                  value={newPassword || ''}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </span>
            </dd>
          </div>

          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">
              Confirma nueva contraseña
            </dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">
                <input
                  type="password"
                  id="retypePassword"
                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                  value={confirmPassword || ''}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </span>
            </dd>
          </div>

          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
            <dt className="text-sm font-medium text-gray-500"></dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow"></span>
              <span className="ml-4 flex-shrink-0">
                <button
                  className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
                  onClick={() => updatePassword()}
                  disabled={loading}
                >
                  {loading ? 'Guardando...' : 'Actualizar'}
                </button>
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </form>
  )
}