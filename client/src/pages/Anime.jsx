import React from 'react'
import useGetAnimeById from '../hooks/useGetAnimeById'
import {useParams} from 'react-router-dom'
import { useState } from 'react'

const Anime = () => {
    const { id } = useParams();
    const { animeData, isLoading, isError, error } = useGetAnimeById(id);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error}</div>;


  return (
    <div>
        <div className='w-full h-full'>
        <div className=''>
        <img src={animeData.coverImage.extraLarge}  alt={animeData.title.romaji} />
        <p>{animeData.description}</p>
        <p>Episodes: {animeData.episodes}</p>
        <p>Format: {animeData.format}</p>
        <p>Rank: {animeData.rankings[0].rank}</p>
        </div>
        </div>
        <p>All Time Rank: {animeData.rankings[0].allTime}</p>
        <a href={animeData.externalLinks[0].url}>{animeData.externalLinks[0].site}</a>
        <iframe src={`https://www.youtube.com/embed/${animeData.trailer.id}`} title={animeData.title.romaji} />
    </div>
  )
}

export default Anime