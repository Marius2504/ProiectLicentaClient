export class Register{
    username:string="";
    email:string="";
    password:string="";
    isAdmin:boolean=false;
    constructor(username:string,email:string,password:string,isAdmin:boolean)
    {
        this.username = username;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
    }

}