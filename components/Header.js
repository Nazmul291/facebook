import Image from 'next/image'
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
} from '@heroicons/react/solid'
import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
} from '@heroicons/react/solid'
import HeaderIcon from './HeaderIcon'
import { getAuth } from 'firebase/auth'

function Header() {
  const user = getAuth().currentUser

  const logout = () => {
    getAuth().signOut()
  }

  return (
    <div className='sticky top-0 z-50 flex bg-white items-center p-2 lg:px5 shadow-md'>
      {/* Left */}
      <div className='flex items-center'>
        <Image
          src={'https://links.papareact.com/5me'}
          width={40}
          height={40}
          objectFit='cover'
          layout='fixed'
        />
        <div className='flex ml-2 items-center rounded-full bg-gray-100 p-2'>
          <SearchIcon className='h-6 text-gray-600' />
          <input
            className='hidden md:inline-flex ml-2 items-center bg-transparent outline-none placeholder-gray-500 flex-shrink'
            type='text'
            placeholder='Search Facebook'
          />
        </div>
      </div>

      {/* Center */}

      <div className='flex justify-center flex-grow'>
        <div className='flex md:space-x-2 space-x-6 '>
          <HeaderIcon active Icon={HomeIcon} />
          <HeaderIcon Icon={FlagIcon} />
          <HeaderIcon Icon={PlayIcon} />
          <HeaderIcon Icon={ShoppingCartIcon} />
          <HeaderIcon Icon={UserGroupIcon} />
        </div>
      </div>

      {/* Right */}
      <div className='flex items-center sm:space-x-2 justify-end'>
        {/* profile picture */}
        {user ? (
          <div className='flex items-center sm:space-x-2 justify-end'>
            <img
              onClick={() => logout()}
              className='rounded-full'
              src={user.photoURL}
              width={40}
              height={40}
              layout='fixed'
            />
            <p className='whitesapce-nowrap font-semibold pr-3 hidden md:block'>
              {user.displayName}
            </p>
          </div>
        ) : (
          <p className='whitesapce-nowrap font-semibold pr-3'>
            You are not Logged In
          </p>
        )}
        <ViewGridIcon className='icon' />
        <ChatIcon className='icon' />
        <BellIcon className='icon' />
        <ChevronDownIcon className='icon' />
      </div>
    </div>
  )
}

export default Header
