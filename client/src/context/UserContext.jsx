import React, { createContext, useEffect, useReducer } from 'react';
import Cookies from 'universal-cookie';
// Define the initial state
const initialState = {
    user: null,
    isLoading: true,
    isLoggedIn: false,
};

// Define the reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                isLoggedIn: true,
            };
        case 'LOGOUT':
            return {
                ...state,
                isLoading: false,
                user: null,
                isLoggedIn: false,
            };
        case 'LOADING':
            return {
                ...state,
                isLoading: action.payload,
            };
        default:
            return state;
    }
};

// Create the UserContext
export const UserContext = createContext();

// Create the UserProvider component
export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const cookies = new Cookies();

    useEffect(() => {
       const token = cookies.get('token');
       if(token){
        dispatch({ type: 'LOADING', payload: true });
        setTimeout(()=>{
           const user = JSON.parse(localStorage.getItem('user'));
           if(user){
               dispatch({ type: 'LOGIN', payload: user });
           }
           else{
            dispatch({ type: 'LOADING', payload: false });
           }
                
        }, 500)
       }
       else{
        dispatch({ type: 'LOADING', payload: false });
    }  } , []);
    

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};