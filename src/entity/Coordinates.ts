import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Coordinates {

    @PrimaryGeneratedColumn()

    id:number;

    @Column()

    letittude:number;

    @Column()

    longitude:number;

}