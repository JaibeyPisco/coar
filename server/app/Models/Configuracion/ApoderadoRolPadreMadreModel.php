<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class ApoderadoRolPadreMadreModel extends Model
{
    protected $table      = 'apoderado_rol_padre_madre';
    protected $primaryKey = 'id';
    protected $returnType = 'object';

    protected $allowedFields = [
        'parentesco_con_apoderado',
        'apellidos_nombres_apoderado',
        'dni_apoderado',
        'num_celular_apoderado',
        'tipo_familia',
    ];
}
