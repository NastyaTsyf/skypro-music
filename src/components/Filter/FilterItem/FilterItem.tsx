import classNames from "classnames"
import styles from "./FilterItem.module.css"
import { trackType } from "@/types"
import { order } from "../data"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { setFilters } from "@/store/features/playlistSlice"

type FilterItemType = {
    title: string,
    value: "author" | "genre" | "order",
    handleFilterClick: (newFilter: string) => void,
    isOpened: boolean,
    tracksData: trackType[],
    filterQuantity: number
}

export default function FilterItem({ handleFilterClick, title, value, isOpened, tracksData, filterQuantity }: FilterItemType) {
    const dispatch = useAppDispatch()
    const authorsList = useAppSelector((state) => state.playlist.filterOptions.author)
    function getFilterList(): string[] {
        if (value !== "order") {
            const array = new Set(tracksData?.map((track) => track[value]))
            return Array.from(array)
        }
        return order
    }
    getFilterList()

    function toggleFilter(item: string) {
        dispatch(
            setFilters({
                author: authorsList.includes(item)
                    ? authorsList.filter((el) => el !== item)
                    : [...authorsList, item]
            })
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
                {getFilterList().map((item) => (<li onClick={() => toggleFilter(item)} className={classNames(authorsList.includes(item) ? styles.filterItemListItemActive : styles.filterItemListItem)} key={item}>{item}</li>))}
            </ul>)}
            </div>
        </>
    )
}