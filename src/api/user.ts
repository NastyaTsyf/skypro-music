import { signinFormType, signupFormType } from "@/types"

const apiUrl = "https://skypro-music-api.skyeng.tech/user/"

export const fetchUser = async ({ email, password }: signinFormType) => {
    const response = await fetch(apiUrl + "login/", {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
        }),
        headers: {
            "content-type": "application/json",
        },
    })
        if (response.status === 400) {
            throw new Error("Неверный логин или пароль")
        } else if (!response.ok) {
            throw new Error("Заполните поля")
        }
        const responseData = await response.json()
        return responseData
}

export const fetchTokens = async ({ email, password }: signinFormType) => {
    const response = await fetch(apiUrl + "token/", {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
        }),
        headers: {
            "content-type": "application/json",
        },
    })

        // if (response.status === 400) {
        //     throw new Error("Неверный логин или пароль")
        // } else if (!response.ok) {
        //     throw new Error("Заполните поля")
        // }
        const responseData = await response.json()
        return responseData
}

export const refreshToken = async (refresh: string) => {
  const response = await fetch(apiUrl + "token/refresh/", {
        method: "POST",
        body: JSON.stringify({
          refresh
        }),
        headers: {
          "content-type": "application/json",
        },
      })
      const responseData = await response.json()
      return responseData
}


export const fetchSignup = async({ email, username, password }: signupFormType) => {
  const response = await fetch(apiUrl + "signup/", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          username,
        }),
        headers: {
          // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
          "content-type": "application/json",
        },
      })

      if (response.status === 400) {
            throw new Error("Не получилось зарегистрировать пользователя с указанными данными")
        } else if (!response.ok) {
            throw new Error("Заполните поля")
        } else if (response.status === 500) {
          throw new Error("Сервер сломался")
      } 

      const responseData = await response.json()
      return responseData
}