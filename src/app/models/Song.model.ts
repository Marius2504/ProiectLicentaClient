export class Song{
    public id:number = 0;
    public name:string = "";
    public duration:number = 0;
    public imagePath:string="";
    public serverLink:string = "";
    public artistId:number=0;
    public genreId:number=0;
    public albumId:number=0;

    constructor(name:string,duration:number,imagePath:string,serverLink:string,artistId:number,genreId:number,albumId:number,id:number=0) {
        this.name = name;
        this.duration = duration;
        this.imagePath = imagePath;
        this.serverLink = serverLink;
        this.artistId = artistId;
        this.genreId = genreId;
        this.albumId = albumId;
        this.id = id; 
    }
}