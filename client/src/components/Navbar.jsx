import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useUserContext } from '../hooks/useUserContext';
import Cookies from 'universal-cookie';
import axios from 'axios';
const Navbar = () => {
    const cookies = new Cookies();
    const { logout } = useLogout();
    const { state, dispatch } = useUserContext();
    const { user } = state;

    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    }
  

    const handleLogout = () => {
        logout();
    };


    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get('http://localhost:3000/login/success', { withCredentials: true });
                console.log('User data:', response.data);
                cookies.set('token', response.data.token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
                localStorage.setItem('user', JSON.stringify(response.data.user));
                dispatch({ type: 'LOGIN', payload: response.data.user });
                
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
       
        getUser();
        console.log(user)
    }, []);

    return (
        <header className='font-secondary sticky top-0 z-50 bg-zinc-950 bg-opacity-80 backdrop-blur-md'>
            <nav className='text-white flex justify-between mx-auto sticky top-0 z-[20] w-full items-center py-6 px-16'>
                <Link to='/'><h1 className='text-3xl font-semibold'>Anima<span className='text-accent-2'>xx</span></h1></Link>
                <ul className='lg:flex items-center gap-6 text-sm hidden md:hidden'>
                    
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/search">Search</NavLink>
                    </li>
                    <li>
                        <NavLink to="/popular">Popular</NavLink>
                    </li>
                    
                    {user ? (
                        <div className='flex flex-row gap-6 items-center'>
                            <li>
                                <NavLink to="/playlists">Playlist</NavLink>
                            </li>
                            <li>
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                            {user.image && <img src={user.image} alt="" className='w-8 bg-white h-8 rounded-full' />}
                            <p>{user.displayName ? user.displayName : user.email}</p>
                        </div>
                    ) : (
                        <li>
                            <NavLink to="/login">Login</NavLink>
                        </li>
                    )}
                    
                </ul>
                <button onClick={toggleNavbar} className='lg:hidden'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            )}
                        </svg>
                </button>
            </nav>
            {
                isOpen && (
                    <div className='bg-gradient-to-t from-zinc-900 to-black rounded-b-lg text-center flex flex-col justify-center text-white'>
                    <ul className='lg:hidden flex flex-col gap-6 p-4'>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/search">Search</NavLink>
                        </li>
                        <li>
                            <NavLink to="/popular">Popular</NavLink>
                        </li>
                        {user ? (
                            < div className='flex flex-col justify-center items-center gap-6'>
                                <li>
                                    <NavLink to="/playlists">Playlist</NavLink>
                                </li>
                                <li>
                                    <button onClick={handleLogout}>Logout</button>
                                </li>
                                {user.image && <img src={user.image} alt="" className='w-8 bg-white h-8 rounded-full' />}
                                <p>{user.displayName ? user.displayName : user.email}</p>
                            </div>
                        ) : (
                            <li>
                                <NavLink to="/login">Login</NavLink>
                            </li>
                        )}
                    </ul>
                    </div>
                )
            }
        </header>
    );
};

export default Navbar;
