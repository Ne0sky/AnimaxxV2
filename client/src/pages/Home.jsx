import React from 'react'
import useGetTrendingAnimes from '../hooks/useGetTrendingAnimes'
import { Link } from 'react-router-dom'
import { IoMdSearch } from "react-icons/io";
import { useState } from 'react';

const Home = () => {
  const { animeData, isLoading, isError, error } = useGetTrendingAnimes()
  const [search, setSearch] = useState('')
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error}</div>

  return (
    <div>
      <div className='hero  flex flex-col md:flex-row w-full p-4 justify-evenly items-center h-screen font-secondary text-white'>
        <div className='w-full md:w-1/2'>
        <h1 className='font-bold text-4xl'>Anima<span className='text-accent-2'>xx</span></h1>
        <p className='text-xl text-gray-200 my-4'>Track, share and discover your favourite animes with Animaxx</p>
        <div className='flex my-8'>
        <input type="text" className='p-4 rounded-l-2xl outline-none bg-zinc-950' onChange={((e)=>setSearch(e.target.value))} placeholder='search animes...'/>
        <Link className='bg-accent-2 p-4 rounded-r-2xl  inline-block' to={`/search/${search}`}><IoMdSearch className='text-3xl'/></Link>
        </div>
        <div className=' md:hidden'>
          <img className='w-[600px] rounded-r-2xl shadow-lg' src='/hero.webp' alt='hero' />
        </div>
        <div className='flex flex-row flex-wrap gap-4 py-16'>
          <div className='p-4  card w-full md:w-48'>
            <p className='text-lg font-semibold my-2 border-b-2 border-rose-800'>Track anime</p>
            <p className='text-sm'>Track episodes & animes that you are watching</p>
          </div>
          <div className='card p-4 w-full md:w-48'>
            <p className='text-lg font-semibold my-2 border-b-2 border-rose-800'>Share watchlist</p>
            <p className='text-sm'>Share your favourite animes with friends</p>
            </div>
          <div className='card p-4 w-full md:w-48'>
            <p className='text-lg font-semibold my-2 border-b-2 border-rose-800'>Discover anime</p>
            <p className='text-sm'>Discover new animes based on your preferences</p>
          </div>


          
        </div>
        </div>
        <div className='hidden md:flex'>
          <img className='w-[600px] rounded-r-2xl shadow-lg' src='/hero.webp' alt='hero' />
        </div>
      </div>
    </div>
  )
}

export default Home