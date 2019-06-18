import {Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Bus} from "./Bus";
import {Coordinates} from "./Coordinates";

@Entity()
export class RoutePath {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @OneToOne(type => Bus, bus => bus.routePath)
    bus: Bus;

    @OneToMany(type => Coordinates, coordinates => coordinates.routePath)
    coordinates: Coordinates[];
}