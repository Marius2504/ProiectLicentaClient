export class Client{
    public id:number=0;
    public name:string="";
    public email:string="";
    public age:number=0;
    public playlistIds:number[]=[];

    constructor(id:number,name:string,email:string,age:number,playlistIds:number[]) {
        this.id = id;
        this.name = name;
        this.email =email;
        this.age = age;
        this.playlistIds = playlistIds;
    }
}