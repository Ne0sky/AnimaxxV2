import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import Cookies from 'universal-cookie'

const PlayList = () => {
    const {id} = useParams()
    const [data, setData] = useState({})
    const getAnimes = async () => {
        try {
            const cookies = new Cookies()
            const token = cookies.get('token')
            const response = await axios.post('http://localhost:3000/user/get-animes', {url:id}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            })
            console.log(response.data)
            setData(response.data.data)
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
            data && (
                <div>
                    <h1>{data.title}</h1>
                    <h1>{data.description}</h1>
                    <img src={data.image} alt={data.title} />
                    <div>
                        {
                            data.animes && data.animes.map((anime, index) => (
                                <div key={index}>
                                    <h1>{anime.title}</h1>
                                    <img src={anime.image} alt={anime.title} />
                                </div>
                            ))
                        }
                </div>
                </div>
            )
        }
    </div>
  )
}

export default PlayList