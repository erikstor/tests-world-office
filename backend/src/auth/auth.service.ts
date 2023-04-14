import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {JWTAuthDto} from './dto/j-w-t-auth.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Auth} from "../entities/auth.entity";
import {sign, verify} from 'jsonwebtoken'

@Injectable()
export class AuthService {

    secretKey = `secret`

    constructor(
        @InjectRepository(Auth)
        private readonly userRepository: Repository<Auth>
    ) {
    }

    async getJWT(credentials: JWTAuthDto) {

        const user = await this.userRepository.findOne({
            where: {
                user: credentials.user,
                password: credentials.password,
            }
        })

        if (!user) {
            throw new NotFoundException("Check the credentials we don't have users with this")
        }

        return this.generateJWT(user.id)

    }

    generateJWT(payload) {

        const token = sign({payload}, this.secretKey, {
            expiresIn: "1d"
        })

        return {token}

    }

    verifyJWT(token) {
        verify(token, this.secretKey, function (err, decoded) {
            if (err){
                throw new UnauthorizedException('La sesion caduco')
            }
        });
    }
}
