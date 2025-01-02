<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Personal_model extends Model
{
  protected $table      = 'personal';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_tipo_personal',
   // 'codigo',
      'imagen',
      'firma',
    'nombre', 
    'apellido',
      'telefono',
      'estado',
      'id_tipo_documento',

   // 'correo',
    'tipo_contratacion',
      'direccion',
      'ubigeo',
      'comentario',
      'numero_documento',
      'id_proveedor'


  ];
}
