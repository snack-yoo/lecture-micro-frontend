import {Column, Entity, PrimaryColumn} from 'typeorm';
//
import {Authentication, AuthType} from '../../model';

@Entity()
export class AuthenticationORM implements Authentication {
    @PrimaryColumn()
    userId: string;

    @Column()
    secret: string;

    @Column({type: 'enum', enum: AuthType})
    type: AuthType;
}