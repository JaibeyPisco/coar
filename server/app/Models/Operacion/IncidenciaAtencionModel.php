<?php

namespace App\Models\Operacion;

use CodeIgniter\Model;

class IncidenciaAtencionModel extends Model
{
    protected $table            = 'incidenciaatencion';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'object';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields = [
        'id_incidencia',
        'id_personal',
        'existen_involucrados_atencion_incidencia',
        'se_soluciono',
        'incidencia_cerrada',
        'incidencia_derivada',
        'fecha_hora_atencion',
        'comentario_atencion_incidencia',
        'id_usuario_atencion_incidencia',
    ];

}