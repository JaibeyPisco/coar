<?php namespace App\Models\Tesoreria;

use CodeIgniter\Model;
use App\Models\Tesoreria\CajaModell;

class CajaChicaModel extends Model
{
  protected $table      = 'caja_chica';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'fecha_sistema',
    'saldo_inicial' ,
    'total_ingreso',
    'total_egreso',
    'total_saldo',
    'id_local',
    'id_usuario',
    'id_empresa',
    'estado',
    'fecha_cierre',
    'fecha_apertura'
  ];

  public function calcular_totales($id_caja_chica)
  {
    $Caja_chica_m = new CajaChicaModel();
    $Caja_m = new CajaModel();

    $cajas = $Caja_m->where('id_caja_chica', $id_caja_chica)->where('fl_estado', 3)->findAll();
    $caja_chica = $Caja_chica_m->find($id_caja_chica);

    $total_ingreso = 0;
    $total_egreso = 0;

    foreach ($cajas as $row) {
      
      if($row->tipo_movimiento == 'INGRESO')
      {
        $total_ingreso = $total_ingreso + $row->importe;
      }
      else if($row->tipo_movimiento == 'EGRESO')
      {
        $total_egreso = $total_egreso + $row->importe;
      }
    }

    $total_saldo = ($caja_chica->saldo_inicial + $total_ingreso) - $total_egreso;
    
    $data_save = [
      'id'            => $id_caja_chica,
      'total_ingreso' => $total_ingreso,
      'total_egreso'  => $total_egreso,
      'total_saldo'   => $total_saldo
    ];

    $Caja_chica_m->save($data_save);

    return (object) $data_save;

  }

}
