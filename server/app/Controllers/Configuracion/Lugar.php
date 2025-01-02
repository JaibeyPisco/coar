<?php

namespace App\Controllers\Configuracion;

use App\Controllers\BaseController;
use App\Models\Configuracion\Lugar_model;
class Lugar extends BaseController
{
    private Lugar_model $Lugar_m;
    public function __construct()
    {
        $this->Lugar_m = new Lugar_model();
    }

    public function index()
    {
        $data = $this->Lugar_m->where('id_empresa', ID_EMPRESA)->findAll();

        return $this->respond(['data' => $data], 200);
    }

    public function save()
    {
        $data_request = $this->request->getPost();
 

        if(isset($data_request['id'])){

            $this->Helper->validar_permisos('configuracion-lugar', 'edit');
           
           

        }else{
            $this->Helper->validar_permisos('configuracion-lugar', 'new');
           
        }

        try {
          
            $db = \Config\Database::connect();
			// $db->transStart();

            $data = [
				'nombre'       => trim($data_request["nombre"]),
				'referencia'    => trim($data_request["referencia"]),
			];


            if(isset($data_request['id'])){
              $data['id'] = $data_request['id'];
            
            }else{
                $data['id_empresa'] = ID_EMPRESA;
            }

            $this->Lugar_m->save($data);
 

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'LUGAR',
				'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
				'descripcion'	=>  trim($data_request["nombre"])
			];

			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */

            // $db->transComplete();

        } catch (\Exception $e) {
            return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
        }
        return $this->respond(['data' => $data], 200);
    }

    public function get_select(){
        $data = $this->Lugar_m->where('id_empresa', ID_EMPRESA)->findAll();
        
        return $this->respond($data, 200);
    }
}
