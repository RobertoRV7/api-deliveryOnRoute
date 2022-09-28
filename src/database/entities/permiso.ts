import { BaseEntity, Column, CreateDateColumn,Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "Permiso"})
export class Permiso extends BaseEntity {
  @PrimaryGeneratedColumn()
  idPermiso!: number;
  @Column()
  nombre!: string;
  @Column()
  descripcion!: string;
  @Column()
  accion!: string;
  @CreateDateColumn()
  fechaCreacion!: Date;
  @Column()
  usuarioCreacion!: string;
}
