import { Empresa } from "@entities/empresa";
import { Repartidor } from "@entities/repartidor";
import { MessageType, msg } from "@type_defs/message";
import { auth } from "@utils/auth";
import { Logger } from "@utils/logger";
import { GraphQLString } from "graphql";
import { GraphQLID} from "graphql";



export const CREATE_REPARTIDOR = {
  type: MessageType,
  description: "Crear repartidor",
  args: {
    cui: { type: GraphQLString },
    nombre: { type: GraphQLString },
    apellido: { type: GraphQLString },
    usuarioCreacion: { type: GraphQLString },
    empresa: { type: GraphQLID },
  },
  async resolve(parent: any, args: any, req: any) {
    Logger.debug("graphql.mutation.repartidor.CREATE_REPARTIDOR");

    const { cui, nombre, apellido, usuarioCreacion, empresa } = args;

    try {
      auth.verifyAuth(req);
      const repartidor = await Repartidor.findOneBy({ cui });

      if (repartidor)
        return msg.replyWarning(
          `Repartidor ${repartidor.cui} ya existe, intentar con otro cui.`
        );

      await Repartidor.insert({
        cui,
        nombre,
        apellido,
        usuarioCreacion,
        empresa,
      });
    } catch (error) {
      return msg.replyError(error);
    }

    return msg.replySuccess(`Repartidor con identificación ${cui} creado!`);
  },

  
};

export const UPDATE_REPARTIDOR_BY_ID = {
  type: MessageType,
  description: "Actualizar repartidor by Id",
  args: {
    idRepartidor: { type: GraphQLID },
    cui: { type: GraphQLString },
    nombre: { type: GraphQLString },
    apellido: { type: GraphQLString },
    empresa: { type: GraphQLID },
  },
  async resolve(parent: any, args: any, req: any) {
    Logger.debug("mutations.repartidor.UPDATE_REPARTIDOR_BY_ID");
    const { idRepartidor, cui, nombre, apellido, empresa } = args;
    try {
      auth.verifyAuth(req);
      await Repartidor.update(
        { idRepartidor },
        { cui, nombre, apellido, empresa}
      );
    } catch (error) {
      return msg.replyError(error);
    }
    return msg.replySuccess(`Repartidor identificado ${cui} actualizado.`);
  },
};

export const DELETE_REPARTIDOR = {
  type: MessageType,
  description: "Borrar repartidor por Id",
  args: {
    idRepartidor: { type: GraphQLID },
  },
  async resolve(parent: any, args: any, req: any) {
    Logger.debug("mutations.repartidor.DELETE_REPARTIDOR");
    try {
      auth.verifyAuth(req);
      await Repartidor.delete(args.idRepartidor);
      Logger.debug(`Repartidor con el Id: ${args.repartidor} eliminado!`);
      return msg.replySuccess("Repartidor eliminado");
    } catch (error) {
      return msg.replyError(error);
    }
  },
};


