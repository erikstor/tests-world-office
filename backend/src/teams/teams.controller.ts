import {Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException} from '@nestjs/common';
import {TeamsService} from './teams.service';
import {CreateTeamDto} from './dto/create-team.dto';
import {UpdateTeamDto} from './dto/update-team.dto';
import {isDateString} from "class-validator";

@Controller('equipos')
export class TeamsController {
    constructor(private readonly teamsService: TeamsService) {
    }

    @Post('crear')
    create(@Body() createTeamDto: CreateTeamDto) {
        return this.teamsService.create(createTeamDto);
    }

    @Get('listar')
    findAll() {
        return this.teamsService.findAll();
    }

    @Get('consultar/:id')
    findOne(@Param('id') id: string) {
        return this.teamsService.findOne(id);
    }

    @Get('consultar/:start/:end')
    findByDates(@Param('start') start: string, @Param('end') end: string) {

        if (
            !isDateString(start) ||
            !isDateString(end)
        ) {
            throw new BadRequestException('The fields must be a date')
        }


        return this.teamsService.findByDates({start, end});
    }

    @Patch('actualizar/:id')
    update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
        return this.teamsService.update(id, updateTeamDto);
    }

    @Delete('eliminar/:id')
    remove(@Param('id') id: string) {
        return this.teamsService.remove(id);
    }
}
