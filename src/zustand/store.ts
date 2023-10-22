import { create } from "zustand";
import axios from "axios";
import { produce } from "immer";
interface userState {
  topTracks: any[];
  topArtists: any[];
  userDetails: any;
  error: any;
  isAuthenticated: boolean;
  fetchTopTracks: (timeFrame: string) => void;
  fetchTopArtists: (timeFrame: string) => void;
  fetchUserDetails: () => void;
  setAuthenticated: (value: boolean) => void;
}

const baseUrl = "https://api.spotify.com/v1";

export const useStore = create<userState>((set, get) => ({
  // initial state
  topTracks: [],
  topArtists: [],
  userDetails: undefined,
  error: undefined,
  isAuthenticated: false,

  // methods for manipulating state
  fetchTopTracks: async (timeFrame: string) => {
    try {
      let res = await axios.get(`${baseUrl}/me/top/tracks`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem(
            "spotify-access-token"
          )}`,
        },
        params: {
          time_range: timeFrame,
          limit: 50,
          offset: 0,
        },
      });
      set(
        produce((state) => {
          state.topTracks = res.data.items;
          state.error = undefined;
        })
      );
    } catch (e) {
      set(
        produce((state) => {
          state.error = e;
        })
      );
    }
  },
  fetchTopArtists: async (timeFrame: string) => {
    try {
      let res = await axios.get(`${baseUrl}/me/top/artists`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem(
            "spotify-access-token"
          )}`,
        },
        params: {
          time_range: timeFrame,
          limit: 50,
          offset: 0,
        },
      });
      set(
        produce((state) => {
          state.topArtists = res.data.items;
          state.error = undefined;
        })
      );
    } catch (e) {
      set(
        produce((state) => {
          state.error = e;
        })
      );
    }
  },
  fetchUserDetails: async () => {
    try {
      let res = await axios.get(`${baseUrl}/me`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem(
            "spotify-access-token"
          )}`,
        },
      });
      set(
        produce((state) => {
          state.userDetails = res.data;
        })
      );
    } catch (e) {
      set(
        produce((state) => {
          state.error = e;
        })
      );
    }
  },
  setAuthenticated: (value) => {
    set(
      produce((state) => {
        state.isAuthenticated = value;
      })
    );
  },
}));

export default useStore;
