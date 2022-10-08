import { BaseEntity, Column, Entity, CreateDateColumn, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Repartidor } from "./repartidor";
import { Supervisor } from "./supervisor";

@Entity({name: "RepartidorPorSupervisor"})
export class RepartidorPorSupervisor extends BaseEntity {

  @PrimaryGeneratedColumn()
  idPermisoRepartidorPorSupervisor!: number;

  @CreateDateColumn()
  fechaCreacion!: Date;
  @Column()
  usuarioCreacion!: string;

  @OneToOne(type => Repartidor)
  @JoinColumn()
  repartidor!: Repartidor;

  @OneToOne(type => Supervisor)
  @JoinColumn()
  supervisor!: Supervisor;

}
