'use client'

import { Remark } from 'react-remark';


export const ContentRender = ({ content }: { content: string }) => {
  return(
    <>
      <article className='ui-prose min-w-full'>
        <Remark
//          remarkPlugins={[remarkEmbedder]}
        >
          { content }
        </Remark>
      </article>
    </>
  )
}
