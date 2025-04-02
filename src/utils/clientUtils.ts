// Converts a given number of seconds into a formatted string (MM:SS).
export const fmtMSS = (seconds: number) => {
  // Creates a new Date object with the seconds and extracts the MM:SS part of the ISO string.
  return new Date(seconds).toISOString().substring(15, 15 + 4);
};

// Returns a greeting based on the current time of day.
export const getGreeting = () => {
  // Gets the current hour of the day (0-23).
  const currentHour = new Date().getHours();

  // If the hour is between 0 and 11 (inclusive), return "Morning".
  if (currentHour >= 0 && currentHour < 12) {
    return "Morning";
  }

  // If the hour is between 12 and 16 (inclusive), return "Afternoon".
  if (currentHour >= 12 && currentHour < 17) {
    return "Afternoon";
  }

  // For all other hours (17-23), return "Evening".
  return "Evening";
};

// A list of filter tags used for searching, each containing a link and a label.
export const searchFilterTags = [
  { link: "", label: "All" }, // Represents all items.
  { link: "/tracks", label: "Songs" }, // Represents songs.
  { link: "/albums", label: "Albums" }, // Represents albums.
  { link: "/artists", label: "Artists" }, // Represents artists.
  { link: "/playlists", label: "Playlists" }, // Represents playlists.
];
