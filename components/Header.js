import Image from 'next/image'
import { 
  SearchIcon,
  MenuIcon,
  GlobeAltIcon,
  UserCircleIcon,
  UsersIcon
} from '@heroicons/react/solid'
import { useState } from 'react'
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { useRouter } from 'next/router'

function Header({placeholder}) {
  const [searchInput, setSearchInput] = useState('');
  const [numOfGuests, setnumOfGuests] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const router = useRouter();

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  }

  const resetInput = () => {
    setSearchInput('');
  }

  const search = () => {
    router.push({
      pathname: '/search',
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numOfGuests,
      }
    });
  }
  
  const selectionRange = {
    startDate,
    endDate,
    key: 'selection'
  }

  return (
    <header className='sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10'>
        <div 
          onClick={() => router.push('/')}
          className='relative flex items-center h-10 cursor-pointer my-auto'>
            <Image
                src='http://cdn.trinicreations.com/builds/react/airbnb-clone-app/images/qd3.webp'
                fill={true}
                className='object-contain object-left'
             />
        </div>
        <div 
          className='flex items-center md:border-2 rounded-full py-2 md:shadow-sm'>
          <input 
            type="text" 
            className='pl-5 bg-transparent outline-none flex-grow text-sm text-gray-600 placeholder-gray-400'
            placeholder={placeholder || 'Start Your Search...'}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)} />
          <SearchIcon 
            className='hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2' />
        </div>
        <div className='flex items-center justify-end space-x-4'>
          <p className='hidden md:inline-flex cursor-pointer'>Become a host</p>
          <GlobeAltIcon
            className='h-6 cursor-pointer' />
          <div className='flex items-center space-x-2 border-2 p-2 rounded-full'>
            <MenuIcon
              className='h-6 cursor-pointer' />
            <UserCircleIcon
              className='h-6 cursor-pointer' />
          </div>
        </div>
        {
          searchInput && (
            <div
              className='flex flex-col col-span-3 mx-auto'>
              <DateRangePicker
                ranges={[selectionRange]}
                minDate={new Date()}
                rangeColors={['#FD5B61']}
                onChange={handleSelect}
                className='' />
              <div
                className='flex items-center border-b mb-4'>
                <h2 
                  className='text-2xl pl-2 flex-grow font-semibold'>
                  Number of Guest
                </h2>
                <UsersIcon
                  className='h-5' />
                <input 
                  type="number"
                  className='w-12 pl-2 text-lg text-red-400 outline-none'
                  value={numOfGuests}
                  min={1}
                  onChange={e => setnumOfGuests(e.target.value)} />
              </div>
              <div
                className='flex flex-grow'>
                <button
                  className='flex-grow text-gray-500'
                  onClick={resetInput}>Cancel</button>
                <button
                  onClick={search}
                  className='flex-grow text-red-400'>Search</button>
              </div>
            </div>
          )
        }
    </header>
  )
}

export default Header