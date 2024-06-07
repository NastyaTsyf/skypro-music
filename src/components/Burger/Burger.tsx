import styles from "./Burger.module.css"

type BurgerType = {
    handleBurgerClick: () => void,
}
export default function Burger({handleBurgerClick}: BurgerType) {
    return (
        <div onClick={() => handleBurgerClick()} className={styles.burger}>
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
            <span className={styles.burgerLine} />
        </div>
    )
}