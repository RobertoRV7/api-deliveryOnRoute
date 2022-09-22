import { type } from "os";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Empresa } from "./empresa";

@Entity({name: "Repartidor"})
export class Repartidor extends BaseEntity {
  @PrimaryGeneratedColumn()
  idRepartidor!: number;
  @Column({ unique: true })
  cui!: string;
  @Column()
  nombre!: string;
  @Column()
  apellido!: string;
  @CreateDateColumn()
  fechaCreacion!: Date;
  @Column()
  usuarioCreacion!: string;
  
  
  @ManyToOne(type => Empresa, empresa => empresa.repartidores) 
  empresa!: Empresa;
}
