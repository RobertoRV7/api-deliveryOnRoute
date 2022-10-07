import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Empresa } from "./empresa";

@Entity({name: "Supervisor"})
export class Supervisor extends BaseEntity {
  @PrimaryGeneratedColumn()
  idSupervisor!: number;
  @Column({ unique: true })
  cui!: string;
  @Column()
  nombre!: string;
  @Column()
  apellido!: string;
  @Column()
  supervisorPapa!: number;
  @CreateDateColumn()
  fechaCreacion!: Date;
  @Column()
  usuarioCreacion!: string;
  
  
  @ManyToOne(type => Empresa, empresa => empresa.repartidores) 
  empresa!: Empresa;
}
