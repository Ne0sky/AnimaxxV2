import { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';


const useGetAnimeById = (animeId) => {
    const [animeData, setAnimeData] = useState(null);
    const [error, setError] = useState(null);

    const fetchAnimeData = async () => {
        const graphqlQuery = `
            query ($animeId: Int) {
                Media(id: $animeId, type: ANIME) {
                    id
                    title {
                        romaji
                        english
                        native
                    }
                    studios(isMain: true) {
                        edges {
                            node {
                                id
                                name
                            }
                        }
                    }
                    characters {
                        edges {
                            node {
                                id
                                name {
                                    full
                                }
                                image {
                                    large
                                }
                                description
                            }
                        }

                    }
                    relations {
                        edges {
                            relationType
                            node {
                                ... on Media {
                                    id
                                    title {
                                        romaji
                                        english
                                        native
                                    }
                                    coverImage {
                                        large
                                    }
                                }
                            }
                        }
                    }
                    recommendations {
                        nodes {
                            mediaRecommendation {
                                id
                                title {
                                    romaji
                                    english
                                    native
                                }
                                type
                                format
                                averageScore
                                coverImage {
                                    large
                                }
                            }
                        }
                    }
                        
                    type
                    genres
                    status
                    episodes
                    duration
                    averageScore
                    popularity
                    description
                    bannerImage
                    coverImage {
                        extraLarge
                        large
                        medium
                    }
                    meanScore
                    averageScore
                    season
                    seasonYear
                    startDate {
                        year
                        month
                        day
                    }
                    endDate {
                        year
                        month
                        day
                    }
                    format
                    favourites
                    externalLinks {
                        url
                        site
                    }
                    trailer {
                        id
                        site
                        thumbnail
                    }
                }
            }
        `;

        const variables = {
            animeId,
        };

        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        };

        try {
            console.log('Fetching anime data...');
            const response = await axios.post(
                'https://graphql.anilist.co',
                {
                    query: graphqlQuery,
                    variables,
                },
                { headers }
            );

            console.log(response.data.data.Media);
            setAnimeData(response.data.data.Media);
            return response.data.data.Media;
        } catch (error) {
            console.error('Error fetching anime data:', error.message);
            setError(error.message);
            
        }
    };

    const { isLoading, isError } = useQuery({
        queryKey: ['animeById', animeId],
        queryFn: fetchAnimeData,
    });

    return { animeData, isLoading, isError, error };
};

export default useGetAnimeById;

