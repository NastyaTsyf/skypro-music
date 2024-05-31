import classNames from "classnames"
import styles from "./Volume.module.css"
import AudioPlayer from "../AudioPlayer/AudioPlayer"
import { MutableRefObject } from "react"

type VolumeType = {
  audioRef: MutableRefObject<HTMLAudioElement | null>
}

export default function Volume({ audioRef }: VolumeType) {
  return (
    <div className={styles.volume}>
      <div className={styles.volumeContent}>
        <div className={styles.volumeImage}>
          <svg className={styles.volumeSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-volume" />
          </svg>
        </div>
        <div className={classNames(styles.volumeProgress, styles.btn)} >
          <AudioPlayer audioRef={audioRef} />
        </div>
      </div>
    </div>
  )
}