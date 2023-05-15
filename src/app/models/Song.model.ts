export class Song{
    public name:string = "";
    public duration:number = 0;
    public serverLink:string = "";
    public artistId:number=0;
    public genreId:number=0;
    public albumId:number=0;

    constructor(name:string,duration:number,serverLink:string,artistId:number,genreId:number,albumId:number) {
        this.name = name;
        this.duration = duration;
        this.serverLink = serverLink;
        this.artistId = artistId;
        this.genreId = genreId;
        this.albumId = albumId; 
    }
}