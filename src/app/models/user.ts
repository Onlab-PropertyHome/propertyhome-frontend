import { Ad } from "./ad";

export interface User {
    id: number,
    name: string,
    email: string,
    password: string,
    tel: string,
    picture: string,
    favAds: number[],
    ads: Ad[]
}

export interface UserDetails {
    name: string,
    picture: string,
    tel: string
}