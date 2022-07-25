import React from 'react'
import Image from 'next/image'

function SidebarRow({src, title, Icon}) {
  return (
    <div className='flex p-2 items-center cursor-pointer hover:bg-gray-200 rounded-xl active:bg-gray-300'>
        {src? <Image src={src} width={40} height={40} className='rounded-full' />:Icon? <Icon className='h-8 w-8 text-blue-500' /> : ""}
        <p className='ml-2 hidden md:inline '>{title}</p>

    </div>
  )
}

export default SidebarRow