import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux";
import { AppDispatch, AppStore, RootState } from "./store/store";
import { useEffect } from "react";
import { clearLikedTracks, dislikeTrack, getFavoriteTracks, likeTrack } from "./store/features/playlistSlice";
import { trackType } from "./types";
import { dislikeTrackFetch, likeTrackFetch } from "./api/tracks";

// Хуки useAppDispatch, useAppSelector и useAppStore позволяют использовать функции useDispatch, useSelector и useStore из библиотеки react-redux с типизацией.
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;

export function useInitializeLikedTracks() {
    const dispatch = useAppDispatch();
    const tokens = useAppSelector((state) => state.user.tokens);
    useEffect(() => {
        if (tokens?.access) {
            dispatch(getFavoriteTracks(tokens.access))
        } else {
            dispatch(clearLikedTracks())
        }
    }, [tokens, dispatch])
}

export const useLikeTrack = (track: trackType) => {
    const dispatch = useAppDispatch();
    const likedTracks = useAppSelector((state) => state.playlist.likedTracks);
    const tokens = useAppSelector((state) => state.user.tokens);
    const isLiked = likedTracks.some(likedTrack => likedTrack.id === track.id);
    const handleLike = async (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        const action = isLiked ? dislikeTrackFetch : likeTrackFetch
        try {
            await action({
                id: String(track.id),
                access: tokens?.access,
            });
            if (isLiked) {
                dispatch(dislikeTrack(track));
                console.log(likedTracks)
            } else {
                dispatch(likeTrack(track));
                console.log(likedTracks)
            }
        } catch (error) {
            console.error(error);
        }
    };
    return { isLiked, handleLike };
};