
import { FormMessage, Message } from "../../../components/form-message";
import { SubmitButton } from "@repo/ui/components/submit-button"
import { signInWithMagicLinkAction } from "../actions"


export default async function MagicLink(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  return(
    <>
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <img
            className="h-12 w-auto"
            src="https://dabrdpdopssigtsyzrbx.supabase.co/storage/v1/object/public/media/tvp-logo.svg"
            alt="Escuela TVP"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Ingresa tu correo
          </h2>
        </div>

        <div className="mt-8">    
          <div className="mt-6">
            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <SubmitButton pendingText="Enviando..." formAction={signInWithMagicLinkAction} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                  Enviar link Mágico
                </SubmitButton>

                <FormMessage message={searchParams} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
