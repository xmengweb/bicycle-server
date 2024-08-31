import { Module } from '@nestjs/common';
import { StatController } from './stat.controller';
import { StatService } from './stat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatEntity } from './stat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StatEntity])],
  controllers: [StatController],
  providers: [StatService],
})
export class StatModule {}
