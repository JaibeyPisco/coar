<?php namespace App\Models\Tesoreria;

use CodeIgniter\Model;

class FlujoCajaModel extends Model
{
  protected $table      = 'flujo_caja';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'fecha',
    'tipo',
    'descripcion',
    'id_orden_pago',
    'id_caja',
    'id_usuario',
    'monto',
    'id_empresa',
    'id_cuenta_bancaria_empresa',
    'id_moneda',
    'tipo_cambio',
    'id_factura_pago',
    'medio_pago',
    'id_local'
  ];

}
