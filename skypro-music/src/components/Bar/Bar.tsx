import Player from "../Player/Player";
import Volume from "../Volume/Volume";
import styles from "./Bar.module.css"

export default function Bar() {
    return (
        <div className={styles.bar}>
        <div className={styles.barContent}>
          <div className={styles.barPlayerProgress} />
          <div className={styles.barPlayerBlock}>
            <Player />
            <Volume />
          </div>
        </div>
      </div>
    )
}