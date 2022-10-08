import { BaseEntity, Column, CreateDateColumn,Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Empresa } from "./empresa";

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

  @ManyToOne(type => Empresa, empresa => empresa.permisos) 
  empresa!: Empresa;
}
