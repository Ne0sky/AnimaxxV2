import { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const useAddToWatchList = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const addToWatchList = async (data) => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);
        
        try {
            const cookies = new Cookies();
            const token = cookies.get('token');

            const response = await axios.post('/user/add-to-playlist', data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
            });
            console.log(response.data.message);

            setSuccess(true);
        } catch (error) {
            console.error(error.message);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { addToWatchList, isLoading, error };
};

export default useAddToWatchList;
