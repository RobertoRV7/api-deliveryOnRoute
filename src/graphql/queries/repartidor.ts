import { Repartidor } from "@entities/repartidor";
import { replyError, RepartidorListResultType } from "@type_defs/repartidor";
import { auth } from "@utils/auth";
import { Logger } from "@utils/logger";

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
