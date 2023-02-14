import {Column, Entity, PrimaryColumn} from 'typeorm';
//
import {Profile} from '../../model';

@Entity()
export class ProfileORM implements Profile {
    @PrimaryColumn()
    userId: string;

    @Column()
    photoUri: string;

    @Column()
    displayName: string;
}