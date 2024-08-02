import { IUserAuth } from "../types/interfaces";

export const createLocalUserAuth = ():IUserAuth => ({
  id:      0,
  usuario: '',
  id_rol:  0,
  role:    '',
})
