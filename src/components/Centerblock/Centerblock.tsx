'use client'
import { trackType } from "@/types";
import Filter from "../Filter/Filter";
import PlaylistContent from "../PlaylistContenet/PlaylistContent";
import Search from "../Search/Search";
import styles from "./Centerblock.module.css"
import { getTracks } from "@/api/tracks";
import { useAppDispatch } from "@/hooks";
import { setInitialTracks } from "@/store/features/playlistSlice";
import { useEffect, useState } from "react";


export default function Centerblock() {
  const dispatch = useAppDispatch();
  const [tracks, setTracks] = useState<trackType[]>([])

  let tracksData: trackType[];


  useEffect(() => {
      getTracks().then((tracksData) => {
        dispatch(setInitialTracks(tracksData));
        setTracks(tracksData)
      })
  },[dispatch])
  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblockH2}>Треки</h2>
      <Filter tracksData={tracks} />
      <PlaylistContent tracksData={tracks}/>
    </div>
  )
}