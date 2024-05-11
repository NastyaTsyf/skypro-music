import Filter from "../Filter/Filter";
import PlaylistContent from "../PlaylistContenet/PlaylistContent";
import Search from "../Search/Search";
import styles from "./Centerblock.module.css"

export default function Centerblock() {
    return (
        <div className={styles.centerblock}>
        <Search />
        <h2 className={styles.centerblockH2}>Треки</h2>
        <Filter />
        <PlaylistContent />
      </div>
    )
}