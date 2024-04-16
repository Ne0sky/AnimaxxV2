import userdb from "../models/UserSchema.js";
import playlistdb from "../models/PlaylistSchema.js";
import Animedb from "../models/AnimeSchema.js";
import cloudinary from "../config/cloudinary.js";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

export const addToPlaylist = async (req, res) => {
  try {
    const { id, anime } = req.body;

    const playlist = await playlistdb.findOne({ _id: id });
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    if (playlist.animeIds.includes(anime.anilistId)) {
      return res
        .status(400)
        .json({ message: "Anime already exists in the playlist" });
    }

    playlist.animeIds.push(anime.anilistId);

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
    await playlist.save();
    res.status(200).json({ message: "Anime added to playlist successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const removeFromPlaylist = async (req, res) => {
  try {
    const animeId = req.params.animeId;
    const playlistId = req.params.playlistId;
    const playlist = await playlistdb.findOne({ _id: playlistId });
    const anime = await Animedb.findOne({ anilistId: animeId });
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    if (playlist.userId !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    playlist.animeIds = playlist.animeIds.filter((id) => id !== animeId);
    anime.playlist = anime.playlist.filter((id) => id !== playlistId);
    if (anime.playlist.length === 0) {
      await Animedb.deleteOne({ _id: anime._id });
    } else {
      await anime.save();
    }
    await playlist.save();
    res
      .status(200)
      .json({ message: "Anime removed from playlist successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPlaylists = async (req, res) => {
  try {
    const { id } = req.user;
    const playlists = await playlistdb.find({ userId: id });
    if (!playlists) {
      return res.status(404).json({ message: "Playlist not found" });
    } else
      return res
        .status(200)
        .json({ message: "Playlists found successfully", playlists });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createPlaylist = async (req, res) => {
  try {
    const { title, description, publicPlaylist } = req.body;
    let imageUrl = "";
    if (req.file) {
      const base64 = req.file.buffer.toString("base64");
      const result = await cloudinary.uploader.upload(
        "data:" + req.file.mimetype + ";base64," + base64
      );
      imageUrl = result.secure_url;
    }

    const uniqueUrl = uuidv4();

    const newPlaylist = new playlistdb({
      title: `${title}`,
      description: `${description}`,
      image: imageUrl,
      url: uniqueUrl,
      userId: req.user.id,
      publicPlaylist: publicPlaylist,
      animeIds: [],
    });
    await newPlaylist.save();
    res.status(200).json({
      message: "Playlist created successfully",
      playlist: newPlaylist,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const editPlaylist = async (req, res) => {
  try {
    const { title, description, publicPlaylist } = req.body;
    const id = req.params.id;
    const playlist = await playlistdb.findOne({ _id: id });
    let imageUrl = "";
    if (req.file) {
      try {
        const publicId = playlist.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.log(err);
      }
      const base64 = req.file.buffer.toString("base64");
      const result = await cloudinary.uploader.upload(
        "data:" + req.file.mimetype + ";base64," + base64
      );
      imageUrl = result.secure_url;
      playlist.image = imageUrl;
    }

    playlist.title = title;
    playlist.description = description;
    playlist.publicPlaylist = publicPlaylist;
    await playlist.save();
    res
      .status(200)
      .json({ message: "Playlist updated successfully", playlist });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePlaylist = async (req, res) => {
  try {
    const { id } = req.body;
    const playlist = await playlistdb.findOne({ _id: id });
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    if (playlist.image != "") {
      const publicId = playlist.image.split("/").pop().split(".")[0];
      const result = await cloudinary.uploader.destroy(publicId);
    }

    const animes = await Animedb.find({ playlist: playlist._id });
    animes.forEach(async (anime) => {
      anime.playlist = anime.playlist.filter((item) => item !== id);
      if (anime.playlist.length === 0) {
        await Animedb.deleteOne({ _id: anime._id });
      } else {
        await anime.save();
      }
    });

    await playlistdb.deleteOne({ _id: id });

    res.status(200).json({ message: "Playlist deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAnimes = async (req, res) => {
  try {
    const { url } = req.body;
    const playlist = await playlistdb.findOne({ url: url });
    if (playlist.publicPlaylist === false) {
      if (playlist.userId !== req.user.id) {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const animes = await Animedb.find({
          playlist: playlist._id.toString(),
        });
        const user = await userdb.findById(playlist.userId);
        const publicViewOfAnime = animes.map((anime) => {
          return {
            title: anime.title,
            type: anime.type,
            genres: anime.genres,
            episodes: anime.episodes,
            coverImage: anime.coverImage,
            format: anime.format,
            description: anime.description,
            status: anime.status,
            season: anime.season,
            userActions: anime.UserActions,
            seasonYear: anime.seasonYear,
            startDate: anime.startDate,
            endDate: anime.endDate,
          };
        });
        const data = {
          title: playlist.title,
          madeBy: user.displayName,
          description: playlist.description,
          image: playlist.image,
          animes: publicViewOfAnime,
        };
        res.status(200).json({ message: "Animes found successfully", data });
      }
    }
    if (playlist.publicPlaylist === true) {
      const animes = await Animedb.find({ playlists: playlist._id });
      const user = await userdb.findById(playlist.userId);
      const publicViewOfAnime = animes.map((anime) => {
        return {
          title: anime.title,
          type: anime.type,
          genres: anime.genres,
          episodes: anime.episodes,
          coverImage: anime.coverImage,
          format: anime.format,
          description: anime.description,
          status: anime.status,
          season: anime.season,
          seasonYear: anime.seasonYear,
          startDate: anime.startDate,
          endDate: anime.endDate,
        };
      });
      const data = {
        title: playlist.title,
        madeBy: user.displayName,
        description: playlist.description,
        image: playlist.image,
        animes: publicViewOfAnime,
      };
      res.status(200).json({ message: "Animes found successfully", data });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const likeUnlikePlaylist = async (req, res) => {
  try {
    const id = req.params.playlistId;
    const user_id = req.user.id;
    const playlist = await playlistdb.findOne({ _id: id });
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    if (playlist.likedBy.includes(user_id)) {
      playlist.likedBy = playlist.likedBy.filter((id) => id !== user_id);
      await playlist.save();
      return res
        .status(200)
        .json({ message: "Playlist unliked successfully", playlist });
    } else {
      playlist.likedBy.push(user_id);
      await playlist.save();
      return res
        .status(200)
        .json({ message: "Playlist liked successfully", playlist });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
