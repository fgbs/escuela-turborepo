import { createClient } from "@repo/supabase/lib/server";
import { SubmitButton } from '@repo/ui/components/submit-button'
import { FormMessage, Message } from "../../../components/form-message";
import { resetPasswordAction } from '../actions'


export default async function SetPassword(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      {
        user ? (
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                className="h-12 w-auto"
                src="https://dabrdpdopssigtsyzrbx.supabase.co/storage/v1/object/public/media/tvp-logo.svg"
                alt="Escuela TVP"
              />
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Configura tu contraseña
              </h2>
            </div>

            <div className="mt-8">    
              <div className="mt-6">
                <form className="space-y-6">
                  <div className="space-y-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Contraseña
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                    <SubmitButton pendingText="Guardando..." formAction={resetPasswordAction} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Guardar
                    </SubmitButton>

                    <FormMessage message={searchParams} />
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-2xl text-center flex flex-col space-y-4">
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Esta invitación a caducado, por favor solicita una nueva.
            </p>
          </div>
        )
      }
    </>
  )
}
