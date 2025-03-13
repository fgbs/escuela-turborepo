'use client'

import Markdown from 'react-markdown'
// import { ContentEditor } from './content-editor'


export const ContentRender = ({ content }) => {
  return(
    <>
      {/*<ContentEditor content={ content } />*/}
      <Markdown children={ content } />
    </>
  )
}
