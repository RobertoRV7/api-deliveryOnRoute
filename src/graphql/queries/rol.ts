import { Rol } from "@entities/rol";
import { replyError, RolListResultType } from "@type_defs/rol";
import { auth } from "@utils/auth";
import { Logger } from "@utils/logger";

export const GET_ALL_ROLES = {
  type: RolListResultType,
  description: "Obtiene el listado de todos los roles.",
  resolve(parent: any, args: any, req: any) {
    Logger.debug("graphql.queries.rol.GET_ALL_ROLES");
    try {
      auth.verifyAuth(req);
    } catch (error) {
      return replyError(error);
    }

    return { successful: true, rolList: Rol.find() };
  },
};
