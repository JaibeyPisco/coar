<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Area_model extends Model
{
  protected $table      = 'area';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
     'nombre',
     'descripcion',
     'estado',
     'id_usuario',
     'id_empresa'
  ];
}
