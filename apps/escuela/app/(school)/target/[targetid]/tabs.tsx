'use client'

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'

import { RecordingTab } from "./components/recording-tab"
import { ContentTab } from "./components/content-tab"


export const TargetTabs = ({ target }) => {
  return(
    <>
      <TabGroup>
        <TabList>
          <Tab className="data-[selected]:border-pink-500 data-[selected]:text-gray-900">Tab 1</Tab>
          <Tab className="data-[selected]:bg-blue-500 data-[selected]:text-white data-[hover]:underline">Tab 2</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ContentTab content={ target.content } />
          </TabPanel>
          <TabPanel>
            <RecordingTab rooms={ target.rooms } />
          </TabPanel>
        </TabPanels>
      </TabGroup>    
    
    </>
  )
}
