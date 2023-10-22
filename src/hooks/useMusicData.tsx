import { useState, useEffect } from "react";
import useStore from "../zustand/store";

interface MusicData {
  selectedGallery: string;
  timeFrame: string;
  handleToggleGallery: (value: string) => void;
  handleToggleTimeFrame: (value: string) => void;
}

function useMusicData(): MusicData {
  const [selectedGallery, setSelectedGallery] = useState("tracks");
  const [timeFrame, setTimeFrame] = useState("long_term");
  const state = useStore();

  useEffect(() => {
    // Get access token
    let token = sessionStorage.getItem("spotify-access-token");
    if (token) {
      state.fetchTopTracks(timeFrame);
      state.fetchTopArtists(timeFrame);
    }
  }, [timeFrame]);

  const handleToggleGallery = (value: string) => {
    setSelectedGallery(value);
  };
  const handleToggleTimeFrame = (value: string) => {
    setTimeFrame(value);
  };

  return {
    selectedGallery,
    timeFrame,
    handleToggleGallery,
    handleToggleTimeFrame,
  };
}

export default useMusicData;
