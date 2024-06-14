'use client'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import Player from "../Player/Player";
import Volume from "../Volume/Volume";
import styles from "./Bar.module.css"
import ProgressBar from "../ProgressBar/ProgressBar";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setNextTrack } from "@/store/features/playlistSlice";


export default function Bar() {

  const dispatch = useAppDispatch();
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const audioRef = useRef<null | HTMLAudioElement>(null)
  const [currentTime, setCurrentTime] = useState<number>(0);
  const duration = audioRef.current?.duration;

  useEffect(() => {
    audioRef.current?.addEventListener("timeupdate", () => setCurrentTime(audioRef.current!.currentTime))
  }, [])

  const handleSeek = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      setCurrentTime(Number(event.target.value))
      audioRef.current.currentTime = Number(event.target.value);
    }
  }, []);

  const handleEnded = () => {
    dispatch(setNextTrack());
  };

  useEffect(() => {
    audioRef.current?.addEventListener("ended", handleEnded);
    return () => {
      audioRef.current?.removeEventListener("ended", handleEnded);
      audioRef.current?.play();
    };
  }, [currentTrack, audioRef]);

  return (
    <>
      {currentTrack &&
        (<div className={styles.bar}>
          <div className={styles.barContent}>
            <audio ref={audioRef} src={currentTrack.track_file} onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}></audio>
            <ProgressBar
              max={duration}
              value={currentTime}
              step={0.1}
              onChange={handleSeek} />
            <div className={styles.barPlayerBlock}>
              <Player audioRef={audioRef} />
              <Volume audioRef={audioRef} />
            </div>
          </div>
        </div>)}
    </>
  )
}