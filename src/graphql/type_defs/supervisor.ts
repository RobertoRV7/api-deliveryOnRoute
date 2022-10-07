import { Logger } from "@utils/logger";
import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { EmpresaType } from "./empresa";

export const SupervisorType = new GraphQLObjectType({
  name: "Supervisor",
  description: "Datos del supervisor.",
  fields: () => ({
    idsupervisor: { type: GraphQLID },
    empresa: { type: EmpresaType },
    cui: { type: GraphQLString },
    nombre: { type: GraphQLString },
    apellido: { type: GraphQLString },
    supervisorPapa: { type: GraphQLID },
    fechaCreacion: { type: GraphQLString },
    usuarioCreacion: { type: GraphQLString },
  }),
});

export const SupervisorListResultType = new GraphQLObjectType({
  name: "SupervisorListResult",
  description: "Listado de supervidores agregados.",
  fields: () => ({
    successful: { type: GraphQLBoolean },
    error: { type: GraphQLString },
    repartidorList: {
      type: new GraphQLList(SupervisorType),
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