import { Logger } from "@utils/logger";
import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { SupervisorType } from "./supervisor";
import { RolType } from "./rol";

export const usuarioWebType = new GraphQLObjectType({
  name: "usuarioWeb",
  description: "User data.",
  fields: () => ({
    idUsuarioWeb: { type: GraphQLID },
    usuario: { type: GraphQLString },
    password: { type: GraphQLString },
    fechaCreacion: { type: GraphQLString },
    usuarioCreacion: { type: GraphQLString },
    supervisor: {type: SupervisorType},
    rol: { type: RolType}
  }),
});

export const UsuarioWebListResultType = new GraphQLObjectType({
  name: "UsuarioWebListResult",
  description: "UsuarioWeb list result.",
  fields: () => ({
    successful: { type: GraphQLBoolean },
    error: { type: GraphQLString },
    usuarioWebList: {
      type: new GraphQLList(usuarioWebType),
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