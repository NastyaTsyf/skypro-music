'use client'

import Image from "next/image";
import Burger from "../Burger/Burger";
import Menu from "../Menu/Menu";
import styles from "./Navigation.module.css"
import { useState } from "react";
import Link from "next/link";


export default function Navigation() {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  function handleBurgerClick() {
    setIsOpened((prev) => !prev)
  }
  return (
    <nav className={styles.nav}>
      <div className={styles.navLogo}>
        <Link href="/tracks">
          <Image alt="логотип skypro-music" width={113} height={17} className={styles.logoImage} src="/img/logo.png" />
        </Link>
      </div>
      <Burger handleBurgerClick={handleBurgerClick} />
      {isOpened && (<Menu />)}
    </nav>
  )
}