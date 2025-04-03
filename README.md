# Spotify Integration - Final Phase

## Overview
This project is a web application built with **Next.js**, **TypeScript**, and **TailwindCSS**, integrating with the **Spotify API** for seamless music exploration. It enables users to authenticate via Spotify OAuth, view their playlists, liked songs, followed artists, and explore various music categories. The application provides playback functionality but does not support real-time updates or playlist creation.

## Tools and Technologies
- **Next.js 12**
- **TypeScript**
- **TailwindCSS**
- **Zustand** for managing state
- **NextAuth.js** for authentication via Spotify OAuth

## Features
- Authenticate using **Spotify OAuth**
- View **user-created and followed playlists**
- Access **liked songs**
- See **followed artists and albums**
- Display **tracks within playlists, albums, or by an artist**
- Control track playback with **play/pause functionality**
- Search for **playlists, artists, albums, or tracks**
- Browse music by **genre-based categories** (e.g., Rock, Indie, Hip-Hop)
- Discover **latest music releases**

## Setup Instructions
### Requirements
- **Node.js** (LTS version recommended)
- **Spotify Developer Account**
- **Git** installed on your machine

### Running Locally
1. Clone the repository:
   ```sh
   git clone https://github.com/2025-Winter-ITE-5425-0NA/project-phase-1-gamma.git
   cd project-phase-1-gamma
   ```
2. Install necessary dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables:
   Create a `.env.local` file and include the following details:
   ```sh
   SPOTIFY_CLIENT_ID=your_client_id
   SPOTIFY_CLIENT_SECRET=your_client_secret
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_generated_secret
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```
   The application will be available at `http://localhost:3000`

## Spotify API Configuration
1. Log in to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/).
2. Create a new application and provide the required details.
3. Copy the **Client ID** and **Client Secret**, then update the `.env.local` file.
4. Under **Edit Settings**, add the redirect URI:
   ```
   http://localhost:3000/api/auth/callback/spotify
   ```
   If deploying, add:
   ```
   https://yourdomain.com/api/auth/callback/spotify
   ```
5. Grant access to test users under the **Users and Access** section.

## API Documentation
This project interacts with the [Spotify Web API](https://developer.spotify.com/console/) to fetch music-related data.

## Developer Information
- **Abdul Rafay (N01596114)**

## References
- [Spotify Web API Guide](https://developer.spotify.com/documentation/web-api/)
- [NextAuth.js Documentation](https://next-auth.js.org/)

