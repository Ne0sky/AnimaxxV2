import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { AiOutlineDelete } from 'react-icons/ai';
import useDeleteAnimeFromPlayList from '../hooks/useDeleteAnimeFromPlayList';
const PlayList = () => {
    const { id } = useParams();
    const [data, setData] = useState({});
    const { deleteAnimeFromPlayList } = useDeleteAnimeFromPlayList();

    const getAnimes = async () => {
        try {
            const cookies = new Cookies();
            const token = cookies.get('token');
            const response = await axios.post(
                'http://localhost:3000/user/get-animes',
                { url: id },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${token}`,
                    },
                }
            );
            console.log(response.data);
            setData(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        console.log('id', id);
        getAnimes();
    }, [id]);

   const handleremovefromPlaylist = async (playlistId, animeId) => {
        try {
            await deleteAnimeFromPlayList(playlistId, animeId);
            getAnimes();
        } catch (error) {
            console.error(error);
        }
   }

    return (
        <div className="overflow-x-hidden max-w-screen">
            {data && (
                <div className="text-white font-secondary">
                    <div className="w-full h-[40vh] rounded-xl">
                        <div className="bg-gradient-to-b from-green-900  bg-opacity-0 flex items-center p-16 gap-8 w-full h-full">
                            <img className="w-40 h-40 object-cover rounded-xl" src={data.image} alt={data.title} />
                            <div className="flex flex-col gap-2">
                                <p>PLAYLIST</p>
                                <h1 className="text-5xl font-bold">{data.title}</h1>
                                <h1>{data.description}</h1>
                                <div className="flex items-center gap-4">
                                    <p>{data.madeBy}</p>
                                    <p>|</p>
                                    <p>{data.animes && data.animes.length} animes</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-b  w-[80%] mx-auto to-transparent min-h-[vh-60]">
                        <div className="p-4 flex flex-col  gap-8 justify-center py-16">
                            {data.animes &&
                                data.animes.map((anime, index) => (
                                    <div
                                        className={`p-4 flex w-full  bg-gradient-to-r  from-black to-zinc-950 items-center justify-between gap-4 rounded-lg  ${anime.userActions.currentlyWatching
                                                ? ' border-l-2  border-green-600'
                                                : ' border-l-2 border-yellow-600'
                                            }`}
                                        key={index}
                                    >
                                        <div className='flex items-center gap-4'>
                                        <img className="w-20 h-20 object-cover rounded-md" src={anime.coverImage} alt={anime.title} />
                                        <div>

                                            <p>{anime.userActions.currentlyWatching}</p>
                                            <h1>{anime.title}</h1>
                                            <p>{anime.type}</p>
                                            </div>
                                        </div>
                                        <div>
                                           <button className='text-2xl text-rose-600 bg-rose-800/40 p-2 rounded-full' onClick={()=>handleremovefromPlaylist(data.playlistId, anime.animeId)}><AiOutlineDelete/></button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlayList;
