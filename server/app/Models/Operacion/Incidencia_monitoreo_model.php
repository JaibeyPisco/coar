<?php

namespace App\Models\Operacion;

use CodeIgniter\Model;

class Incidencia_monitoreo_model extends Model
{
    protected $table            = 'incidencia_monitoreo';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'object';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields = [
        'id_incidencia',
        'id_usuario',
        'fecha_hora',
        'id_estado_monitoreo',
        'problema',
        'acuerdos',
        'descripcion_privada',
        'id_empresa',
        'archivo'
    ];

}