import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { UserContextProvider } from './context/UserContext'
import { Provider } from 'react-redux'
import store from './store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import toast, { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <Provider store={store}>
      <Router>
        <Toaster position="top-center" toastOptions={{
    className: '',
    style: {
      padding: '16px',
      color: 'white',
      backgroundColor: '#212121',
    },
    duration: 4000,
  }}  />
        <App />
      </Router>
      </Provider>
    </UserContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
