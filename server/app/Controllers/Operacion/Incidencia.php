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

class Incidencia extends BaseController
{
    private IncidenciaModel $Incidencia_m;
    private IncidenciaAtencionModel  $IncidenciaAtencionModel;
    private EstudianteModel $EstudianteModel;
    private  TiposIncidenciasModel  $Tipos_incidencias_m;
    private Lugar_model $Lugar_m;
    private  Incidencia_archivo_model $incidencia_archivo_m;



    public function __construct()
    {

        $this->Incidencia_m = new IncidenciaModel();

        $this->IncidenciaAtencionModel = new IncidenciaAtencionModel();
        $this->EstudianteModel = new EstudianteModel();
        $this->Tipos_incidencias_m = new TiposIncidenciasModel();
        $this->Lugar_m = new Lugar_model();
        $this->incidencia_archivo_m = new Incidencia_archivo_model();

    }

    public function index()
    {
        $data_request = $this->request->getGet();
        $response = $this->Incidencia_m
            ->select('incidencias.id, CONCAT(incidencias.serie, "-", incidencias.numero) as incidencia, incidencias.descripcion')
            ->select('CONCAT(estudiante.apellidos_nombres, " - ", estudiante.dni) as estudiante')

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

            ->join('estudiante', 'estudiante.id = incidencias.id_estudiante', 'left');

        if($data_request["id_estudiante"] != ''){

            $response->where('estudiante.id', $data_request["id_estudiante"]);
        }

           $response = $response->findAll();

        return $this->respond(['data' => $response], 200);
    }

    public  function get_archivos(int $id_incidencia,  int $id_incidencia_monitoreo = null)
    {

        $response = $this->incidencia_archivo_m;

        if($id_incidencia_monitoreo != null){

            $response = $response->where('id_incidencia_monitoreo', $id_incidencia_monitoreo);
        }

        $response =$response
            ->where('id_incidencia', $id_incidencia)
            ->findAll();

        return $this->respond($response, 200);
    }

    public function getInitial()
    {

        $response = [
            'secuencia' => $this->Incidencia_m->get_correlativo(),
            'tipo_incidencias' => $this->Tipos_incidencias_m->where('id_empresa', ID_EMPRESA)->select("id, nombre as text")->where('estado', 1)->findAll(),
            'lugares'          => $this->Lugar_m->select("id, nombre as text")->where('id_empresa', ID_EMPRESA)->findAll()
        ];

        return $this->respond($response, 200);

    }



    public function save()
    {
        $dataRequest = $this->request->getPost();
       
        try {

            $db = \Config\Database::connect();


            $estudiantes = json_decode($dataRequest["estudiantes"]);

            $correlativo = $this->Incidencia_m->get_correlativo();

            $data = [];

            foreach ($estudiantes as $estudiante) {
                
                $data [] = [
                    'serie' => $correlativo['serie'],
                    'numero' => $correlativo['numero'],
                    'fecha' => $dataRequest['fecha_hora'],
                    'id_tipo_incidencia' => $dataRequest['id_tipo_incidencia'],
                    'id_lugar_incidencia' => $dataRequest['id_lugar_incidencia'],
                    'id_estudiante' => $estudiante->id_estudiante,
                    'descripcion' => $dataRequest['descripcion'],
                    'id_usuario' => ID_USUARIO,
                    'id_empresa' => ID_EMPRESA
                ];
            }

        $this->Incidencia_m->insertBatch($data);

        $primerID = $db->insertID();

        $totalRegistros = count($data);
        $incidenciaIDs = range($primerID, $primerID + $totalRegistros - 1);

        // GUARDAR IMAGENES
        $Imagen_upload = new Image_model();

        $array_imagen = [];

        foreach ($incidenciaIDs as $index => $id_incidencia) {
            // if (!isset($estudiantes[$index])) continue;
            $fotoEstudiante = json_decode($dataRequest['fotos']);

            foreach ($fotoEstudiante as $row) {

                if ($row->name_archivo_actual != '') {
                    $imagen = $Imagen_upload->guardar($this->request->getFile('archivo_' . $row->codigo), 'incidencia', null);

                    /** GUARDAR IMAGEN */
                    $array_imagen[] = [
                        'id_incidencia'  => $id_incidencia,
                        'archivo'		=> $imagen,
                        'nombre'		=> 'INCIDENCIA ARCHIVO',
                    ];
                }

            }
        }

        if (count($array_imagen) > 0) {
            $this->incidencia_archivo_m->insertBatch($array_imagen);
        }

            /****************** SAVE CENTINELA *****************/
            $data_centinela = [
                'modulo'        => 'OPERACION',
                'menu'          => 'NUEVA INCIDENCIA',
                'accion'        => (isset($data_request["id_estudiante"])) ? 'EDITAR' : 'NUEVO',
                'descripcion'   =>  $dataRequest['descripcion']
            ];

            $this->Centinela_m->registrar($data_centinela);
            /*************************************************** */

//            $db->transComplete();

            return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente', 'dataaa' => $data], 200);
        
        } catch (\Exception $e) {

            return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);

        }
    }


}
