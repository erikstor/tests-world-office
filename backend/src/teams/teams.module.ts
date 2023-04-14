import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {TeamsService} from './teams.service';
import {TeamsController} from './teams.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Team} from "./entities/team.entity";
import {ApiTokenCheckMiddleware} from "../common/middleware/api-token-check.middleware";
import {AuthModule} from "../auth/auth.module";


@Module({
    controllers: [TeamsController],
    providers: [TeamsService],
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([
            Team
        ])
    ]
})
export class TeamsModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(ApiTokenCheckMiddleware)
            .exclude(
                {
                    path:'equipos/listar',
                    method: RequestMethod.GET
                },
                {
                    path:'equipos/consultar/:id',
                    method: RequestMethod.GET
                },
                {
                    path:'equipos/consultar/:start/:end',
                    method: RequestMethod.GET
                },
            )
            .forRoutes(
                TeamsController
            )

    }
}
