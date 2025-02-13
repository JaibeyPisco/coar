<?php namespace App\Controllers\Configuracion;

use App\Controllers\BaseController;

use App\Models\Configuracion\Estado_monitoreo_model;

class Estado_monitoreo extends BaseController
{
    private Estado_monitoreo_model $Estado_monitoreo_m;

    public function __construct()
    {
        $this->Estado_monitoreo_m = new Estado_monitoreo_model();
    }


    public function get_select()
    {
        $data_request = $this->request->getGet();

        $response = $this->Estado_monitoreo_m->select("id, nombre as text")
            ->where('tipo', $data_request["tipo"])
            ->where('id_empresa', ID_EMPRESA)
            ->findAll();

        return $this->respond($response, 200);
    }


    public function index()
    {
        $response = $this->Estado_monitoreo_m->where('id_empresa', ID_EMPRESA)
            ->findAll();

        return $this->respond(['data' => $response], 200);
    }

    public function save()
    {
        $data_request = $this->request->getPost();

        /* VALIDAR PERMISO */
        if (isset($data_request["id"])) {
            $this->Helper->validar_permisos('configuracion-estado_monitoreo', 'edit');
        }
        else
        {
            $this->Helper->validar_permisos('configuracion-estado_monitoreo', 'new');
        }

        try {

            $db = \Config\Database::connect();
            $db->transStart();

            /** GUARDAR */
            $data = [
                'nombre'          			=> trim($data_request["nombre"]),
                'tipo'              		=> trim($data_request["tipo"]),
                'color_bg'              	=> trim($data_request["color_bg"]),
                'color_text'              	=> trim($data_request["color_text"]),
            ];

            if(isset($data_request["id"]))
            {
                $data["id"] = $data_request["id"];
            }
            else
            {
                $data["id_empresa"] = ID_EMPRESA;
            }

            $this->Estado_monitoreo_m->save($data);

            /****************** SAVE CENTINELA *****************/
            $data_centinela = [
                'modulo'		=> 'CONFIGURACIÓN',
                'menu'			=> 'ESTADO MONITOREO',
                'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
                'descripcion'	=> trim($data_request["nombre"]).', '.trim($data_request["tipo"])
            ];

            $this->Centinela_m->registrar($data_centinela);
            /*************************************************** */

            $db->transComplete();

            return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente'], 200);

        } catch (\Exception $e)
        {
            return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
        }
    }


    public function delete()
    {
        $data_request = $this->request->getPost();

        /* VALIDAR PERMISO */
        $this->Helper->validar_permisos('configuracion-estado_monitoreo', 'delete');

        try {

            $db = \Config\Database::connect();
            $db->transStart();

            $estado_monitoreo = $this->Estado_monitoreo_m->find($data_request["id"]);

            $this->Estado_monitoreo_m->where('id', $data_request["id"])
                ->delete();

            /****************** SAVE CENTINELA *****************/
            $data_centinela = [
                'modulo'		=> 'CONFIGURACIÓN',
                'menu'			=> 'ESTADO MONITOREO',
                'accion'		=> 'ELIMINAR',
                'descripcion'	=> 	$estado_monitoreo->nombre.', '.$estado_monitoreo->tipo
            ];

            $this->Centinela_m->registrar($data_centinela);
            /*************************************************** */

            $db->transComplete();

            return $this->respond(['tipo' => 'success', 'mensaje' => 'Eliminado Correctamente'], 200);

        } catch (\Exception $e) {
            return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
        }
    }

}
