'use client'
import Link from "next/link"
import styles from "./Menu.module.css"
import { useAppDispatch, useAppSelector } from "@/hooks";
import { logout } from "@/store/features/userSlice";

export default function Menu() {
  const userName = useAppSelector((state) => state.user.user?.username);
  const dispatch = useAppDispatch()
  return (
    <div className={styles.menu}>
      <ul className={styles.menuList}>
        <li className={styles.menuItem}>
          <Link href="/tracks" className={styles.menuLink}>
            Главное
          </Link>
        </li>
        {userName &&
          <li className={styles.menuItem}>
            <Link href={"/tracks/favorite"} className={styles.menuLink}>
              Мой плейлист
            </Link>
          </li>
        }
        <li className={styles.menuItem}>
          {userName ?
            <div onClick={() => {dispatch(logout()); localStorage.removeItem("user"); localStorage.removeItem("token")}} className={styles.menuLink}>
              Выйти
            </div>
            :
            <Link href="/signin" className={styles.menuLink}>
              Войти
            </Link>
          }
        </li>
      </ul>
    </div>
  )
}