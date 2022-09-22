import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "PermisoPorRol"})
export class PermisoPorRol extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  name!: string;
  @Column({ unique: true })
  username!: string;
  @Column()
  password!: string;
}
