import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Parent} from "./Parent";
import {Supervisor} from "./Supervisor";
import {Driver} from "./Driver";

@Entity()
export class Report {

    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    type_of_user:String;
    @Column()
    content:String;
    @Column()
    answer:String;

    @Column('datetime')
    dateTime: Date;

    @Column()
    User_mail:String;

    @Column()
    Ishidden:boolean;
    @Column()
    first_time:boolean;

    @Column()
    receiver_mail_or_id:String;

    @ManyToOne(type => Parent, parent => parent.reports)
    parent: Parent;

    @ManyToOne(type => Supervisor, supervisor => supervisor.reports)
    supervisor: Supervisor;

    @ManyToOne(type => Driver, driver => driver.reports)
    driver: Driver;
}