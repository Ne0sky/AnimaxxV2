// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import playlistReducer from './reducers/playlistSlice';

const store = configureStore({
  reducer: {
    playlist: playlistReducer,
  },
});

export default store;
