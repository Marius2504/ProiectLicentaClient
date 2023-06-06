import { Song } from "./Song.model";
import { User } from "./User.model";

export class Message{
    id:number;
    text:string;
    whoSentId:string;
    songId:number;
    song:Song;
    likesFromUsers:User[] 

    constructor(id:number = 0,text:string="",whoSentId:string="",songId:number=0,song:Song= new Song(),
    likesFromUsers:User[]=[])
    {
        this.id = id;
        this.text=text;
        this.whoSentId=whoSentId;
        this.songId = songId;
        this.song=song;
        this.likesFromUsers = likesFromUsers;
    }
}

