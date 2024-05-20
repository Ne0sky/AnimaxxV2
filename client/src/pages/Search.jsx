import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useSearchAnimes from '../hooks/useSearchAnime';
import { Link } from 'react-router-dom';
import { IoMdSearch } from 'react-icons/io';
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
    <div className='p-4 py-16'>
      <form onSubmit={handleSubmit} className='flex justify-center items-center'>
        <input
          type="text"
          placeholder="Search for an anime..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='bg-accent-1 text-white p-2 px-4 rounded-l-lg w-full md:w-3/4 lg:w-1/2'
        />
        <button className='bg-accent-2  p-3 text-white rounded-r-2xl' type="submit"><IoMdSearch/></button>
      </form>

      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {error.message}</div>}

      <div className='text-white flex flex-wrap justify-center gap-8 py-16'>
        {searchResults && searchResults.length > 0 ? (
          searchResults.map((anime) => (
            <Link to={`/anime/${anime.id}`} className='bg-zinc-950 w-[90%] md:w-52 h-[350px] mx-4  rounded-lg '  key={anime.id}>
               <div className='relative h-[250px] w-full'>
                  <img className='w-full max-h-full object-cover overflow-hidden rounded-lg' src={anime.coverImage.extraLarge} alt={anime.title.romaji} />
                  <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-950'></div>
                </div>
                <div className='p-4'>
              <h1 className='line-clamp-2'>{anime.title.romaji}</h1>
              </div>
            </Link >
          ))
        ) : (
          !isLoading && <div>No results found.</div>
        )}
      </div>

      {searchResults && searchResults.length > 0 && (
        <button className='bg-zinc-700 text-white mx-auto flex justify-center rounded-lg p-2' onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </button>
      )}
    </div>
  );
};

export default Search;
