import mongoose from "mongoose";
const { Schema } = mongoose;

const AnimeSchema = new Schema({
  anilistId: Number,
  coverImage: String,
  description: String,
  endDate: {
    day: Number,
    month: Number,
    year: Number,
  },
  episodes: Number,
  format: String,
  genres: [String],
  season: String,
  seasonYear: Number,
  startDate: {
    day: Number,
    month: Number,
    year: Number,
  },
  status: String,
  title: String,
  type: String,
  playlist: [String],
  UserActions: {
    currentlyWatching: Boolean,
    completedStatus: Number,
    currentEpisode: Number,
    planToWatch: Boolean,
    dropped: Boolean,
  },
});

const Animedb = mongoose.model("Anime", AnimeSchema);

export default Animedb;
