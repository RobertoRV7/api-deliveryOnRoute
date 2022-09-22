import { Logger } from "@utils/logger";
import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { EmpresaType } from "./empresa";
import { RegionType } from "./region";

export const BodegaType = new GraphQLObjectType({
  name: "Bodega",
  description: "Datos de la Bodega.",
  fields: () => ({
    idBodega: { type: GraphQLID },
    empresa: { type: EmpresaType },
    region: { type: RegionType},
    nombre: { type: GraphQLString },
    nivel: { type: GraphQLInt },
    bodegaPapa: { type: GraphQLInt },
    fechaCreacion: { type: GraphQLString },
    usuarioCreacion: { type: GraphQLString },
  }),
});

export const BodegaListResultType = new GraphQLObjectType({
  name: "BodegaListResult",
  description: "Listado de bodegas agregados.",
  fields: () => ({
    successful: { type: GraphQLBoolean },
    error: { type: GraphQLString },
    bodegaList: {
      type: new GraphQLList(BodegaType),
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