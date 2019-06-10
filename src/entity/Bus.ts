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

    @Column()
    capacity: number;

    @OneToMany(type => Student, stud=> stud.bus)
    students: Student[];

    @OneToOne(type => Supervisor, supervisor=> supervisor.bus)
    supervisor: Supervisor;

    @OneToOne(type => Driver, driver=> driver.bus)
    driver: Driver;

    @OneToOne(type => RoutePath, routePath=> routePath.bus)
    @JoinColumn()
    routePath:RoutePath;
}