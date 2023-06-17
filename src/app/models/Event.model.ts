export class Event{
    public id:number=0
    public name:string=""
    public dateTime:string =""
    public locationId:number =0;
    public tickedIds:number[] = []
    public artistIds:number[] = []

    constructor(id:number=0,name:string="",dateTime:Date= new Date(Date.now()),locationId:number=0,tickedIds:number[]=[],artistIds:number[]=[])
    {
        this.id=id;
        this.name=name;
        this.dateTime=dateTime.getFullYear().toString() + " " + (dateTime.getMonth() + 1).toString()  + " " + dateTime.getDate();
        this.locationId=locationId;
        this.tickedIds=tickedIds;
        this.artistIds=artistIds;
    }
}