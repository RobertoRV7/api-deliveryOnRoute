import { UsuarioMovil } from "@entities/usuarioMovil";
import { MessageType, msg } from "@type_defs/message";
import { auth } from "@utils/auth";
import { Logger } from "@utils/logger";
import { GraphQLString } from "graphql";

export const CREATE_FIRST_ADMIN_MOVIL = {
  type: MessageType,
  description: "Create first user admin.",
  args: {
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any, req: any) {
    Logger.debug("graphql.mutation.usuarioMovil.CREATE_FIRST_ADMIN");

    const {  usuario, password, usuarioCreacion } = args;

    try {
      const count = await UsuarioMovil.count();

      if (count != 0)
        return msg.replyWarning("This operation cannot be performed");

      await UsuarioMovil.insert({
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

export const CREATE_USUARIO_MOVIL = {
  type: MessageType,
  description: "Crear usuario movil",
  args: {
    usuario: { type: GraphQLString },
    password: { type: GraphQLString },
    usuarioCreacion: { type: GraphQLString },
  },
  async resolve(parent: any, args: any, req: any) {
    Logger.debug("graphql.mutation.usuarioMovil.CREATE_USUARIO_MOVIL");

    const { usuario, password, usuarioCreacion } = args;

    try {
      auth.verifyAuth(req);
      const usuarioMovil = await UsuarioMovil.findOneBy({ usuario });

      if (usuarioMovil)
        return msg.replyWarning(
          `Username ${usuario} exists, please try other.`
        );

      await UsuarioMovil.insert({
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

export const LOGIN_USUARIO_MOVIL = {
  type: MessageType,
  description: "User login",
  args: {
    usuarioMovil: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    Logger.debug("mutations.user.LOGIN");
    const { usuario, password } = args;
    try {
      const usuarioMovil = await UsuarioMovil.findOneBy({ usuario });

      if (!usuarioMovil) return msg.replyWarning(`Usuario ${usuario} no existe!`);

      if (!(await auth.comparePassword(password, usuario.password)))
        return msg.replyWarning("Contraseña invalida");

      return msg.replyToken(auth.getToken(usuarioMovil.idUsuarioMovil));
    } catch (error) {
      return msg.replyError(error);
    }
  },
};
