import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Student} from "./Student";
import {Report} from "./Report";

@Entity()
export class Parent extends User{
    @OneToMany(type => Student, stud=> stud.parent)
    students: Student[];

    @OneToMany(type => Report, report => report.parent)
    reports: Report[];
    @Column()
    driver_username:String;
}