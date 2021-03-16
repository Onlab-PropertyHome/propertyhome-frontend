import { Ad } from "./ad";

// export class User {
//     constructor(
//         public id: number,
//         public name: string,
//         public email: string,
//         public password: string,
//         public tel: string,
//         public ads: Ad[]
//     ) { }
// }

export interface User {
    id: number,
    name: string,
    email: string,
    password: string,
    tel: string,
    ads: Ad[]
}

export class UserLoginDTO {
    constructor(
        public email: string,
        public password: string
    ) { }
}

export class UserDTO {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public tel: string
    ) { }
}