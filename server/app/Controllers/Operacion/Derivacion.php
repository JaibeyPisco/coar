<?php

namespace App\Controllers\Operacion;

use App\Models\Configuracion\Lugar_model;
use App\Models\Configuracion\TiposIncidenciasModel;

use App\Controllers\BaseController;
use App\Models\Image_model;

use App\Models\Operacion\Incidencia_archivo_model;
use App\Models\Operacion\IncidenciaAtencionModel;
use App\Models\Operacion\IncidenciaModel;
use App\Models\Configuracion\EstudianteModel;

class Derivacion extends BaseController
{
    private IncidenciaModel $Incidencia_m;
    private  TiposIncidenciasModel  $Tipos_incidencias_m;
    private Lugar_model $Lugar_m;
    private  Incidencia_archivo_model $incidencia_archivo_m;

    private array $estados = [
        'ANULADO' => 0,
        'ACTIVO' => 1
    ];

    public function __construct()
    {

        $this->Incidencia_m = new IncidenciaModel();
 
        $this->Tipos_incidencias_m = new TiposIncidenciasModel();
        $this->Lugar_m = new Lugar_model();
        $this->incidencia_archivo_m = new Incidencia_archivo_model();

    }

    public function index()
    {
        $data_request = $this->request->getGet();

                $response = $this->Incidencia_m
                ->select('incidencias.id, CONCAT(incidencias.serie, "-", incidencias.numero) as incidencia, incidencias.descripcion, incidencias.fl_estado, incidencias.estado, incidencias.fecha')
                ->select('CONCAT(estudiante.nombres," ", estudiante.apellidos ," - ", estudiante.dni) as estudiante')
                ->select('tipos_incidencias.nombre as tipo_incidencia')
                ->select('lugar.nombre as lugar_incidencia')

            ->SELECT("(
                SELECT JSON_OBJECT(
                                'estado', estado_monitoreo.nombre,
                            'color_bg', estado_monitoreo.color_bg,
                            'color_text', estado_monitoreo.color_text
                    )
                FROM incidencia_monitoreo
                        INNER JOIN estado_monitoreo ON estado_monitoreo.id = incidencia_monitoreo.id_estado_monitoreo
                WHERE incidencia_monitoreo.id_incidencia = incidencias.id
                ORDER BY incidencia_monitoreo.id DESC
                
                LIMIT 1 ) as  ultimo_monitoreo
                ")
                ->select('(SELECT COUNT(*) FROM incidencia_archivo WHERE id_incidencia = incidencias.id) as cantidad_archivos')
                ->join('estudiante', 'estudiante.id = incidencias.id_estudiante', 'left')
                ->join('tipos_incidencias', 'tipos_incidencias.id = incidencias.id_tipo_incidencia', 'left')
                ->join('lugar', 'lugar.id = incidencias.id_lugar_incidencia', 'left')
                ->where('DATE_FORMAT(incidencias.fecha, "%Y-%m-%d") >=', $data_request["fecha_inicio"])
                ->where('DATE_FORMAT(incidencias.fecha, "%Y-%m-%d") <=', $data_request["fecha_fin"]);

          

            
                // if($data_request["tipo_busqueda"] == 'NO_FINALIZADO')
                // {
                //     $response->where('incidencias.estado !=', 'FINALIZADO')
                //     ->where('incidencias.fl_estado', 1);
                // }

                if($data_request["id_estudiante"] != ''){

                    $response->where('estudiante.id', $data_request["id_estudiante"]);
                }


           $response = $response
           ->where('incidencias.estado', 'DERIVADO')
           ->findAll();

        return $this->respond(['data' => $response], 200);
    }

    


}
