import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromPlaylist } from '../reducers/playlistSlice'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { Link } from 'react-router-dom'
import useGetPlaylists from '../hooks/useGetPlaylists'
const PlaylistList = () => {
  const [title, setTitle] = useState('')
  const [file, setFile] = useState(null)
  const { playlists, playlistError, getPlaylists , playlistIsLoading } = useGetPlaylists()

  

  const removeFromPlaylist = async (item) => {
    try {
      const cookies = new Cookies()
      const token = cookies.get('token')
      const response = await axios.post('http://localhost:3000/user/remove-from-playlist', item, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        }
      })
      console.log(response.data.message)
      getPlaylists()
    } catch (error) {
      console.error(error)
    }
  }

  const handleCreatePlaylist = async (e) => {
    e.preventDefault()
    try {
      console.log(title)
      // Create a new FormData object
      const formData = new FormData();
      formData.append('title', title);
      formData.append('image', file);

      const cookies = new Cookies()
      const token = cookies.get('token')
      const response = await axios.post('http://localhost:3000/user/create-playlist', formData , {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${token}`
        }
      })
      console.log(response.data.message)
      getPlaylists()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='text-white'>
      <h1 className='text-3xl text-red-600'>Playlist</h1>
      <p className='text-lg text-gray-800'>Here are the items in your playlist. Click on an item to remove it.</p>
      <div>
        Create new playlist
        <form>
          <input type="text" className='bg-zinc-950 p-4' onChange={(e)=> setTitle(e.target.value)} placeholder="Playlist name" />
          <input type="file" className='bg-zinc-950 p-4' name='image' onChange={(e)=>setFile(e.target.files[0])}/>
          <button onClick={handleCreatePlaylist} type="submit">Create</button>
        </form>
      </div>
      <div className="card-container">
        {
          playlists && playlists.map((item, index) => (
            <div key={index} className="card bg-zinc-200 p-2 my-2 flex flex-col gap-2" onClick={() => removeFromPlaylist({ item })}>
              <img src={item.image} alt={item.title} />
              <h2>{item.title}</h2>
              
             {/* <p>{item.upvotes}</p>
              <button className='block bg-blue-500 p-2 my-4 rounded' onClick={() => removeFromPlaylist({ item })}>Remove from Playlist</button> */}

              <Link className='bg-blue-500 p-3 rounded-none w-36' to={`/playlist/${item._id}`}>View Playlist</Link>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default PlaylistList