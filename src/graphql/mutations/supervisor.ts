import { Repartidor } from "@entities/repartidor";
import { Supervisor } from "@entities/supervisor";
import { MessageType, msg } from "@type_defs/message";
import { auth } from "@utils/auth";
import { Logger } from "@utils/logger";
import { GraphQLString } from "graphql";
import { GraphQLID} from "graphql";



export const CREATE_SUPERVISOR = {
  type: MessageType,
  description: "Crear supervisor.",
  args: {
    cui: { type: GraphQLString },
    nombre: { type: GraphQLString },
    apellido: { type: GraphQLString },
    supervisorPapa: {type: GraphQLID},
    usuarioCreacion: { type: GraphQLString },
    empresa: { type: GraphQLID },
  },
  async resolve(parent: any, args: any, req: any) {
    Logger.debug("graphql.mutation.supervisor.CREATE_SUPERVISOR");

    const { cui, nombre, apellido, usuarioCreacion, supervisorPapa, empresa } = args;

    try {
      auth.verifyAuth(req);
      const supervisor = await Supervisor.findOneBy({ cui });

      if (supervisor)
        return msg.replyWarning(
          `Supervisor ${supervisor.cui} ya existe, intentar con otro cui.`
        );

      await Supervisor.insert({
        cui,
        nombre,
        apellido,
        usuarioCreacion,
        supervisorPapa,
        empresa,
      });
    } catch (error) {
      return msg.replyError(error);
    }

    return msg.replySuccess(`Supervisor con identificación ${cui} creado!`);
  },

  
};

export const UPDATE_SUPERVISOR_BY_ID = {
  type: MessageType,
  description: "Actualizar supervisor by Id",
  args: {
    idSupervisor: { type: GraphQLID },
    cui: { type: GraphQLString },
    nombre: { type: GraphQLString },
    apellido: { type: GraphQLString },
    supervisorPapa: { type: GraphQLID },
    empresa: { type: GraphQLID },
  },
  async resolve(parent: any, args: any, req: any) {
    Logger.debug("mutations.supervisor.UPDATE_SUPERVISOR_BY_ID");
    const { idSupervisor, cui, nombre, apellido, supervisorPapa,empresa } = args;
    try {
      auth.verifyAuth(req);
      await Supervisor.update(
        { idSupervisor },
        { cui, nombre, apellido, supervisorPapa, empresa}
      );
    } catch (error) {
      return msg.replyError(error);
    }
    return msg.replySuccess(`Supervisor identificado ${cui} actualizado.`);
  },
};

export const DELETE_SUPERVISOR = {
  type: MessageType,
  description: "Borrar supervisor por Id",
  args: {
    idSupervisor: { type: GraphQLID },
  },
  async resolve(parent: any, args: any, req: any) {
    Logger.debug("mutations.supervisor.DELETE_SUPERVISOR");
    try {
      auth.verifyAuth(req);
      await Supervisor.delete(args.idSupervisor);
      Logger.debug(`Supervisor con el Id: ${args.idSupervisor} eliminado!`);
      return msg.replySuccess("Supervisor eliminado");
    } catch (error) {
      return msg.replyError(error);
    }
  },
};


