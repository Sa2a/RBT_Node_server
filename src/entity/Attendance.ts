import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Supervisor} from "./Supervisor";
import {Student} from "./Student";

@Entity()
export class Attendance {
    @PrimaryGeneratedColumn()
    id: number;
    @Column('datetime')
    dateTime: Date;
    @Column({unique:true})
    email: string;
    @Column()
    status: boolean;

    @ManyToOne(type => Student, stud=> stud.attendances)
    student:Student;
}