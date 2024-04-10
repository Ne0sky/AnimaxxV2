const DummyData = [
    {
        publicId: 'anime123',
        playlists: ['playlist1', 'playlist2'],
        title: 'Attack on Titan',
        genre: ['Action', 'Drama', 'Fantasy'],
        episodes: 75,
        officialRating: 9,
        img: 'https://example.com/anime123.jpg',
        synopsis: "In a world where humanity resides within enormous walled cities to protect themselves from Titans, gigantic humanoid creatures, Eren Yeager joins the military with a vow to avenge his mother's death.",
        trailer: 'https://example.com/anime123/trailer',
        status: 'Ongoing',
        OfficialScore: 95,
        SharingUrl: 'https://example.com/anime123/share',
        AnilistUrl: 'https://anilist.co/anime/1',
        UserActions: {
            currentlyWatching: false,
            completedStatus: 0,
            currentEpisode: 0,
            planToWatch: false,
            dropped: false,
            personalRating: 0,
            personalReview: ''
        }
    },
    {
        publicId: 'anime456',
        playlists: ['playlist2', 'playlist3'],
        title: 'My Hero Academia',
        genre: ['Action', 'Comedy', 'Super Power'],
        episodes: 114,
        officialRating: 8.5,
        img: 'https://example.com/anime456.jpg',
        synopsis: "In a world where people with superpowers (known as 'Quirks') are the norm, Izuku Midoriya dreams of becoming a Hero despite being Quirkless. After a fateful encounter with the greatest Hero, All Might, Izuku inherits his Quirk and enrolls in the prestigious UA High School.",
        trailer: 'https://example.com/anime456/trailer',
        status: 'Ongoing',
        OfficialScore: 89,
        SharingUrl: 'https://example.com/anime456/share',
        AnilistUrl: 'https://anilist.co/anime/2',
        UserActions: {
            currentlyWatching: true,
            completedStatus: 2,
            currentEpisode: 14,
            planToWatch: false,
            dropped: false,
            personalRating: 8,
            personalReview: 'Great series with amazing characters and action scenes!'
        }
    },
    {
        publicId: 'anime789',
        playlists: ['playlist1'],
        title: 'Death Note',
        genre: ['Mystery', 'Psychological', 'Supernatural'],
        episodes: 37,
        officialRating: 9.5,
        img: 'https://example.com/anime789.jpg',
        synopsis: "Light Yagami, a high school student, stumbles upon a mysterious notebook known as the 'Death Note', which grants the user the power to kill anyone whose name is written in it. With a desire to rid the world of criminals and become a god-like figure, Light embarks on a deadly game of cat and mouse with the enigmatic detective known only as 'L'.",
        trailer: 'https://example.com/anime789/trailer',
        status: 'Completed',
        OfficialScore: 97,
        SharingUrl: 'https://example.com/anime789/share',
        AnilistUrl: 'https://anilist.co/anime/3',
        UserActions: {
            currentlyWatching: false,
            completedStatus: 1,
            currentEpisode: 0,
            planToWatch: true,
            dropped: false,
            personalRating: 10,
            personalReview: 'One of the best psychological thrillers ever created!'
        }
    }
];

export default DummyData;
