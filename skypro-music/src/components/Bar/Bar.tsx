'use client'
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Player from "../Player/Player";
import Volume from "../Volume/Volume";
import styles from "./Bar.module.css"
import { trackType } from "@/types";
import ProgressBar from "../ProgressBar/ProgressBar";

type BarType = {
  track: trackType
}

export default function Bar({ track }: BarType) {
  const audioRef = useRef<null | HTMLAudioElement>(null)

  const [currentTime, setCurrentTime] = useState<number>(0);

  const duration = audioRef.current?.duration;

  useEffect(() => {
    audioRef.current?.addEventListener("timeupdate", () => setCurrentTime(audioRef.current!.currentTime))
  }, [])
  const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      setCurrentTime(Number(event.target.value))
      audioRef.current.currentTime = Number(event.target.value);
    }
  };

  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        <audio ref={audioRef} src={track.track_file}></audio>
        <ProgressBar
          max={duration}
          value={currentTime}
          step={0.1}
          onChange={handleSeek} />
        <div className={styles.barPlayerBlock}>
          <Player track={track} audioRef={audioRef} />
          <Volume audioRef={audioRef}/>
        </div>
      </div>
    </div>
  )
}