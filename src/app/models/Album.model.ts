export class Album{
    public id:number = 0;
    public name:string =""
    public description:string = ""
    public imagePath:string = ""
    public year:number =2000
    public artistId:number =0

 
    constructor(id:number= 0,name:string="",description:string= "",imagePath:string= "",year:number=2000,artistId:number=0) {
        this.id=id;
        this.name=name;
        this.description=description;
        this.imagePath = imagePath;
        this.year=year;
        this.artistId = artistId
    }


}