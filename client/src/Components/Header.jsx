import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
    const { currentUser } = useSelector((state) => state.user)
    return (
        <header className='bg-slate-200 '>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3 '>
                <Link to="/">
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap '>
                        <span className='text-slate-500'>Tanmay </span>
                        <span className='text-slate-700'>Estate</span>
                    </h1>
                </Link>
                <form className='bg-slate-100 p-3 rounded-full flex items-center'>
                    <input type='text' className='bg-transparent focus:outline-none w-24 sm:w-64 ' placeholder='search' />
                    <FaSearch className='text-slate-600 ' />
                </form>
                <ul className='flex gap-4 '>
                    <Link to='/'>
                        <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer '>Home</li></Link>
                    <Link to='about'>
                        <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>About</li></Link>
                    <Link to='/sign-in'>
                        {currentUser ? (
                            <img
                                className='rounded-full h-7 w-7 object-cover '
                                src={currentUser.avatar}
                                alt='profile'
                                onClick={<Navigate to='/profile' />}
                            />
                        ) : (<li className=' text-slate-700 hover:underline cursor-pointer'>Sign in</li>
                        )}
                    </Link>
                </ul>
            </div>
        </header>
    )
}

export default Header
