<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class TiposIncidenciasModel extends Model
{
  protected $table      = 'tipos_incidencias';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'nombre',
    'necesita_abordaje_directa', 
    'es_conducta_positiva',
    'es_anedotario',
    'cantidad_abordaje',
    'nivel_incidencia', 
    'id_usuario', 
    'estado',
      'id_empresa'
  ];
}
