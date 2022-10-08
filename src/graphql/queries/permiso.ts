import { Permiso } from "@entities/permiso";
import { replyError, PermisoListResultType } from "@type_defs/permiso";
import { auth } from "@utils/auth";
import { Logger } from "@utils/logger";
import { GraphQLID } from "graphql";

export const GET_ALL_PERMISOS = {
  type: PermisoListResultType,
  description: "Obtiene el listado de todos los permisos.",
  resolve(parent: any, args: any, req: any) {
    Logger.debug("graphql.queries.permisos.GET_ALL_PERMISOS");
    try {
      auth.verifyAuth(req);
    } catch (error) {
      return replyError(error);
    }

    return { successful: true, regionList: Permiso.find() };
  },
};

export const GET_ALL_PERMISOS_POR_EMPRESA = {
  type: PermisoListResultType,
  args: {
    Empresa: { type: GraphQLID },
  },
  description: "Obtiene el listado de todos los permisos  por empresa.",
  resolve(parent: any, args: any, req: any) {
    
    const { empresa } = args;
    Logger.debug("graphql.queries.permiso.GET_ALL_PERMISO_POR_EMPRESA");
    try {
      auth.verifyAuth(req);
    } catch (error) {
      return replyError(error);
    }

    return { successful: true, supervisorPorEmpresaList: Permiso.findBy({empresa})};
  },
};