import { Property } from "./property";

export interface Ad {
    ad_id: number,
    property: Property,
    picture: string,
    price: string,
    location: string,
    details: string
}