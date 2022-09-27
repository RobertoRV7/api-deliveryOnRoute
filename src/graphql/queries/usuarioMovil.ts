import { UsuarioMovil } from "@entities/usuarioMovil";
import { replyError, UsuarioMovilListResultType } from "@type_defs/usuarioMovil";
import { auth } from "@utils/auth";
import { Logger } from "@utils/logger";

export const GET_ALL_USUARIOS_MOVIL = {
  type: UsuarioMovilListResultType,
  description: "Obtener listado de todos los usuario móviles.",
  resolve(parent: any, args: any, req: any) {
    Logger.debug("graphql.queries.usuarioMovil.GET_ALL_USUARIOS_MOVIL");
    try {
      auth.verifyAuth(req);
    } catch (error) {
      return replyError(error);
    }

    return { successful: true, userList: UsuarioMovil.find() };
  },
};
