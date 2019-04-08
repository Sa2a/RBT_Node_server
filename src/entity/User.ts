import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 32})
    firstName: string;

    @Column({length: 32})
    lastName: string;

    @Column({length: 32})
    c: string;

    @Column({length: 32})
    password: string;

    @Column({unique: true})
    email: string;

    @Column({unique:true})
    contactNumber: string;

    @Column()
    address: string;

    @Column('date')
    dateOfBirth: Date;

    @Column({unique:true})
    nationalNumber:string;
}
