import classNames from "classnames";
import Track from "../Track/Track";
import styles from "./PlaylistContent.module.css"
import { trackType } from "@/types";
import { useAppSelector } from "@/hooks";

type PlaylistContentType = {
  tracksData: trackType[],
  tracks: trackType[],
}

export default function PlaylistContent({tracksData, tracks}: PlaylistContentType) {

  const filteredTracks = useAppSelector((state) => state.playlist.filteredTracks)
  console.log(filteredTracks)
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
        {filteredTracks.length > 0 ? tracks?.map((trackData) =>
          <Track
            key={trackData.id}
            trackData={trackData}
            tracksData={tracksData}
          />) : "Треки не найдены"
          }

      </div>
    </div>
  )
}