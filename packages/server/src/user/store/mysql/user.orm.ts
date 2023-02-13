import {Entity, Column, PrimaryGeneratedColumn, PrimaryColumn} from 'typeorm';
//
import {User} from '../../model';

@Entity()
export class UserORM implements User {
    @PrimaryColumn()
    id: string;
    
    @Column()
    name: string;
}