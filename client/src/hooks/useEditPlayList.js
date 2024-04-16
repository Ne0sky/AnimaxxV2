import { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const useEditPlayList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const editPlaylist = async (id, title, file, description, publicPlaylist) => {
    setIsLoading(true);
    setError(null);




    try {
      console.log("Editing playlist...");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("image", file); // Make sure file is correctly obtained from your component
      formData.append("description", description);
      formData.append("publicPlaylist", publicPlaylist);

      const cookies = new Cookies();
      const token = cookies.get("token");

      console.log('title:', formData.get('title'))

      const response = await axios.post(
        `http://localhost:3000/user/playlist/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${token}`,
          },
        }
      );

      setIsLoading(false);
      return response.data.message;
    } catch (error) {
      setIsLoading(false);
      setError(error);
      console.error(error);
      return null;
    }
  };

  return { editPlaylist, isLoading, error };
};

export default useEditPlayList;
