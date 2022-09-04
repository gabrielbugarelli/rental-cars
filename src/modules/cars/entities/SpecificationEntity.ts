import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity('specifications')
export class Specification {

  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;
  
  constructor(name: string, description: string, created_at: Date) {
    if(!this.id) {
      this.id = uuid();
    }

    this.name = name;
    this.description = description;
    this.created_at = created_at;
  }
}