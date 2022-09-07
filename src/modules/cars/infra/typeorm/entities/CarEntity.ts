import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity('cars')
export class CarEntity {

  @PrimaryColumn()
  id: string

  @Column()
  name: string;
  description: string;
  daily_rate: number;
  available: boolean;
  license_plate: string;
  fine_amount: number;
  brand: string;

  @CreateDateColumn()
  created_at: Date;

}