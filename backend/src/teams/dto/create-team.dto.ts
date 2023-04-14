import {IsDate, IsDateString, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateTeamDto {


    @IsString()
    @IsOptional()
    id: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    stadium: string

    @IsString()
    @IsNotEmpty()
    webSite: string

    @IsString()
    @IsNotEmpty()
    country: string

    @IsDateString()
    @IsNotEmpty()
    fundation: string

    @IsString()
    @IsNotEmpty()
    coach: string

    @IsString()
    @IsNotEmpty()
    ability: string

    @IsString()
    @IsNotEmpty()
    worth: number

}





