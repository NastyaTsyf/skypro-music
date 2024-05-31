import classNames from "classnames"
import styles from "./FilterItem.module.css"

type FilterItemType = {
    title: string,
    list: string[],
    handleFilterClick: (newFilter: string) => void,
    isOpened: boolean,

}
export default function FilterItem({ handleFilterClick, title, list, isOpened }: FilterItemType) {
    return (
        <>
            <div className={styles.filterItem}>
                <div onClick={() => handleFilterClick(title)} className={classNames(styles.filterButton, styles.btnText)}>
                    {title}
                </div>
                {isOpened && (<ul className={styles.filterItemList}>
                    {list.map((item) => (<li className={styles.filterItemListItem} key={item}>{item}</li>))}
                </ul>)}
            </div>
        </>
    )
}