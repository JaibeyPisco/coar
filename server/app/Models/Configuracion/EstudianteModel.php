<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class EstudianteModel extends Model
{
    protected $table      = 'estudiante';
    protected $primaryKey = 'id';
    protected $returnType = 'object';

    protected $allowedFields = [
        'apellidos',
        'nombres',
        'obsv',
        'grado',
        'seccion',
        'dni',
        'foto',
        'sexo',
        'correo_electronico',
        'fecha_nacimiento',
        'lav',
        'llaves',
        'pabellon',
        'ala',
        'cama_ropero',
        'duchas',
        'banos',
        'urinarios',
        'monitor_acompana',
        'lugar_nacimiento',
        'fecha_caducidad_dni',
        'num_telefonico',
        'religion',
        'region_domicilio_actual',
        'provincia_domicilio_actual',
        'distrito_domicilio_actual',
        'direccion_domicilio_actual',
        'referencia_domicilio_actual',
        'codigo_estudiante', 
        'tipo_familia',
        'condicion_estudiante'
    ];
}
