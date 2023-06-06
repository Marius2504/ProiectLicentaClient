export class Artist{
    public id:number = 0;
    public name:string = "";
    public description:string = "";
    public imagePath:string ="";
    public appUserId:string = ""
    public eventIds:number[] = [];
    public songIds:number[] = [];
    public albumIds:number[] = [];

    
    constructor(id:number= 0,name:string= "",description:string= "",imagePath:string ="",appUserId:string = "",eventIds:number[]= [],songIds:number[]= [],albumIds:number[]= []) {
       this.id = id;
       this.description = description;
       this.imagePath =imagePath;
       this.appUserId = appUserId;
       this.name = name;
       this.eventIds = eventIds;
       this.songIds = songIds;
       this.albumIds = albumIds;
    }   
}