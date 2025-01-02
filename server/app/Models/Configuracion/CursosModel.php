<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class CursosModel extends Model
{
  protected $table      = 'cursos';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'nombre',
    'descripcion',
    'estado',
    'id_empresa',
  ];
}