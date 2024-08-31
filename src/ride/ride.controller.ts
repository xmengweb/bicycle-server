import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { RideService } from './ride.service';

@Controller('ride')
export class RideController {
  constructor(private rideService: RideService) {}

  @Post('add')
  addRecord(@Body() dto) {
    return this.rideService.addRecord(dto);
  }

  @Get()
  getRecords(@Query('page') page: number, @Query('limit') limit: number, @Query('userId') userId: number) {
    return this.rideService.getRecords(page, limit, userId);
  }
}
