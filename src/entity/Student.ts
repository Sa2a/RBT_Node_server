import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Parent} from "./Parent";
import {Supervisor} from "./Supervisor";
import {Attendance} from "./Attendance";
import {Bus} from "./Bus";
import {Coordinates} from "./Coordinates";

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({length: 50})
    name: string;
    @Column('date')
    dateOfBirth: Date;
    @Column()
    age: number;
    @Column()
    classNumber: number;
    @Column()
    level: number;

    @ManyToOne(type => Parent, parent => parent.students)
    parent: Parent;

    @ManyToOne(type => Supervisor, supervisor => supervisor.students)
    supervisor: Supervisor;

    @OneToMany(type => Attendance, attendance => attendance.student)
    attendances: Attendance[];

    @ManyToOne(type => Bus, bus => bus.students)
    bus: Bus;

    @OneToOne(type => Coordinates)
    @JoinColumn()
    pickupCoordinate: Coordinates;

}