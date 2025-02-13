<?php namespace App\Controllers\Configuracion;

use App\Controllers\BaseController;
use App\Models\Configuracion\Area_model;
use App\Models\Configuracion\Usuario_model;
use App\Models\Configuracion\Personal_model;
use App\Models\Configuracion\TipoPersonalModel;
use App\Models\Image_model;
use App\Models\Sistema\Usuario_Area_model;
use Exception;

class Tipo_Personal extends BaseController
{
	private TipoPersonalModel $TipoPersonalModel;
 


	public function __construct()
	{
		 
		$this->TipoPersonalModel = new TipoPersonalModel();
	}

	public function index()
	{		
		$response = $this->TipoPersonalModel->select('tipo_personal.*')
		->where('estado !=', 0)
		->where('id_empresa', ID_EMPRESA)
		->findAll();
 
		return $this->respond(['data' => $response], 200);
	}

	public function get_select()
	{
		$response = $this->TipoPersonalModel->select("id, nombre")
		->where('estado', 1)
		->where('id_empresa', ID_EMPRESA)
		->findAll();

		return $this->respond($response, 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('configuracion-tipo_personal', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('configuracion-tipo_personal', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->transStart();	
		 
			/* GUARDAR */
			$data = [
				'nombre' =>  $data_request["nombre"],
				'descripcion' => $data_request['descripcion'], 
				'estado' => 1,

			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];

			}else{
				
				$data["id_usuario"] = ID_USUARIO;
				$data['id_empresa'] = ID_EMPRESA;
			}
			 
			$this->TipoPersonalModel->save($data);
 
			/* SAVE CENTINELA */
			$this->centinela_data(
				(isset($data_request["id"])) ? 'EDITAR' : 'NUEVO', 
				 'Nuevo Tipo Personal ' . $data['nombre']
			);

			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Tipo de Persona Guardado Correctamente'], 200);

		} catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}

	public function delete()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('configuracion-tipo_personal', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$data = [
				'estado' => 0,
				"id" => $data_request["id"]
			];
 
 

			$this->TipoPersonalModel->save($data);

			/****************** SAVE CENTINELA *****************/
			$tipoPersonal = $this->TipoPersonalModel->find($data_request["id"]);

            $data_centinela = [
                'modulo'		=> 'Configuracion',
				'menu'			=> 'Tipo Personal',
				'accion'		=> 'ELIMINAR',
				'descripcion'	=> $tipoPersonal->nombre
			];

            $this->Centinela_m->registrar($data_centinela);
            /****************************************************/

			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Tipo de Persona Eliminada Correctamente'], 200);

		} catch (\Exception $e) {
			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}

 
	private function centinela_data($accion, $descripcion){
		$data_centinela = [
			'modulo'		=> 'CONFIGURACIÓN',
			'menu'			=> 'TIPO PERSONAL',
			'accion'		=> $accion,
			'descripcion'	=> 	$descripcion
		];

		// return $data_centinela;
		$this->Centinela_m->registrar($data_centinela);
	}

}
