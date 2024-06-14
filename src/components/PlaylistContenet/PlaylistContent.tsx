import classNames from "classnames";
import Track from "../Track/Track";
import styles from "./PlaylistContent.module.css"
import { getTracks } from "@/api/tracks";
import { trackType } from "@/types";
import { useAppSelector } from "@/hooks";

type PlaylistContentType = {
  tracksData: trackType[],
}

export default function PlaylistContent({tracksData}: PlaylistContentType) {

  const filteredTracks = useAppSelector((state) => state.playlist.filteredTracks)
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
        {filteredTracks.map((trackData) =>
          <Track
            key={trackData.id}
            trackData={trackData}
            tracksData={tracksData}
          />)}
      </div>
    </div>
  )
}