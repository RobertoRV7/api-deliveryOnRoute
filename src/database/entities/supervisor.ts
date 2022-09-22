import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "Supervisor"})
export class Supervisor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  name!: string;
  @Column({ unique: true })
  username!: string;
  @Column()
  password!: string;
}
