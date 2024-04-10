import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useGetTrendingAnimes = (page = 1, perPage = 10) => {
  const [animeData, setAnimeData] = useState(null);
  const [error, setError] = useState(null);

  const fetchAnimeData = async () => {
    const graphqlQuery = `
      query ($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            perPage
          }
          media(type: ANIME, sort: TRENDING_DESC) {
            id
            title {
              romaji
              english
              native
            }
            type
            genres
            status
            episodes
            duration
            averageScore
            popularity
           
            coverImage {
              extraLarge
              large
              medium
            }
            meanScore
            averageScore
            season
            seasonYear
          
            format
            
           
          }
        }
      }
    `;

    const variables = {
      page,
      perPage,
    };

    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    try {
        console.log('Fetching anime data...');
      const response = await axios.post(
        'https://graphql.anilist.co',
        {
          query: graphqlQuery,
          variables,
        },
        { headers }
      );

      if (response.data.data && response.data.data.Page.media.length > 0) {
        setAnimeData(response.data.data.Page.media);
        return response.data.data.Page.media;
      } else {
        console.warn('No anime data received from the server.');
        return []; 
      }
    } catch (error) {
        console.error('Error fetching anime data:', error.message);
        setError(error.message);
        return [];
    } 
    
  };


    const {isLoading, isError} = useQuery({
        queryKey: ['trendingAnimes'],
        queryFn: fetchAnimeData,
    });
    
    return { animeData, isLoading, isError, error };
};

export default useGetTrendingAnimes;
