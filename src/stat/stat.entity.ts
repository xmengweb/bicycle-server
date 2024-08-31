import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'Stat' })
export class StatEntity {
  @PrimaryColumn()
  user_id: number;

  @Column({ type: 'float', default: 0 })
  totaldistance: number;

  @Column({ type: 'float', default: 0 })
  targetdistance: number;

  @OneToOne(() => UserEntity, (user) => user.stats)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
