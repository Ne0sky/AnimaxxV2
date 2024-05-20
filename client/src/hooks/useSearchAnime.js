import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

const useSearchAnimes = (searchQuery, perPage = 10) => {

  const [searchResults, setSearchResults] = useState([]);

  const fetchSearchResults = async ({ pageParam = 1 }) => {
    const graphqlQuery = `
      query ($page: Int, $perPage: Int, $search: String) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            perPage
            currentPage
            lastPage
            hasNextPage
          }
          media(type: ANIME, search: $search) {
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
      search: searchQuery,
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

      console.log('Search results:', response.data.data.Page);
      setSearchResults((prevResults) => [...prevResults, ...response.data.data.Page.media]);
      console.log('Search Animes:', searchResults);
      return response.data.data.Page;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const { status, error, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['searchAnimes', searchQuery],
    queryFn: fetchSearchResults,
    enabled: !!searchQuery,
    getNextPageParam: (lastPage) => {
      return lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.currentPage + 1 : undefined;
    },
  });

  return {
    searchResults,
    fetchNextPage,
    isFetchingNextPage,
    status,
    error,
  };
};

export default useSearchAnimes;
