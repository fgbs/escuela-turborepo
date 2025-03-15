import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

import { createClient } from '@repo/supabase/lib/server'


export async function GET(req: NextRequest) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()
  if (error) throw error

  revalidatePath('/', 'layout')
  return NextResponse.redirect(new URL('/auth/login', req.url), {
    status: 302,
  })
}