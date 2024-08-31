import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

interface IMarker {
  iconPath: string;
  id: number;
  latitude: number;
  longitude: number;
  width: number;
  height: number;
}
interface IPoint {
  longitude: number;
  latitude: number;
  time?: number;
  speed?: number;
}
interface IPolyLine {
  points: IPoint[];
  color: string;
  width: number;
  arrowLine: boolean;
}

@Entity({ name: 'Ride' })
export class RideEntity {
  @PrimaryGeneratedColumn()
  record_id: number;

  @Column({
    type: 'int',
    unsigned: true,
  })
  seconds: number;

  @Column('float', { precision: 12 })
  average_speed: number;

  @Column('float', { precision: 12 })
  fatest_speed: number;

  @Column('float', { precision: 12 })
  distance: number;

  @Column({ length: 255, nullable: false })
  startPoint: string;

  @Column({ length: 255, nullable: false })
  endPoint: string;

  @Column('json')
  marker: IMarker[];

  @Column('json')
  polyline: IPolyLine[];

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @ManyToOne(() => UserEntity, (user) => user.rides)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column()
  userId: number; // 这里定义了一个新的字段来存储外键
}
