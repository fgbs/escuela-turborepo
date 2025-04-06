'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@repo/supabase/lib/client'
import { type User } from '@supabase/supabase-js'
import AccountAvatar from './account-avatar'


export const AccountForm = ({ user }: { user: User | null }) => {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      console.log('Error loading user data!', error)
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null
    fullname: string | null
    website: string | null
    avatar_url: string | null
  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      // alert('Profile updated!')
    } catch (error) {
      console.log('Error updating the data!', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form>
      <div className="space-y-1">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Perfil
        </h3>
        <p className="max-w-2xl text-sm text-gray-500">
          This information will be displayed publicly so be careful what you share.
        </p>
      </div>

      <div className="mt-6">
        <dl className="divide-y divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
            <dt className="text-sm font-medium text-gray-500">
              Nombre
            </dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">
                <input
                  type="text"
                  id="fullName"
                  autoComplete="username"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                  value={fullname || ''}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </span>
            </dd>
          </div>

          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
            <dt className="text-sm font-medium text-gray-500">
              Email
            </dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">
                <input 
                  id="email" 
                  type="text" 
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                  value={user?.email} 
                  disabled 
                />
              </span>
            </dd>
          </div>

          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
            <dt className="text-sm font-medium text-gray-500">
              Acerca de ti
            </dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                  defaultValue={''}
                />
              </span>
            </dd>
          </div>

          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
            <dt className="text-sm font-medium text-gray-500">Photo</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">
                <AccountAvatar
                  uid={user?.id ?? null}
                  url={avatar_url}
                  size={50}
                  onUpload={(url) => {
                    setAvatarUrl(url)
                    updateProfile({ fullname, username, website, avatar_url: url })
                  }}
                />
              </span>
              {/*
              <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
                <button
                  type="button"
                  className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Update
                </button>
                <span className="text-gray-300" aria-hidden="true">
                  |
                </span>
                <button
                  type="button"
                  className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Remove
                </button>
              </span>
              */}
            </dd>
          </div>

          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200">
            <dt className="text-sm font-medium text-gray-500"></dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow"></span>
              <span className="ml-4 flex-shrink-0">
                <button
                  className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
                  onClick={() => updateProfile({ fullname, username, website, avatar_url })}
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