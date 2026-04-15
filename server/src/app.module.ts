import { Module } from '@nestjs/common';
import { AccountModule } from './modules/account/account.module';
import { AuthorityModule } from './modules/authority/authority.module';
import { PermissionModule } from './modules/permission/permission.module';
import { TypeGameModule } from './modules/type_game/type_game.module';
import { GameModule } from './modules/game/game.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('mysql_server_host'),
        port: configService.get('mysql_server_port'),
        username: configService.get('mysql_server_username'),
        password: configService.get('mysql_server_password'),
        database: configService.get('mysql_server_database'),
        retryAttempts: 5,
        retryDelay: 500,
        synchronize: true,
        entityPrefix: 'tb_',
      }),
      inject: [ConfigService],
    }),
    AccountModule,
    AuthorityModule,
    PermissionModule,
    TypeGameModule,
    GameModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
