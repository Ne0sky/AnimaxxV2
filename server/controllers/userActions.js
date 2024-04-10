
import userdb from "../models/UserSchema.js";
import playlistdb from "../models/PlaylistSchema.js";
import Animedb from "../models/AnimeSchema.js";



export const addToPlaylist = async (req, res) => {
  try {
    const {id,  anime} = req.body;
    // Get the playlist
    const playlist = await playlistdb.findOne({_id:id});
    // Get the animes array
    const animeIds = playlist.animeIds;
  
    // Check if the anime already exists in the playlist
    const existingAnime = playlist.animeIds.find(animeId => animeId === anime.publicId);

    if (existingAnime) {
      return res.status(400).json({ message: 'Anime already exists in the playlist' });
    }

    // Add the anime to the playlist
    animeIds.push(anime.publicId);

    // Add the anime to animedb
    const animeinDocument = await Animedb.findOne({publicId: anime.publicId});

    if(!animeinDocument){
      const newAnime = new Animedb({
        publicId: anime.publicId,
        title: anime.title,
        type: anime.type,
        genres: anime.genres,
        episodes: anime.episodes,
        officialRating: anime.officialRating,
        img: anime.img,
        synopsis: anime.synopsis,
        trailer: anime.trailer,
        status: anime.status,
        OfficialScore: anime.OfficialScore,
        SharingUrl: anime.SharingUrl,
        AnilistUrl: anime.AnilistUrl,
        UserActions: anime.UserActions,
        meanScore: anime.meanScore,
        averageScore: anime.averageScore,
        season: anime.season,
        seasonYear: anime.seasonYear,
        startDate: anime.startDate,
        endDate: anime.endDate,
        playlists: [playlist._id]
      });
      await newAnime.save();
    }
    else{
      animeinDocument.playlists.push(playlist._id);
      await animeinDocument.save();
    }



    // Save the updated playlist object
    await playlist.save();
    res.status(200).json({ message: 'Anime added to playlist successfully', playlist: playlist.animes });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const removeFromPlaylist = async (req, res) => {
  try {
    const {id} = req.body.item;
   

    // Find the user by ID
    const user = await userdb.findById(req.user.id);
    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Check if the item exists in the playlist
    const existingItem = user.playlist.find(item => item.id === id.toString());
    if (!existingItem) {
      return res.status(404).json({ message: 'Item not found in the playlist' });
    }

    // Remove the item from the playlist
    user.playlist = user.playlist.filter(item => item.id !== id.toString());

    // Save the updated user object
    await user.save();
    res.status(200).json({ message: 'Item removed from playlist successfully', playlist: user.playlist });
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }

}

export const getPlaylists = async (req, res) => {
  try{
    const {id} = req.user;
    const playlists = await playlistdb.find({userId: id});
    console.log(playlists);
    if(!playlists){
      return res.status(404).json({ message: 'Playlist not found' });
    }
    res.status(200).json({ message: 'Playlists found successfully', playlists });
  }catch(err){
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createPlaylist = async (req, res) => {
  try {
    const {title} = req.body;
    // Find the user by ID
    const user = await userdb.findById(req.user.id);
    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Create a new playlist object
    const newPlaylist = new playlistdb({
      title: `${title}`,
      image: '',
      url: '',
      userId: user._id,
      publicPlaylist: false,
      animeIds: [],
      
    });
    // Add the new playlist to the user's playlist array
    await newPlaylist.save();
    res.status(200).json({ message: 'Playlist created successfully', playlist: user.playlist });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}


// get animes of a playlist

export const getAnimes = async (req, res) => {
  try {
    const {id} = req.body;
    const playlist = await playlistdb.findOne({_id:id});
    console.log(playlist);
    if(playlist.publicPlaylist === false){
      if(playlist.userId !== req.user.id){
        return res.status(401).json({ message: 'Unauthorized' });
      }
      else{
        const animes = await Animedb.find({playlist: playlist._id});
        if(!animes){
          return res.status(404).json({ message: 'Animes not found' });
        }
        res.status(200).json({ message: 'Animes found successfully', animes });
      
      }
    }
    if(playlist.publicPlaylist === true){
      const animes = await Animedb.find({playlists: playlist._id});
      if(!animes){
        return res.status(404).json({ message: 'Animes not found' });
      }
      res.status(200).json({ message: 'Animes found successfully', animes });
    }
   
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}
