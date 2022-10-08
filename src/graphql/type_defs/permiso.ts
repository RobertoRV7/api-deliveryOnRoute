import { Logger } from "@utils/logger";
import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

export const PermisoType = new GraphQLObjectType({
  name: "Permiso",
  description: "Datos del permiso.",
  fields: () => ({
    idPermiso: { type: GraphQLID },
    nombre: { type: GraphQLString },
    descripcion: { type: GraphQLString },
    accion: { type: GraphQLString },
    fechaCreacion: { type: GraphQLString },
    usuarioCreacion: { type: GraphQLString },
    empresa: { type: GraphQLID },
  }),
});

export const PermisoListResultType = new GraphQLObjectType({
  name: "PermisoListResult",
  description: "Listado de permisos agregadas.",
  fields: () => ({
    successful: { type: GraphQLBoolean },
    error: { type: GraphQLString },
    permisoList: {
      type: new GraphQLList(PermisoType),
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