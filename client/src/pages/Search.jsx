import React from 'react';
import useGetTrendingAnimes from '../hooks/useGetTrendingAnimes';

const Search = () => {
  const { animeData, isLoading, isError, error } = useGetTrendingAnimes();

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Anime Search Results</h1>

    </div>
  );
};

export default Search;
