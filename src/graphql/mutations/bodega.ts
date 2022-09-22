import { Bodega } from "@entities/bodega";
import { MessageType, msg } from "@type_defs/message";
import { auth } from "@utils/auth";
import { Logger } from "@utils/logger";
import { GraphQLString } from "graphql";
import { GraphQLID} from "graphql";



export const CREATE_BODEGA = {
  type: MessageType,
  description: "Crear bodega",
  args: {
    nombre: { type: GraphQLString },
    nivel: { type: GraphQLString },
    bodegaPapa: { type: GraphQLString },
    usuarioCreacion: { type: GraphQLString },
    empresa: { type: GraphQLID },
    region: { type: GraphQLID },
  },
  async resolve(parent: any, args: any, req: any) {
    Logger.debug("graphql.mutation.bodega.CREATE_BODEGA");

    const { nombre, nivel, bodegaPapa, usuarioCreacion, empresa, region } = args;

    try {
      auth.verifyAuth(req);
      const bodega = await Bodega.findOneBy({ nombre });

      if (bodega)
        return msg.replyWarning(
          `Bodega ${bodega.nombre} ya existe, intentar con otro nombre.`
        );

      await Bodega.insert({
        nombre,
        nivel,
        bodegaPapa,
        usuarioCreacion,
        empresa,
        region
      });
    } catch (error) {
      return msg.replyError(error);
    }

    return msg.replySuccess(`Bodega con nombre ${nombre} creada!`);
  },

  
};

export const UPDATE_BODEGA_BY_ID = {
  type: MessageType,
  description: "Actualizar bodega by Id",
  args: {
    idBodega: { type: GraphQLID },
    nombre: { type: GraphQLString },
    nivel: { type: GraphQLString },
    bodegaPapa: { type: GraphQLString },
    empresa: { type: GraphQLID },
    region: { type: GraphQLID}
  },
  async resolve(parent: any, args: any, req: any) {
    Logger.debug("mutations.bodega.UPDATE_BODEGA_BY_ID");
    const { idBodega, nombre, nivel, bodegaPapa, empresa, region } = args;
    try {
      auth.verifyAuth(req);
      await Bodega.update(
        { idBodega },
        { nombre, nivel, bodegaPapa, empresa, region}
      );
    } catch (error) {
      return msg.replyError(error);
    }
    return msg.replySuccess(`Bodega con nombre ${nombre} actualizado.`);
  },
};

export const DELETE_BODEGA = {
  type: MessageType,
  description: "Borrar bodega por Id",
  args: {
    idBodega: { type: GraphQLID },
  },
  async resolve(parent: any, args: any, req: any) {
    Logger.debug("mutations.bodega.DELETE_BODEGA");
    try {
      auth.verifyAuth(req);
      await Bodega.delete(args.idBodega);
      Logger.debug(`Bodega con el Id: ${args.bodega} eliminada!`);
      return msg.replySuccess("Bodega eliminada");
    } catch (error) {
      return msg.replyError(error);
    }
  },
};


