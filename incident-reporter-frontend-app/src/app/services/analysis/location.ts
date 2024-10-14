import { Incident } from "src/app/models/incident";

export class Location{

    id: number;
    belongingClusterId: number;
    incident: Incident;

    constructor(id: number, belongingClusterId: number, incident: Incident){
        this.id = id;
        this.belongingClusterId = belongingClusterId;
        this.incident = incident;
    }
}