
import React, { useEffect, useState } from 'react';
import useGetAnimeById from '../hooks/useGetAnimeById';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import { IoIosAdd } from 'react-icons/io';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { TbCirclesRelation } from "react-icons/tb";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { AiFillLike } from 'react-icons/ai';
import { LuBadgePercent } from 'react-icons/lu';
import useAddToWatchList from '../hooks/useAddtoWatchList';
import useGetPlaylists from '../hooks/useGetPlaylists';
import { useUserContext } from '../hooks/useUserContext';
import Cookies from 'universal-cookie';
import axios from 'axios';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const Anime = () => {
  const { id } = useParams();
  const { state } = useUserContext();
  const { user } = state;
  const { animeData, isLoading, isError, error } = useGetAnimeById(id);
  const { playlists, getPlaylists, playlistError, playlistIsLoading } = useGetPlaylists();
 const nav = useNavigate();
  const [playlistId, setPlaylistId] = useState(null);
  const [anime, setAnime] = useState(null);
  const [playlistlist, setPlaylistlist] = useState([]);

  const { addToWatchList } = useAddToWatchList();



  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div className='flex w-screen h-80 text-white  justify-center items-center text-xl'>Error: {error}</div>;

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 2,
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










  const handleAddtoPlaylist = (e) => {
    e.preventDefault();
    const selectedPlaylistId = e.target.value;
    if(selectedPlaylistId === 'create') {
      
      
      console.log('Create a playlisttttttt');
      
      nav('/playlists');
      return;
    }
    if (!selectedPlaylistId) return;
    setPlaylistId(selectedPlaylistId);
    const anime = {
      anilistId: animeData.id,
      title: animeData.title.english,
      type: animeData.type,
      genres: animeData.genres,
      episodes: animeData.episodes,
      meanScore: animeData.meanScore,
      averageScore: animeData.averageScore,
      coverImage: animeData.coverImage.large,
      format: animeData.format,
      description: animeData.description,
      status: animeData.status,
      UserActions: {
        currentlyWatching: true,
        completedStatus: 0,
        currentEpisode: 0,
        planToWatch: false,
        dropped: false,
      },
      season: animeData.season,
      seasonYear: animeData.seasonYear,
      startDate: animeData.startDate,
      endDate: animeData.endDate,
      popularity: animeData.popularity,
    }
    setAnime(anime);
    try {
      addToWatchList({ id: selectedPlaylistId, anime });
    } catch (error) {
      console.log('Error:', error);
    }

    setPlaylistId(null);

  }

  return (
    <div className='font-secondary overflow-x-hidden'>
      <div className='w-full h-[850px] lg:h-screen'>
        {
          animeData &&
       
          


        
        <div className='relative w-full h-full'>
          <img
            src={
              animeData && animeData.bannerImage
                ? animeData.bannerImage
                : 'https://cdn.pixabay.com/photo/2022/12/01/04/43/girl-7628308_1280.jpg'
            }
            className='w-full opacity-60 overflow-hidden h-full object-cover object-top'
            alt={animeData.title.romaji}
          />
          <div className='absolute top-0 left-0 w-full h-full opacity-100 bg-gradient-to-t from-[#0f0b15] to-transparent'></div>

          <div className='absolute top-[10%] lg:top-[25%] p-4  md:p-8 h-full text-white z-10 flex flex-col lg:flex-row gap-8'>
            <img
              src={animeData.coverImage?.extraLarge} // Added optional chaining
              alt={animeData.title.romaji}
              className='w-52 h-80 object-cover rounded-lg shadow-lg'
            />
            <div className='flex flex-col'>
              <div className='flex items-center gap-4'>
                <p>{animeData.format}</p>
                <p>{animeData.title.native}</p>
              </div>
              <p className='text-2xl lg:text-4xl font-bold text-white py-4'>{animeData.title.english}</p>
              <p>{animeData.episodes} episodes</p>
              <p>{animeData.season}</p>
              <div className='flex flex-col md:flex-row gap-4 py-4'>

                {animeData.trailer && animeData.trailer.site && animeData.trailer.id && (
                  <Link
                    to={`https://www.${animeData.trailer.site}.com/watch?v=${animeData.trailer.id}`}
                    className='bg-rose-800 text-white px-4 py-2 rounded-full bg-opacity-80 border border-rose-500 flex items-center gap-2 w-48'
                  >
                    <FaPlay />
                    Watch Trailer
                  </Link>
                )
                }
                <div className='relative'>
                  <select
                    onChange={handleAddtoPlaylist}
                    className='bg-emerald-800 text-white px-4 py-2 rounded-full bg-opacity-80 border border-emerald-500 outline-none w-48'
                  >
                    <option value=''>Add to Playlist</option>
                    {!playlistIsLoading && (!playlists || playlists.length === 0) && (
                      <option value='create'><Link to='/playlists'>Create a playlist</Link></option>
                    )}
                    {playlists &&
                      playlists.map((playlist) => (
                        <option key={playlist._id} value={playlist._id}>
                          {playlist.title}
                        </option>
                      ))}
                  </select>

                </div>

              </div>
              <p className='line-clamp-4 text-xs  w-3/4'>
                {animeData.description}
              </p>
            </div>

          </div>

        </div>
        }
      </div>
      {/* Anime details */}
      <div className='w-full p-8 flex flex-col md:flex-row gap-8'>
        <div className=' h-auto w-full md:w-1/3 lg:w-1/5 card  flex flex-col gap-2 text-white text-xs p-4 '>
          <div>
            <p className='font-semibold pb-1'>Title</p>
            <p>{animeData.title.english}</p>
          </div>
          <div>
            <p className='font-semibold pb-1'>Status</p>
            <p>{animeData.status}</p>
          </div>

          <div >
            <p className='font-semibold pb-1'>Start Date</p>
            <p>
              {animeData.startDate.day && `${animeData.startDate.day} - `}
              {animeData.startDate.month && `${animeData.startDate.month} - `}
              {animeData.startDate.year && `${animeData.startDate.year}`}
            </p>
          </div>
          <div>
            <p className='font-semibold pb-1'>End Date</p>
            <p>
              {animeData.endDate.day && `${animeData.endDate.day} - `}
              {animeData.endDate.month && `${animeData.endDate.month} - `}
              {animeData.endDate.year && `${animeData.endDate.year}`}
            </p>
          </div>
          <div>
            <p className='font-semibold pb-1'>Duration</p>
            <p>{animeData.duration}</p>
          </div>
          <div>
            <p className='font-semibold pb-1'>Genres</p>
            <ul className='flex flex-wrap gap-2'>
              {animeData.genres.map((genre) => (
                <li className='bg-zinc-950 p-1 rounded' key={genre}>{genre}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className='font-semibold pb-1'>Popularity</p>
            <p>{animeData.popularity}</p>
          </div>
          <div>
            <p className='font-semibold pb-1'>Favourites</p>
            <p>{animeData.favourites}</p>
          </div>
          <div>
            <p className='font-semibold pb-1'>Average Score</p>
            <p>{animeData.averageScore}</p>
          </div>
          <div>
            <p className='font-semibold pb-1'>Mean Score</p>
            <p>{animeData.meanScore}</p>
          </div>
          <div>
            <p className='font-semibold pb-1'>Season</p>
            <p>{animeData.season}</p>
          </div>
          <div>
            <p className='font-semibold pb-1'>Season Year</p>
            <p>{animeData.seasonYear}</p>
          </div>
          <div>
            <p className='font-semibold pb-1'>Format</p>
            <p>{animeData.format}</p>
          </div>
          <div>
            <p className='font-semibold pb-1'>Type</p>
            <p>{animeData.type}</p>
          </div>


        </div>
        <div className=' px-8 w-full lg:w-4/5 h-[700px] flex flex-col items-start text-white'>
          <div className='w-full'>
            {
              animeData && animeData.relations && (
                <div className='w-[100%]'>
                  <h1 className='text-2xl py-8 flex gap-2 items-center text-white font-semibold'>
                    Relations <TbCirclesRelation />
                  </h1>
                  <Carousel
                    autoPlay={true}
                    infinite={true}
                    swipeable={true}
                    draggable={true}
                    responsive={responsive}>
                    {
                      animeData.relations.edges.map((relation) => (
                        <Link to={`/anime/${relation.node.id}`} key={relation.node.id} className='md:w-52 h-[300px]  block card' target='_blank'>
                          <div className='relative h-[250px] w-full'>
                            <img className='w-full max-h-full object-cover overflow-hidden rounded-lg' src={relation.node.coverImage.large} alt={relation.node.title.english} />
                            <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1f172b]'></div>
                          </div>
                          <div className='p-4'>
                            <h2 className='text-sm  overflow-hidden line-clamp-1 overflow-ellipsis'>{relation.node.title.english}</h2>

                          </div>
                        </Link>
                      ))
                    }
                  </Carousel>
                </div>
              )
            }
          </div>
          <h1 className='text-2xl text-white py-8 font-semibold flex items-center gap-2'>
            Popular Characters  <RiAccountPinCircleFill />
          </h1>


          {
            animeData && animeData.characters && (
              <Swiper
                slidesPerView={5}
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
                breakpoints={{
                  // Breakpoints for responsive design
                  0: {
                    slidesPerView: 2, // Change to 1 slide per view on screen width 0px and above
                  },
                  768: {
                    slidesPerView: 3, // Change to 2 slides per view on screen width 768px and above
                  },
                  1024: {
                    slidesPerView: 5, // Change to 4 slides per view on screen width 1024px and above
                  },
                }}
              >
                {animeData.characters.edges.map((character) => (
                  <SwiperSlide key={character.node.id}>
                    <img className='w-28 h-28 rouded-full object-cover' src={character.node.image.large} alt={character.node.name.full} />
                    <p className='py-4'>{character.node.name.full}</p>
                  </SwiperSlide>
                ))}
              </Swiper>
            )
          }

        </div>
      </div>
      <div>
        {
          animeData && animeData.recommendations && (
            <div className='p-8'>
              <h1 className='text-2xl text-white font-semibold my-8'>
                Recommendations for you
              </h1>
              <div className='flex flex-wrap gap-8'>
                {animeData.recommendations.nodes.slice(0, 5).map((recommendation) => (
                  <Link to={`/anime/${recommendation.mediaRecommendation.id}`} className='card w-80 md:w-48 h-[300px] text-white ' key={recommendation.mediaRecommendation.id}>
                    <div className='relative h-[200px] w-full'>
                      <img className='w-full max-h-full object-cover overflow-hidden rounded-lg' src={recommendation.mediaRecommendation.coverImage.large} alt={recommendation.mediaRecommendation.title.romaji} />
                      <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1f172b]'></div>
                    </div>
                    <div className='px-4'>
                      <h2 className='text-sm font-semibold my-2 overflow-hidden line-clamp-1 overflow-ellipsis'>{recommendation.mediaRecommendation.title.english}</h2>
                      <div className='flex justify-between'>

                        <p className='text-xs my-2'>{recommendation.mediaRecommendation.format}</p>
                        <p className='text-xs my-2 flex items-center gap-1'>
                          <AiFillLike />
                          {recommendation.mediaRecommendation.averageScore} <LuBadgePercent />
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        }
      </div>

    </div>
  );
};

export default Anime;
