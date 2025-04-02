import { DefaultSession } from "next-auth";

// Represents the authenticated user with additional fields like accessToken and expiration time.
interface AuthUser {
  name: string; // User's name
  email: string; // User's email address
  picture?: string | null; // Optional profile picture URL
  image?: string | null; // Optional image URL (alternative to picture)
  accessToken: string; // Token for accessing Spotify API
  sub: string; // User's unique identifier
  expires_at: number; // Token expiration timestamp
}

// Extends the default NextAuth session to include the custom AuthUser type.
export interface AuthSession extends Omit<DefaultSession, "user"> {
  user: AuthUser; // Custom user object
}

// Represents an image with optional dimensions and a URL.
interface Image {
  height: number | null; // Image height in pixels (nullable)
  url: string; // URL of the image
  width: number | null; // Image width in pixels (nullable)
}

// Represents a Spotify category, such as a genre or mood.
export interface Category {
  id: string; // Unique identifier for the category
  name: string; // Name of the category
  icons: Image[]; // Array of images representing the category
}

// Represents a Spotify album with metadata and associated tracks.
export interface Album {
  id: string; // Unique identifier for the album
  name: string; // Name of the album
  artists: Artist[]; // Array of artists who contributed to the album
  images: Image[]; // Array of album cover images
  album_type?: string; // Type of album (e.g., single, album)
  release_date: string; // Release date of the album
  tracks: {
    total: number; // Total number of tracks in the album
    items: Track[]; // Array of track objects
  };
}

// Represents a Spotify artist with metadata like followers and genres.
export interface Artist {
  id: string; // Unique identifier for the artist
  name: string; // Name of the artist
  images: Image[]; // Array of artist images
  followers?: {
    total: number; // Total number of followers (optional)
  };
  genres?: string[]; // Array of genres associated with the artist (optional)
}

// Represents a Spotify track with metadata and associated album and artists.
export interface Track {
  id: string; // Unique identifier for the track
  name: string; // Name of the track
  album: Album; // Album the track belongs to
  artists: Artist[]; // Array of artists who contributed to the track
  duration_ms: number; // Duration of the track in milliseconds
  preview_url: string; // URL for a preview of the track
}

// Represents a Spotify playlist with metadata and associated tracks.
export interface Playlist {
  description?: string; // Optional description of the playlist
  id: string; // Unique identifier for the playlist
  followers: {
    total: number; // Total number of followers
  };
  images: Image[]; // Array of playlist cover images
  name: string; // Name of the playlist
  owner: {
    id: string; // Unique identifier for the playlist owner
    display_name?: string; // Optional display name of the owner
  };
  items?: [{ added_at: string; track: Track }]; // Optional array of tracks with added timestamps
  tracks: {
    items: [{ added_at: string; track: Track }]; // Array of tracks with added timestamps
    total: number; // Total number of tracks in the playlist
  };
  type: string; // Type of the playlist
  total?: number; // Optional total number of items
}

// Represents the structure of search results returned by Spotify's API.
export interface SearchResults {
  albums?: {
    items: Album[]; // Array of album results
  };
  artists?: {
    items: Artist[]; // Array of artist results
  };
  playlists?: {
    items: Playlist[]; // Array of playlist results
  };
  tracks?: {
    items: Track[]; // Array of track results
  };
}

// Represents detailed audio analysis data for a track.
export interface TrackAnalysis {
  acousticness: number; // Measure of acoustic quality (0.0 to 1.0)
  danceability: number; // Measure of suitability for dancing (0.0 to 1.0)
  energy: number; // Measure of intensity and activity (0.0 to 1.0)
  instrumentalness: number; // Measure of instrumental quality (0.0 to 1.0)
  key: number; // Musical key of the track (0 to 11)
  liveness: number; // Measure of live performance presence (0.0 to 1.0)
  loudness: number; // Overall loudness in decibels
  mode: 1 | 0; // Modality of the track (1 for major, 0 for minor)
  speechiness: number; // Measure of spoken words presence (0.0 to 1.0)
  tempo: number; // Tempo of the track in beats per minute
  valence: number; // Measure of musical positivity (0.0 to 1.0)
}
