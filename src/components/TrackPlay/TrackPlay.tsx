'use client'
import Link from "next/link"
import styles from "./TrackPlay.module.css"
import classNames from "classnames"
import { useAppSelector, useLikeTrack } from "@/hooks"


export default function TrackPlay() {
    const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
    // const { isLiked, handleLike } = useLikeTrack(currentTrack);
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
                    <div className={styles.trackPlayLikeDis}>
                        <div className={classNames(styles.trackPlayLike, styles.btnIcon)}>
                            <svg className={styles.trackPlayLikeSvg}>
                                <use xlinkHref={`/img/icon/sprite.svg#icon-like`} />
                            </svg>
                        </div>
                    </div>
                </div>)
            }
        </>)
}