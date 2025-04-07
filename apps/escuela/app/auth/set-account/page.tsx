import { createClient } from "@repo/supabase/lib/server";
import { FormMessage, Message } from "../../../components/form-message";
import { SubmitButton } from "../../../components/submit-button"
import { setAccountAction } from "../actions"


export default async function AccountPage(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <img
            className="h-12 w-auto"
            src="https://dabrdpdopssigtsyzrbx.supabase.co/storage/v1/object/public/media/tvp-logo.svg"
            alt="Escuela TVP"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Crea tu cuenta
          </h2>
        </div>

        <div className="mt-6">
          <form className="space-y-6">
            <input type="hidden" name="user" value={user?.id} />
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <div className="mt-1">
                <input
                  id="fullname"
                  name="fullmane"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Confirmar contraseña
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <SubmitButton pendingText="Cargando..." formAction={setAccountAction} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                Crear
              </SubmitButton>
              <FormMessage message={searchParams} />
            </div>
          </form>

        </div>

      </div>
    </>
  )
}
