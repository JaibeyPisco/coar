<?php

namespace App\Models\Operacion;

use CodeIgniter\Model;

class IncidenciaModel extends Model
{
    protected $table            = 'incidencias';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'object';
    protected $useSoftDeletes   = false;
    protected $protectFields    = true;
    protected $allowedFields    = [
        'id_usuario',

        'descripcion',
        'id_tipo_incidencia',
        'id_lugar_incidencia',
        'fecha',
        'fl_estado',
        'serie',  
        'numero',
        'id_estudiante',
        'id_usuario',
        'motivo_anulacion',
        'motivo_derivacion',
        'motivo_finalizacion',
        'estado'

    ];

    // Dates
    protected $useTimestamps = true;
    // protected $dateFormat    = 'timestamp';
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';


    
    public function get_correlativo()
    {
        $IncidenciaEstudianteModel = new IncidenciaModel();
    
        $currentYear = date('Y');
    
        $response = $IncidenciaEstudianteModel
            ->select('COALESCE(MAX(CAST(numero AS UNSIGNED)), 0) as numero')
            ->where('serie', $currentYear)
            // ->where('id_empresa', ID_EMPRESA)
            ->first();
    
        if ($response === null || $response->numero === 0) {

            // No records found, set series to the current year and start from 1

            $serie = $currentYear;
            $numero = '00000001';
        } else {
            // Increment the number
            $numero = str_pad(($response->numero + 1), 8, "0", STR_PAD_LEFT);
            $serie = $currentYear;
        }
    
        return [
            'serie' => $serie,
            'numero' => $numero,
        ];
    }
    
}
