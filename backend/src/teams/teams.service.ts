import {BadRequestException, Injectable, InternalServerErrorException, Logger} from '@nestjs/common';
import {CreateTeamDto} from './dto/create-team.dto';
import {UpdateTeamDto} from './dto/update-team.dto';
import {Team} from "./entities/team.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Between, Repository} from "typeorm";

@Injectable()
export class TeamsService {

    private readonly logger = new Logger('ProductsService')


    constructor(
        @InjectRepository(Team)
        private readonly teamRepository: Repository<Team>
    ) {
    }

    private handleExceptions(error: any) {
        if (error.code === '23505')
            throw new BadRequestException(error.detail)

        this.logger.error(error)
        throw new InternalServerErrorException('Unexpected error, check server logs')
    }

    async create(createTeamDto: CreateTeamDto) {
        try {

            const team = this.teamRepository.create({
                ...createTeamDto
            })

            await this.teamRepository.save(team)

            return {...team}
        } catch (error) {
            this.handleExceptions(error)
        }
    }

    findAll() {
        return this.teamRepository.find()
    }

    findOne(id: string) {
        return this.teamRepository.findOne({where: {id}})
    }

    findByDates(dates: { start: string, end: string }) {
        return this.teamRepository.find({
            where: {
                fundation: Between(
                    new Date(dates.start),
                    new Date(dates.end)
                ),
            }
        })
    }

    async update(id: string, updateTeamDto: UpdateTeamDto) {

        try {

            const team = await this.teamRepository.preload({
                id,
                ...updateTeamDto,
            })

            await this.teamRepository.save(team)
            return team
        } catch (error) {
            this.handleExceptions(error)
        }

    }

    async remove(id: string) {
        const team = await this.findOne(id)
        return this.teamRepository.remove(team)
    }
}
