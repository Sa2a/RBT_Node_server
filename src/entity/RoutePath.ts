import {Entity, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Bus} from "./Bus";
import {Coordinates} from "./Coordinates";

@Entity()
export class RoutePath {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => Bus, bus=> bus.routePath)
    bus:Bus;

    @OneToMany(type => Coordinates, coordinates=> coordinates.routePath)
    coordinates: Coordinates[];
}