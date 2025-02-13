<?php namespace App\Models\Configuracion;

use CodeIgniter\Model;

class Estado_monitoreo_model extends Model
{
    protected $table      = 'estado_monitoreo';
    protected $primaryKey = 'id';
    protected $returnType = 'object';

    protected $allowedFields = [
        'nombre',
        'id_empresa',
        'tipo',
        'color_bg',
        'color_text'

    ];
}
