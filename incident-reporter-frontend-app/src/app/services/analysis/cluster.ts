import { Location } from "./location";

export class Cluster{
    id: number;
    latitude: number;
    longitude: number;
    locations: Location[];

    constructor(id: number, latitude: number, longitude: number, locations: Location[]){
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.locations = locations;
    }

}