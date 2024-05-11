import Image from "next/image";
import Burger from "../Burger/Burger";
import Menu from "../Menu/Menu";
import styles from "./Navigation.module.css"

export default function Navigation() {
    return(
        <nav className={styles.nav}>
        <div className={styles.navLogo}>
          <Image alt="логотип skypro-music" width={113} height={17} className={styles.logoImage} src="/img/logo.png" />
        </div>
        <Burger />
        <Menu />
      </nav>
    )
}