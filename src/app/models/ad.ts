import { Property } from "./property";

// export class Ad {
//     constructor(
//         public ad_id: number,
//         public property: Property,
//         public picture: string,
//         public price: string,
//         public location: string,
//         public details: string
//     ) { }
// }

export interface Ad {
    ad_id: number,
    property: Property,
    picture: string,
    price: string,
    location: string,
    details: string
}