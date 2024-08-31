import { Module } from '@nestjs/common';
import { RideController } from './ride.controller';
import { RideService } from './ride.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RideEntity } from './ride.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RideEntity])],
  controllers: [RideController],
  providers: [RideService],
})
export class RideModule {}
