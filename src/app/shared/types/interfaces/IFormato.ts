export interface IFormato {
   id?: number,
    formato: string,
    descripcion : string,
    secciones: ISeccion[]
}

export interface ISeccion  {
    id?:number,
    seccion: string,
    descripcion : string,
    campos: ICampo[]
  }

export interface ICampo {
    id?: number,
    id_formato: number,
    id_seccion : number,
    id_campo : number,
    nombrecampo: string,
    orden : string,
    propiedad: IPropiedad[]
}

export interface IPropiedad  {
    id?:number,
    propiedad: string,
    id_tipopropiedad: number,
    tipopropiedad:''
  }

