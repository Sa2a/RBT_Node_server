import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Student} from "./Student";


@Entity()
export class Attendance {
    @PrimaryGeneratedColumn()
    id: number;
    @Column('date')
    dateTime: Date;
    @Column()
    email: string;
    @Column()
    student_name: string;

    @Column()
    status: boolean;

    @ManyToOne(type => Student, stud=> stud.attendances)
    student:Student;
}