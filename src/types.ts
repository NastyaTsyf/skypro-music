export type userType = {
    id: number,
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string
}

export type trackType = {
    id: number,
    name: string,
    author: string,
    release_date: string,
    genre: string,
    duration_in_seconds: number,
    album: string,
    logo: string | null,
    track_file: string,
    stared_user: userType[]

}

export type signinFormType = {
    email: string,
    password: string
}

export type tokensType = {
    access: string | null,
    refresh: string | null
}


export type signupFormType = {
    email: string,
    password: string,
    username: string

}


