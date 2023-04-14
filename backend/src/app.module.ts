import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {TeamsModule} from "./teams/teams.module";
import {AuthModule} from './auth/auth.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Auth} from "./entities/auth.entity";
import {ApiTokenCheckMiddleware} from "./common/middleware/api-token-check.middleware";


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            database: 'world-office',
            username: 'postgres',
            password: '123456',
            autoLoadEntities: true,
            synchronize: true,
            entities: [
                Auth
            ]
        }),
        TeamsModule,
        AuthModule
    ],
})
export class AppModule {
}
