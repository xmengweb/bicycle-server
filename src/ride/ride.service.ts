import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RideEntity } from './ride.entity';

@Injectable()
export class RideService {
  constructor(@InjectRepository(RideEntity) private readonly rideRepository: Repository<RideEntity>) {}

  async addRecord(body) {
    const res = await this.rideRepository.save(body);
    return {
      code: 1,
      result: res,
    };
  }

  async getRecords(page: number = 1, limit: number = 10, userId) {
    const [results, total] = await this.rideRepository.findAndCount({
      where: { userId }, // 这里添加了一个where条件
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      results,
      total,
      page,
      limit,
    };
  }
}
