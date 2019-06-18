import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {RoutePath} from "./RoutePath";

@Entity()
export class Coordinates {

    @PrimaryGeneratedColumn()
    id: number;

    //for pickUp points only
    @Column()
    label: string;

    //for pickUp points only
    @Column()
    address: string;

    @Column('double')
    latitude: number;

    @Column('double')
    longitude: number;

    @ManyToOne(type => RoutePath, routePath => routePath.coordinates)
    routePath: RoutePath;
}