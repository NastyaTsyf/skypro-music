'use client'
import Link from "next/link"
import styles from "./TrackPlay.module.css"
import { useAppSelector } from "@/hooks"
import TrackLikeBlock from "../TrackLikeBlock/TrackLikeBlock"


export default function TrackPlay() {
    const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
    if (!currentTrack) {
        return}
    return (
        <>
            {currentTrack &&
                (<div className={styles.trackPlay}>
                    <div className={styles.trackPlayContain}>
                        <div className={styles.trackPlayImage}>
                            <svg className={styles.trackPlaySvg}>
                                <use xlinkHref="img/icon/sprite.svg#icon-note" />
                            </svg>
                        </div>
                        <div className={styles.trackPlayAuthor}>
                            <Link className={styles.trackPlayAuthorLink} href="http://">
                                {currentTrack.name}
                            </Link>
                        </div>
                        <div className={styles.trackPlayAlbum}>
                            <Link className={styles.trackPlayAlbumLink} href="http://">
                                {currentTrack.author}
                            </Link>
                        </div>
                    </div>
                    <TrackLikeBlock currentTrack={currentTrack} />
                </div>)
            }
        </>)
}