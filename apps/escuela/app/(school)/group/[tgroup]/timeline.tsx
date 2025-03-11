'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckIcon, UserIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";

import { createClient } from '@repo/supabase/lib/client'
import { cx } from "@repo/ui/utils/cx";


export const TargetGroupTimeline = ({ tgroup }: { tgroup: string }) => {
  const supabase = createClient()
  const [targets, setTargets] = useState([])

  useEffect(() => {
    const getTargets = async (id: string) => {
      try {
        const { data, error } = await supabase
          .from('targets')
          .select('id, title, sort_index')
          .eq('target_group_id', id)
          .order('sort_index', { ascending: true })

        if (error) {
          throw error
        }

        setTargets(data)
      } catch (error) {
        console.log('Error downloading image: ', error)
      }
    }

    if (tgroup) getTargets(tgroup)
  }, [tgroup, supabase])

  const eventTypes = {
    applied: { icon: UserIcon, bgColorClass: 'bg-gray-400' },
    advanced: { icon: HandThumbUpIcon, bgColorClass: 'bg-blue-500' },
    completed: { icon: CheckIcon, bgColorClass: 'bg-green-500' },
  }

  return(
    <>
      <div className="mt-6 flow-root">
        <ul role="list" className="-mb-8">
          {
            targets && targets.map((target, itemIdx) => (
            <li key={target.id}>
              <div className="relative pb-8">
                {itemIdx !== targets.length - 1 ? (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span
                      className={cx(
                        eventTypes.completed.bgColorClass,
                        'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                      )}
                    >
                      <eventTypes.completed.icon className="w-5 h-5 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div>
                      <Link href={`/target/${target.id}`}>
                        <p className="text-sm text-gray-500">
                          Día {target.sort_index}:<br />
                          <span className="font-medium text-gray-900">{target.title}</span>
                        </p>
                      </Link>
                    </div>
                    {/*
                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                      <time dateTime={item.datetime}>{item.date}</time>
                    </div>
                    */}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}