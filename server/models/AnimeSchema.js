import mongoose from 'mongoose';
const { Schema } = mongoose;

const AnimeSchema = new Schema({
  anilistId: Number,
  averageScore: Number,
    bannerImage: String,
    coverImage: {
        extraLarge: String,
        large: String,
        medium: String
        },
    description: String,
    duration: Number,
    endDate: {
        day: Number,
        month: Number,
        year: Number
        },
    episodes: Number,
    externalLinks: [
        {
            site: String,
            url: String
            }
        ],
    favourites: Number,
    format: String,
    genres: [String],
    meanScore: Number,
    popularity: Number,
    rankings: [
        {
            allTime: Number,
            rank: Number
            }
        ],
    season: String,
    seasonYear: Number,
    startDate: {
        day: Number,
        month: Number,
        year: Number
        },
    status: String,
    title: {
        english: String,
        native: String,
        romaji: String
        },
    trailer: {
        id: String,
        site: String,
        thumbnail: String
        },
    type: String,
    playlist:[String],
    UserActions: {
        currentlyWatching: Boolean,
        completedStatus: Number,
        currentEpisode: Number,
        planToWatch: Boolean,
        dropped: Boolean,
        },
    

});



const Animedb = mongoose.model('Anime', AnimeSchema);
                    
export default Animedb;