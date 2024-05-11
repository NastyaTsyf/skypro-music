import Image from "next/image";
import Link from "next/link";
import styles from "./Modal.module.css"
import classNames from "classnames";

export default function ModalSignin() {
    return (
        <div className={styles.modalBlock}>
        <form className={styles.modalFormLogin} action="#">
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
                className={classNames(styles.modalInput, styles.password)}
                type="password"
                name="password"
                placeholder="Пароль"
            />
            <button className={styles.modalBtnEnter}>
                <Link href="/">Войти</Link>
            </button>
            <button className={styles.modalBtnSignup}>
                <Link href="/signup">Зарегистрироваться</Link>
            </button>
        </form>
    </div>
    )
}