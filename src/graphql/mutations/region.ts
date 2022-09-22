import { Region } from "@entities/region";
import { MessageType, msg } from "@type_defs/message";
import { auth } from "@utils/auth";
import { Logger } from "@utils/logger";
import { GraphQLString } from "graphql";
import { GraphQLID} from "graphql";



export const CREATE_REGION = {
  type: MessageType,
  description: "Crear region",
  args: {
    nombre: { type: GraphQLString },
    descripcion: { type: GraphQLString },
    usuarioCreacion: { type: GraphQLString },
  },
  async resolve(parent: any, args: any, req: any) {
    Logger.debug("graphql.mutation.user.CREATE_REGION");

    const { nombre, descripcion, usuarioCreacion } = args;

    try {
      auth.verifyAuth(req);
      const region = await Region.findOneBy({ nombre });

      if (region)
        return msg.replyWarning(
          `Empresa ${region} ya existe, intentar con otro nombre.`
        );

      await Region.insert({
        nombre,
        descripcion,
        usuarioCreacion,
      });
    } catch (error) {
      return msg.replyError(error);
    }

    return msg.replySuccess(`Regoin ${nombre} creada!`);
  },

  
};

export const UPDATE_REGION_BY_ID = {
  type: MessageType,
  description: "Actualizar region by Id",
  args: {
    idRegion: { type: GraphQLID },
    nombre: { type: GraphQLString },
    descripcion: { type: GraphQLString },
  },
  async resolve(parent: any, args: any, req: any) {
    Logger.debug("mutations.region.UPDATE_REGION_BY_ID");
    const { idRegion, nombre, descripcion } = args;
    try {
      auth.verifyAuth(req);
      await Region.update(
        { idRegion },
        { nombre, descripcion}
      );
    } catch (error) {
      return msg.replyError(error);
    }
    return msg.replySuccess(`Region ${nombre} actualizada.`);
  },
};

export const DELETE_REGION = {
  type: MessageType,
  description: "Borrar region por Id",
  args: {
    idRegion: { type: GraphQLID },
  },
  async resolve(parent: any, args: any, req: any) {
    Logger.debug("mutations.empresa.DELETE_EMPRESA");
    try {
      auth.verifyAuth(req);
      await Region.delete(args.idRegion);
      Logger.debug(`Empresa con el Id: ${args.idRegion} eliminada!`);
      return msg.replySuccess("Region eliminada");
    } catch (error) {
      return msg.replyError(error);
    }
  },
};


