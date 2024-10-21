import { Location } from "./location";

export class Cluster{
    id: number;
    latitude: number;
    longitude: number;
    items: Location[];

    constructor(id: number, latitude: number, longitude: number, items: Location[]){
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.items = items;
    }

}