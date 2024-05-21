import Cookies from 'universal-cookie';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
const useGetPlaylists = () => {

const [playlists, setPlaylists] = useState(null);

const getPlaylists = async () => {
    const cookies = new Cookies();
    const token = cookies.get('token');

    try{
        const response = await axios.get('/user/playlist', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        });

        console.log(response.data);
        setPlaylists(response.data.playlists);
        return response.data;

    }catch(error){
        console.error(error.response.message);
        return error.response.message;
    }
}

const { playlistError, playlistIsLoading} = useQuery(
    {
        queryKey: ['playlists'],
        queryFn: getPlaylists,
    }
);

return {playlists, playlistError, getPlaylists , playlistIsLoading};

};

export default useGetPlaylists;