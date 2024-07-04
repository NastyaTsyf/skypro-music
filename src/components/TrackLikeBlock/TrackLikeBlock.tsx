import { useLikeTrack } from "@/hooks";
import { trackType } from "@/types";
import styles from "./TrackLikeBlock.module.css"
import classNames from "classnames";

export default function TrackLikeBlock ({currentTrack}:{currentTrack: trackType}) {
    const { isLiked, handleLike } = useLikeTrack(currentTrack);
    return (
        <div className={styles.trackPlayLikeDis}>
        <div onClick={handleLike} className={classNames(styles.trackPlayLike, styles.btnIcon)}>
            <svg className={styles.trackPlayLikeSvg}>
                <use xlinkHref={`/img/icon/sprite.svg#${isLiked ? "icon-like" : "icon-dislike"}`} />
            </svg>
        </div>
    </div>
    )
}