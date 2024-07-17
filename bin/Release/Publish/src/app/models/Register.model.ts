export class Register{
    username:string="";
    email:string="";
    password:string="";
    isArtist:boolean=false;
    constructor(username:string="",email:string="",password:string="",isArtist:boolean=false)
    {
        this.username = username;
        this.email = email;
        this.password = password;
        this.isArtist = isArtist;
    }

}