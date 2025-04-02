// Import necessary types and utility functions
import {
    Album,
    Artist,
    AuthSession,
    Category,
    Playlist,
    Track,
    TrackAnalysis,
} from "@/types/types";
import { customGet } from "@/utils/serverUtils";

// Fetch new album releases for a specific country (India) with a limit of 15 albums
export const getNewReleases = async (
    session: AuthSession
): Promise<Album[]> => {
    return customGet(
        "https://api.spotify.com/v1/browse/new-releases?country=IN&limit=15",
        session
    ).then((data) => data.albums.items); // Extract album items from the response
};

// Fetch recently played tracks for the user, with a default limit of 50 tracks
export const getRecentlyPlayedTracks = async (
    session: AuthSession,
    limit = 50
) => {
    return customGet(
        `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`,
        session
    );
};

// Fetch the user's top items (artists or tracks) based on time range and limit
export const getTopItems = async ({
    session,
    timeRange = "short_term", // Default time range is "short_term"
    limit = 50, // Default limit is 50
    type, // Type can be "artists" or "tracks"
}: {
    session: AuthSession;
    timeRange?: string;
    limit?: number;
    type: "artists" | "tracks";
}) => {
    return customGet(
        `https://api.spotify.com/v1/me/top/${type}?time_range=${timeRange}&limit=${limit}`,
        session
    );
};

// Fetch details of an album by its ID
export const getAlbumById = async (
    session: AuthSession,
    albumId: string
): Promise<Album> => {
    return customGet(`https://api.spotify.com/v1/albums/${albumId}`, session);
};

// Fetch details of an artist by their ID
export const getArtistById = async (
    session: AuthSession,
    artistId: string
): Promise<Artist> => {
    return customGet(`https://api.spotify.com/v1/artists/${artistId}`, session);
};

// Fetch an artist's discography, including albums, singles, and related artists
export const getArtistDiscography = async (
    session: AuthSession,
    artistId: string
) => {
    const baseUrl = `https://api.spotify.com/v1/artists/${artistId}`;

    // Define endpoints for different parts of the discography
    const urls = [
        "",
        "/top-tracks?market=from_token",
        "/albums?include_groups=album",
        "/albums?include_groups=single",
        "/albums?include_groups=appears_on",
        "/albums?include_groups=compilation",
        "/related-artists",
    ];

    // Fetch data from all endpoints concurrently
    const promises = urls.map((url) => customGet(`${baseUrl}${url}`, session));
    return Promise.all(promises);
};

// Fetch details of a category by its ID
export const getCategoryById = async (
    session: AuthSession,
    categoryId: string
): Promise<Category> => {
    return customGet(
        `https://api.spotify.com/v1/browse/categories/${categoryId}`,
        session
    );
};

// Fetch playlists under a specific category
export const getPlaylistsByCategory = async (
    session: AuthSession,
    categoryId: string
): Promise<Playlist[]> => {
    const data = await customGet(
        `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?country=IN&limit=50`,
        session
    );
    return data.playlists.items; // Extract playlist items from the response
};

// Fetch the user's liked albums
export const getUserLikedAlbums = async (
    session: AuthSession
): Promise<Album[]> => {
    const data = await customGet(
        `https://api.spotify.com/v1/me/albums?market=from_token&limit=50`,
        session
    );
    return data.items.map((item: any) => item.album); // Extract album details from the response
};

// Fetch the user's liked artists
export const getUserLikedArtists = async (
    session: AuthSession
): Promise<Artist[]> => {
    const data = await customGet(
        `https://api.spotify.com/v1/me/following?type=artist&limit=50`,
        session
    );
    return data.artists.items; // Extract artist items from the response
};

// Fetch the user's liked songs, including pagination to fetch all songs
type LikedSongs = { total: number; items: Track[] };

