export interface EmpresaI {
    id: string
    razon_social: string
    nombre_comercial: string
    numero_documento: string
    direccion: string
    telefono: string
    email: string
    logo: string | null
    id_membresia: string | null 
    origen_factura: string | null
    formato_factura: string | null
    tipo_proveedor_electronico: string| null
    url_proveedor_electronico: string | null
    id_ubigeo: string | null
    tipo_cambio: string | null
    porcentaje_igv: string | null
    estado_facturacion: string | null
    logo_factura: string | null
  }
  