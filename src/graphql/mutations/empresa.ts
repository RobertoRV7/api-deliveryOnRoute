import { Empresa } from "@entities/empresa";
import { MessageType, msg } from "@type_defs/message";
import { auth } from "@utils/auth";
import { Logger } from "@utils/logger";
import { GraphQLString } from "graphql";
import { GraphQLID} from "graphql";



export const CREATE_EMPRESA = {
  type: MessageType,
  description: "Crear empresa",
  args: {
    nombre: { type: GraphQLString },
    descripcion: { type: GraphQLString },
    usuarioCreacion: { type: GraphQLString },
  },
  async resolve(parent: any, args: any, req: any) {
    Logger.debug("graphql.mutation.user.CREATE_EMPRESA");

    const { nombre, descripcion, usuarioCreacion } = args;

    try {
      auth.verifyAuth(req);
      const empresa = await Empresa.findOneBy({ nombre });

      if (empresa)
        return msg.replyWarning(
          `Empresa ${empresa} ya existe, intentar con otro nombre.`
        );

      await Empresa.insert({
        nombre,
        descripcion,
        usuarioCreacion,
      });
    } catch (error) {
      return msg.replyError(error);
    }

    return msg.replySuccess(`Empresa ${nombre} creada!`);
  },

  
};

export const UPDATE_EMPRESA_BY_ID = {
  type: MessageType,
  description: "Actualizar empresa by Id",
  args: {
    idEmpresa: { type: GraphQLID },
    nombre: { type: GraphQLString },
    descripcion: { type: GraphQLString },
  },
  async resolve(parent: any, args: any, req: any) {
    Logger.debug("mutations.empresa.UPDATE_EMPRESA_BY_ID");
    const { idEmpresa, nombre, descripcion } = args;
    try {
      auth.verifyAuth(req);
      await Empresa.update(
        { idEmpresa },
        { nombre, descripcion}
      );
    } catch (error) {
      return msg.replyError(error);
    }
    return msg.replySuccess(`Empresa ${nombre} actualizada.`);
  },
};

export const DELETE_EMPRESA = {
  type: MessageType,
  description: "Borrar empresa por Id",
  args: {
    idEmpresa: { type: GraphQLID },
  },
  async resolve(parent: any, args: any, req: any) {
    Logger.debug("mutations.empresa.DELETE_EMPRESA");
    try {
      auth.verifyAuth(req);
      await Empresa.delete(args.idEmpresa);
      Logger.debug(`Empresa con el Id: ${args.id} eliminada!`);
      return msg.replySuccess("Empresa eliminado");
    } catch (error) {
      return msg.replyError(error);
    }
  },
};


