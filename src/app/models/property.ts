import { Ad } from "./ad";

export interface Property {
    property_id: number,
    ad: Ad,
    roomNumber: number,
    type: string,
    state: string,
    size: number,
    lat: number;
    lng: number
}