<?php

namespace App\Models\Operacion;

use CodeIgniter\Model;

class IncidenciaAbordajeModel extends Model
{
    protected $table            = 'incidenciaabordaje';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'object';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields = [
        'id_incidencia',
        'id_usuario',
        'fecha_abordaje',
        'hora_inicio_abordaje',
        'hora_fin_abordaje',
        'fecha_hora_sistema',
        'cantidad_sesiones_programadas',
        'cantidad_sesiones_brindadas',
        'descripcion',
        'acuerdos',
        'descripcion_privada'
    ];

}