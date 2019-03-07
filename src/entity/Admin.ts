import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

@Entity()
export class Admin extends User{

}
