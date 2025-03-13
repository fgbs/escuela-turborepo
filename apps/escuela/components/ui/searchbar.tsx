import { Search } from "lucide-react"


export const SearchbarMobile = () => {
  return(
    <>
      <form className="w-full flex md:ml-0" action="#" method="GET">
        <label htmlFor="search-field" className="sr-only">
          Search
        </label>
        <div className="relative w-full text-gray-400 focus-within:text-gray-600">
          <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
            <Search className="h-5 w-5" aria-hidden="true" />
          </div>
          <input
            id="search-field"
            name="search-field"
            className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:text-sm"
            placeholder="Search"
            type="search"
          />
        </div>
      </form>
    </>
  )
}

export const SearchbarDesktop = () => {
  return(
    <>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div
          className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          aria-hidden="true"
        >
          <Search className="mr-3 h-4 w-4 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="text"
          name="search"
          id="search"
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-9 sm:text-sm border-gray-300 rounded-md"
          placeholder="Search"
        />
      </div>    
    </>
  )
}