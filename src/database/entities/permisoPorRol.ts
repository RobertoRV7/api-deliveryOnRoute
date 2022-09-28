import { BaseEntity, Column, Entity, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";
import { Permiso } from "./permiso";

@Entity({name: "PermisoPorRol"})
export class PermisoPorRol extends BaseEntity {


  @CreateDateColumn()
  fechaCreacion!: Date;
  @Column()
  usuarioCreacion!: string;

  @OneToOne(type => Permiso)
  @JoinColumn()
  permiso!: Permiso;

  @OneToOne(type => Rol)
  @JoinColumn()
  rol!: Rol;

}
