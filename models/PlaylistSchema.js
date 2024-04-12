import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PlaylistSchema = new Schema(
  {
    title: String,
    image: String,
    url: String,
    userId: String,
    publicPlaylist: {
      type: Boolean,
      default: false,
    },
    animeIds: [String],
    likedBy: {
        type: [String],
        default: [],
    }
  },
  { timestamps: true }
);

const playlistdb = mongoose.model("playlist", PlaylistSchema);

export default playlistdb;
