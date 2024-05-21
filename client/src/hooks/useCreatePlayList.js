import { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import toast from 'react-hot-toast';
const useCreatePlayList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPlayList = async (title, file, description, publicPlaylist) => {
    

    try {
      setIsLoading(true);
    setError(null);
      const formData = new FormData();
      formData.append('title', title);
      formData.append('image', file);
      formData.append('description', description);
      formData.append('publicPlaylist', publicPlaylist);

      const cookies = new Cookies();
      const token = cookies.get('token');

      const response = await axios.post('/user/create-playlist', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${token}`,
        },
      });

      setIsLoading(false);
      toast.success(response.data.message);
      return response.data.message;
    } catch (error) {
      setIsLoading(false);
      setError(error);
      toast.error(error.response.data.message);
      console.error(error);
      return null;
    }
  };

  return { createPlayList, isLoading, error };
};

export default useCreatePlayList;
