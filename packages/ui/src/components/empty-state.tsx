import { Box } from "lucide-react";


export const EmptyState = ({title, subtitle}: {title: string, subtitle: string}) => {
  return(
    <div className="flex items-center justify-center h-screen">

      <div className="text-center">
        <Box className="mx-auto h-20 w-20 text-gray-400" />

        <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
      </div>

    </div>
  )
}