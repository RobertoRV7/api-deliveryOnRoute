import { RepartidorPorSupervisor } from "@entities/repartidorPorSupervisor";
import { replyError, PermisoListResultType } from "@type_defs/permiso";
import { RepartidorPorSupervisorListResultType } from "@type_defs/repartidorPorSupervisor";
import { auth } from "@utils/auth";
import { Logger } from "@utils/logger";
import { GraphQLID } from "graphql";
import { Like } from "typeorm";

export const GET_ALL_REPARTIDORES_POR_SUPERVISOR = {
  type: RepartidorPorSupervisorListResultType,
  args: {
    idSupervisor: { type: GraphQLID },
  },
  description: "Obtiene el listado de todos los repartidores  por supervisor.",
  resolve(parent: any, args: any, req: any) {
    
    const { supervisor } = args;
    Logger.debug("graphql.queries.repartidoresPorSupervisor.GET_ALL_REPARTIDORES_POR_SUPERVISOR");
    try {
      auth.verifyAuth(req);
    } catch (error) {
      return replyError(error);
    }

    return { successful: true, repartidoresPorSupervisorList: RepartidorPorSupervisor.find({
      select: ["repartidor"],
      where:{
        supervisor: supervisor
      },
      relations: ["repartidor"]
    })};
  },
};
