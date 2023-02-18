export interface ChatRoom {
    id: string;
    title: string;
    type: ChatRoomType;
    lastOffset: number;
    participantIds: string[];
}

export enum ChatRoomType {
    Self= 'Self',
    Direct= 'Direct',
    Group= 'Group',
}

