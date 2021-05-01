import { Ad } from "./ad";
import { AdSearch } from "./adsearch";

export interface User {
    id: number,
    name: string,
    email: string,
    password: string,
    tel: string,
    picture: string,
    favAds: number[],
    ads: Ad[],
    searches: AdSearch[]
}

export interface UserDetails {
    name: string,
    picture: string,
    tel: string
}