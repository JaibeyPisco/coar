<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Socio_model extends Model
{
  protected $table      = 'socio';
  protected $primaryKey = 'id';
  protected $returnType = 'object';

  protected $allowedFields = [
    'id_documento', 
    'numero_documento', 
    'razon_social', 
    'id_ubigeo', 
    'direccion', 
    'id_empresa', 
    'telefono', 
    'persona_encargado',
    'imagen',
    'email',
    'fl_cliente',
    'fl_proveedor',
    'tipo',
    'fl_domicilio'
  ];
}
