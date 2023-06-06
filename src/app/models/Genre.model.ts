import { Song } from "./Song.model";

export class Genre{
    public id:number=0;
    public name:string = "";
    public imagePath:string = "";
    public listSongs:Song[] = []

    constructor(id:number=0,name:string = "",imagePath:string = "",listSongs:Song[] = []) {
        this.id = id;
        this.name = name;
        this.imagePath=imagePath;
        this.listSongs =listSongs;
    }
}