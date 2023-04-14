import {IsNotEmpty, IsString} from "class-validator";

export class JWTAuthDto {
    @IsString()
    @IsNotEmpty()
    user: string

    @IsString()
    @IsNotEmpty()
    password: string
}
