import { Permiso } from "@entities/permiso";
import { PermisoPorRol } from "@entities/permisoPorRol";
import { MessageType, msg } from "@type_defs/message";
import { auth } from "@utils/auth";
import { Logger } from "@utils/logger";
import { GraphQLString } from "graphql";
import { GraphQLID} from "graphql";



export const CREATE_PERMISO_POR_ROL = {
  type: MessageType,
  description: "Crear permiso por rol",
  args: {
    permiso: { type: GraphQLID },
    rol: { type: GraphQLID },
    usuarioCreacion: { type: GraphQLString },
  },
  async resolve(parent: any, args: any, req: any) {
    Logger.debug("graphql.mutation.permisoPorRol.CREATE_PERMISO_POR_ROL");

    const { permiso, rol, usuarioCreacion } = args;

    try {
      auth.verifyAuth(req);
      const permisoEncontrado = await PermisoPorRol.findOneBy({ permiso: permiso, rol : rol });

      if (permisoEncontrado)
        return msg.replyWarning(
          `Permiso ya existe para ese rol, intentar con otro nombre.`
        );

      await PermisoPorRol.insert({
        rol,
        permiso,
        usuarioCreacion,
      });
    } catch (error) {
      return msg.replyError(error);
    }

    return msg.replySuccess(`Permiso creado!`);
  },

  
};



export const DELETE_PERMISO_POR_ROL = {
  type: MessageType,
  description: "Borrar permiso por Rol por Id",
  args: {
    rol: { type: GraphQLID },
    permiso: { type: GraphQLID }
  },
  async resolve(parent: any, args: any, req: any) {
    Logger.debug("mutations.permiso.DELETE_PERMISO");
    try {
      auth.verifyAuth(req);
      await PermisoPorRol.createQueryBuilder().
      delete().
      from(PermisoPorRol).
      where("rol = :rol", {rol : args.rol}).
      andWhere("permiso = :permiso", {permiso : args.permiso}).execute();
      Logger.debug(`Permiso con el Id: ${args.rol} eliminado!`);
      return msg.replySuccess("Permiso eliminada");
    } catch (error) {
      return msg.replyError(error);
    }
  },
};


