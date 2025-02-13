<?php

namespace App\Controllers\Operacion;

use App\Controllers\BaseController;
use App\Models\Configuracion\TiposIncidenciasModel;
use App\Models\Image_model;
use App\Models\Operacion\Incidencia_archivo_model;
use App\Models\Operacion\Incidencia_monitoreo_model;
use App\Models\Upload_model;

class Incidencia_monitoreo extends BaseController
{
    private Incidencia_monitoreo_model  $Incidencia_monitoreo_m;
    private Incidencia_archivo_model  $Incidencia_archivo_m;
    public function __construct()
    {
        $this->Incidencia_monitoreo_m = new Incidencia_monitoreo_model();
        $this->Incidencia_archivo_m = new Incidencia_archivo_model();

    }

    public function index(){
        $this->Incidencia_monitoreo_m->select('incidencia_monitoreo.*, incidencia.serie, incidencia.numero, incidencia.descripcion, estudiante.apellidos_nombres, estudiante.dni')
        ->join('incidencia', 'incidencia.id = incidencia_monitoreo.id_incidencia', 'left')
        ->join('estudiante', 'estudiante.id = incidencia.id_estudiante', 'left')
        ->where('incidencia_monitoreo.id_empresa', ID_EMPRESA)
        ->where('incidencia_monitoreo.id_usuario', ID_USUARIO)
        ->orderBy('incidencia_monitoreo.id', 'DESC')->findAll();
    }

    public function get_listado_estados_monitoreo( int $id_incidencia ){
        $response = $this->Incidencia_monitoreo_m->select('
        incidencia_monitoreo.*,
        CONCAT(estudiante.nombres, " ", estudiante.apellidos) as estudiante,
        estudiante.dni,
        estado_monitoreo.color_bg,
        estado_monitoreo.nombre as estado_monitoreo,
        estado_monitoreo.color_text,
        u.nombre as usuario
                ')
            ->join('incidencias', 'incidencias.id = incidencia_monitoreo.id_incidencia', 'left')
            ->join('estudiante', 'estudiante.id = incidencias.id_estudiante', 'left')
            ->join('estado_monitoreo', 'incidencia_monitoreo.id_estado_monitoreo = estado_monitoreo.id', 'left')
            ->join('usuario u', 'incidencia_monitoreo.id_usuario = u.id', 'left')
            ->where('incidencia_monitoreo.id_empresa',  ID_EMPRESA)
            ->where('incidencia_monitoreo.id_incidencia', $id_incidencia)
            ->orderBy('incidencia_monitoreo.id', 'DESC')
            ->findAll();


       return $this->respond($response, 200);


    }

    public function save(){

        try {

            $data_request = $this->request->getPost();
            $db = \Config\Database::connect();

            $Imagen_upload = new Image_model();
            $Upload_m = new Upload_model();			
			$archivo = $Upload_m->guardar($this->request->getFile('archivo'), 'incidencia_monitoreo', (isset($data_request["archivo_anterior"])) ? $data_request["archivo_anterior"] : null);
			

            $data = [
                'id_incidencia' => $data_request['id_incidencia'],
                'fecha_hora'    => $data_request['fecha_hora'],
                'problema'  => $data_request['problema'],
                'acuerdos'   => $data_request['problema'],
                'descripcion_privada' => $data_request['descripcion_privada'],
                'id_estado_monitoreo' => $data_request['id_estado_monitoreo'],
                'archivo'            => $archivo
            ];


            if(isset($data_request['id'])){
                $data['id'] = $data_request['id'];
            }else{
                $data['id_empresa'] = ID_EMPRESA;
                $data['id_usuario'] = ID_USUARIO;
            }


             $this->Incidencia_monitoreo_m->save($data);

            $id_monitoreo = (isset($data_request["id"])) ? $data_request["id"] : $db->insertID();


            $fotoEstudiante = json_decode($data_request['fotos']);

            $array_imagen = [];

            foreach ($fotoEstudiante as $row) {

                if ($row->name_archivo_actual != '') {
                    $imagen = $Imagen_upload->guardar($this->request->getFile('archivo_' . $row->codigo), 'incidencia', null);

                    /** GUARDAR IMAGEN */
                    $array_imagen[] = [
                        'id_incidencia'  => $data_request['id_incidencia'],
                        'archivo'		=> $imagen,
                        'nombre'		=> 'INCIDENCIA MONITOREO',
                        'id_incidencia_monitoreo'	=> $id_monitoreo,
                    ];
                }

            }

            if (count($array_imagen) > 0) {
                $this->Incidencia_archivo_m->insertBatch($array_imagen);
            }



            return $this->respond(['mensaje' => 'El monitoreo fue guardado correctamente', 'tipo' => 'success'], 200);

        }catch (\Exception $e) {
            return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
        }

    }


}