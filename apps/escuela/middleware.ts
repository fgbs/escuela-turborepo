import { type NextRequest } from 'next/server'
import { updateSession } from '@repo/supabase/lib/middleware'
import { generateNonce } from '@repo/supabase/lib/nonce'


export async function middleware(request: NextRequest) {
  // Generate unique nonce for each request
  const nonce = generateNonce();

  // Important: Define CSP directives with nonce
  // Each directive controls different resource types
  const cspHeader = `
    default-src 'self';
    script-src 'report-sample' 'nonce-${nonce}' 'unsafe-inline' 'strict-dynamic' https: http: 'unsafe-eval';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self';
    font-src 'self';
    object-src 'self' blob:;
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none' '*.google.com';
    upgrade-insecure-requests;
    report-uri 'https://docs.google.com/presentation/cspreport' 'https://csp.withgoogle.com/csp/docs-tt';
    worker-src 'self' blob:;
    require-trusted-types-for 'script';
  `

  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim()

  // Important: Store nonce in headers to access it throughout the request lifecycle
  // const requestHeaders = new Headers(request.headers);
  // requestHeaders.set('x-nonce', nonce);

  // Set the CSP header in the response
  // requestHeaders.set(
  //   'Content-Security-Policy',
  //   contentSecurityPolicyHeaderValue
  // )

  // update user's auth session
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}