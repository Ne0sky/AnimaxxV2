import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { MdCancel } from "react-icons/md";
import useCreatePlayList from '../hooks/useCreatePlayList';
import useGetPlaylists from '../hooks/useGetPlaylists';
import CircularProgress from '@mui/material/CircularProgress';

const CreatePlayListModal = ({ isOpen, onRequestClose, handleCreatePlayList }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const [publicPlaylist, setPublicPlaylist] = useState(false);

  const { createPlayList, isLoading, isError } = useCreatePlayList();
  const { playlists, playlistError, getPlaylists, playlistIsLoading } = useGetPlaylists();


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const message = await createPlayList(title, file, desc, publicPlaylist);
    if (!isLoading && !isError) {
      onRequestClose();
      getPlaylists();
    }
    handleCreatePlayList();
  };

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(5px)',
      WebkitBackdropFilter: 'blur(5px)',

    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#212121',
      borderRadius: '8px',
      border: 'none',


    },
  };

  useEffect(() => {
    console.log('isLoading:', isLoading);
    
  } , [isLoading] );

  return (
    <Modal ariaHideApp={false} isOpen={isOpen} style={customStyles} onRequestClose={onRequestClose}>
      <button className='text-right w-full text-white text-2xl flex justify-end' onClick={onRequestClose}><MdCancel /></button>
      <h2 className='text-center text-white font-semibold text-2xl font-secondary'>Create new playlist</h2>
      <form className='flex flex-col justify-center items-center  gap-4 text-white font-main' onSubmit={handleFormSubmit}>
        <input type='text' className='bg-zinc-950 outline-none p-4 w-full mt-8 rounded-md' onChange={(e) => setTitle(e.target.value)} placeholder='Playlist name' />
        <textarea type='text' className='bg-zinc-950 outline-none  p-4 w-full rounded-md' onChange={(e) => setDesc(e.target.value)} placeholder='Playlist Description' />
        <input type='file' onChange={(e) => setFile(e.target.files[0])} className='bg-zinc-950 outline-none p-4 w-full rounded-md' />

        <label className='flex items-center gap-4'>
          <input type='checkbox' onChange={(e) => setPublicPlaylist(e.target.checked)} className='hidden' />
          <span className={`relative w-12 h-6 items-center flex rounded-full  p-0.5 ${publicPlaylist ? 'bg-gradient-to-r from-green-500 to-green-900' : 'bg-gradient-to-r from-zinc-900 to-zinc-950'}`}>
            <span
              className={`block w-5 h-5 rounded-full bg-white  transform transition-transform ${publicPlaylist ? 'translate-x-full ' : 'translate-x-0'
                }`}
            ></span>
          </span>
          <span className='text-white  text-xs '>This is a {publicPlaylist ? 'Public' : 'Private'} playlist</span>
        </label>
        <button type='submit' className='bg-accent-2 text-black p-3 rounded-xl flex gap-2 items-center' disabled={isLoading}>
          Create Playlist {isLoading && <CircularProgress size={20} />}
        </button>

      </form>
    </Modal>
  );
};

export default CreatePlayListModal;
