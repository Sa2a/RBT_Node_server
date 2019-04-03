import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Report} from "./Report";
import {Bus} from "./Bus";

@Entity()
export class Driver extends User{
    @OneToMany(type => Report, report => report.driver)
    reports: Report[];

    @ManyToOne(type => Bus, bus=>bus.drivers)
    bus:Bus;
}
