export class Location
{
    public id:number = 0;
    public country:string ="";
    public city:string = "";
    public street:string="";

    constructor(id:number,country:string,city:string,street:string)
    {
        this.id=id;
        this.country=country;
        this.city=city;
        this.street=street;
    }
}