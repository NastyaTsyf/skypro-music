'use client'
import { getTracks } from "@/api/tracks";
import Centerblock from "@/components/Centerblock/Centerblock";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setInitialTracks } from "@/store/features/playlistSlice";
import { trackType } from "@/types";
import { useEffect, useState } from "react";

export default function MainTracksPage({}) {
    const dispatch = useAppDispatch();
    const [tracks, setTracks] = useState<trackType[]>([])
    const filteredTracks = useAppSelector((state) => state.playlist.filteredTracks)
  
    useEffect(() => {
        getTracks().then((tracksData) => {
          dispatch(setInitialTracks(tracksData));
          setTracks(tracksData)
        })
    },[dispatch])
    return(
          <Centerblock tracks={filteredTracks} playlist={tracks} isCategory={false} categoryName={'Треки'} />
    )

}