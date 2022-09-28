import { Permiso } from "@entities/permiso";
import { replyError, PermisoListResultType } from "@type_defs/permiso";
import { auth } from "@utils/auth";
import { Logger } from "@utils/logger";

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
