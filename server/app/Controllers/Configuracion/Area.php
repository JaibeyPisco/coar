<?php namespace App\Controllers\Configuracion;

use App\Controllers\BaseController;
use App\Models\Configuracion\Usuario_model;
use  App\Models\Configuracion\Area_model;

class Area extends BaseController
{

	private $Usuario_m;
	private $Area_m;

	public function __construct()
	{
		$this->Usuario_m = new Usuario_model();
        $this->Area_m = new Area_model();
	}

	public function get_select()
	{
		$data_request = $this->request->getGet();
		
		$response = $this->Area_m->select("id, nombre as text")->where('estado !=', 0)->findAll();
		
		return $this->respond($response, 200);
	}

	public function index()
	{
		$response = $this->Area_m->select('area.id, area.nombre, area.descripcion')
			->where('area.estado !=', 0)
         	->findAll();
			
        return $this->respond($response, 200);
	}

    private function validarPermisos($data_request, $modulo)
    {

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos($modulo, 'edit');
		}
		else
		{
			$this->Helper->validar_permisos($modulo, 'new');
		}
    }


	public function save()
	{
		$data_request = $this->request->getPost();

		try {

            $this->validarPermisos($data_request, 'sistema-area');

			$db = \Config\Database::connect();
			$db->transStart();

			/* VERIFICAR QUE NO EXISTA REPETIDO */
			if($this->verificar_unico(isset($data_request["id"]) ? $data_request["id"] : null, $data_request["nombre"]) == false){
				return $this->respond(['tipo' => 'warning', 'mensaje' => 'El nombre de la area debe ser unica'], 200);
			} 						
			
			/* GUARDAR */
			$data = [
				'nombre'				=> trim($data_request["nombre"]),
				'descripcion'    		=> trim($data_request["descripcion"]),
				'estado'				=> 1
            ];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}else{
				$data["id_usuario"] = ID_USUARIO;
				$data["id_empresa"] = ID_EMPRESA;
			}

			$this->Area_m->save($data);

			/* SAVE CENTINELA */
			$data_centinela = $this->centinela_data(
				(isset($data_request["id"])) ? 'EDITAR' : 'NUEVO', trim($data_request["nombre"])
			);
			$this->Centinela_m->registrar($data_centinela);

            $db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Area Guardada Correctamente'], 200);

		} catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}

	public function delete()
	{
		$data_request = $this->request->getPost();
		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('sistema-area', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$data = [
				'estado' => 0
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}else{
				$data["id_usuario"] = ID_USUARIO;
			}

			//Verificar que no exista el personal dentro de usuario
			$area_existe = $this->Usuario_m->select("*")->where("id_area", $data["id"])->where("estado", 1)->first();
			
			if(isset($area_existe)){
				return $this->respond(['tipo' => 'warning', 'mensaje' => 'No puede borrar el area porque esta siendo utilizado'], 200);
			}

			$this->Area_m->save($data);

			/****************** SAVE CENTINELA *****************/
			$area = $this->Area_m->find($data_request["id"]);

            $data_centinela = [
                'modulo'		=> 'SISTEMA',
				'menu'			=> 'AREA',
				'accion'		=> 'ELIMINAR',
				'descripcion'	=> $area->nombre
			];

            $this->Centinela_m->registrar($data_centinela);
            /****************************************************/

			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Area Eliminada Correctamente'], 200);

		} catch (\Exception $e) {
			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}

	private function verificar_unico($id, $nombre){
		$unico = true;
		if($id != null){
			$area_existe = $this->Area_m
				->select('nombre')
				->where('id !=', intval($id))
				->where('estado !=', 0)
				->where('nombre', trim($nombre))
				->first();
			if ($area_existe) {
				if ($area_existe->nombre == trim($nombre)) {
					$unico = false;
				}
			}
		}
		else{
			$area_existe = $this->Area_m
				->select('nombre')
				->where('estado !=', 0)
				->where('nombre', trim($nombre))
				->first();
			if ($area_existe) {
				if ($area_existe->nombre == trim($nombre)) {
					$unico = false;
				}
			}
		}
		return $unico;
	}

	private function centinela_data($accion, $descripcion){
		$data_centinela = [
			'modulo'		=> 'SISTEMA',
			'menu'			=> 'AREA',
			'accion'		=> $accion,
			'descripcion'	=> 	$descripcion
		];

		return $data_centinela;
	}

}
