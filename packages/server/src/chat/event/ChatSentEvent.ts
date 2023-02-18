import {ChatMessage} from "../model";

export interface ChatSentEvent {
    chatMessage: ChatMessage,
}

export const key = 'chat.chatSent';