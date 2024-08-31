import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RideModule } from './ride/ride.module';
import { StatModule } from './stat/stat.module';

const { SQLNAME, SQLPASSWORD } = process.env;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql.sqlpub.com',
      port: 3306,
      username: SQLNAME,
      password: SQLPASSWORD,
      database: SQLNAME,
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: true,
    }),
    UserModule,
    AuthModule,
    RideModule,
    StatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
