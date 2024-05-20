import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useSearchAnimes from '../hooks/useSearchAnime';

const Search = () => {
  const { search } = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState(search || '');
  const [searchTerm, setSearchTerm] = useState(query);
  const { searchResults, isLoading, isError, error, fetchNextPage, isFetchingNextPage } = useSearchAnimes(searchTerm);

  useEffect(() => {
    //reload the page
  }, [searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      const trimmedQuery = query.trim();
      setSearchTerm(trimmedQuery);
      console.log('Updated searchTerm in handleSubmit:', trimmedQuery);
      navigate(`/search/${trimmedQuery}`);
      window.location.reload();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for an anime..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {error.message}</div>}

      <div className='text-white'>
        {searchResults && searchResults.length > 0 ? (
          searchResults.map((anime) => (
            <div key={anime.id}>
              <img src={anime.coverImage.large} alt={anime.title.romaji} />
              <h1>{anime.title.romaji}</h1>
              <p>{anime.genres.join(', ')}</p>
            </div>
          ))
        ) : (
          !isLoading && <div>No results found.</div>
        )}
      </div>

      {searchResults && searchResults.length > 0 && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </button>
      )}
    </div>
  );
};

export default Search;
