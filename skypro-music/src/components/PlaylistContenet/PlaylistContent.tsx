import classNames from "classnames";
import Track from "../Track/Track";
import styles from "./PlaylistContent.module.css"
import { getTracks } from "@/api/tracks";
import { trackType } from "@/types";
import { useEffect, useState } from "react";

type PlaylistContentType = {
  setTrack: (param: trackType) => void
}
//async
export default function PlaylistContent({setTrack} : PlaylistContentType) {

  // let tracksData: TrackType[];
  // try {
  //   tracksData = await getTracks();
  // } catch (error: any) {
  //   throw new Error(error.message);
  // }

  const [tracksData, setTracksData] = useState<trackType[]>([]);
  useEffect(() => {
    getTracks().then((data:trackType[]) => setTracksData(data))
    .catch((error) => {
      throw new Error(error.message)
    });
  }, []);
  
    return (
        <div className={styles.playlistContent}>
        <div className={classNames(styles.contentTitle, styles.playlistTitle)}>
          <div className={classNames(styles.playlistTitleCol, styles.col01)}>Трек</div>
          <div className={classNames(styles.playlistTitleCol, styles.col02)}>Исполнитель</div>
          <div className={classNames(styles.playlistTitleCol, styles.col03)}>Альбом</div>
          <div className={classNames(styles.playlistTitleCol, styles.col04)}>
            <svg className={styles.playlistTitleSvg}>
              <use xlinkHref="img/icon/sprite.svg#icon-watch" />
            </svg>
          </div>
        </div>
        <div className={styles.playlist}>
          {tracksData.map((trackData) => <Track
          onClick={() => setTrack(trackData)}
          key={trackData.id}
          name={trackData.name}
          author={trackData.author}
          album={trackData.album}
          />)}
          
        </div>
      </div>
    )
}