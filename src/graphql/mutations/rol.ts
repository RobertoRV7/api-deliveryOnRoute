import { Rol } from "@entities/rol";
import { MessageType, msg } from "@type_defs/message";
import { auth } from "@utils/auth";
import { Logger } from "@utils/logger";
import { GraphQLString } from "graphql";
import { GraphQLID} from "graphql";



export const CREATE_ROL = {
  type: MessageType,
  description: "Crear Rol",
  args: {
    nombre: { type: GraphQLString },
    descripcion: { type: GraphQLString },
    usuarioCreacion: { type: GraphQLString },
  },
  async resolve(parent: any, args: any, req: any) {
    Logger.debug("graphql.mutation.user.CREATE_ROL");

    const { nombre, descripcion, usuarioCreacion } = args;

    try {
      auth.verifyAuth(req);
      const rol = await Rol.findOneBy({ nombre });

      if (rol)
        return msg.replyWarning(
          `Rol ${nombre} ya existe, intentar con otro nombre.`
        );

      await Rol.insert({
        nombre,
        descripcion,
        usuarioCreacion,
      });
    } catch (error) {
      return msg.replyError(error);
    }

    return msg.replySuccess(`Rol ${nombre} creado!`);
  },

  
};

export const UPDATE_ROL_BY_ID = {
  type: MessageType,
  description: "Actualizar rol by Id",
  args: {
    idRol: { type: GraphQLID },
    nombre: { type: GraphQLString },
    descripcion: { type: GraphQLString },
  },
  async resolve(parent: any, args: any, req: any) {
    Logger.debug("mutations.rol.UPDATE_ROL_BY_ID");
    const { idRol, nombre, descripcion } = args;
    try {
      auth.verifyAuth(req);
      await Rol.update(
        { idRol },
        { nombre, descripcion}
      );
    } catch (error) {
      return msg.replyError(error);
    }
    return msg.replySuccess(`Rol ${nombre} actualizado.`);
  },
};

export const DELETE_ROL = {
  type: MessageType,
  description: "Borrar rol por Id",
  args: {
    idRol: { type: GraphQLID },
  },
  async resolve(parent: any, args: any, req: any) {
    Logger.debug("mutations.rol.DELETE_ROL");
    try {
      auth.verifyAuth(req);
      await Rol.delete(args.idRol);
      Logger.debug(`Rol con el Id: ${args.idRol} eliminado!`);
      return msg.replySuccess("Rol eliminada");
    } catch (error) {
      return msg.replyError(error);
    }
  },
};


