"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AuthSession } from "@/types/types";
import { getServerSession } from "next-auth/next";

// Function to perform a GET request to a given URL using the provided session for authorization
export const customGet = async (url: string, session: AuthSession | null) => {
  // If no session is provided, return null
  if (!session) {
    return null;
  }
  try {
    // Perform a fetch request with the Authorization header containing the user's access token
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    });

    // If the response is not OK (status code not in the range 200-299), log an error and return null
    if (!res.ok) {
      console.error(`Error fetching data: ${res.status} - ${res.statusText}`);
      return null;
    }

    // Parse the response body as text
    const text = await res.text();
    // If the response body is empty, log a warning and return null
    if (!text) {
      console.warn("Received empty response from API");
      return null;
    }

    // Parse the response text as JSON and return it
    return JSON.parse(text);
  } catch (error) {
    // Catch and log any errors that occur during the fetch or parsing process
    console.error("Error fetching or parsing data:", error);
    return null;
  }
};

// Function to retrieve the authenticated session on the server side
export const getAuthSession = async (): Promise<AuthSession | null> => {
  // Ensure this function is not called on the client side
  if (typeof window !== "undefined") {
    console.error("getAuthSession should not be called on the client side.");
    return null;
  }

  // Retrieve the server session using NextAuth's `getServerSession` function
  const session = (await getServerSession(authOptions)) as AuthSession;
  // If no session is found, return null
  if (!session) {
    return null;
  }

  // Get the current timestamp in seconds
  const currentTimestamp = Math.floor(Date.now() / 1000);
  // Check if the session has expired by comparing the current timestamp with the session's expiration time
  if (currentTimestamp >= session.user.expires_at) {
    return null;
  }

  // Return the valid session
  return session;
};
