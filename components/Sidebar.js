import React from 'react'
import {ChevronDownIcon, ShoppingBagIcon, UserGroupIcon} from '@heroicons/react/outline'
import {CalendarIcon, ClockIcon, DesktopComputerIcon, UsersIcon} from '@heroicons/react/solid'
import SidebarRow from './SidebarRow'


function Sidebar({currentUser}) {
  return (
    <div className='p-2 mt-5 max-w-[350px] xl:min-w-[300px]'>
        <SidebarRow src={currentUser.photoURL} title={currentUser.displayName} />
        <SidebarRow Icon={UsersIcon} title='Friends' />
        <SidebarRow Icon={UserGroupIcon} title='Groups' />
        <SidebarRow Icon={ShoppingBagIcon} title='Marketplace' />
        <SidebarRow Icon={DesktopComputerIcon} title='Watch' />
        <SidebarRow Icon={CalendarIcon} title='Events' />
        <SidebarRow Icon={ClockIcon} title='Memories' />
        <SidebarRow Icon={ChevronDownIcon} title='See More' />
    </div>
  )
}

export default Sidebar