import { User } from "./user";

export class MessageModel {

    messageId : number;

    senderUserId : number;

    senderUser : User;

    content : string;

    datetime : Date;

    chatId : number;
    
    datetimeFormatted: string | null;
}
