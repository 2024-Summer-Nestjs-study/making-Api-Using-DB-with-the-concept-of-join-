import { PrimaryGeneratedColumn } from 'typeorm';

export class DefaultEntity {
  @PrimaryGeneratedColumn()
  index: number;
}
