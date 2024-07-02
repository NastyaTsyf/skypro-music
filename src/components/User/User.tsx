'use client'
import { useAppDispatch, useAppSelector, useInitializeLikedTracks } from "@/hooks";
import styles from "./User.module.css"
import { getNewAccessToken, logout } from "@/store/features/userSlice";

export default function User() {
  const dispatch = useAppDispatch()
  useInitializeLikedTracks();
  const userName = useAppSelector((state) => state.user.user?.username);
  const refreshToken = useAppSelector((state) => state.user.tokens.refresh);
  if (!userName) {
    return null;
  }

  async function getFreshAccess() {
    try {
      if (refreshToken) {await Promise.all([
        dispatch(getNewAccessToken(refreshToken)).unwrap()
      ])}
    } catch (error) {
      console.log(error)
    }
  }

  setInterval(() => getFreshAccess(), 2000000);
  return (
    <div className={styles.sidebarPersonal}>
      <p className={styles.sidebarPersonalName}>{userName}</p>
      <div onClick={() => dispatch(logout())} className={styles.sidebarIcon}>
        <svg>
          <use xlinkHref="/img/icon/sprite.svg#logout" />
        </svg>
      </div>
    </div>
  )
}