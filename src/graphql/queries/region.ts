import { Region } from "@entities/region";
import { replyError, RegionListResultType } from "@type_defs/region";
import { auth } from "@utils/auth";
import { Logger } from "@utils/logger";

export const GET_ALL_REGIONES = {
  type: RegionListResultType,
  description: "Obtiene el listado de todas las regiones.",
  resolve(parent: any, args: any, req: any) {
    Logger.debug("graphql.queries.region.GET_ALL_REGIONES");
    try {
      auth.verifyAuth(req);
    } catch (error) {
      return replyError(error);
    }

    return { successful: true, regionList: Region.find() };
  },
};
