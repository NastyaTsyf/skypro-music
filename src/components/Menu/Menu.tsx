'use client'
import Link from "next/link"
import styles from "./Menu.module.css"
import { useAppDispatch, useAppSelector } from "@/hooks";
import { logout } from "@/store/features/userSlice";

export default function Menu() {
  const tokens = useAppSelector((state) => state.user.tokens);
  const dispatch = useAppDispatch()
  return (
    <div className={styles.menu}>
      <ul className={styles.menuList}>
        <li className={styles.menuItem}>
          <Link href="/tracks" className={styles.menuLink}>
            Главное
          </Link>
        </li>
        {tokens.access &&
          <li className={styles.menuItem}>
            <Link href={"/tracks/favorite"} className={styles.menuLink}>
              Мой плейлист
            </Link>
          </li>
        }
        <li className={styles.menuItem}>
          {tokens.access ?
            <div onClick={() => dispatch(logout())} className={styles.menuLink}>
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