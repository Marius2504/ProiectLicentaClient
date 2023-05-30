export class Artist{
    public id:number = 0;
    public name:string = "";
    public description:string = "";
    public imageSrc = "";
    public eventIds:number[] = [];
    public songIds:number[] = [];
    public albumIds:number[] = [];

    
    constructor(id:number,name:string,description:string,imageSrc:string,eventIds:number[],songIds:number[],albumIds:number[]) {
       this.id = id;
       this.description = description;
       this.imageSrc = imageSrc;
       this.name = name;
       this.eventIds = eventIds;
       this.songIds = songIds;
       this.albumIds = albumIds;
    }   
}