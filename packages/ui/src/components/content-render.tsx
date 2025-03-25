'use client'

import Markdown from 'react-markdown'
// import { ContentEditor } from './content-editor'


export const ContentRender = ({ content }: { content: string }) => {
  return(
    <>
      {/*<ContentEditor content={ content } />*/}
      <article className='ui-prose min-w-full'>
        <Markdown children={ content } />
      </article>
    </>
  )
}
