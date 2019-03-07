import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Bus {

    @PrimaryGeneratedColumn()

    id:number;

    @Column()

    bus_numbers:String



}