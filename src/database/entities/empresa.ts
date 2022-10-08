import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Bodega } from "./bodega";
import { Permiso } from "./permiso";
import { Repartidor } from "./repartidor";
import { Rol } from "./rol";

@Entity({name: "Empresa"})
export class Empresa extends BaseEntity {
  @PrimaryGeneratedColumn()
  idEmpresa!: number;
  @Column()
  nombre!: string;
  @Column()
  descripcion!: string;
  @CreateDateColumn()
  fechaCreacion!: Date;
  @Column()
  usuarioCreacion!: string;

  @OneToMany(type => Repartidor, repartidor => repartidor.empresa)
  repartidores!: Repartidor[];

  @OneToMany(type => Bodega, bodega => bodega.empresa)
  bodegas!: Bodega[];

  @OneToMany(type => Rol, rol => rol.empresa)
  roles!: Rol[];

  @OneToMany(type => Permiso, permiso => permiso.empresa)
  permisos!: Permiso[];
}
