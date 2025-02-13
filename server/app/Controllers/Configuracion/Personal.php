<?php namespace App\Controllers\Configuracion;

use App\Controllers\BaseController;

use App\Models\Configuracion\Personal_model;
// use App\Models\Configuracion\Cuenta_bancaria_persona_model;
use App\Models\Configuracion\Usuario_model;
use App\Models\Image_model;
use Exception;

class Personal extends BaseController
{

	private $Usuario_m;
	private $Personal_m;

	public function __construct()
	{
		$this->Usuario_m = new Usuario_model();
		$this->Personal_m = new Personal_model();

	}

	public function get_select()
	{
		$data_request = $this->request->getGet();

		$response = $this->Personal_m->select("id, CONCAT(nombre, ' ', apellido) as text");

		if(isset($data_request["tipo"])){
			
			$response->where('id_tipo_personal',$data_request["tipo"]);
		}

		$response = $response->where('estado !=',0)
		->findAll();
		return $this->respond($response, 200);
	}

	public function index()
	{
		$response = $this->Personal_m->select('personal.*,')
            ->select("CONCAT(tipo_personal.nombre) as nombre_tipo_personal, d.nombre as nombre_documento, p.razon_social as proveedor")
            ->select("CONCAT(static_ubigeo.distrito, ' - ', static_ubigeo.provincia, ' - ', static_ubigeo.departamento) as ubigeo")
            ->join('tipo_personal', 'tipo_personal.id = personal.id_tipo_personal', 'left')
            ->join('static_documento d', 'd.id = personal.id_tipo_documento', 'left')
            ->join('proveedor p' , 'p.id = personal.id_proveedor', 'left')
            ->join('static_ubigeo', 'static_ubigeo.id = personal.ubigeo', 'left')
		// ->where('personal.estado !=', 0)
		->findAll();

        return $this->respond(['data' => $response], 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('configuracion-personal', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('configuracion-personal', 'new');
		} 

		try {

			$validation = \Config\Services::validation();
			$db = \Config\Database::connect();
//			$db->transStart();


            $Imagen_upload = new Image_model();

            $imagen = $Imagen_upload->guardar($this->request->getFile('imagen'), 'personales', (isset($data_request["imagen_anterior"])) ? $data_request["imagen_anterior"] : null);
            $firma = $Imagen_upload->guardar($this->request->getFile('imagen_firma'), 'personales', (isset($data_request["firma_anterior"])) ? $data_request["firma_anterior"] : null);

            /** GUARDAR */
			$data = [
				'id_tipo_personal'          => trim($data_request["tipo_personal"]),
				// 'codigo'					=> trim($data_request["codigo"]),
				'nombre'                    => trim($data_request["nombre"]),
                'apellido'                    => trim($data_request["apellido"]),
				'tipo_contratacion'         			=> trim($data_request["tipo_contratacion"]),
                'direccion'         			=> trim($data_request["direccion"]),
                'ubigeo'         			=> trim($data_request["id_ubigeo"]),
                'comentario'         			=> trim($data_request["comentario1"]),
                'numero_documento'  => trim($data_request["numero_documento"]),
                'id_proveedor'              => (isset($data_request["id_proveedor"])) ? $data_request["id_proveedor"] : null,
//				'telefono'         	        => trim($data_request["telefono"]),
                'imagen'                    => $imagen,
                'firma'                     => $firma,
                'id_tipo_documento'        => trim($data_request["id_documento"]),
				'estado'					=> 1 // ESTADO 1 = ACTIVO
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}
			else
			{
				$data["id_empresa"] = ID_EMPRESA;
				$data["id_membresia"] = ID_MEMBRESIA;


			}

			$this->Personal_m->save($data);
			
			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'PERSONAL',
				'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
				'descripcion'	=> trim($data_request["nombre"]).' '.trim($data_request["apellido"])
			];

			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */

//			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Personal Guardado Correctamente'], 200);

		} 
		catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}

	public function delete()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('configuracion-personal', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$data = [
				'estado' => 0, // ESTADO O = ANULADO
				'id' => $data_request["id"]
			];

			// if(isset($data_request["id"]))
			// {
			// 	$data["id"] = $data_request["id"];
			// }else{
			// 	$data["id_usuario"] = ID_USUARIO;
			// }

			//Verificar que no exista el personal dentro de usuario
			// $personal_existe = $this->Usuario_m->select("*")->where("id_personal", $data["id"])->where("estado", 1)->first();

			// if(isset($personal_existe)){
			// 	return $this->respond(['tipo' => 'warning', 'mensaje' => 'No puede borrar el personal porque esta siendo utilizado'], 200);
			// }

			$this->Personal_m->save($data);

			/****************** SAVE CENTINELA *****************/
			$personal = $this->Personal_m->find($data_request["id"]);

            $data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'PERSONAL',
				'accion'		=> 'ELIMINAR',
				'descripcion'	=> $personal->nombre.' '.$personal->apellido
			];

			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */

			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Personal Eliminado Correctamente'], 200);

		} catch (\Exception $e) {
			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}


}
