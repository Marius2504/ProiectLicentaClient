import { Message } from "./Message.model";
import { Song } from "./Song.model";

export class User{
    public id:string = "";
    public name:string = ""
    public email:string = "";
    public emailConfirmed:boolean = false;
    public phoneNumber:string = "";
    public imagePath:string =""
    public likedSongs:Song[] = []
    public messages:Message[] = []

    constructor(id:string= "",name:string= "",email:string= "",emailConfirmed:boolean= false,phoneNumber:string= "",
    imagePath:string= "",likedSongs:Song[]=[],messages:Message[]=[]) {
        this.id=id;
        this.name = name;
        this.email = email;
        this.emailConfirmed = emailConfirmed;
        this.phoneNumber = phoneNumber;
        this.imagePath = imagePath;
        this.likedSongs = likedSongs;
        this.messages= messages;
    }

}
