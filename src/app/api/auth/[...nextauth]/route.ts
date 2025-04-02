import NextAuth, { NextAuthOptions } from "next-auth"; 
import SpotifyProvider from "next-auth/providers/spotify";

// Define the scope of permissions requested from Spotify
const scope =
  "user-read-recently-played user-read-playback-state user-top-read user-modify-playback-state user-read-currently-playing user-follow-read playlist-read-private user-read-email user-read-private user-library-read playlist-read-collaborative";

// Define the NextAuth configuration options
export const authOptions: NextAuthOptions = {
  providers: [
    // Configure Spotify as an authentication provider
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string, // Spotify client ID from environment variables
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string, // Spotify client secret from environment variables
      authorization: {
        params: { scope }, // Pass the defined scope to the authorization parameters
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Secret used to encrypt NextAuth tokens

  callbacks: {
    // Callback to handle JWT (JSON Web Token) logic
    async jwt({ token, account }) {
      if (account) {
        // If the user is signing in for the first time, store account details in the token
        token.id = account.id; // Store the account ID
        token.expires_at = account.expires_at; // Store the token expiration time
        token.accessToken = account.access_token; // Store the access token
      }
      return token; // Return the token, which will be used in subsequent requests
    },

    // Callback to handle session logic
    async session({ session, token }) {
      session.user = token; // Attach the token to the session object
      return session; // Return the session object
    },
  },

  pages: {
    signIn: "/login", // Define a custom sign-in page
  },
};

// Create a NextAuth handler using the defined options
const handler = NextAuth(authOptions);

// Export the handler for GET and POST requests
export { handler as GET, handler as POST };
