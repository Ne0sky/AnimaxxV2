import { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const useDeletePlaylist = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deletePlaylist = async (id) => {
    
    setIsLoading(true);
    setError(null);

    try {
      const cookies = new Cookies();
      const token = cookies.get('token');

      const response = await axios.post('/user/delete-playlist', { id }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });

      setIsLoading(false);
      console.log(response.data.message);
    } catch (error) {
      setIsLoading(false);
      setError(error);
      console.error(error);
    }
  };

  return { deletePlaylist, isLoading, error };
};

export default useDeletePlaylist;
