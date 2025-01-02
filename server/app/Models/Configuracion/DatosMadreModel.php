<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class DatosMadreModel extends Model
{
    protected $table      = 'datos_madre';
    protected $primaryKey = 'id';
    protected $returnType = 'object';

    protected $allowedFields = [
        'madre_viva',
        'madre_con_estudiante',
        'apellidos_nombres_madre',
        'dni_madre',
        'grado_instruccion_madre',
        'ocupacion_actual_madre',
        'num_celular_madre',
        'correo_electronico_madre',
        'motivo_no_vive_con_estudiante',
    ];
}
