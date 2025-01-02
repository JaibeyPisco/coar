<?php namespace App\Controllers\Configuracion;

use App\Controllers\BaseController;
use App\Models\Configuracion\TiposIncidenciasModel;

class TiposIncidencias extends BaseController
{
	private TiposIncidenciasModel $TiposIncidenciaModel;

	public function __construct()
	{
		$this->TiposIncidenciaModel = new TiposIncidenciasModel();
	}

	public function getSelect()
	{
		$response = $this->TiposIncidenciaModel->select("id, nombre as text")->where('estado', 1)->findAll();

		return $this->respond($response, 200);
	}

	public function index()
	{		
		$response = $this->TiposIncidenciaModel->where('tipos_incidencias.estado !=', 0)->findAll();
		return $this->respond(['data' => $response], 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();
		 
		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('configuracion-tipos_incidencia', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('configuracion-tipos_incidencia', 'new');
		} 

		 try {

			$db = \Config\Database::connect();
			 $db->transStart();

			/** GUARDAR */
			$data = [
				'nombre' =>  $data_request["nombre_incidencia"],
				'necesita_abordaje_directa' => isset($data_request['necesita_abordaje_directa'])  ? 1 : 0,
				'nivel_incidencia' =>  $data_request["nivel_incidencia"], 
				'id_usuario' => ID_USUARIO,
				'estado' => 1
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}else{
                $data["id_empresa"] = ID_EMPRESA;
            }
			 
			$this->TiposIncidenciaModel->save($data);
           
			// /****************** SAVE CENTINELA *****************/

            $data_centinela = [
                'modulo'		=> 'Configuracion',
                'menu'			=> 'Tipo Incidencia',
                'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
                'descripcion'	=> 'Incidencia ' . $data_request['nombre_incidencia']
            ];
            $this->Centinela_m->registrar($data_centinela);

            /* ************************************************** */

			 $db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Tipo de Incidencia Guardado Correctamente'], 200);

		 } catch (\Exception $e)
		 {
		   return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		 }
	}

	public function delete()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('configuracion-tipos_incidencia', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$data = [
                'id' => $data_request["id"],
				'estado' => 0
			];

            $this->TiposIncidenciaModel->save($data);

            /* ***************** SAVE CENTINELA **************** */
			$tipoIncidencia = $this->TiposIncidenciaModel->find($data_request["id"]);
            $data_centinela = [
                'modulo'		=> 'Configuracion',
				'menu'			=> 'Tipo Incidencia',
				'accion'		=> 'ELIMINAR',
				'descripcion'	=> 'Incidencia anulada ' . $tipoIncidencia->nombre
			];

            $this->Centinela_m->registrar($data_centinela);
            /****************************************************/
			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Tipo de Incidencia Eliminada Correctamente'], 200);

		} catch (\Exception $e) {
			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}


}
