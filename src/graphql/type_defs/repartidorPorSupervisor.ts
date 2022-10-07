import { Logger } from "@utils/logger";
import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { RepartidorType } from "./repartidor";
import { SupervisorType } from "./supervisor";

export const RepartidorPorSupervisorType = new GraphQLObjectType({
  name: "RepartidorPorSupervisor",
  description: "Datos de repartidor por supervisor.",
  fields: () => ({
    repartidor: { type: RepartidorType },
    supervisor: { type: SupervisorType },
    fechaCreacion: { type: GraphQLString },
    usuarioCreacion: { type: GraphQLString },
  }),
});

export const RepartidorPorSupervisorListResultType = new GraphQLObjectType({
  name: "RepartidorPorSupervisorListResult",
  description: "Listado de repartidores por supervisor agregados.",
  fields: () => ({
    successful: { type: GraphQLBoolean },
    error: { type: GraphQLString },
    repartidorPorSupervisorList: {
      type: new GraphQLList(RepartidorPorSupervisorType),
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