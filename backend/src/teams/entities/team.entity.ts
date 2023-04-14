import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({
    name: "teams"
})
export class Team {


    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('text')
    name: string

    @Column('text')
    stadium: string

    @Column('text')
    webSite: string

    @Column('text')
    country: string

    @Column('date')
    fundation: Date

    @Column('text')
    coach: string

    @Column('text')
    ability: string

    @Column('text')
    worth: number

}
