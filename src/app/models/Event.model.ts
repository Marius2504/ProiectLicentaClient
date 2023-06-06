export class Event{
    public id:number=0
    public name:string=""
    public date:Date= new Date(Date.now())
    public locationId:number =0;
    public tickedIds:number[] = []
    public artistIds:number[] = []

    constructor(id:number=0,name:string="",date:Date= new Date(Date.now()),locationId:number=0,tickedIds:number[]=[],artistIds:number[]=[])
    {
        this.id=id;
        this.name=name;
        this.date=date;
        this.locationId=locationId;
        this.tickedIds=tickedIds;
        this.artistIds=artistIds;
    }
}