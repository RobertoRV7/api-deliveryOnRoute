import { Bodega } from "@entities/bodega";
import { replyError, BodegaListResultType } from "@type_defs/bodega";
import { auth } from "@utils/auth";
import { Logger } from "@utils/logger";
import { GraphQLID } from "graphql";

export const GET_ALL_BODEGAS = {
  type: BodegaListResultType,
  description: "Obtiene el listado de todas las bodegas.",
  resolve(parent: any, args: any, req: any) {
    Logger.debug("graphql.queries.repartidor.GET_ALL_BODEGAS");
    try {
      auth.verifyAuth(req);
    } catch (error) {
      return replyError(error);
    }

    return { successful: true, bodegaList: Bodega.find( {relations: ['empresa']}) };
  },
};

export const GET_ALL_BODEGAS_POR_EMPRESA = {
  type: BodegaListResultType,
  args: {
    Empresa: { type: GraphQLID },
  },
  description: "Obtiene el listado de todas las bodegas  por empresa.",
  resolve(parent: any, args: any, req: any) {
    
    const { empresa } = args;
    Logger.debug("graphql.queries.bodega.GET_ALL_BODEGAS_POR_EMPRESA");
    try {
      auth.verifyAuth(req);
    } catch (error) {
      return replyError(error);
    }

    return { successful: true, bodegasPorEmpresaList: Bodega.findBy({empresa})};
  },
};
