export interface IFormato {
   id?: number,
    formato: string,
    descripcionformato : string,
    orden: IOrden[],
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
    orden : number,
    propiedad: IPropiedad[]
}

export interface IPropiedad  {
    id?:number,
    propiedad: string,
    id_tipopropiedad: number,
    tipopropiedad:[]
  }

  export interface ITipoPropiedad{
    id?: number,
    tipopropiedad: string
  }

  export interface IOrden {
    id?:number,
    id_formato:number,
    id_seccion: number,
    ide_campo: number,
    orden: number
  }

