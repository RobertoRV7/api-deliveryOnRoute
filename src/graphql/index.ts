import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GET_ALL_USERS } from "@queries/user";
import { GET_ALL_EMPRESAS} from "@queries/empresa";
import { GET_ALL_REPARTIDORES} from "@queries/repartidor";
import { CREATE_FIRST_ADMIN, CREATE_USER, LOGIN } from "@mutations/user";
import { CREATE_EMPRESA, UPDATE_EMPRESA_BY_ID, DELETE_EMPRESA } from "@mutations/empresa";
import { CREATE_REPARTIDOR, UPDATE_REPARTIDOR_BY_ID, DELETE_REPARTIDOR } from "@mutations/repartidor";
import { GET_ALL_REGIONES } from "@queries/region";
import { GET_ALL_BODEGAS } from "@queries/bodega";
import { CREATE_REGION, DELETE_REGION, UPDATE_REGION_BY_ID } from "@mutations/region";
import { CREATE_BODEGA, DELETE_BODEGA, UPDATE_BODEGA_BY_ID } from "@mutations/bodega";

const Query = new GraphQLObjectType({
  name: "Query",
  description: "Query List",
  fields: {
    getAllUsers: GET_ALL_USERS,
    getAllEmpersas: GET_ALL_EMPRESAS,
    getAllRepartidores : GET_ALL_REPARTIDORES,
    getAllRegiones : GET_ALL_REGIONES,
    getAllBodegas : GET_ALL_BODEGAS
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Mutation list",
  fields: {
    createFirstAdmin: CREATE_FIRST_ADMIN,
    createUser: CREATE_USER,
    login: LOGIN,

    createEmpresa : CREATE_EMPRESA,
    updateEmpresa : UPDATE_EMPRESA_BY_ID,
    deteleteEmpresa : DELETE_EMPRESA,

    createRepartidor : CREATE_REPARTIDOR,
    updateRepartidor : UPDATE_REPARTIDOR_BY_ID,
    deleteRepartidor : DELETE_REPARTIDOR,

    createRegion : CREATE_REGION,
    updateRegion : UPDATE_REGION_BY_ID,
    deleteRegion : DELETE_REGION,

    createBodega : CREATE_BODEGA,
    updateBodega : UPDATE_BODEGA_BY_ID,
    deleteBodega : DELETE_BODEGA

  
  },
});

export const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
