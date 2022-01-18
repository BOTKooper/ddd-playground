import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class RefrigeratorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'json',
  })
  content: Array<{ name: string; amount: number }>;
}
