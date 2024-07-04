'use client'
import Centerblock from "@/components/Centerblock/Centerblock"
import { useAppSelector } from "@/hooks";

export default function FavoriteTracksPage() {
    const tracks = useAppSelector((state) => state.playlist.likedTracks);
    
    return (
        <Centerblock tracks={tracks} playlist={tracks} isCategory={true} categoryName={'Мои треки'} />
    )
}