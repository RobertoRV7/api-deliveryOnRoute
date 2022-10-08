import { Rol } from "@entities/rol";
import { replyError, RolListResultType } from "@type_defs/rol";
import { auth } from "@utils/auth";
import { Logger } from "@utils/logger";
import { GraphQLID } from "graphql";

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

export const GET_ALL_ROLES_POR_EMPRESA = {
  type: RolListResultType,
  args: {
    Empresa: { type: GraphQLID },
  },
  description: "Obtiene el listado de todos los roles  por empresa.",
  resolve(parent: any, args: any, req: any) {
    
    const { empresa } = args;
    Logger.debug("graphql.queries.empresa.GET_ALL_ROL_POR_EMPRESA");
    try {
      auth.verifyAuth(req);
    } catch (error) {
      return replyError(error);
    }

    return { successful: true, supervisorPorEmpresaList: Rol.findBy({empresa})};
  },
};
