export class Event{
    public id:number=0
    public name:string=""
    public date:Date= new Date(Date.now())
    public locationId:number =0;
    public tickedIds:number[] = []
    public artistIds:number[] = []

    constructor(id:number,name:string,date:Date,locationId:number,tickedIds:number[],artistIds:number[])
    {
        this.id=id;
        this.name=name;
        this.date=date;
        this.locationId=locationId;
        this.tickedIds=tickedIds;
        this.artistIds=artistIds;
    }
}