'use client'
import Image from "next/image";
import Link from "next/link";
import styles from "./Modal.module.css"
import classNames from "classnames";
import { useState } from "react";
import { useAppDispatch } from "@/hooks";
import { getTokens, getUser } from "@/store/features/userSlice";
import { useRouter } from "next/navigation";

export default function ModalSignin() {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setFormData((prevFormData) => {
            return {
                ...prevFormData, [name]: value
            }
        })
    }

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        try {
            await Promise.all([
                dispatch(getTokens(formData)).unwrap().then((data) => {
                    localStorage.setItem("access", JSON.stringify(data.access));
                    localStorage.setItem("refresh", JSON.stringify(data.refresh))
                }),
                dispatch(getUser(formData)).unwrap().then((data) => {
                    localStorage.setItem("user", JSON.stringify(data))
                })
            ])
            router.push("/")
        } catch (error) {
            console.log(error)
        }
    }
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
                    type="email"
                    name="email"
                    placeholder="Почта"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    className={classNames(styles.modalInput, styles.password)}
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button className={styles.modalBtnEnter} onClick={handleSubmit}>
                    Войти
                </button>
                <button className={styles.modalBtnSignup}>
                    <Link href="/signup">Зарегистрироваться</Link>
                </button>
            </form>
        </div>
    )
}