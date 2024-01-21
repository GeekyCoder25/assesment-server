import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Form {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  company: string;

  @Column()
  no_of_users: number;

  @Column()
  no_of_products: number;

  @Column()
  percentage: number;
}
