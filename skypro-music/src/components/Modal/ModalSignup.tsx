import Image from "next/image";
import Link from "next/link";
import styles from "./Modal.module.css"
import classNames from "classnames";

export default function ModalSignup() {
    return (
        <div className={styles.modalBlock}>
        <form className={styles.modalFormLogin}>
          <Link href="/">
            <div className={styles.modalLogo}>
              <Image src="/img/logo_modal.png" alt="logo" width={140} height={21} />
            </div>
          </Link>
          <input
            className={classNames(styles.modalInput, styles.login)}
            type="text"
            name="login"
            placeholder="Почта"
          />
          <input
            className={classNames(styles.modalInput, styles.passwordFirst)}
            type="password"
            name="password"
            placeholder="Пароль"
          />
          <input
            className={classNames(styles.modalInput, styles.passwordDouble)}
            type="password"
            name="password"
            placeholder="Повторите пароль"
          />
          <button className={styles.modalBtnSignupEnt}>
            <Link href="/">Зарегистрироваться</Link>
          </button>
        </form>
      </div>
    )
}