import {Injectable} from '@nestjs/common';
import {OnEvent} from "@nestjs/event-emitter";
import {ChatSentEvent, key as ChatSentEventKey} from './event/ChatSentEvent';
import {ChatService} from "./chat.service";


@Injectable()
export class ChatListener {
    constructor(private readonly chatService: ChatService) {}

    @OnEvent(ChatSentEventKey)
    onChatSentEvent(event: ChatSentEvent) {
        console.log(event);
    }
}
