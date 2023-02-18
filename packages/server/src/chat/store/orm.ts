import {Column, Entity, PrimaryColumn} from 'typeorm';
//
import {ChatMessage, ChatMessageType, ChatRoom, ChatRoomType} from '../model';
import {ChatOffset} from "../model/ChatOffset";

@Entity()
export class ChatRoomORM implements ChatRoom {
    @PrimaryColumn()
    id: string;

    @Column()
    title: string;

    @Column({type: 'enum', enum: ChatRoomType})
    type: ChatRoomType;

    @Column()
    lastOffset: number;

    @Column('json')
    participantIds: string[];

}

@Entity()
export class ChatMessageORM implements ChatMessage {
    @PrimaryColumn()
    id: string;

    @Column({type: 'bigint'})
    registrationTime: number;
    @Column({type: 'bigint'})
    modificationTime: number;
    @Column()
    offset: number;

    @Column()
    message: string;
    @Column({type: "enum", enum: ChatMessageType})
    type: ChatMessageType;
    @Column()
    senderId: string;
    @Column()
    chatRoomId: string;
}

@Entity()
export class ChatOffsetORM implements ChatOffset {
    @PrimaryColumn()
    userId: string;
    @PrimaryColumn()
    chatRoomId: string;

    @Column()
    offset: number;
}