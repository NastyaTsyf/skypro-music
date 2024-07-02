'use client'
import { useAppDispatch, useAppSelector, useLikeTrack } from "@/hooks";
import styles from "./Track.module.css"
import { setCurrentTrack } from "@/store/features/playlistSlice";
import { trackType } from "@/types";
import classNames from "classnames";
import formatSeconds from "@/lib/formatSeconds";

type TrackType = {
    tracksData: trackType[],
    trackData: trackType,
}

export default function Track({ tracksData, trackData }: TrackType) {
    const { isLiked, handleLike } = useLikeTrack(trackData);
    const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
    const { name, author, album, duration_in_seconds, id } = trackData;
    const isCurrent = currentTrack ? currentTrack.id === id : false;
    const isPlaying = useAppSelector((state) => state.playlist.isPlaying);
    const dispatch = useAppDispatch();
    const handleTrackClick = () => {
        dispatch(setCurrentTrack({ trackData, tracksData }));
    }
    return (
        <div className={styles.playlistItem} >
            <div className={styles.playlistTrack}>
                <div onClick={handleTrackClick} className={styles.trackTitle}>
                    <div className={styles.trackTitleImage}>
                        {isCurrent ?
                        (<div className={classNames(styles.playingDot, isPlaying && styles.playingDotAnimation)}></div>) :
                        (<svg className={styles.trackTitleSvg}>
                            <use xlinkHref="/img/icon/sprite.svg#icon-note" />
                        </svg>) 
                        }
                    </div>
                    <div className={styles.trackTitleText}>
                        <span className={styles.trackTitleLink} >
                            {name} <span className={styles.trackTitleSpan} />
                        </span>
                    </div>
                </div>
                <div className={styles.trackAuthor}>
                    <span className={styles.trackAuthorLink} >
                        {author}
                    </span>
                </div>
                <div className={styles.trackAlbum}>
                    <span className={styles.trackAlbumLink} >
                        {album}
                    </span>
                </div>
                <div className={styles.trackTime}>
                    <svg onClick={handleLike}  className={styles.trackTimeSvg}>
                        <use xlinkHref={`/img/icon/sprite.svg#${isLiked ? "icon-like" : "icon-dislike"}`} />
                    </svg>
                    <span className={styles.trackTimeText}>{formatSeconds(duration_in_seconds)}</span>
                </div>
            </div>
        </div>
    )
}