import { Column, Entity } from 'typeorm';
import { DefaultEntity } from './default.entity';

@Entity()
export class UserEntity extends DefaultEntity {
  @Column()
  username: string;
  @Column()
  id: string;
  @Column()
  pw: string;
}
