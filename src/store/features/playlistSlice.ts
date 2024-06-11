import { trackType } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PlaylistStateType = {
  currentTrack: null | trackType;
  playlist: trackType[],
  shuffledPlaylist: trackType[],
  isShuffle: boolean,
  currentTrackIndex: number | null,
  isPlaying: boolean,
}

const initialState: PlaylistStateType = {
  currentTrack: null,
  playlist: [],
  shuffledPlaylist: [],
  isShuffle: false,
  currentTrackIndex: null,
  isPlaying: false
};

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<{ trackData: trackType, tracksData: trackType[] }>) => {
      state.currentTrack = action.payload.trackData;
      state.playlist = action.payload.tracksData;
      state.shuffledPlaylist = [...action.payload.tracksData].sort(() => 0.5 - Math.random());
      state.currentTrackIndex = state.playlist.findIndex((trackData) => trackData.id === state.currentTrack?.id)
      state.isPlaying = true
    },
    setNextTrack: (state) => {
      const playlist = state.isShuffle ? state.shuffledPlaylist : state.playlist;
      const currentTrackIndex = playlist.findIndex((trackData) => trackData.id === state.currentTrack?.id)
      if (currentTrackIndex <= playlist.length) {
        const newTrack = playlist[currentTrackIndex + 1];
        state.currentTrackIndex = currentTrackIndex + 1
        if (newTrack) {
          state.currentTrack = newTrack;
        }
      } else {
        const newTrack = playlist[playlist.length - 1];
        state.currentTrackIndex = playlist.length - 1
        if (newTrack) {
          state.currentTrack = newTrack;
        }
      }

    },
    setPreviousTrack: (state) => {
      const playlist = state.isShuffle ? state.shuffledPlaylist : state.playlist;
      const currentTrackIndex = playlist.findIndex((trackData) => trackData.id === state.currentTrack?.id)
      if (currentTrackIndex >= 0) {
        const newTrack = playlist[currentTrackIndex - 1];
        state.currentTrackIndex = currentTrackIndex - 1
        if (newTrack) {
          state.currentTrack = newTrack;
        }
      } else { return }

    },
    setIsShuffle: (state, action: PayloadAction<boolean>) => {
      state.isShuffle = action.payload
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
  },
});

export const { setCurrentTrack, setNextTrack, setPreviousTrack, setIsShuffle, setIsPlaying} = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;