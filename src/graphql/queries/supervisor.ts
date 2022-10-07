import { Supervisor } from "@entities/supervisor";
import { replyError, SupervisorListResultType } from "@type_defs/supervisor";
import { auth } from "@utils/auth";
import { Logger } from "@utils/logger";

export const GET_ALL_SUPERVISORES = {
  type: SupervisorListResultType,
  description: "Obtiene el listado de todos los supervisores.",
  resolve(parent: any, args: any, req: any) {
    Logger.debug("graphql.queries.supervisor.GET_ALL_SUPERVISORES");
    try {
      auth.verifyAuth(req);
    } catch (error) {
      return replyError(error);
    }

    return { successful: true, supervisorList: Supervisor.find( {relations: ['empresa']}) };
  },
};
