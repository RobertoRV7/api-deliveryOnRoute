import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "Inventario"})
export class Inventario extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  name!: string;
  @Column({ unique: true })
  username!: string;
  @Column()
  password!: string;
}
