import { ChangeEvent, useState } from "react"
import styles from "./Search.module.css"
import { useAppDispatch } from "@/hooks";
import { setFilters } from "@/store/features/playlistSlice";

export default function Search() {
    const dispatch = useAppDispatch()
    const [searchValue, setSearchValue] = useState('');
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
        dispatch(setFilters({searchValue: e.target.value}))
    }
    return (
        <div className={styles.search}>
            <svg className={styles.searchSvg}>
                <use xlinkHref="/img/icon/sprite.svg#icon-search" />
            </svg>
            <input
                className={styles.searchText}
                type="search"
                placeholder="Поиск"
                name="search"
                value={searchValue}
                onChange={handleChange}
            />
        </div>
    )
}