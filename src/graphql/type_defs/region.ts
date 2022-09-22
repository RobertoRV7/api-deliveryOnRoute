import { Logger } from "@utils/logger";
import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

export const RegionType = new GraphQLObjectType({
  name: "Region",
  description: "Datos de la region.",
  fields: () => ({
    idRegion: { type: GraphQLID },
    nombre: { type: GraphQLString },
    descripcion: { type: GraphQLString },
    fechaCreacion: { type: GraphQLString },
    usuarioCreacion: { type: GraphQLString },
  }),
});

export const RegionListResultType = new GraphQLObjectType({
  name: "RegionListResult",
  description: "Listado de regiones agregadas.",
  fields: () => ({
    successful: { type: GraphQLBoolean },
    error: { type: GraphQLString },
    empresaList: {
      type: new GraphQLList(RegionType),
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