import { Ad } from "./ad";

// export class Property {
//     constructor(
//         public property_id: number,
//         public ad: Ad,
//         public roomNumber: number,
//         public type: string,
//         public state: string,
//         public size: number
//     ) {}
// }

export interface Property {
    property_id: number,
    ad: Ad,
    roomNumber: number,
    type: string,
    state: string,
    size: number,
    latitude: number;
    longitude: number
}