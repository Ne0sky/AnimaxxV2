import { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const useCreatePlayList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPlayList = async (title, file, description, publicPlaylist) => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('image', file);
      formData.append('description', description);
      formData.append('publicPlaylist', publicPlaylist);

      const cookies = new Cookies();
      const token = cookies.get('token');

      const response = await axios.post('http://localhost:3000/user/create-playlist', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${token}`,
        },
      });

      setIsLoading(false);
      return response.data.message;
    } catch (error) {
      setIsLoading(false);
      setError(error);
      console.error(error);
      return null;
    }
  };

  return { createPlayList, isLoading, error };
};

export default useCreatePlayList;
