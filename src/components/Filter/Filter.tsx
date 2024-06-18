'use client'
import styles from "./Filter.module.css"
import FilterItem from "./FilterItem/FilterItem"
import { useState } from "react"
import { filters } from "./data"
import { trackType } from "@/types"
import { useAppSelector } from "@/hooks"

type FilterType = {
  tracksData: trackType[]

}

export default function Filter({ tracksData }: FilterType) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  function handleFilterClick(newFilter: string) {
    setActiveFilter((prev) => prev === newFilter ? null : newFilter)
  }
  const authorsList = useAppSelector((state) => state.playlist.filterOptions.author)
  return (
    <div className={styles.filter}>
      <div className={styles.filterTitle}>Искать по:</div>
      <FilterItem
        isOpened={activeFilter === filters[0].title ? true : false}
        handleFilterClick={handleFilterClick}
        title={filters[0].title}
        value={filters[0].value}
        tracksData={tracksData}
        filterQuantity={authorsList.length} />
      <FilterItem
        isOpened={activeFilter === filters[1].title ? true : false}
        handleFilterClick={handleFilterClick}
        title={filters[1].title}
        value={filters[1].value}
        tracksData={tracksData}
        filterQuantity={0}  />
      <FilterItem
        isOpened={activeFilter === filters[2].title ? true : false}
        handleFilterClick={handleFilterClick}
        title={filters[2].title}
        value={filters[2].value}
        tracksData={tracksData}
        filterQuantity={0}  />
    </div>
  )
}