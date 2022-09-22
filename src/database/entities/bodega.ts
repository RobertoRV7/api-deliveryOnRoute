import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Empresa } from "./empresa";
import { Region } from "./region";

@Entity({name: "Bodega"})
export class Bodega extends BaseEntity {
  @PrimaryGeneratedColumn()
  idBodega!: number;
  @Column()
  nombre!: string;
  @Column()
  nivel!: number;
  @Column()
  bodegaPapa!: number;
  @CreateDateColumn()
  fechaCreacion!: Date;
  @Column()
  usuarioCreacion!: string;

  @ManyToOne(type => Empresa, empresa => empresa.bodegas) 
  empresa!: Empresa;

  @ManyToOne(type => Region, region => region.bodegas) 
  region!: Region;
}
