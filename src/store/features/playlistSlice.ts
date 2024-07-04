import { fetchFavoriteTracks } from "@/api/tracks";
import { trackType } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const getFavoriteTracks = createAsyncThunk(
  "playlist/getFavoriteTracks",
  async (access: string) => {
    const favoriteTracks = await fetchFavoriteTracks(access);
    console.log(favoriteTracks)
    return favoriteTracks
  }
)

type PlaylistStateType = {
  currentTrack: null | trackType;
  playlist: trackType[],
  shuffledPlaylist: trackType[],
  isShuffle: boolean,
  currentTrackIndex: number | null,
  isPlaying: boolean,
  filterOptions: {
    author: string[],
    genre: string[],
    searchValue: string,
    order: string
  },
  filteredTracks: trackType[],
  initialTracks: trackType[],
  likedTracks: trackType[],

}

const initialState: PlaylistStateType = {
  currentTrack: null,
  playlist: [],
  shuffledPlaylist: [],
  isShuffle: false,
  currentTrackIndex: null,
  isPlaying: false,
  filterOptions: {
    author: [],
    genre: [],
    searchValue: '',
    order: "По умолчанию"
  },
  filteredTracks: [],
  initialTracks: [],
  likedTracks: [],
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
    setFilters: (state, action: PayloadAction<{
      author?: string[],
      genre?: string[],
      searchValue?: string,
      order?: string
    }>) => {
      state.filterOptions = {
        author: action.payload.author || state.filterOptions.author,
        genre: action.payload.genre || state.filterOptions.genre,
        searchValue: action.payload.searchValue || state.filterOptions.searchValue,
        order: action.payload.order || state.filterOptions.order,
      },
        state.filteredTracks = state.initialTracks.filter((track) => {
          const hasAuthors = state.filterOptions.author.length !== 0;
          const isAuthors = hasAuthors ? state.filterOptions.author.includes(track.author) : true;
          const hasGenres = state.filterOptions.genre.length !== 0;
          const isGenres = hasGenres ? state.filterOptions.genre.includes(track.genre) : true;
          const hasSearchValue = track.name.toLowerCase().includes(state.filterOptions.searchValue.toLowerCase());
          return isAuthors && hasSearchValue && isGenres
        })
    },
    setInitialTracks: (state, action: PayloadAction<trackType[]>) => {
      state.initialTracks = action.payload;
      state.filteredTracks = action.payload
    },
    setSortTraks: (state, action: PayloadAction<string>) => {
      state.filterOptions.order = action.payload
      if (state.filterOptions.order === "Сначала старые") {
        state.filteredTracks = state.filteredTracks.sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime())
        console.log(state.filteredTracks)
      }
      if (state.filterOptions.order === "Сначала новые") {
        state.filteredTracks = state.filteredTracks.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime())
      }
      if (state.filterOptions.order === "По умолчанию") {
        state.filteredTracks = state.filteredTracks.sort((a, b) => a.id - b.id)
      }
    },
    likeTrack: (state, action: PayloadAction<trackType>) => {
      state.likedTracks.push(action.payload)
    },
    dislikeTrack: (state, action: PayloadAction<trackType>) => {
      state.likedTracks = state.likedTracks.filter((element) => element.id !== action.payload.id)
    },
    setLikedTracks: (state) => {
      state.playlist = state.likedTracks;
    },
    clearLikedTracks: (state) => {
      state.likedTracks = []
    }
  },
  extraReducers(builder) {
    builder.addCase(getFavoriteTracks.fulfilled, (state, action: PayloadAction<trackType[]>) => {
      state.likedTracks = action.payload
    })
  },

});

export const { setCurrentTrack, setNextTrack, setPreviousTrack, setIsShuffle, setIsPlaying, setFilters, setInitialTracks, setSortTraks, likeTrack, dislikeTrack, setLikedTracks, clearLikedTracks } = playlistSlice.actions;
export const playlistReducer = playlistSlice.reducer;