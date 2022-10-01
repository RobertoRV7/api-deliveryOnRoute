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
import { GET_ALL_USUARIOS_MOVIL } from "@queries/usuarioMovil";
import { GET_ALL_ROLES } from "@queries/rol";
import { CREATE_USUARIO_MOVIL, DELETE_USUARIOMOVIL, UPDATE_USUARIO_MOVIL_BY_ID } from "@mutations/usuarioMovil";
import { CREATE_ROL, DELETE_ROL, UPDATE_ROL_BY_ID } from "@mutations/rol";
import { CREATE_PERMISO, DELETE_PERMISO, UPDATE_PERMISO_BY_ID } from "@mutations/permiso";
import { CREATE_PERMISO_POR_ROL } from "@mutations/permisoPorRol";
import { GET_ALL_PERMISOS } from "@queries/permiso";
import { GET_ALL_PERMISOS_POR_ROL } from "@queries/permisoPorRol";

const Query = new GraphQLObjectType({
  name: "Query",
  description: "Query List",
  fields: {
    getAllUsers: GET_ALL_USERS,
    getAllEmpersas: GET_ALL_EMPRESAS,
    getAllRepartidores : GET_ALL_REPARTIDORES,
    getAllRegiones : GET_ALL_REGIONES,
    getAllBodegas : GET_ALL_BODEGAS,
    getAllUsuariosMovil : GET_ALL_USUARIOS_MOVIL,
    getAllRoles : GET_ALL_ROLES,
    getAllPermisos : GET_ALL_PERMISOS,
    getAllPermisosPorRol : GET_ALL_PERMISOS_POR_ROL
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
    deleteBodega : DELETE_BODEGA,

    createUsuarioMovil : CREATE_USUARIO_MOVIL,
    updateUsuarioMovil : UPDATE_USUARIO_MOVIL_BY_ID,
    delelteUsuarioMovil : DELETE_USUARIOMOVIL,

    createRol : CREATE_ROL,
    updateRol : UPDATE_ROL_BY_ID,
    deleteRol : DELETE_ROL,

    createPermiso : CREATE_PERMISO,
    updatePermiso : UPDATE_PERMISO_BY_ID,
    deletePermiso : DELETE_PERMISO,

    createPermisoPorRol : CREATE_PERMISO_POR_ROL,
    updatePermisoPorRol : UPDATE_PERMISO_BY_ID,
    deletePermisoPorRol : DELETE_PERMISO,

  
  },
});

export const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
