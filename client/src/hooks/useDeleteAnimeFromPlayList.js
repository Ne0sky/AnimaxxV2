import Cookies from "universal-cookie";
import axios from "axios";
import { useState } from "react";

const useDeleteAnimeFromPlayList = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const deleteAnimeFromPlayList = async (playlistId, animeId) => {
        setIsLoading(true);
        setError(null);
        
        try {
            const cookies = new Cookies();
            const token = cookies.get("token");

            const response = await axios.post(
                `/user/remove-from-playlist/${playlistId}/${animeId}`, {},
                {
                    headers: {
                        'Authorization': `${token}`,
                    },
                }
            );

            console.log(response.data);
        } catch (err) {
            setError(err.response ? err.response.data : err.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    return { deleteAnimeFromPlayList, isLoading, error };
};

export default useDeleteAnimeFromPlayList;
