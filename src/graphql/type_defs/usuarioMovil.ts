import { Repartidor } from "@entities/repartidor";
import { Rol } from "@entities/rol";
import { Logger } from "@utils/logger";
import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { RepartidorType } from "./repartidor";
import { RolType } from "./rol";

export const usuarioMovilType = new GraphQLObjectType({
  name: "usuarioMovil",
  description: "User data.",
  fields: () => ({
    idUsuarioMovil: { type: GraphQLID },
    usuario: { type: GraphQLString },
    password: { type: GraphQLString },
    fechaCreacion: { type: GraphQLString },
    usuarioCreacion: { type: GraphQLString },
    repartidor: {type: RepartidorType},
    rol: { type: RolType}
  }),
});

export const UsuarioMovilListResultType = new GraphQLObjectType({
  name: "UsuarioMovilListResult",
  description: "UsuarioMovil list result.",
  fields: () => ({
    successful: { type: GraphQLBoolean },
    error: { type: GraphQLString },
    usuarioMovilList: {
      type: new GraphQLList(usuarioMovilType),
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