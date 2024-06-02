'use client'
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Player from "../Player/Player";
import Volume from "../Volume/Volume";
import styles from "./Bar.module.css"
import ProgressBar from "../ProgressBar/ProgressBar";
import { useAppDispatch, useAppSelector } from "@/hooks";


export default function Bar() {

  const dispatch = useAppDispatch();
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const audioRef = useRef<null | HTMLAudioElement>(null)
  const [currentTime, setCurrentTime] = useState<number>(0);
  const duration = audioRef.current?.duration;
  const playlist = useAppSelector((state) => state.playlist.playlist);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    audioRef.current?.addEventListener("timeupdate", () => setCurrentTime(audioRef.current!.currentTime))
  }, [])
  const handleSeek = (event: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      setCurrentTime(Number(event.target.value))
      audioRef.current.currentTime = Number(event.target.value);
    }
  };

  const handleEnded = () => {
    const currentTrackIndex = playlist.findIndex((trackData) => trackData.id === currentTrack?.id)

        // Проверяем, не является ли текущий трек последним в плейлисте
        if (currentTrackIndex < playlist.length - 1) {
            // Переход к следующему треку
            setCurrentTrackIndex(currentTrackIndex + 1);
        } else {
            // Или начинаем плейлист с начала
            setCurrentTrackIndex(0);
        }
    };

    // Устанавливаем источник аудио и обработчик события `ended` при изменении трека
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
        audio.src = playlist[currentTrackIndex].track_file;
        audio.addEventListener('ended', handleEnded);

        // Воспроизводим новый трек
        audio.play();

        return () => {
            audio.removeEventListener('ended', handleEnded);
        };
        }
    }, [currentTrackIndex, playlist]);

  return (
    <>
      {currentTrack && 
      (<div className={styles.bar}>
        <div className={styles.barContent}>
          <audio ref={audioRef} src={currentTrack.track_file}></audio>
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