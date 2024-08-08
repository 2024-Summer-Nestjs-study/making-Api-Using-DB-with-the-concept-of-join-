import { Column, Entity, Unique } from 'typeorm';
import { DefaultEntity } from './default.entity';

@Entity()
@Unique(['id'])
export class UserEntity extends DefaultEntity {
  @Column()
  username: string;
  @Column()
  id: string;
  @Column()
  pw: string;
}
