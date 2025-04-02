// Importing the Track type for type safety and the Zustand library for state management
import { Track } from "@/types/types";
import { create } from "zustand";

// Defining the shape of the Zustand store's state and actions
interface ZustandState {
  searchQuery: string; // Holds the current search query string
  setSearchQuery: (val: string) => void; // Function to update the search query
  currentTrack: Track | null; // Holds the currently selected track or null if none
  setCurrentTrack: (track: Track) => void; // Function to update the current track
}

// Creating the Zustand store with initial state and updater functions
export const useStore = create<ZustandState>((set) => ({
  searchQuery: "", // Initial value for the search query
  setSearchQuery: (val: string) =>
    set(() => ({
      searchQuery: val, // Updates the search query in the state
    })),
  currentTrack: null, // Initial value for the current track
  setCurrentTrack: (track: Track) =>
    set(() => ({
      currentTrack: track, // Updates the current track in the state
    })),
}));
