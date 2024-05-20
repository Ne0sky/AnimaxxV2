
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useGetPlaylists from '../hooks/useGetPlaylists';
import { AiOutlineLike } from "react-icons/ai";
import { MdOutlineEditNote } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import useDeletePlaylist from '../hooks/useDeletePlayList';
import useLikePlayList from '../hooks/useLikePlayList';
import useCreatePlayList from '../hooks/useCreatePlayList';
import useEditPlayList from '../hooks/useEditPlayList';
import CreatePlayListModal from '../components/CreatePlayListModal'
import EditPlayListModal from '../components/EditPlayListModal';
import CircularProgress from '@mui/material/CircularProgress';


const PlaylistList = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [initialPlaylist, setInitialPlaylist] = useState(null);
  const { likePlaylist, isLoading: isLikeLoading, isError: isLikeError } = useLikePlayList();
  const { playlists, playlistError, getPlaylists, playlistIsLoading } = useGetPlaylists();
  const { deletePlaylist, isLoading: isDeleteLoading, error: deleteError } = useDeletePlaylist();
  const { createPlayList, isLoading: isCreationLoading, isError: isCreationError } = useCreatePlayList();
  const { editPlaylist, isLoading: isEditLoading, error: editError } = useEditPlayList();

  const handleDeletePlaylist = (id) => async (e) => {
    e.preventDefault();
    const message = await deletePlaylist(id);
    if(!isDeleteLoading && !deleteError) getPlaylists();
  };

  const handleLikePlaylist = async (id) => {
    console.log(id);
    const message = await likePlaylist(id);
    if(!isLikeLoading && !isLikeError) getPlaylists();
  };

  const handleEditPlayList = (id) => async (e) => {
    e.preventDefault();
    console.log("id edit:", id)
    const playlistToEdit = playlists.find((item) => item._id === id);
    setInitialPlaylist({
      id: playlistToEdit._id,
      title: playlistToEdit.title,
      description: playlistToEdit.description,
      file: null, 
      publicPlaylist: playlistToEdit.publicPlaylist,
    });
    setEditModalIsOpen(true);
    console.log("initial playlist:", initialPlaylist)
    setEditModalIsOpen(true);

   

  }

  const EditPlayList = async (id, title, desc, publicPlaylist, file) => {
    const message = await editPlaylist(id, title, file, desc, publicPlaylist);
    if (!isEditLoading && !editError) {
      setEditModalIsOpen(false);
      getPlaylists();
    }
  };


  const handleCreatePlayList = () => {
    if (!isCreationLoading && !isCreationError) {
      setModalIsOpen(false);
      getPlaylists();
    }
  };

  useEffect(() => {
    getPlaylists(); // Fetch playlists when the component mounts
  }, []);

  return (
    <div className='text-white p-4 md:p-16 font-secondary max-w-screen overflow-x-hidden flex flex-col justify-center items-center py-12'>
      <h1 className='text-3xl font-bold'>Your Playlists</h1>
      <div className='py-8'>
        <button className='bg-accent-2 p-2 rounded' onClick={() => setModalIsOpen(true)}>Create Playlist</button> 
      </div>
      <div className='card-container w-full h-full py-16 grid grid-cols-1 gap-8 lg:grid-cols-2'>
        {
          playlistError && <div className='text-white text-center'>Error: {playlistError}</div>
          
        }
        {
          playlistIsLoading && <div className='text-white text-center'>
            <CircularProgress />
          </div>
        }
        {
          playlists && playlists.length===0 && !playlistIsLoading && <div className='text-white text-center w-screen flex justify-center items-center'>You have not created any playlists :/</div>
        }
        
        {playlists &&
          playlists.map((item, index) => (
            <div key={index} className='card   relative w-full p-4 rounded-xl  flex flex-row gap-4' >
              <div className='absolute  z-1 inset-0 bg-zinc-950 border border-neutral-700 rounded-lg'>
              </div>
              <img className='w-20 h-full relative  z-2 lg:w-40 lg:h-40 object-cover rounded-lg' src={item.image} alt={item.title} />
              <div className='flex w-1/2 relative  z-8 gap-2 justify-center flex-col'>
              <span className='text-xs bg-white  text-black inline-block w-16 rounded-lg p-1 text-center'>{item.publicPlaylist ?'public ' : 'private ' }</span>
                <h2 className='text-xl font-semibold'>{item.title}</h2>
                <p className='line-clamp-2 text-xs md:text-base text-zinc-200 overflow-ellipsis'>{item.description}</p>
                <div className='flex gap-4 items-center'>
                <button onClick={()=> handleLikePlaylist(item._id)}>
                  <AiOutlineLike className='text-2xl ' />
                </button>
                <p>{item.likedBy.length}</p>
                </div>
                
              </div>
              <div className='flex flex-col z-8 relative justify-center gap-4 items-center'>
                
                
                <button onClick={handleEditPlayList(item._id)} className='bg-zinc-950 bg-opacity-50 border border-zinc-500 rounded-xl  text-center flex items-center gap-2 justify-center p-1  md:w-28' >
                   <span className='hidden md:flex '>Edit</span><MdOutlineEditNote className='text-xl'/>
                </button>
                <button onClick={handleDeletePlaylist(item._id)} className='bg-red-800 bg-opacity-50 p-1  flex items-center gap-2 justify-center rounded-xl text-center md:w-28 border border-rose-500' disabled={isDeleteLoading}>
                  <span className='hidden md:flex' >Delete</span> 
                  
                </button>

                <Link to={`/playlist/${item.url}`}className='bg-accent-2 bg-opacity-50 p-1  flex items-center gap-2 justify-center rounded-xl text-center md:w-28 border border-accent-2'>
                  <p >View</p>
                </Link>
              </div>
            </div>
          ))}
      </div>

      {/* Modal */}
      <CreatePlayListModal 
      isOpen={modalIsOpen}
      handleCreatePlayList={handleCreatePlayList}
      onRequestClose={() => setModalIsOpen(false)} />

      {/* edit modal */}
      <EditPlayListModal
      isOpen={editModalIsOpen}
      EditPlayList={EditPlayList}
      initialPlaylist={initialPlaylist}
      onRequestClose={() => setEditModalIsOpen(false)} />
      
    </div>
  );
};

export default PlaylistList;