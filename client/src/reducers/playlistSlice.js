// src/reducers/playlistSlice.js
import { createSlice } from '@reduxjs/toolkit';

const playlistSlice = createSlice({
  name: 'playlist',
  initialState: [],
  reducers: {
    addToPlaylist: (state, action) => {
      state.push(action.payload);
    },
    removeFromPlaylist: (state, action) => {
      return state.filter(item => item.id !== action.payload.id);
    },
  },
});

export const { addToPlaylist, removeFromPlaylist } = playlistSlice.actions;

export default playlistSlice.reducer;
