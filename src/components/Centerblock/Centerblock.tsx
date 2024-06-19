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

type CenterblockType = {
  tracks: trackType[],
  playlist: trackType[],
  isCategory: boolean
}


export default function Centerblock({tracks, playlist, isCategory}: CenterblockType) {

  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblockH2}>Треки</h2>
      {!isCategory && <Filter />}
      <PlaylistContent tracksData={playlist} tracks={tracks}/>
    </div>
  )
}