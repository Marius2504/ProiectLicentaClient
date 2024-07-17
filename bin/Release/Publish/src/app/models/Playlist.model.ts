import { Song } from "./Song.model";

export class Playlist{
    public id:number=0;
    public name:string="";
    public description:string="";
    public imagePath:string="";
    public clientIds:number[] =[]
    public songList:Song[] = []

    constructor(id:number=0,name:string="",imagePath:string="",description:string="",clientIds:number[] =[],songList:Song[] = [])
    {
        this.id = id;
        this.imagePath = imagePath;
        this.description = description;
        this.clientIds = clientIds;
        this.songList = songList;
    }
}