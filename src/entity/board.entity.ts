import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DefaultEntity } from './default.entity';
import { UserEntity } from './user.entity';

@Entity()
export class BoardEntity extends DefaultEntity {
  @JoinColumn()
  @ManyToOne((type) => UserEntity, (user) => user.index)
  user: UserEntity;
  @Column()
  title: string;
  @Column()
  content: string;
}
