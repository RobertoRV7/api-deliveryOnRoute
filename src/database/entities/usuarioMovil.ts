import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Repartidor } from "./repartidor";
import { Rol } from "./rol";

@Entity({name: "UsuarioMovil"})
export class UsuarioMovil extends BaseEntity {
  @PrimaryGeneratedColumn()
  idUsuarioMovil!: number;
  @Column({ unique: true })
  usuario!: string;
  @Column()
  password!: string;
  @CreateDateColumn()
  fechaCreacion!: Date;
  @Column()
  usuarioCreacion!: string;

  @OneToOne(type => Repartidor)
  @JoinColumn()
  repartidor!: Repartidor;

  @OneToOne(type => Rol)
  @JoinColumn()
  rol!: Rol;
}
