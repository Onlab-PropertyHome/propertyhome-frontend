export class User {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public tel: string
    ) { }
}

export class UserLoginDTO {
    constructor(
        public email: string,
        public password: string
    ) { }
}