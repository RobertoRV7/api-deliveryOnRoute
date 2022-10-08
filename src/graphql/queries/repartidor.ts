import { Repartidor } from "@entities/repartidor";
import { replyError, RepartidorListResultType } from "@type_defs/repartidor";
import { auth } from "@utils/auth";
import { Logger } from "@utils/logger";
import { GraphQLID } from "graphql";

export const GET_ALL_REPARTIDORES = {
  type: RepartidorListResultType,
  description: "Obtiene el listado de todos los repartidores.",
  resolve(parent: any, args: any, req: any) {
    Logger.debug("graphql.queries.repartidor.GET_ALL_REPARTIDORES");
    try {
      auth.verifyAuth(req);
    } catch (error) {
      return replyError(error);
    }

    return { successful: true, repartidorList: Repartidor.find( {relations: ['empresa']}) };
  },
};


export const GET_ALL_REPARTIDORES_POR_EMPRESA = {
  type: RepartidorListResultType,
  args: {
    Empresa: { type: GraphQLID },
  },
  description: "Obtiene el listado de todos los repartidores  por empresa.",
  resolve(parent: any, args: any, req: any) {
    
    const { empresa } = args;
    Logger.debug("graphql.queries.repartidor.GET_ALL_REPARTIDORES_POR_EMPRESA");
    try {
      auth.verifyAuth(req);
    } catch (error) {
      return replyError(error);
    }

    return { successful: true, repartidorPorEmpresaList: Repartidor.findBy({empresa})};
  },
};
