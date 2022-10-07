import { UsuarioWeb } from "@entities/usuarioWeb";
import { replyError, UsuarioWebListResultType } from "@type_defs/usuarioWeb";
import { auth } from "@utils/auth";
import { Logger } from "@utils/logger";

export const GET_ALL_USUARIOS_WEB = {
  type: UsuarioWebListResultType,
  description: "Obtener listado de todos los usuario web.",
  resolve(parent: any, args: any, req: any) {
    Logger.debug("graphql.queries.usuarioWeb.GET_ALL_USUARIOS_WEB");
    try {
      auth.verifyAuth(req);
    } catch (error) {
      return replyError(error);
    }

    return { successful: true, userList: UsuarioWeb.find() };
  },
};
