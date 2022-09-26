import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "Rol"})
export class Rol extends BaseEntity {
  @PrimaryGeneratedColumn()
  idRol!: number;
  @Column()
  nombre!: string;
  @Column({ unique: true })
  descripcion!: string;
  @CreateDateColumn()
  fechaCreacion!: Date;
  @Column()
  usuarioCreacion!: string;
}
