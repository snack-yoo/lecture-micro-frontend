import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from 'typeorm';
//
import {User, Authentication, AuthType} from '../model';

@Entity()
export class UserORM implements User {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;
}

@Entity()
export class AuthenticationORM implements Authentication {
    @PrimaryColumn()
    userId: string;

    @Column()
    secret: string;

    @Column({type: 'enum', enum: AuthType})
    type: AuthType;
}

