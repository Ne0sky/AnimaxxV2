import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { MenuItem, Menu, IconButton } from '@mui/material';
import { HiDotsVertical } from "react-icons/hi";

import ProgressBar from "@ramonak/react-progress-bar";

const PlayList = () => {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);

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

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (option) => {
        console.log('Option chosen:', option);
        handleMenuClose();
    };

    return (
        <div className="overflow-x-hidden max-w-screen">
            {data && (
                <div className="text-white font-secondary">
                    <div className="w-full h-[40vh] rounded-xl">
                        <div className="bg-gradient-to-b from-green-950 to-transparent bg-opacity-0 flex items-center p-16 gap-8 w-full h-full">
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

                    <div className="bg-gradient-to-b from-black to-transparent min-h-[vh-60]">
                        <div className="p-8">
                            {data.animes &&
                                data.animes.map((anime, index) => (
                                    <div
                                        className={`p-4 flex bg-gradient-to-r from-zinc-800 to-transparent items-center gap-4 rounded-lg ${anime.userActions.currentlyWatching
                                                ? ' border-l-2  border-green-600'
                                                : ' border-l-2 border-yellow-600'
                                            }`}
                                        key={index}
                                    >
                                        <img className="w-20 h-20 object-cover rounded-md" src={anime.coverImage} alt={anime.title} />
                                        <div>
                                            <p>{anime.userActions.currentlyWatching}</p>
                                            <h1>{anime.title}</h1>
                                            <p>{anime.type}</p>
                                            <p>{anime.userActions.completedStatus} / {anime.episodes} episodes</p>
                                            <ProgressBar className='pt-2' completed={`${10}`} maxCompleted={anime.episodes} bgColor="#1db954" height="8px" isLabelVisible={false} />
                                        </div>
                                        <div>
                                            <IconButton onClick={handleMenuOpen}>
                                                <HiDotsVertical className='text-white' />
                                            </IconButton>
                                            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} PaperProps={{ style: { backgroundColor: 'black', color: '#eee' } }}>
                                                <MenuItem onClick={() => handleMenuItemClick('Watching')}>Watching</MenuItem>
                                                <MenuItem onClick={() => handleMenuItemClick('Dropped')}>Dropped</MenuItem>
                                                <MenuItem onClick={() => handleMenuItemClick('Watched')}>Watched</MenuItem>
                                            </Menu>
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
