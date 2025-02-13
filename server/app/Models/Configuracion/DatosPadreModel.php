<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class DatosPadreModel extends Model
{
    protected $table      = 'datos_padre';
    protected $primaryKey = 'id';
    protected $returnType = 'object';

    protected $allowedFields = [
        'padre_vivo',
        'padre_con_estudiante',
        'apellidos_nombres_padre',
        'dni_padre',
        'grado_instruccion_padre',
        'ocupacion_actual_padre',
        'correo_electronico_padre',
        'num_celular_padre',
        'motivo_padre_no_vive_con_estudiante',
    ];
}
