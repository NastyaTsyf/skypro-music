import classNames from "classnames";
import TrackPlay from "../TrackPlay/TrackPlay";
import styles from "./Player.module.css";
import { MutableRefObject, useEffect, useState } from "react";
import { setIsPlaying, setIsShuffle, setNextTrack, setPreviousTrack } from "@/store/features/playlistSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";

type PlayerType = {
  audioRef: MutableRefObject<HTMLAudioElement | null>
}

export default function Player({ audioRef }: PlayerType) {
  const isShuffle = useAppSelector((state) => state.playlist.isShuffle);
  const dispatch = useAppDispatch();
  const isPlaying = useAppSelector((state) => state.playlist.isPlaying)
  const [isLoop, setIsLoop] = useState<boolean>(false);

  const togglePlay = () => {
    if (audioRef.current) {
      dispatch(setIsPlaying(!isPlaying))
    }
  };

  useEffect (() => {
    if (!isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
  }, [isPlaying])


  const toggleLoop = () => {
    if (audioRef.current) {
      audioRef.current.loop = !audioRef.current.loop
      setIsLoop(!isLoop);
    }
  };

  return (
    <div className={styles.player}>
      <div className={styles.playerControls}>
        <div onClick={() => dispatch(setPreviousTrack())} className={styles.playerBtnPrev}>
          <svg className={styles.playerBtnPrevSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-prev" />
          </svg>
        </div>
        <div onClick={togglePlay} className={classNames(styles.playerBtnPlay, styles.btn)} >
          <svg className={styles.playerBtnPlaySvg}>
            <use xlinkHref={`img/icon/sprite.svg#${isPlaying ? "icon-pause" : "icon-play"}`} />
          </svg>
        </div>
        <div onClick={() => dispatch(setNextTrack())} className={styles.playerBtnNext}>
          <svg className={styles.playerBtnNextSvg}>
            <use xlinkHref="img/icon/sprite.svg#icon-next" />
          </svg>
        </div>
        <div onClick={toggleLoop} className={classNames(styles.playerBtnRepeat, styles.btnIcon)}>
          <svg className={styles.playerBtnRepeatSvg}>
            <use xlinkHref={`img/icon/sprite.svg#${isLoop ? "icon-repeat-active" : "icon-repeat"}`} />
          </svg>
        </div>
        <div onClick={() => dispatch(setIsShuffle(!isShuffle))} className={classNames(styles.playerBtnShuffle, styles.btnIcon)}>
          <svg className={styles.playerBtnShuffleSvg}>
            <use xlinkHref={`img/icon/sprite.svg#${isShuffle ? "icon-shuffle-active" : "icon-shuffle"}`} />
          </svg>
        </div>
      </div>
      <TrackPlay />
    </div>
  )
}