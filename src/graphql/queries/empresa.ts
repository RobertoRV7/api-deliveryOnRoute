import { Empresa } from "@entities/empresa";
import { replyError, EmpresaListResultType } from "@type_defs/empresa";
import { auth } from "@utils/auth";
import { Logger } from "@utils/logger";

export const GET_ALL_EMPRESAS = {
  type: EmpresaListResultType,
  description: "Obtiene el listado de todas las empresas.",
  resolve(parent: any, args: any, req: any) {
    Logger.debug("graphql.queries.empresa.GET_ALL_EMPRESAS");
    try {
      auth.verifyAuth(req);
    } catch (error) {
      return replyError(error);
    }

    return { successful: true, empresaList: Empresa.find() };
  },
};
