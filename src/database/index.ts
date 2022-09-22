import { User } from "@entities/user";
import { Empresa } from "@entities/empresa";
import { Bodega } from "@entities/bodega";
import { Repartidor } from "@entities/repartidor";
import { Supervisor } from "@entities/supervisor";
import { Logger } from "@utils/logger";
import { DataSource, DataSourceOptions } from "typeorm";
import { Region } from "@entities/region";
import { UsuarioMovil } from "@entities/usuarioMovil";
import { UsuarioWeb } from "@entities/usuarioWeb";
import { Rol } from "@entities/rol";
import { Permiso } from "@entities/permiso";
import { Inventario } from "@entities/inventario";
import { SupervisorPorBodega } from "@entities/supervisorPorBodega";
import { RepartidorPorBodega } from "@entities/repartidorPorBodega";
import { BitacoraSesiones } from "@entities/bitacoraSesiones";
import { Pedido } from "@entities/pedido";
import { DetallePedido } from "@entities/detallePedido";
import { ProgramacionPedido } from "@entities/programacionPedido";
import { AdjuntoRuta } from "@entities/adjnutoRuta";
import { Configuracion } from "@entities/configuracion";
import { RutaPorPedido } from "@entities/rutaPorPedido";
import { AsignacionInventario } from "@entities/asignacionInventario";
import { PermisoPorRol } from "@entities/permisoPorRol";

export const db = {
  initDbPg: async () => {
    Logger.debug("database.initDbPg");

    const {
      DS_PG_HOST = "localhost",
      DS_PG_PORT = 0,
      DS_PG_USER = "user",
      DS_PG_PASS = "pass",
      DS_PG_DB = "db",
    } = process.env;

    const dsPg: DataSourceOptions = {
      type: "postgres",
      host: DS_PG_HOST,
      port: DS_PG_PORT as number,
      username: DS_PG_USER,
      password: DS_PG_PASS,
      database: DS_PG_DB,
      logging: true,
      synchronize: true,
      entities: [User, Empresa, Bodega, Repartidor, Supervisor, 
        Region, UsuarioMovil, UsuarioWeb, PermisoPorRol,
        Rol, Permiso, Inventario, SupervisorPorBodega, RepartidorPorBodega,
        BitacoraSesiones, Pedido, DetallePedido, ProgramacionPedido, AdjuntoRuta, Configuracion,
        RutaPorPedido, AsignacionInventario
      ],
    };

    const dbPg = new DataSource(dsPg);

    try {
      await dbPg.initialize();
      Logger.info("Database postgres initialized successfuly!");
    } catch (error) {
      Logger.error(error);
      return false;
    }

    return true;
  },
};
