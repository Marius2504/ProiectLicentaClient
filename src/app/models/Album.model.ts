export class Album{
    public id:number = 0;
    public description:string = ""
    public artistId:string =""

 
    constructor(id:number,description:string,artistId:string) {
        this.id=id;
        this.description=description;
        this.artistId = artistId
    }


}