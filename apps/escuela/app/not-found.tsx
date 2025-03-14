import Link from "next/link"
import { ArrowRightToLine } from "lucide-react"

import { siteConfig } from "./siteConfig"


export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Link href={siteConfig.baseLinks.home}>
        Logo
      </Link>
      <p className="mt-6 text-4xl font-semibold text-indigo-600 sm:text-5xl dark:text-indigo-500">
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-gray-50">
        Page not found
      </h1>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Link href={siteConfig.baseLinks.home} className="group mt-8">
        Go to the home page
        <ArrowRightToLine
          className="ml-1.5 size-5 text-gray-900 dark:text-gray-50"
          aria-hidden="true"
        />
      </Link>
    </div>
  )
}