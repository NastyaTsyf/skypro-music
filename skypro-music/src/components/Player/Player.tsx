import classNames from "classnames";
import TrackPlay from "../TrackPlay/TrackPlay";
import styles from "./Player.module.css";
import { trackType } from "@/types";
import { MutableRefObject, useState } from "react";

type PlayerType = {
    track: trackType
    audioRef: MutableRefObject<HTMLAudioElement | null>
  }

export default function Player({track, audioRef} : PlayerType) {

    const [isPlaying, setIsPlaying] = useState<boolean>(true);
  
    const togglePlay = () => {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    };

    if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.play();
        }
      }
    

    const [isLoop, setIsLoop] = useState<boolean>(false);
  
    const toggleLoop = () => {
      if (audioRef.current) {
        audioRef.current.loop = !audioRef.current.loop
        setIsLoop(!isLoop);
      }
    };

    return (
        <div className={styles.player}>
            <div className={styles.playerControls}>
                <div className={styles.playerBtnPrev}>
                    <svg className={styles.playerBtnPrevSvg}>
                        <use xlinkHref="img/icon/sprite.svg#icon-prev" />
                    </svg>
                </div>
                <div onClick={togglePlay} className={classNames(styles.playerBtnPlay, styles.btn)} >
                    <svg className={styles.playerBtnPlaySvg}>
                        <use xlinkHref={`img/icon/sprite.svg#${isPlaying ? "icon-pause" : "icon-play"}`} />
                    </svg>
                </div>
                <div className={styles.playerBtnNext}>
                    <svg className={styles.playerBtnNextSvg}>
                        <use xlinkHref="img/icon/sprite.svg#icon-next" />
                    </svg>
                </div>
                <div onClick={toggleLoop} className={classNames(styles.playerBtnRepeat, styles.btnIcon)}>
                    <svg className={styles.playerBtnRepeatSvg}>
                        <use xlinkHref={`img/icon/sprite.svg#${isLoop ? "icon-repeat-active" : "icon-repeat"}`} />
                    </svg>
                </div>
                <div className={classNames(styles.playerBtnShuffle, styles.btnIcon)}>
                    <svg className={styles.playerBtnShuffleSvg}>
                        <use xlinkHref="img/icon/sprite.svg#icon-shuffle" />
                    </svg>
                </div>
            </div>
            <TrackPlay track={track} />
        </div>
    )
}