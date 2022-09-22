import { Logger } from "@utils/logger";
import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

export const EmpresaType = new GraphQLObjectType({
  name: "Empresa",
  description: "Datos de la empresa.",
  fields: () => ({
    idEmpresa: { type: GraphQLID },
    nombre: { type: GraphQLString },
    descripcion: { type: GraphQLString },
    fechaCreacion: { type: GraphQLString },
    usuarioCreacion: { type: GraphQLString },
  }),
});

export const EmpresaListResultType = new GraphQLObjectType({
  name: "EmpresaListResult",
  description: "Listado de empresas agregadas.",
  fields: () => ({
    successful: { type: GraphQLBoolean },
    error: { type: GraphQLString },
    empresaList: {
      type: new GraphQLList(EmpresaType),
    },
  }),
});

export const replyError = (error: any) => {
  if (error instanceof Error) {
    const err = <Error>error;
    Logger.error(err.message);
    return { successful: false, error: err.message };
  }
  return { succesful: false, error: JSON.stringify(error) }
}