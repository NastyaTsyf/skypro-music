import classNames from "classnames"
import styles from "./Filter.module.css"
export default function Filter() {
    return (
        <div className={styles.filter}>
        <div className={styles.filterTitle}>Искать по:</div>
        <div className={classNames(styles.filterButton, styles.btnText, styles.buttonAuthor)}>
          исполнителю
        </div>
        <div className={classNames(styles.filterButton, styles.btnText, styles.buttonYear)}>
          году выпуска
        </div>
        <div className={classNames(styles.filterButton, styles.btnText, styles.buttonGenre)}>жанру</div>
      </div>
    )
}