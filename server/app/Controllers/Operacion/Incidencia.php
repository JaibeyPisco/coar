<?php

namespace App\Controllers\Operacion;

use App\Models\Configuracion\Lugar_model;
use App\Models\Configuracion\TiposIncidenciasModel;

use App\Controllers\BaseController;
use App\Models\Image_model;

use App\Models\Operacion\Incidencia_archivo_model;
 
use App\Models\Operacion\IncidenciaModel;
 
class Incidencia extends BaseController
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

        if($data_request["tipo_busqueda"] == 'NO_FINALIZADO')
        {
            $response->where('incidencias.estado !=', 'FINALIZADO')
            ->where('incidencias.fl_estado', 1);
        }

        if($data_request["id_estudiante"] != ''){

            $response->where('estudiante.id', $data_request["id_estudiante"]);
        }



        $response = $response->where('incidencias.estado !=', 'DERIVADO')->findAll();

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

    public  function delete(){
        $dataRequest = $this->request->getPost();

        $this->Helper->validar_permisos('operacion-incidencias', 'delete');

        $data= [
            'id' => $dataRequest['id'],
            'fl_estado' => $this->estados['ANULADO'],
            'motivo_anulacion' => $dataRequest['motivo_anulacion']
        ];

        $this->Incidencia_m->save($data);

        /****************** SAVE CENTINELA *****************/
        $data_centinela = [
            'modulo'        => 'OPERACION',
            'menu'          => 'INCIDENCIA',
            'accion'        => 'ELIMINAR',
            'descripcion'   =>  $dataRequest['incidencia']. ' - ' . $dataRequest['motivo_anulacion']
        ];

        $this->Centinela_m->registrar($data_centinela);
    /*************************************************** */

    }

    public  function derivar(){

        $this->Helper->validar_permisos('operacion-incidencias', 'edit');
        
        $dataRequest = $this->request->getPost();

        $data= [
            'id' => $dataRequest['id'],
            'estado' => 'DERIVADO',
            'motivo_derivacion' => $dataRequest['motivo_derivacion']
        ];

        $this->Incidencia_m->save($data);

        /****************** SAVE CENTINELA *****************/
        $data_centinela = [
            'modulo'        => 'OPERACION',
            'menu'          => 'INCIDENCIA',
            'accion'        => 'NEW',
            'descripcion'   =>  $dataRequest['incidencia']. ' - ' . $dataRequest['motivo_derivacion']
        ];

        $this->Centinela_m->registrar($data_centinela);
    /*************************************************** */

    }

    public  function finalizar(){
        $this->Helper->validar_permisos('operacion-incidencias', 'edit');
        $dataRequest = $this->request->getPost();

        $data= [
            'id' => $dataRequest['id'],
            'estado' => 'FINALIZADO',
            'motivo_finalizacion' => $dataRequest['motivo_finalizacion']
        ];

        $this->Incidencia_m->save($data);

        /****************** SAVE CENTINELA *****************/
        $data_centinela = [
            'modulo'        => 'OPERACION',
            'menu'          => 'INCIDENCIA',
            'accion'        => 'NEW',
            'descripcion'   =>  $dataRequest['incidencia']. ' - ' . $dataRequest['motivo_finalizacion']
        ];

        $this->Centinela_m->registrar($data_centinela);
    /*************************************************** */

    }

    public function save()
    {
        $dataRequest = $this->request->getPost();
       /* VALIDAR PERMISO */
		$this->Helper->validar_permisos('operacion-nueva_incidencia', 'new');
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
                    'id_empresa' => ID_EMPRESA,
                    'fl_estado' => $this->estados['ACTIVO'],
                    'estado'   => 'REGISTRADO'
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
