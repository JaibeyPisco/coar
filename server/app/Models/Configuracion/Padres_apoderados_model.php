<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Padres_apoderados_model extends Model
{
    protected $table      = 'padres_apoderados';
    protected $primaryKey = 'id';
    protected $returnType = 'object';

    protected $allowedFields = [
        'vive',
        'vive_con_estudiante',
        'nombres',
        'apellidos',
        'dni',
        'grado_instruccion',
        'ocupacion_actual',
        'correo_electronico',
        'telefono',
        'motivo_no_vive_con_estudiante',
        'tipo',
        'fl_legalizado',
        'foto',
        'id_estudiante',
        'parentesco_estudiante',
    ];
}
