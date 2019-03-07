import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({length: 50})
    name: string;
    @Column()
    dateOfBirth: Date;
    @Column()
    age: number;
    @Column()
    classNumber: number;
    @Column()
    level: number;

}