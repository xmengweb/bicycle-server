import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne } from 'typeorm';
import { RideEntity } from '../ride/ride.entity';
import { StatEntity } from '../stat/stat.entity';

@Entity({ name: 'Users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ length: 255, nullable: false })
  username: string;

  @Column({ length: 255, nullable: false })
  password: string;

  @Column({ length: 255, nullable: false })
  open_id: string;

  @Column({ length: 255, nullable: false })
  head_pic: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'datetime',
  })
  updated_at: Date;

  @OneToMany(() => RideEntity, (ride) => ride.user)
  rides: RideEntity[];

  @OneToOne(() => StatEntity, (stats) => stats.user, { cascade: true, eager: true })
  stats: StatEntity;
}
