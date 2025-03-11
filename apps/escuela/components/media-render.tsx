'use client'

import React, { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ImageProps } from 'next/image'


export const MediaRender = ({ media, props }: { media: string, props: ImageProps}) => {
  const supabase = createClient()
  const [mediaUrl, setMediaUrl] = useState<string | null>(media)

  useEffect(() => {
    async function downloadMedia(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from('media')
          .download(path)
        if (error) {
          throw error
        }

        const url = URL.createObjectURL(data)
        setMediaUrl(url)
      } catch (error) {
        console.log('Error downloading image: ', error)
      }
    }

    if (media) downloadMedia(media)
  }, [media, supabase])

  return(
    <>
      {
        mediaUrl ? (
          <img src={ mediaUrl } {...props} />
          // <Image
          //   //fill={true}
          //   width={48}
          //   height={48}
          //   src={mediaUrl}
          //   alt=""
          //   className="image"
          // />
        ) : (
          <div className="avatar no-image" style={{ height: height, width: width }} />
        )
      }
    </>
  )
}
