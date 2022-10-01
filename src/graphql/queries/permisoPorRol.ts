import { Permiso } from "@entities/permiso";
import { PermisoPorRol } from "@entities/permisoPorRol";
import { replyError, PermisoListResultType } from "@type_defs/permiso";
import { auth } from "@utils/auth";
import { Logger } from "@utils/logger";
import { GraphQLID } from "graphql";
import { Like } from "typeorm";

export const GET_ALL_PERMISOS_POR_ROL = {
  type: PermisoListResultType,
  args: {
    idRol: { type: GraphQLID },
  },
  description: "Obtiene el listado de todos los  por rol.",
  resolve(parent: any, args: any, req: any) {
    
    const { rol } = args;
    Logger.debug("graphql.queries.permisos.GET_ALL_PERMISOS");
    try {
      auth.verifyAuth(req);
    } catch (error) {
      return replyError(error);
    }

    return { successful: true, regionList: PermisoPorRol.find({
      select: ["permiso"],
      where:{
        rol: rol
      },
      relations: ["permiso"]
    })};
  },
};
