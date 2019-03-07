import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {RoutePath} from "./RoutePath";

@Entity()
export class Coordinates {

    @PrimaryGeneratedColumn()
    id:number;

    @Column('double')
    latitude:number;

    @Column('double')
    longitude:number;

    @ManyToOne(type => RoutePath, routePath =>routePath.coordinates)
    routePath: RoutePath;
}