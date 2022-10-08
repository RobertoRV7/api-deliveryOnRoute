import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Empresa } from "./empresa";

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

  @ManyToOne(type => Empresa, empresa => empresa.roles) 
  empresa!: Empresa;
}
