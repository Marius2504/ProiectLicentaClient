export class Location
{
    public id:number = 0;
    public name:string = ""
    public country:string ="";
    public city:string = "";
    public street:string="";

    constructor(id:number= 0,name:string = "",country:string="",city:string="",street:string="")
    {
        this.id=id;
        this.name = name;
        this.country=country;
        this.city=city;
        this.street=street;
    }
}