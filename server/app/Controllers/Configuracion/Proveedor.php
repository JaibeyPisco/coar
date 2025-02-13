<?php namespace App\Controllers\Configuracion;

use App\Controllers\BaseController;

use App\Models\Image_model;

use App\Models\Configuracion\Proveedor_model;


class Proveedor extends BaseController
{
    private Proveedor_model $Proveedor_m;

    public function __construct()
    {
        $this->Proveedor_m = new Proveedor_model();
    }

    public function get_select()
    {
        $response = $this->Proveedor_m->select('id, CONCAT(numero_documento, " | ", razon_social) as text')->where('id_empresa', ID_EMPRESA)->where('estado !=', 0)->findAll();
        return $this->respond($response, 200);
    }

    public function index()
    {
        $response = $this->Proveedor_m->select('proveedor.*, d.nombre as nombre_documento')
            ->select("CONCAT(static_ubigeo.distrito, ' - ', static_ubigeo.provincia, ' - ', static_ubigeo.departamento) as ubigeo")
            ->join('static_documento d', 'd.id = proveedor.id_documento', 'left')
            ->join('static_ubigeo', 'static_ubigeo.id = proveedor.id_ubigeo', 'left')
            ->where('proveedor.estado !=', 0)
            ->findAll();

        return $this->respond(['data' => $response], 200);
    }

    public function save()
    {
        $data_request = $this->request->getPost();

        /* VALIDAR PERMISO */
        if (isset($data_request["id"])) {
            $this->Helper->validar_permisos('configuracion-proveedor', 'edit');
        } else {
            $this->Helper->validar_permisos('configuracion-proveedor', 'new');
        }

        try {

            $db = \Config\Database::connect();
            $db->transStart();

            $Imagen_upload = new Image_model();

            $imagen = $Imagen_upload->guardar($this->request->getFile('imagen'), 'proveedor', (isset($data_request["imagen_anterior"])) ? $data_request["imagen_anterior"] : null);

            /** GUARDAR */
            $data = [
                'id_documento' => trim($data_request['id_documento']),
                'numero_documento' => trim($data_request['numero_documento']),
                'razon_social' => trim($data_request['razon_social']),
                // 'correo'                => trim($data_request['correo']),
                'direccion' => trim($data_request['direccion']),
                'id_ubigeo' => (isset($data_request["id_ubigeo"])) ? trim($data_request["id_ubigeo"]) : null,
                'contacto_nombre' => trim($data_request['contacto_nombre']),
                'telefono' => trim($data_request['contacto_celular']),
                'imagen' => $imagen,
                'estado' => 1
            ];

            if (isset($data_request["id"])) {
                $data["id"] = $data_request["id"];
            } else {
                $data['id_usuario'] = ID_USUARIO;
                $data['id_empresa'] = ID_EMPRESA;

            }

            $this->Proveedor_m->save($data);

            /****************** SAVE CENTINELA *****************/

            $data_centinela = [
                'modulo' => 'SISTEMA',
                'menu' => 'Proveedor',
                'accion' => (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
                'descripcion' => 'Proveedor ' . $data_request['numero_documento']
            ];

            $this->Centinela_m->registrar($data_centinela);
            /*************************************************** */

            $db->transComplete();

            return $this->respond(['tipo' => 'success', 'mensaje' => 'Proveedor Guardado Correctamente'], 200);

        } catch (\Exception $e) {
            return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
        }
    }


    public function delete()
    {
        $data_request = $this->request->getPost();

        /* VALIDAR PERMISO */
        $this->Helper->validar_permisos('configuracion-proveedor', 'delete');

//        try {

            $db = \Config\Database::connect();
//            $db->transStart();



            $data = [
                'id' => $data_request["id"],
                'estado' => 0
            ];


            $this->Proveedor_m->save($data);
        print_r('Tambien');

            /****************** SAVE CENTINELA *****************/
            $proveedor = $this->Proveedor_m->find($data_request["id"]);

            $data_centinela = [
                'modulo' => 'SISTEMA',
                'menu' => 'PROVEEDOR',
                'accion' => 'ELIMINAR',
                'descripcion' => $proveedor->razon_social
            ];

            $this->Centinela_m->registrar($data_centinela);
            /****************************************************/

//            $db->transComplete();

//            return $this->respond(['tipo' => 'success', 'mensaje' => 'Proveedor Eliminado Correctamente'], 200);

//        } catch (\Exception $e) {
//            return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
//        }
    }

}
