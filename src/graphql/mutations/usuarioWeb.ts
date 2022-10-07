import { UsuarioWeb } from "@entities/usuarioWeb";
import { MessageType, msg } from "@type_defs/message";
import { auth } from "@utils/auth";
import { Logger } from "@utils/logger";
import { GraphQLID, GraphQLString } from "graphql";

export const CREATE_FIRST_ADMIN_WEB = {
  type: MessageType,
  description: "Create first user admin WEB.",
  args: {
    nombre: { type: GraphQLString },
    usuario: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any, req: any) {
    Logger.debug("graphql.mutation.usuarioWeb.CREATE_FIRST_ADMIN_WEB");

    const { usuario, password, usuarioCreacion } = args;

    try {
      const count = await UsuarioWeb.count();

      if (count != 0)
        return msg.replyWarning("This operation cannot be performed");

      await UsuarioWeb.insert({
        usuario,
        password: await auth.encript(password),
        usuarioCreacion
      });
    } catch (error) {
      return msg.replyError(error);
    }

    return msg.replySuccess(`Usuario ${usuario} creado!`);
  },
};

export const CREATE_USUARIO_WEB = {
  type: MessageType,
  description: "Crear usuario web",
  args: {
    usuario: { type: GraphQLString },
    password: { type: GraphQLString },
    usuarioCreacion: { type: GraphQLString },
  },
  async resolve(parent: any, args: any, req: any) {
    Logger.debug("graphql.mutation.usuarioWeb.CREATE_USUARIO_WEB");

    const { usuario, password, usuarioCreacion } = args;

    try {
      auth.verifyAuth(req);
      const usuarioWeb = await UsuarioWeb.findOneBy({ usuario });

      if (usuarioWeb)
        return msg.replyWarning(
          `Username ${usuario} exists, please try other.`
        );

      await UsuarioWeb.insert({
        usuario,
        password: await auth.encript(password),
        usuarioCreacion, 
      });
    } catch (error) {
      return msg.replyError(error);
    }

    return msg.replySuccess(`Usuario ${usuario} creado!`);
  },
};

export const UPDATE_USUARIO_WEB_BY_ID = {
  type: MessageType,
  description: "Actualizar USUARIO WEB by Id",
  args: {
    idUsuarioWeb: { type: GraphQLID },
    usuario: { type: GraphQLString },
    password: { type: GraphQLString },
    rol: {type: GraphQLID }
  },
  async resolve(parent: any, args: any, req: any) {
    Logger.debug("mutations.usuarioWeb.UPDATE_USUARIOWEB_BY_ID");
    const { idUsuarioWeb, usuario, password, rol } = args;
    try {
      auth.verifyAuth(req);
      await UsuarioWeb.update(
        { idUsuarioWeb },
        { usuario, password: await auth.encript(password), rol}
      );
    } catch (error) {
      return msg.replyError(error);
    }
    return msg.replySuccess(`Usuario Web ${usuario} actualizado.`);
  },
};

export const DELETE_USUARIOWEB = {
  type: MessageType,
  description: "Borrar usuaario por Id",
  args: {
    idUsuario: { type: GraphQLID },
  },
  async resolve(parent: any, args: any, req: any) {
    Logger.debug("mutations.usuarioWeb.DELETE_USUARIOWEB");
    try {
      auth.verifyAuth(req);
      await UsuarioWeb.delete(args.idUsuario);
      Logger.debug(`Usuarui con el Id: ${args.idUsuario} eliminado!`);
      return msg.replySuccess("Usuario eliminado");
    } catch (error) {
      return msg.replyError(error);
    }
  },
};

export const LOGIN_USUARIO_WEB = {
  type: MessageType,
  description: "User web login",
  args: {
    usuarioMovil: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    Logger.debug("mutations.user.LOGIN");
    const { usuario, password } = args;
    try {
      const usuarioWeb = await UsuarioWeb.findOneBy({ usuario });

      if (!usuarioWeb) return msg.replyWarning(`Usuario ${usuario} no existe!`);

      if (!(await auth.comparePassword(password, usuario.password)))
        return msg.replyWarning("Contraseña invalida");

      return msg.replyToken(auth.getToken(usuarioWeb.idUsuarioWeb));
    } catch (error) {
      return msg.replyError(error);
    }
  },
};
