import React, { useState, useRef, useEffect, MutableRefObject } from 'react';
import styles from "./AudioPlayer.module.css"

type AudioPlayerType = {
    audioRef: MutableRefObject<HTMLAudioElement | null>
}

const AudioPlayer = ({ audioRef }: AudioPlayerType) => {

    const [volume, setVolume] = useState<number>(0.5); // Начальная громкость установлена на 50%

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    return (
        <input
            className={styles.styledVolumeInput}
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
        />
    );
};

export default AudioPlayer;