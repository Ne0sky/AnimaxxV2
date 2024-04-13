import userdb from "../models/UserSchema.js";
import playlistdb from "../models/PlaylistSchema.js";
import Animedb from "../models/AnimeSchema.js";
import cloudinary from "../config/cloudinary.js";
import fileUpload from "express-fileupload";

export const addToPlaylist = async (req, res) => {
  try {
    const { id, anime } = req.body;
    // Get the playlist

    console.log('req:', req.body)
    const playlist = await playlistdb.findOne({ _id: id });
    console.log(playlist);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    // Check if the anime already exists in the playlist
    if (playlist.animeIds.includes(anime.anilistId)) {
      return res
        .status(400)
        .json({ message: "Anime already exists in the playlist" });
    }

    // Add the anime to the playlist
    playlist.animeIds.push(anime.anilistId);

    // Add the anime to animedb
    const animeinDocument = await Animedb.findOne({
      anilistId: anime.anilistId,
    });

    if (!animeinDocument) {
      const newAnime = new Animedb({
        anilistId: anime.anilistId,
        title: anime.title,
        type: anime.type,
        genres: anime.genres,
        episodes: anime.episodes,
        coverImage: anime.coverImage,
        format: anime.format,
        description: anime.description,
        status: anime.status,
        UserActions: anime.UserActions,
        season: anime.season,
        seasonYear: anime.seasonYear,
        startDate: anime.startDate,
        endDate: anime.endDate,
        playlist: [playlist._id],
      });
      await newAnime.save();
    } else {
      animeinDocument.playlist.push(playlist._id);
      await animeinDocument.save();
    }

    // Save the updated playlist object
    await playlist.save();
    res.status(200).json({ message: "Anime added to playlist successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const removeFromPlaylist = async (req, res) => {
  try {
    const { id } = req.body.item;

    // Find the user by ID
    const user = await userdb.findById(req.user.id);
    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Check if the item exists in the playlist
    const existingItem = user.playlist.find(
      (item) => item.id === id.toString()
    );
    if (!existingItem) {
      return res
        .status(404)
        .json({ message: "Item not found in the playlist" });
    }

    // Remove the item from the playlist
    user.playlist = user.playlist.filter((item) => item.id !== id.toString());

    // Save the updated user object
    await user.save();
    res
      .status(200)
      .json({
        message: "Item removed from playlist successfully",
        playlist: user.playlist,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPlaylists = async (req, res) => {
  try {
    const { id } = req.user;
    const playlists = await playlistdb.find({ userId: id });
    if (!playlists) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    else return res.status(200).json({ message: "Playlists found successfully", playlists });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createPlaylist = async (req, res) => {
  try {
    const { title } = req.body;
    const user = await userdb.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let imageUrl = ""; // Initialize imageUrl

    if (req.file) {
      console.log(req.file);
      // If a file is uploaded, upload it to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      // Get the secure URL of the uploaded image from Cloudinary
      imageUrl = result.secure_url;
    }

    // Create a new playlist object
    const newPlaylist = new playlistdb({
      title: `${title}`,
      image: imageUrl, // Set the image field to the Cloudinary URL
      url: "",
      userId: user._id,
      publicPlaylist: false,
      animeIds: [],
    });

    // Save the new playlist to the database
    await newPlaylist.save();

    // Update user's playlist array if needed
    user.playlist.push(newPlaylist._id);
    await user.save();

    res.status(200).json({
      message: "Playlist created successfully",
      playlist: user.playlist,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getAnimes = async (req, res) => {
  try {
    const { id } = req.body;
    const playlist = await playlistdb.findOne({ _id: id });
    console.log(playlist);
    if (playlist.publicPlaylist === false) {
      if (playlist.userId !== req.user.id) {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const animes = await Animedb.find({ playlist: playlist._id });
        if (!animes) {
          return res.status(404).json({ message: "Animes not found" });
        }
        res.status(200).json({ message: "Animes found successfully", animes });
      }
    }
    if (playlist.publicPlaylist === true) {
      const animes = await Animedb.find({ playlists: playlist._id });
      if (!animes) {
        return res.status(404).json({ message: "Animes not found" });
      }
      res.status(200).json({ message: "Animes found successfully", animes });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const likePlaylist = async (req, res) => {
  try {
    const { id } = req.params.id;
    const playlist = await playlistdb.findOne({ _id: id });
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    if (playlist.likedBy.includes(req.user.id)) {
      return res.status(400).json({ message: "Playlist already liked" });
    }
    playlist.likedBy.push(req.user.id);
    await playlist.save();
    res.status(200).json({ message: "Playlist liked successfully", playlist });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const unlikePlaylist = async (req, res) => {
  try {
    const { id } = req.params.id;
    const playlist = await playlistdb.findOne({ _id: id });
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    if (!playlist.likedBy.includes(req.user.id)) {
      return res.status(400).json({ message: "Playlist not liked" });
    }
    playlist.likedBy = playlist.likedBy.filter((id) => id !== req.user.id);
    await playlist.save();
    res
      .status(200)
      .json({ message: "Playlist unliked successfully", playlist });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
