import { Permiso, Region } from "@entities/permiso";
import { MessageType, msg } from "@type_defs/message";
import { auth } from "@utils/auth";
import { Logger } from "@utils/logger";
import { GraphQLString } from "graphql";
import { GraphQLID} from "graphql";



export const CREATE_PERMISO = {
  type: MessageType,
  description: "Crear permiso",
  args: {
    nombre: { type: GraphQLString },
    descripcion: { type: GraphQLString },
    accion: { type: GraphQLString },
    usuarioCreacion: { type: GraphQLString },
  },
  async resolve(parent: any, args: any, req: any) {
    Logger.debug("graphql.mutation.permiso.CREATE_PERMISO");

    const { nombre, descripcion, accion, usuarioCreacion } = args;

    try {
      auth.verifyAuth(req);
      const permiso = await Permiso.findOneBy({ nombre });

      if (permiso)
        return msg.replyWarning(
          `Permiso ${nombre} ya existe, intentar con otro nombre.`
        );

      await Permiso.insert({
        nombre,
        descripcion,
        accion,
        usuarioCreacion,
      });
    } catch (error) {
      return msg.replyError(error);
    }

    return msg.replySuccess(`Permiso ${nombre} creado!`);
  },

  
};

export const UPDATE_PERMISO_BY_ID = {
  type: MessageType,
  description: "Actualizar permiso by Id",
  args: {
    idPermiso: { type: GraphQLID },
    nombre: { type: GraphQLString },
    descripcion: { type: GraphQLString },
    accion: { type: GraphQLString },
  },
  async resolve(parent: any, args: any, req: any) {
    Logger.debug("mutations.permiso.UPDATE_PERMISO_BY_ID");
    const { idPermiso, nombre, descripcion, accion } = args;
    try {
      auth.verifyAuth(req);
      await Region.update(
        { idPermiso },
        { nombre, descripcion, accion}
      );
    } catch (error) {
      return msg.replyError(error);
    }
    return msg.replySuccess(`Permiso ${nombre} actualizado.`);
  },
};

export const DELETE_PERMISO = {
  type: MessageType,
  description: "Borrar permiso por Id",
  args: {
    idPermiso: { type: GraphQLID },
  },
  async resolve(parent: any, args: any, req: any) {
    Logger.debug("mutations.permiso.DELETE_PERMISO");
    try {
      auth.verifyAuth(req);
      await Permiso.delete(args.idPermiso);
      Logger.debug(`Permiso con el Id: ${args.idPermiso} eliminado!`);
      return msg.replySuccess("Permiso eliminada");
    } catch (error) {
      return msg.replyError(error);
    }
  },
};


