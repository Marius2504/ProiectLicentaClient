import { Message } from "./Message.model";

export class Song{
    public id:number = 0;
    public name:string = "";
    public duration:number = 0;
    public imagePath:string="";
    public serverLink:string = "";
    public artistId:number=0;   
    public genreId:number=0;
    public albumId:number=0;
    public messages:Message[]=[]

    constructor(name:string= "",duration:number= 0,imagePath:string= "",serverLink:string= "",artistId:number= 0,genreId:number= 0,albumId:number= 0,id:number=0,
    messages:Message[]=[]) {
        this.name = name;
        this.duration = duration;
        this.imagePath = imagePath;
        this.serverLink = serverLink;
        this.artistId = artistId;
        this.genreId = genreId;
        this.albumId = albumId;
        this.id = id; 
        this.messages=messages;
    }
}