
import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import useGetPlaylists from '../hooks/useGetPlaylists';
import { MdCancel } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { MdOutlineEditNote } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

import useCreatePlayList from '../hooks/useCreatePlayList';
import useDeletePlaylist from '../hooks/useDeletePlayList';
import useLikePlayList from '../hooks/useLikePlayList';

const PlaylistList = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState('');
  const [publicPlaylist, setPublicPlaylist] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const {createPlayList, isLoading:isCreationLoading, isError:isCreationError} = useCreatePlayList();
  const { likePlaylist, isLoading: isLikeLoading, isError: isLikeError } = useLikePlayList();
  const { playlists, playlistError, getPlaylists, playlistIsLoading } = useGetPlaylists();
  const { deletePlaylist, isLoading: isDeleteLoading, error: deleteError } = useDeletePlaylist();

  const handleDeletePlaylist = (id) => async (e) => {
    e.preventDefault();
    const message = await deletePlaylist(id);
    if(!isDeleteLoading && !deleteError) getPlaylists();
  };

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    const message = await createPlayList(title, file, desc, publicPlaylist);
    if(!isCreationLoading && !isCreationError){
      setModalIsOpen(false);
      getPlaylists();
    }
  };

  const handleLikePlaylist = async (id) => {
    console.log(id);
    const message = await likePlaylist(id);
    if(!isLikeLoading && !isLikeError) getPlaylists();
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

 

  return (
    <div className='text-white p-4 md:p-8 font-secondary w-screen overflow-x-hidden flex flex-col justify-center items-center py-12'>
      <h1 className='text-3xl font-bold'>Your Playlists</h1>
      <div className='py-8'>
        <button className='bg-accent-2 p-2 rounded' onClick={() => setModalIsOpen(true)}>Create Playlist</button> 
      </div>
      <div className='card-container w-full h-full py-16 grid grid-cols-1 gap-8 lg:grid-cols-2'>
        {
          playlistError && <div className='text-white text-center'>Error: {playlistError}</div>
          
        }
        {
          playlistIsLoading && <div className='text-white text-center'>Loading...</div>
        }
        {
          playlists && playlists.length===0 && !playlistIsLoading && <div className='text-white text-center w-screen flex justify-center items-center'>You have not created any playlists :/</div>
        }
        {playlists &&
          playlists.map((item, index) => (
            <div key={index} className='card border border-green-700 hover:bg-zinc-800 p-4 rounded-xl  flex flex-row gap-4' >
              <img className='w-20 h-full lg:w-40 lg:h-40 object-cover rounded-lg' src={item.image} alt={item.title} />
              <div className='flex w-1/2 gap-2 justify-center flex-col'>
              <span className='text-xs bg-zinc-950  inline-block w-16 rounded-lg p-1 text-center'>{item.publicPlaylist ?'public ' : 'private ' }</span>
                <h2 className='text-xl font-semibold'>{item.title}</h2>
                <p className='line-clamp-2 text-xs md:text-base text-zinc-200 overflow-ellipsis'>{item.description}</p>
                <div className='flex gap-4 items-center'>
                <button onClick={()=> handleLikePlaylist(item._id)}>
                  <AiOutlineLike className='text-2xl ' />
                </button>
                <p>{item.likedBy.length}</p>
                </div>
                
              </div>
              <div className='flex flex-col justify-center gap-4 items-center'>
                
                
                <button className='bg-zinc-950 bg-opacity-50 border border-zinc-500 rounded-xl  text-center flex items-center gap-2 justify-center p-2  md:w-28' >
                   <span className='hidden md:flex '>Edit</span><MdOutlineEditNote className='text-xl'/>
                </button>
                <button onClick={handleDeletePlaylist(item._id)} className='bg-red-800 bg-opacity-50 p-2  flex items-center gap-2 justify-center rounded-xl text-center md:w-28 border border-rose-500'>
                  <span className='hidden md:flex'>Delete</span> <MdDeleteForever className='text-xl'/>
                </button>


              


              </div>
            </div>
          ))}
      </div>

      {/* Modal */}
      <Modal ariaHideApp={false} style={customStyles} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
      <button className='text-right w-full text-white text-2xl flex justify-end' onClick={() => setModalIsOpen(false)}><MdCancel/></button> {/* Button to close the modal */}
        <h2 className='text-center text-white font-semibold text-2xl font-secondary'>Create new playlist</h2>
       

        <form className='flex flex-col justify-center items-center  gap-4 text-white font-main '>
          <input type='text' className='bg-zinc-950 outline-none p-4 w-full mt-8 rounded-md' onChange={(e) => setTitle(e.target.value)} placeholder='Playlist name' />
          <textarea type='text' className='bg-zinc-950 outline-none  p-4 w-full rounded-md' onChange={(e) => setDesc(e.target.value)} placeholder='Playlist Description' />
          <input type='file' className='bg-zinc-950 outline-none  p-4 w-full mb-8 rounded-md' name='image' onChange={(e) => setFile(e.target.files[0])} />
          <label className='flex items-center gap-4'>
            <input type='checkbox' onChange={(e) => setPublicPlaylist(e.target.checked)} className='hidden' />
            <span className={`relative w-12 h-6 items-center flex rounded-full  p-0.5 ${publicPlaylist? 'bg-gradient-to-r from-green-500 to-green-900':'bg-gradient-to-r from-zinc-900 to-zinc-950'}`}>
              <span
                className={`block w-5 h-5 rounded-full bg-white  transform transition-transform ${publicPlaylist ? 'translate-x-full ' : 'translate-x-0'
                  }`}
              ></span>
            </span>
            <span className='text-white  text-xs '>This is a {publicPlaylist ? 'Public' : 'Private'} playlist</span>
          </label>


          <button onClick={handleCreatePlaylist} type='submit' className='bg-accent-2 text-black p-3 rounded-xl '>
            Create
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default PlaylistList;