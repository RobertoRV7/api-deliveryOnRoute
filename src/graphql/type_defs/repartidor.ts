import { Logger } from "@utils/logger";
import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { EmpresaType } from "./empresa";

export const RepartidorType = new GraphQLObjectType({
  name: "Repartidor",
  description: "Datos del repartidor.",
  fields: () => ({
    idRepartidor: { type: GraphQLID },
    empresa: { type: EmpresaType },
    cui: { type: GraphQLString },
    nombre: { type: GraphQLString },
    apellido: { type: GraphQLString },
    fechaCreacion: { type: GraphQLString },
    usuarioCreacion: { type: GraphQLString },
  }),
});

export const RepartidorListResultType = new GraphQLObjectType({
  name: "RepartidorListResult",
  description: "Listado de repartidores agregados.",
  fields: () => ({
    successful: { type: GraphQLBoolean },
    error: { type: GraphQLString },
    repartidorList: {
      type: new GraphQLList(RepartidorType),
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