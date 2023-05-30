export class User{
    public id:string = "";
    public name:string = ""
    public email:string = "";
    public emailConfirmed:boolean = false;
    public phoneNumber:string = "";
    public imagePath:string =""

    constructor(id:string,name:string,email:string,emailConfirmed:boolean,phoneNumber:string,imagePath:string,isArtist:boolean) {
        this.id=id;
        this.name = name;
        this.email = email;
        this.emailConfirmed = emailConfirmed;
        this.phoneNumber = phoneNumber;
        this.imagePath = imagePath;
    }

}
