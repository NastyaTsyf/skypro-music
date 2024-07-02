'use client'
import Image from "next/image";
import Link from "next/link";
import styles from "./Modal.module.css"
import classNames from "classnames";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/hooks";
import { useState } from "react";
import { getSignup, getTokens, getUser } from "@/store/features/userSlice";

export default function ModalSignup() {

  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
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
        dispatch(getSignup(formData)).unwrap()
      ]).then(() => {Promise.all([
        dispatch(getTokens(formData)).unwrap(),
        dispatch(getUser(formData)).unwrap(),
      ])})
    } catch (error) {
      console.log(error)
    }
  }
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
          name="email"
          placeholder="Почта"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          className={classNames(styles.modalInput, styles.passwordFirst)}
          type="text"
          name="username"
          placeholder="Логин"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          className={classNames(styles.modalInput, styles.passwordDouble)}
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
        />
        <button onClick={handleSubmit} className={styles.modalBtnSignupEnt}>
          <Link href="/">Зарегистрироваться</Link>
        </button>
      </form>
    </div>
  )
}