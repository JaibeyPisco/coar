<?php

namespace App\Models\Operacion;

use CodeIgniter\Model;

class Incidencia_archivo_model extends  Model
{
    protected $table            = 'incidencia_archivo';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'object';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields = [
        'id_incidencia',
        'id_incidencia_monitoreo',
        'archivo',
        'nombre',
    ];

}