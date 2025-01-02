<?php namespace App\Models\Tesoreria;

use CodeIgniter\Model;

class CajaModel extends Model
{
  protected $table      = 'caja';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'fecha',
    'serie' ,
    'numero',
    'id_empresa',
    'id_manifiesto',
    'tipo_persona',
    'id_tipo_persona',
    'nombre_persona',
    'motivo',
    'modalidad',
    'importe',
    'observacion',
    'cuenta_bancaria_persona',
    'titular_cuenta',
    'id_cuenta_bancaria_empresa',
    'id_cuenta_bancaria_persona',
    'fl_estado',
    'descripcion',
    'tipo',
    'id_usuario',
    'comentario_autorizacion',
    'id_moneda',
    'fl_no_liquidacion_viaje',
    'tipo_cambio',
	  'id_gasto_recurrente',
    'id_cuenta_bancaria_detraccion_persona',
    'monto_detraccion',
    'porcentaje_detraccion',
    'id_caja_chica',
    'tipo_movimiento',
    'id_orden_pago',
    'id_factura_pago',
    'id_local',
    'id_mantenimiento_vehiculo',

    'id_venta_pasaje',
    'id_equipaje',
    'id_compra',
    'id_compra_equipo',
    'codigo',
    'tipo_compra'
  ];

  public function get_correlativo()
  {
    $serie = date("Y");
    
    $Caja_m = new CajaModel();

    $response = $Caja_m->select('COALESCE(MAX(CAST(numero AS UNSIGNED)), 0) as numero')
    ->where('serie', $serie)
    ->where('id_empresa', ID_EMPRESA)
    ->first();

    $response->serie = $serie;
    $response->numero = str_pad(($response->numero + 1),  8, "0", STR_PAD_LEFT);

    return $response;
  }

}
