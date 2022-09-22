import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Bodega } from "./bodega";

@Entity({name: "Region"})
export class Region extends BaseEntity {
  @PrimaryGeneratedColumn()
  idRegion!: number;
  @Column()
  nombre!: string;
  @Column()
  descripcion!: string;
  @CreateDateColumn()
  fechaCreacion!: Date;
  @Column()
  usuarioCreacion!: string;

  @OneToMany(type => Bodega, bodega => bodega.region)
  bodegas!: Bodega[];
}
