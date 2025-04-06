import Link from 'next/link';
import { CircleCheck } from 'lucide-react'

export interface iLevels {
  id: string; 
  name: string | null; 
}

export interface iSteps {
  id: string;
  name: string | null; 
  visibility: string | null; 
  sort_index: number | null; 
  levels?: iLevels | null;
}


export const BulletListMobile = ({ name, path, steps }: { name: string, path: string, steps: iSteps[]}) => {
  return(
    <>
      <h3
        className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
        id="mobile-teams-headline"
      >
        { name }
      </h3>
      <div className="mt-1 space-y-1" role="group" aria-labelledby="mobile-teams-headline">
        {steps.map((step) => (
          <Link
            key={step.name}
            href={ step.visibility === 'pending' ? '#' : `${path}/${step.id}` }
            className="group flex items-center px-3 py-2 text-base leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
          >
            {
              step.visibility === 'completed' ? (
                <span
                  className="bg-green-500 w-2.5 h-2.5 mr-4 rounded-full"
                  aria-hidden="true"
                />
              ) : step.visibility === 'current' ? (
                <span
                  className="bg-indigo-500 w-2.5 h-2.5 mr-4 rounded-full"
                  aria-hidden="true"
                />
              ) : (
                <span
                  className="bg-gray-400 w-2.5 h-2.5 mr-4 rounded-full"
                  aria-hidden="true"
                />  
              )
            }
            <span className="truncate">{step.name}</span>
          </Link>
        ))}
      </div>
    </>
  )
}


export const BulletListDesktop = ({ name, path, steps }: { name: string, path: string, steps: iSteps[]}) => {
  return(
    <>
      <h3
        className="px-3 text-xs font-semibold text-gray-300 uppercase tracking-wider"
        id="desktop-teams-headline"
      >
        { name }
      </h3>
      <div className="mt-1 space-y-1" role="group" aria-labelledby="desktop-teams-headline">
      {
        steps.map((step) => (
          <Link
            key={step.id}
            href={ step.visibility === 'pending' ? '#' : `${path}/${step.id}` }
            className="group flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:text-gray-700 hover:text-white"
          >
            {
              step.visibility === 'completed' ? (
                <span
                  className="bg-green-500 w-2.5 h-2.5 mr-4 rounded-full"
                  aria-hidden="true"
                />
              ) : step.visibility === 'current' ? (
                <span
                  className="bg-indigo-500 w-2.5 h-2.5 mr-4 rounded-full"
                  aria-hidden="true"
                />
              ) : (
                <span
                  className="bg-gray-400 w-2.5 h-2.5 mr-4 rounded-full"
                  aria-hidden="true"
                />  
              )
            }
            <span className="truncate">{step.name}</span>
          </Link>
        ))
      }
      </div>
    </>
  )
}


export const BulletList = ({ steps }: { steps: iSteps[]}) => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <nav className="flex justify-center" aria-label="Progress">
        <ol role="list" className="space-y-6">
          {steps.map((step) => (
            <li key={step.name}>
              {step.visibility === 'complete' ? (
                <a href={''} className="group">
                  <span className="flex items-start">
                    <span className="flex-shrink-0 relative h-5 w-5 flex items-center justify-center">
                      <CircleCheck
                        className="h-full w-full text-indigo-600 group-hover:text-indigo-800"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                      {step.name}
                    </span>
                  </span>
                </a>
              ) : step.visibility === 'current' ? (
                <a href={''} className="flex items-start" aria-current="step">
                  <span className="flex-shrink-0 h-5 w-5 relative flex items-center justify-center" aria-hidden="true">
                    <span className="absolute h-4 w-4 rounded-full bg-indigo-200" />
                    <span className="relative block w-2 h-2 bg-indigo-600 rounded-full" />
                  </span>
                  <span className="ml-3 text-sm font-medium text-indigo-600">{step.name}</span>
                </a>
              ) : (
                <a href={''} className="group">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative flex items-center justify-center" aria-hidden="true">
                      <div className="h-2 w-2 bg-gray-300 rounded-full group-hover:bg-gray-400" />
                    </div>
                    <p className="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">{step.name}</p>
                  </div>
                </a>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}
