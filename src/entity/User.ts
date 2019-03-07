import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50, unique: true})
    userName: string;

    @Column({length: 32})
    password: string;

    @Column({unique: true})
    email: string;

    @Column({length:32})
    contactNumber: string;

    @Column()
    dateOfBirth: Date;

    @Column({unique:true})
    nationalNumber:string;
}
