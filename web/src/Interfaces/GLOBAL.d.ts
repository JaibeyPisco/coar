export interface GlobalI {
    ajuste: any
    usuario: Usuario
    empresa: Empresa
  }
  
  export interface Usuario {
    id: string
    id_area: string
    imagen: string
    fl_clave: any
    id_rol: any
    id_local: any
    tipo: string
    nombre: string
    apellido: string
    email: string
    id_empresa: string
    id_personal: any
    tipo_persona: any
    usuario: string
    fl_cambio_local: string
    fl_supervisor: any
    fl_no_dashboard: any
    local: any
    nombre_tipo_persona: any
  }
  
  export interface Empresa {
    logo: string
    numero_documento: string
    razon_social: string
    tipo_proveedor_electronico: any
  }
  