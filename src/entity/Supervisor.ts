import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
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

    @OneToOne(type => Bus, bus=>bus.supervisor)
    @JoinColumn()
    bus:Bus;

    @Column()
    driver_username: string;
}