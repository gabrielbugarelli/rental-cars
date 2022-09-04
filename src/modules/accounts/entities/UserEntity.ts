import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity('users')
export class UserEntity {

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;
  username: string;
  password: string;
  email: string;
  driver_license: string;
  isAdmin: boolean;
  created_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}