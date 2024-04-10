import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import Cookies from 'universal-cookie'

const PlayList = () => {
    const {id} = useParams()
    const [animes, setAnimes] = useState([{}])
    const getAnimes = async () => {
        try {
            const cookies = new Cookies()
            const token = cookies.get('token')
            const response = await axios.post('http://localhost:3000/user/get-animes', {id:id}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            })
            console.log(response.data)
            setAnimes(response.data.animes)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        console.log("id", id)
        getAnimes()
    }, [id])

  return (
    <div>
        <h1>Playlist</h1>
        {
            animes.length> 0 && animes.map((anime, id) => (
                <div key={id} className='bg-zinc-200 p-2 my-2'>
                    <h3>{anime.title}</h3>
                    <p>{anime.synopsis}</p>
                    <p>Rating: {anime.rating}</p>
                    <p>Score: {anime.score}</p>
                    
                </div>
            ))
        }
    </div>
  )
}

export default PlayList