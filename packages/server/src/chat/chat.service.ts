import {Injectable} from '@nestjs/common';
import {ChatMessage, ChatRoom} from "./model";
import {randomUUID} from "crypto";
import {ChatOffset} from "./model/ChatOffset";
import {DataSource, Repository} from "typeorm";
import {ChatMessageORM, ChatOffsetORM, ChatRoomORM} from "./store/orm";
import {EventEmitter2} from "@nestjs/event-emitter";
import {InjectRepository} from "@nestjs/typeorm";
import {ChatSentEvent, key as ChatSentEventKey } from "./event/ChatSentEvent";

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(ChatRoomORM)
        private chatRoomORMRepository: Repository<ChatRoomORM>,
        @InjectRepository(ChatMessageORM)
        private chatMessageORMRepository: Repository<ChatMessageORM>,
        @InjectRepository(ChatOffsetORM)
        private chatOffsetORMRepository: Repository<ChatOffsetORM>,
        private dataSource: DataSource,
        private eventEmitter: EventEmitter2,

    ) {}

    async open(
        room: Pick<ChatRoom, 'type' | 'title' | 'participantIds'>,
        message: Pick<ChatMessage, 'message' | 'type' | 'senderId'>
    ): Promise<string> {
        const newRoom: ChatRoom = {...room, id: randomUUID(), lastOffset: 0};
        const newMessage: ChatMessage = {
            ...message,
            id: randomUUID(),
            registrationTime: new Date().getTime(),
            modificationTime: 0,
            offset: 0,
            chatRoomId: newRoom.id
        };
        const newOffsets: ChatOffset[] = newRoom.participantIds
            .map(p => ({userId: p, offset: p === newMessage.senderId ? 0 : -1, chatRoomId: newRoom.id}));

        await this.dataSource.transaction(async manager => {
            await manager.insert(ChatRoomORM, newRoom);
            await manager.insert(ChatMessageORM, newMessage);
            await manager.insert(ChatOffsetORM, newOffsets);
        })

        return newRoom.id;
    }

    async send(
        message: Pick<ChatMessage, 'message' | 'type' | 'senderId' | 'chatRoomId'>
    ): Promise<string> {
        const chatRoom = await this.chatRoomORMRepository.findOne({where: {id: message.chatRoomId}});
        if (chatRoom) {
            throw new Error("No Such ChatRoom with id " + message.chatRoomId);
        }
        const newMsg: ChatMessage = {
            ...message,
            id: randomUUID(),
            registrationTime: new Date().getTime(),
            modificationTime: 0,
            offset: chatRoom.lastOffset+1
        }
        await this.chatMessageORMRepository.insert(newMsg);

        const event: ChatSentEvent = {
            chatMessage: newMsg
        }
        this.eventEmitter.emit(ChatSentEventKey, event);

        return newMsg.id;
    }
}
