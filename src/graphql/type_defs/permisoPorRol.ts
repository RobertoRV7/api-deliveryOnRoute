import { Logger } from "@utils/logger";
import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { PermisoType } from "./permiso";
import { RolType } from "./rol";

export const PermisoPorRolType = new GraphQLObjectType({
  name: "PermisoPorRol",
  description: "Datos del permisoPor Rol.",
  fields: () => ({
    permiso: { type: PermisoType },
    rol: { type: RolType },
    fechaCreacion: { type: GraphQLString },
    usuarioCreacion: { type: GraphQLString },
  }),
});

export const PermisoPorRolListResultType = new GraphQLObjectType({
  name: "PermisosPorRolListResult",
  description: "Listado de permisos por rol agregados.",
  fields: () => ({
    successful: { type: GraphQLBoolean },
    error: { type: GraphQLString },
    repartidorList: {
      type: new GraphQLList(PermisosPorRolType),
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