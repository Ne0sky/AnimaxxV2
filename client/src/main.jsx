import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { UserContextProvider } from './context/UserContext'
import { Provider } from 'react-redux'
import store from './store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <Provider store={store}>
      <Router>
        <App />
      </Router>
      </Provider>
    </UserContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
