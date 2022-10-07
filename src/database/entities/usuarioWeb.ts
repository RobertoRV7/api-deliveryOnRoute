import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Rol } from "./rol";
import { Supervisor } from "./supervisor";

@Entity({name: "UsuarioWeb"})
export class UsuarioWeb extends BaseEntity {
  @PrimaryGeneratedColumn()
  idUsuarioWeb!: number;
  @Column({ unique: true })
  usuario!: string;
  @Column()
  password!: string;
  @CreateDateColumn()
  fechaCreacion!: Date;
  @Column()
  usuarioCreacion!: string;

  @OneToOne(type => Supervisor)
  @JoinColumn()
  supervisor!: Supervisor;

  @OneToOne(type => Rol)
  @JoinColumn()
  rol!: Rol;
}
