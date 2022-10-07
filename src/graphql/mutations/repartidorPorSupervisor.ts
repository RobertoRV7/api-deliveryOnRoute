import { RepartidorPorSupervisor } from "@entities/repartidorPorSupervisor";
import { MessageType, msg } from "@type_defs/message";
import { auth } from "@utils/auth";
import { Logger } from "@utils/logger";
import { GraphQLString } from "graphql";
import { GraphQLID} from "graphql";



export const CREATE_REPARTIDOR_POR_SUPERVISOR = {
  type: MessageType,
  description: "Crear repartidor por supervisor",
  args: {
    repartidor: { type: GraphQLID },
    supervisor: { type: GraphQLID },
    usuarioCreacion: { type: GraphQLString },
  },
  async resolve(parent: any, args: any, req: any) {
    Logger.debug("graphql.mutation.repartidorPorSupervisor.CREATE_REPARTIDOR_POR_SUPERVISOR");

    const { repartidor, supervisor, usuarioCreacion } = args;

    try {
      auth.verifyAuth(req);
      const repartidorEncontrado = await RepartidorPorSupervisor.findOneBy({ repartidor: repartidor, supervisor : supervisor });

      if (repartidorEncontrado)
        return msg.replyWarning(
          `Repartidor ya existe para ese supervisor, intentar con otro nombre.`
        );

      await RepartidorPorSupervisor.insert({
        repartidor,
        supervisor,
        usuarioCreacion,
      });
    } catch (error) {
      return msg.replyError(error);
    }

    return msg.replySuccess(`Repartidor asignado!`);
  },

  
};



export const DELETE_REPARTIDOR_POR_SUPERVISOR = {
  type: MessageType,
  description: "Borrar repartidor por supervisor por Id",
  args: {
    repartidor: { type: GraphQLID },
    supervisor: { type: GraphQLID }
  },
  async resolve(parent: any, args: any, req: any) {
    Logger.debug("mutations.repartidorPorSupervisor.DELETE_REPARTIDOR_POR_SUPERVISOR");
    try {
      auth.verifyAuth(req);
      await RepartidorPorSupervisor.createQueryBuilder().
      delete().
      from(RepartidorPorSupervisor).
      where("repartidor = :repartidor", {repartidor : args.repartidor}).
      andWhere("supervisor = :supervisor", {supervisor : args.supervisor}).execute();
      Logger.debug(`Repartidor con el Id: ${args.repartidor} eliminado!`);
      return msg.replySuccess("Repartidor eliminado.");
    } catch (error) {
      return msg.replyError(error);
    }
  },
};


