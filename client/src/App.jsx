import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
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

function App() {

  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="playlists" element={<PlaylistList />} />
      <Route path="playlist/:id" element={<PlayList />} />
      <Route path="watched" element={<Watched />} />
      <Route path="anime/:id" element={<Anime />} />
      <Route path="search/:search" element={<Search />} />
      <Route path='popular' element={<Popular />} />
    </Routes>
    </>
  )
}

export default App
