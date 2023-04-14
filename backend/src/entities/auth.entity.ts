import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity({
    name: "users"
})
export class Auth {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text')
    user: string

    @Column('text')
    password: string

}
