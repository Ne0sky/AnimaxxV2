import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

const useGetPopularAnimes = (perPage = 10) => {

    const [popularAnimes, setPopularAnimes] = useState([]);

  const fetchAnimeData = async ({ pageParam}) => {
    const graphqlQuery = `
      query ($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            perPage
            currentPage
            lastPage
            hasNextPage
          }
          media(type: ANIME, sort: POPULARITY_DESC) {
            id
            title {
              romaji
              english
              native
            }
            type
            format
            season
            meanScore
            coverImage {
              extraLarge
              large
              medium
            }
            genres
          }
        }
      }
    `;

    const variables = {
      page: pageParam, 
      perPage: perPage,
    };

    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    try {
      const response = await axios.post(
        'https://graphql.anilist.co',
        {
          query: graphqlQuery,
          variables,
        },
        { headers }
      );

      console.log('Anime data:', response.data.data.Page);
      setPopularAnimes((prev) => {
        return prev ? [...prev, ...response.data.data.Page.media] : response.data.data.Page.media;
      });
      console.log('Popular Animes:', popularAnimes);
      return response.data.data.Page;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const {  status, error, fetchNextPage, isFetchingNextPage} = useInfiniteQuery({
    queryKey: ['popularAnimes'],
    queryFn: fetchAnimeData,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
        return lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.currentPage + 1 : undefined;
        }
  });
  

  return {
    popularAnimes,
    fetchNextPage,
    isFetchingNextPage,
    status,
    error,
  };
};

export default useGetPopularAnimes;