export const getUserLikedSongs = async (
    session: AuthSession
): Promise<LikedSongs> => {
    const data = await customGet(
        `https://api.spotify.com/v1/me/tracks?limit=50`,
        session
    );

    const finalData = { total: data.total, items: data.items };
    let limit = 50;
    let currUrl = data.next;

    // Continue fetching data until there are no more pages
    while (currUrl !== null) {
        const nextData = await customGet(currUrl, session);
        finalData.items.push(...nextData.items);
        limit += 50;
        currUrl = nextData.next;
    }

    return {
        total: data.total,
        items: data.items.map((item: any) => item.track), // Extract track details
    };
};

// Fetch the user's playlists
export const getUserLikedPlaylists = async (
    session: AuthSession
): Promise<Playlist[]> => {
    const data = await customGet(
        "https://api.spotify.com/v1/me/playlists",
        session
    );
    return data.items; // Extract playlist items from the response
};

// Fetch details of a playlist by its ID, including all tracks
export const getPlaylistById = async (
    session: AuthSession,
    playlistId: string
): Promise<Playlist> => {
    const data = await customGet(
        `https://api.spotify.com/v1/playlists/${playlistId}`,
        session
    );
    const playlist = data;

    let limit = 50;
    let currUrl = data.tracks.next;

    // Continue fetching tracks until there are no more pages
    while (currUrl !== null) {
        const nextData = await customGet(currUrl, session);
        playlist.tracks.items.push(...nextData.items);
        limit += 50;
        currUrl = nextData.next;
    }

    return playlist;
};

// Fetch all available categories
export const getCategories = async (
    session: AuthSession
): Promise<Category[]> => {
    const data = await customGet(
        `https://api.spotify.com/v1/browse/categories?limit=50&country=IN`,
        session
    );
    return data.categories.items; // Extract category items from the response
};

// Perform a search for items (artist, album, track, playlist, or all) based on a query
export const getSearchItems = async (
    session: AuthSession,
    type: "artist" | "album" | "track" | "playlist" | "all",
    query: string,
    limit = 5
) => {
    let searchType: string;
    if (type === "all") {
        searchType = "album,artist,track,playlist"; // Search across all types
    } else {
        searchType = type; // Search for a specific type
    }

    return customGet(
        `https://api.spotify.com/v1/search?q=${query}&market=from_token&type=${searchType}&limit=${limit}`,
        session
    );
};

// Fetch details of a track by its ID
export const getTrackById = async (
    session: AuthSession,
    trackId: string
): Promise<Track> => {
    return customGet(`https://api.spotify.com/v1/tracks/${trackId}`, session);
};

// Fetch audio analysis of a track by its ID
export const getTrackAnalysis = async (
    session: AuthSession,
    trackId: string
): Promise<TrackAnalysis> => {
    return customGet(
        `https://api.spotify.com/v1/audio-features/${trackId}`,
        session
    );
};

// Fetch track recommendations based on a track's features and its artist
export const getTrackRecommendations = async (
    session: AuthSession,
    trackId: string
): Promise<Track[]> => {
    const trackAnalysis = await getTrackAnalysis(session, trackId);

    // Define track features to include in the recommendation query
    const trackFeatures = {
        acousticness: 1,
        danceability: 1,
        energy: 1,
        instrumentalness: 1,
        key: 1,
        liveness: 1,
        loudness: 1,
        mode: 1,
        speechiness: 1,
        tempo: 1,
        valence: 1,
    };

    const track = await getTrackById(session, trackId);
    const artist = await getArtistById(session, track.artists[0].id);

    // Construct the recommendation endpoint with seed artist and track
    let endpoint = `https://api.spotify.com/v1/recommendations?limit=30&seed_artists=${artist.id}&seed_tracks=${trackId}`;

    // Add track features to the endpoint
    Object.entries(trackAnalysis).forEach(([key, value]) => {
        if (trackFeatures.hasOwnProperty(key)) {
            endpoint += `&target_${key}=${value}`;
        }
    });

    const data = await customGet(endpoint, session);

    return data.tracks; // Return recommended tracks
};