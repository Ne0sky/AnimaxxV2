import React, { useEffect } from 'react';
import useGetTrendingAnimes from '../hooks/useGetTrendingAnimes';
import { AiFillLike } from 'react-icons/ai';
import { LuBadgePercent } from 'react-icons/lu';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import useGetPopularAnimes from '../hooks/useGetPopularAnimes';
import { useInView } from 'react-intersection-observer';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from 'react-router-dom'
import { IoMdSearch } from "react-icons/io";
import { MdOutlineWifiTetheringErrorRounded } from "react-icons/md";


const Popular = () => {
  const { animeData, isLoading, isError, error } = useGetTrendingAnimes();
  const { popularAnimes, fetchNextPage, isFetchingNextPage, status } = useGetPopularAnimes();
  const { ref, inView } = useInView();
 const [search, setSearch] = React.useState('')
  useEffect(() => {
    if (inView) {
      console.log('Fetching next page...');
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 3, 
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 2, 
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, 
    },
  };

    if (isError) return <div className=' py-20 flex items-center justify-center   text-white'>

        <MdOutlineWifiTetheringErrorRounded className='text-5xl text-rose-500 mx-1'/> {error}
        <p className='mx-4 card p-2'>Sometimes due to rate-limiting of the AniList api error can occur. PLease try again later</p>
        </div>;

  return (
    <div className='font-secondary text-white mx-auto w-full flex flex-col justify-center p-4 md:p-8 lg:p-16'>
        <div className='flex'>
            <input type="text" placeholder="Search for an anime" onChange={(e)=>setSearch(e.target.value)} className='bg-accent-1 text-white p-1 px-4 rounded-l-lg w-full md:w-3/4 lg:w-1/2' />
            <Link className='bg-accent-2  p-2 rounded-r-2xl  inline-block' to={`/search/${search}`}><IoMdSearch className='text-3xl'/></Link>

        </div>
        <h1 className='text-2xl font-semibold my-8'>
          <span className='text-accent-2 mx-2'>Top 10</span>Trending Animes
        </h1>
        {
            !animeData   &&

              (
                <div className='flex gap-12 flex-col lg:flex-row '>
                    
                    <div>
                    <Skeleton enableAnimation={true} baseColor='accent-1' highlightColor='#adadad' className='card w-[90%] md:w-52 h-[300px]' />
                    <Skeleton enableAnimation={true} baseColor='accent-1' highlightColor='#adadad' count={3} className='card w-[90%] md:w-52 ' />
                    </div>
                    <div>
                    <Skeleton enableAnimation={true} baseColor='accent-1' highlightColor='#adadad' className='card w-[90%] md:w-52 h-[300px]' />
                    <Skeleton enableAnimation={true} baseColor='accent-1' highlightColor='#adadad' count={3} className='card w-[90%] md:w-52 ' />
                    </div>
                    <div>
                    <Skeleton enableAnimation={true} baseColor='accent-1' highlightColor='#adadad' className='card w-[90%] md:w-52 h-[300px]' />
                    <Skeleton enableAnimation={true} baseColor='accent-1' highlightColor='#adadad' count={3} className='card w-[90%] md:w-52 ' />
                    </div>
                    
                </div>
            )
        }
        {
            !isLoading && animeData && animeData.length === 0 && (
                <div className=' py-20 flex items-center justify-center   text-white'>

                    <MdOutlineWifiTetheringErrorRounded className='text-5xl text-rose-500 mx-1'/> No data found
                    <p className='mx-4 card p-2'>Sometimes due to rate-limiting of the AniList api error can occur. PLease try again later</p>
                </div>
            )
        }
      <div>
        
        {animeData && (
          <Carousel
          autoPlay={true}
            infinite={true}
            swipeable={true}
            draggable={true}
           responsive={responsive}>
            {animeData.map((anime) => (
              <Link target='_blank' to={`/anime/${anime.id}`}  className='card w-[90%] md:w-52 h-[400px] mx-4 block ' key={anime.id}>
                <div className='relative h-[300px] w-full'>
                  <img className='w-full max-h-full object-cover overflow-hidden rounded-lg' src={anime.coverImage.extraLarge} alt={anime.title.romaji} />
                  <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-accent-1'></div>
                </div>
                <div className='px-4'>
                  <h2 className='text-sm font-semibold my-2 overflow-hidden line-clamp-2 overflow-ellipsis'>{anime.title.english}</h2>
                  <div className='flex justify-between'>
                    
                    <p className='text-xs my-2'>{anime.format}</p>
                    <p className='text-xs my-2 flex items-center gap-1'>
                      <AiFillLike />
                      {anime.meanScore} <LuBadgePercent />
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </Carousel>
        )}

        <div className='mt-20'>
          <h1 className='text-2xl font-semibold my-8'>
            Popular Animes of <span className='text-accent-2 mx-2'>all time</span>
          </h1>

          {
            !popularAnimes && (
              <div className='flex gap-8'>
                <div>
                    <Skeleton enableAnimation={true} baseColor='#1c0342' highlightColor='#1f172b' className='card w-[90%] md:w-52 h-[300px]' />
                    <Skeleton enableAnimation={true} baseColor='#1c0342' highlightColor='#1f172b' count={2} className='card w-[90%] md:w-52 ' />
                    </div>
                    <div>
                    <Skeleton enableAnimation={true} baseColor='#1c0342' highlightColor='#1f172b' className='card w-[90%] md:w-52 h-[300px]' />
                    <Skeleton enableAnimation={true} baseColor='#1c0342' highlightColor='#1f172b' count={2} className='card w-[90%] md:w-52 ' />
                    </div>
                    <div>
                    <Skeleton enableAnimation={true} baseColor='#1c0342' highlightColor='#1f172b' className='card w-[90%] md:w-52 h-[300px]' />
                    <Skeleton enableAnimation={true} baseColor='#1c0342' highlightColor='#1f172b' count={2} className='card w-[90%] md:w-52 ' />
                    </div>
                    
                </div>
            )
          }
          
          <div className='flex flex-wrap gap-8'>
            {popularAnimes &&
              popularAnimes.map((anime) => (
                <Link to={`/anime/${anime.id}`} className='card w-80 md:w-52 h-[400px]  ' key={anime.id}>
                    <div className='relative h-[300px] w-full'>
                        <img className='w-full max-h-full object-cover overflow-hidden rounded-lg' src={anime.coverImage.extraLarge} alt={anime.title.romaji} />
                        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-accent-1'></div>
                    </div>
                    <div className='px-4'>
                  <h2 className='text-sm font-semibold my-2 overflow-hidden line-clamp-2 overflow-ellipsis'>{anime.title.english}</h2>
                  <div className='flex justify-between'>
                    <p className='text-xs my-2'>{anime.format}</p>
                    <p className='text-xs my-2 flex items-center gap-1'>
                      <AiFillLike />
                      {anime.meanScore} <LuBadgePercent />
                    </p>
                  </div>
                </div>
                </Link>
              ))}
              {
                isFetchingNextPage && (
                    <div className='flex gap-12  '>
                    
                    <div>
                    <Skeleton enableAnimation={true} baseColor='#0f0b15' highlightColor='#1f172b' className='card w-[90%] md:w-52 h-[300px]' />
                    <Skeleton enableAnimation={true} baseColor='#0f0b15' highlightColor='#1f172b' count={2} className='card w-[90%] md:w-52 ' />
                    </div>
                    <div>
                    <Skeleton enableAnimation={true} baseColor='#0f0b15' highlightColor='#1f172b' className='card w-[90%] md:w-52 h-[300px]' />
                    <Skeleton enableAnimation={true} baseColor='#0f0b15' highlightColor='#1f172b' count={2} className='card w-[90%] md:w-52 ' />
                    </div>
                    <div>
                    <Skeleton enableAnimation={true} baseColor='#0f0b15' highlightColor='#1f172b' className='card w-[90%] md:w-52 h-[300px]' />
                    <Skeleton enableAnimation={true} baseColor='#0f0b15' highlightColor='#1f172b' count={2} className='card w-[90%] md:w-52 ' />
                    </div>
                    
                </div>
                )
              }
            <div ref={ref}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popular;
