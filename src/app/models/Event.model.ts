import { Time } from "@angular/common";

export interface Event{
    id:number,
    name:string,
    date:Time
    locationId:number,
    tickedIds:number[],
    artistIds:number[]
}