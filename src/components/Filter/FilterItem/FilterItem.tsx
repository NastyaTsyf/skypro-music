import classNames from "classnames"
import styles from "./FilterItem.module.css"
import { order } from "../data"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { setFilters, setSortTraks } from "@/store/features/playlistSlice"

type FilterItemType = {
    title: string,
    value: "author" | "genre" | "order",
    handleFilterClick: (newFilter: string) => void,
    isOpened: boolean,
    filterQuantity: number
}

export default function FilterItem({ handleFilterClick, title, value, isOpened, filterQuantity }: FilterItemType) {
    const orderFilter = useAppSelector((state) => state.playlist.filterOptions.order)
    const tracksData = useAppSelector((state) => state.playlist.initialTracks)
    const dispatch = useAppDispatch()
    const authorsList = useAppSelector((state) => state.playlist.filterOptions.author)
    const genresList = useAppSelector((state) => state.playlist.filterOptions.genre)
    function getFilterList(): string[] {
        if (value !== "order") {
            const array = new Set(tracksData?.map((track) => track[value]))
            return Array.from(array)
        }
        return order
    }
    getFilterList()

    function toggleFilter(item: string) {
        if (value === "author") {
            dispatch(
                setFilters({
                    author: authorsList.includes(item)
                        ? authorsList.filter((el) => el !== item)
                        : [...authorsList, item],
                })
            )
        }
        if (value === "genre") {
            dispatch(
                setFilters({
                    genre: genresList.includes(item)
                        ? genresList.filter((el) => el !== item)
                        : [...genresList, item]
                })
            )
        }
    }

    function handleOrderFilter(item: string) {
        dispatch(
            setSortTraks(item)
        )
    }

    return (
        <>
            <div className={styles.filterItem}>
                {filterQuantity !== 0 && (<div className={styles.filterDot}>{filterQuantity}</div>)}
                <div onClick={() => handleFilterClick(title)} className={classNames(styles.filterButton, classNames(isOpened ? styles.btnTextActive : styles.btnText))}>
                    {title}
                </div>
                {isOpened && (<ul className={styles.filterItemList}>
                    {getFilterList().map((item) =>
                    (<li
                        onClick={value === "order" ? () => handleOrderFilter(item) : () => toggleFilter(item)}
                        className={classNames(value === ("author" || "genre") ? ((authorsList.includes(item) || genresList.includes(item)) ? styles.filterItemListItemActive : styles.filterItemListItem) : (item === orderFilter ? styles.filterItemListItemActive : styles.filterItemListItem))}
                        key={item}>
                        {item}
                    </li>))}
                </ul>)}
            </div>
        </>
    )
}