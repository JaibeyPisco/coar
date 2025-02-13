<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class TipoPersonalModel extends Model
{
  protected $table      = 'tipo_personal';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'nombre',
    'descripcion',
    'id_empresa',
    'id_usuario',
    'estado'
  ];
}
