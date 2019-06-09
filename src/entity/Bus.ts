import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Student} from "./Student";
import {Supervisor} from "./Supervisor";
import {Driver} from "./Driver";
import {RoutePath} from "./RoutePath";

@Entity()
export class Bus {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique: true})
    bus_numbers:String;

    @OneToMany(type => Student, stud=> stud.bus)
    students: Student[];

    @OneToOne(type => Supervisor, supervisor=> supervisor.bus)
    supervisors: Supervisor;

    @OneToOne(type => Driver, driver=> driver.bus)
    drivers: Driver;

    @OneToOne(type => RoutePath)
    @JoinColumn()
    routePath:RoutePath;
}