import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "Ruta"})
export class Ruta extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  name!: string;
  @Column({ unique: true })
  username!: string;
  @Column()
  password!: string;
}
