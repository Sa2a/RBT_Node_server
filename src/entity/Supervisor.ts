import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Student} from "./Student";
import {Report} from "./Report";
import {Bus} from "./Bus";

@Entity()
export class Supervisor extends User{

    @OneToMany(type => Student, stud=> stud.supervisor)
    students: Student[];

    @OneToMany(type => Report, report => report.supervisor)
    reports: Report[];

    @ManyToOne(type => Bus, bus=>bus.supervisors)
    bus:Bus;
    @Column()
    driver_username: string;
}