'use client'
import { trackType } from "@/types";
import Filter from "../Filter/Filter";
import PlaylistContent from "../PlaylistContenet/PlaylistContent";
import Search from "../Search/Search";
import styles from "./Centerblock.module.css"
import { useAppSelector } from "@/hooks";


type CenterblockType = {
  tracks: trackType[],
  playlist: trackType[],
  isCategory: boolean,
  categoryName: string
}


export default function Centerblock({ tracks, playlist, isCategory, categoryName }: CenterblockType) {
  const userName = useAppSelector((state) => state.user.user?.username);
  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblockH2}>{categoryName}</h2>
      {!isCategory && <Filter />}
      <PlaylistContent tracksData={playlist} tracks={tracks}/>
    </div>
  )
}