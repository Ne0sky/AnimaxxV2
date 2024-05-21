import { useState } from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'
import Home from './pages/Home'
import PlaylistList from './pages/PlaylistList'
import Watched from './pages/Watched'
import Search from './pages/Search'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Signup from './pages/Signup'
import PlayList from './pages/Playlist'
import Popular from './pages/Popular'
import Anime from './pages/Anime'
import { useUserContext } from './hooks/useUserContext'
function App() {
  const { state, dispatch } = useUserContext();
  const { user } = state;
  const navigate = useNavigate();

  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="playlists" element={user? <PlaylistList/>:<Login/>}/>
      <Route path="playlist/:id" element={user?<PlayList/>:<Login/>} />
      <Route path="anime/:id" element={<Anime />} />
      <Route path="search/:search" element={<Search />} />
      <Route path='popular' element={<Popular />} />
    </Routes>
    </>
  )
}

export default App
