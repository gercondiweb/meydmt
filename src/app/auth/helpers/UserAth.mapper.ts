import { IUserAuth } from "../types/interfaces";
import { IUserAuthEntity } from "../types/models";

export const toUserAuth = ( model: IUserAuthEntity ) => ({
   id: model.id,
   usuario: model.usuario,
   id_rol: model.id_rol,
   role: model.role,
})

export const toUserAuthEntity = ( model: IUserAuth ) => ({
   id: model.id,
   usuario: model.usuario,
   id_rol: model.id_rol,
   role: model.role,
})
