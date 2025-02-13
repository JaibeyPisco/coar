<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class ApoderadoModel extends Model
{
    protected $table      = 'apoderado';
    protected $primaryKey = 'id';
    protected $returnType = 'object';

    protected $allowedFields = [
        'apellidos_nombres',
        'dni',
        'numero_telefonico',
        'grado_parentesco',
        'legalizado',
        'id_estudiante'
    ];
}
