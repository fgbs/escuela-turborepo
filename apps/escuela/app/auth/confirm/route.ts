import { createClient } from '@repo/supabase/lib/server'
import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'


export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  let next = searchParams.get("next") ?? "/"

  if (type === 'invite')
    next = '/auth/set-account'

  // Create redirect link without the secret token
  const redirectTo = `https://aula.escuelatvp.cl${next}`

  if (token_hash && type) {
    const supabase = await createClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    if (!error) {
      return NextResponse.redirect(redirectTo)
    }
  }

  // return the user to an error page with some instructions
  return NextResponse.redirect(`https://aula.escuelatvp.cl/error`)
}