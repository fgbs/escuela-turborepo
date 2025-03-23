'use client';
import { useRouter } from "next/navigation"

export const BackButton = () => {
  const router = useRouter()

  return(
    <>
      <button 
        onClick={() => router.back()}
        className="order-0 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
      >
        Volver
      </button>
    </>
  )
}
