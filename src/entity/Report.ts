import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Parent} from "./Parent";
import {Supervisor} from "./Supervisor";
import {Driver} from "./Driver";

@Entity()
export class Report {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    content:String;

    @Column()
    type:String;

    @ManyToOne(type => Parent, parent => parent.reports)
    parent: Parent;

    @ManyToOne(type => Supervisor, supervisor => supervisor.reports)
    supervisor: Supervisor;

    @ManyToOne(type => Driver, driver => driver.reports)
    driver: Driver;
}