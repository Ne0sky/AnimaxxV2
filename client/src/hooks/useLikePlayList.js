import { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const useLikePlayList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const likePlaylist = async (playlistId) => {
    setIsLoading(true);
    setIsError(false);
    const cookies = new Cookies();
    const token = cookies.get("token");
    try {
      console.log("sending to", playlistId);
      const response = await axios.post(`http://localhost:3000/user/playlist/likeunlike/${playlistId}`,{}, {
            headers: {
                'Authorization': `${token}`
            }
        });
      setIsLoading(false);
      return response.data.message;
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
      return error.message;
    }
  };

  return { likePlaylist, isLoading, isError };
};

export default useLikePlayList;
