<?php namespace App\Controllers\Configuracion;

use App\Controllers\BaseController;

use App\Models\Configuracion\EstudianteModel;
use App\Models\Configuracion\Usuario_model;
use App\Models\Configuracion\Personal_model;
use App\Models\Image_model;
use App\Models\Configuracion\TipoPersonalModel;

use Exception;

class Usuario extends BaseController
{
	private TipoPersonalModel $TipoPersonalModel;
	private $Usuario_m;
	private $Usuario_Area_m;

	public function __construct()
	{
		$this->Usuario_m = new Usuario_model();

		$this->TipoPersonalModel = new TipoPersonalModel();
	}

	public function get_select()
	{
		$data_request = $this->request->getGet();

		$response = $this->Usuario_m->select("id, concat(nombre,' ',apellido) as text, imagen, color, fl_supervisor")->where('id_area', ID_LOCAL)->where("estado !=",0);



		$response = $response->where('id_empresa', ID_EMPRESA)
		->findAll();
		return $this->respond($response, 200);
	}


	public function index()
	{
 
	$response = $this->Usuario_m
		->select('usuario.id, usuario.usuario, usuario.email, usuario.nombre, usuario.apellido, usuario.id_rol, usuario.tipo_persona, usuario.id_personal, usuario.imagen')
		->select('rol.nombre as rol')
		->select('CONCAT(estudiante.apellidos, " ", estudiante.nombres) as estudiante, estudiante.id as id_estudiante')
		->join('rol', 'rol.id = usuario.id_rol', 'left')
		->join('estudiante', 'estudiante.id = usuario.id_estudiante', 'left')
		->where('usuario.id_empresa', ID_EMPRESA)
		->findAll();

	 
        return $this->respond(['data' =>$response], 200);
	}

    public function save()
    {
        $data_request = $this->request->getPost();

        /* VALIDAR PERMISO */
        if (isset($data_request["id"])) {

            $this->Helper->validar_permisos('configuracion-usuario', 'edit');
        }
        else
        {
            $this->Helper->validar_permisos('configuracion-usuario', 'new');
        }

       try {


            $db = \Config\Database::connect();
           $db->transStart();

            /** GUARDAR IMAGEN */
            $Imagen_upload = new Image_model();

            $imagen = $Imagen_upload->guardar($this->request->getFile('imagen'), 'usuario', (isset($data_request["imagen_anterior"])) ? $data_request["imagen_anterior"] : null);

            if(isset($data_request["id_personal"]) && $data_request["id_personal"] != '')
            {
                $Personal_m = new Personal_model();
                $personal = $Personal_m->find($data_request["id_personal"]);

                $data_request["nombre"] = $personal->nombre;
                $data_request["apellido"] = $personal->apellido;
            } 

			if(isset($data_request["id_estudiante"]) && $data_request["id_estudiante"] != null)
			{
				 
				$Estudiante_m = new EstudianteModel();

				$estudiante = $Estudiante_m->find($data_request["id_estudiante"]);

				if(is_object($estudiante)){
					$data_request["nombre"] = $estudiante->nombres;
					$data_request["apellido"] = $estudiante->apellidos;

				}
			}
             


            /** GUARDAR */
            $data = [
                'nombre'					=> trim($data_request["nombre"]),
                'apellido'    				=> trim($data_request["apellido"]),
                'email'						=> trim($data_request["email"]),
                'usuario'					=> trim($data_request["usuario"]),
                'imagen'					=> $imagen,
                'tipo'          			=> ($data_request["id_rol"] != '') ? 'USUARIO' : 'SUPER ADMINISTRADOR',
                'id_rol'          			=> ($data_request["id_rol"] != '') ? $data_request["id_rol"] : null,
                'id_personal'      			=> (isset($data_request["id_personal"])) ? $data_request["id_personal"] : null,
                'id_estudiante'      			=> (isset($data_request["id_estudiante"])) ? $data_request["id_estudiante"] : null,



                'tipo_persona'  			=> $data_request["tipo_persona"],

            ];

            if(isset($data_request["id"]))
            {
                $data["id"] = $data_request["id"];
            }
            else
            {
 
                $random_salt = hash('sha512', uniqid(mt_rand(1, mt_getrandmax()), true));
                $password = hash('sha512', trim($data_request["clave"]) . $random_salt);

                $data["password"] = $password;
                $data["salt"] = $random_salt;
                $data["id_empresa"] = ID_EMPRESA;
                $data["id_membresia"] = ID_MEMBRESIA;
            }

            $this->Usuario_m->save($data);

            /****************** SAVE CENTINELA *****************/
            $data_centinela = [
                'modulo'		=> 'CONFIGURACIÓN',
                'menu'			=> 'USUARIOS',
                'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
                'descripcion'	=> trim($data_request["usuario"])
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
 
    public function save_password()
    {
        $data_request = $this->request->getPost();

        /* VALIDAR PERMISO */
        $this->Helper->validar_permisos('configuracion-usuario', 'edit');

        try {

            $db = \Config\Database::connect();
            $db->transStart();

            /** GUARDAR */

            $random_salt = hash('sha512', uniqid(mt_rand(1, mt_getrandmax()), true));
            $password = hash('sha512', $data_request["password"] . $random_salt);

            $data = [
                'password'		=> $password,
                'salt'    		=> $random_salt,
                'id'			=> $data_request["id"],
				'token'			=> null
            ];

			 
            $this->Usuario_m->save($data);

			

            $usuario = $this->Usuario_m->find($data_request["id"]);

            /****************** SAVE CENTINELA *****************/
            $data_centinela = [
                'modulo'		=> 'CONFIGURACIÓN',
                'menu'			=> 'USUARIOS',
                'accion'		=> 'CAMBIO PASSWORD',
                'descripcion'	=> 	$usuario->usuario
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
	private function centinela_data($accion, $descripcion){
		$data_centinela = [
			'modulo'		=> 'CONFIGURACIÓN',
			'menu'			=> 'USUARIOS',
			'accion'		=> $accion,
			'descripcion'	=> 	$descripcion
		];

		return $data_centinela;
	}


	public function delete()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('configuracion-usuario', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$data = [
				'estado' => 0
			];

			if(isset($data_request["id"]))
			{
				$data["id"] = $data_request["id"];
			}

			$this->Usuario_m->save($data);

			$usuario = $this->Usuario_m->find($data_request["id"]);
			
			/** ELIMINAR IMAGEN */
			$Imagen_upload = new Image_model();
			$Imagen_upload->eliminar($usuario->imagen);

			/****************** SAVE CENTINELA *****************/
			$data_centinela = $this->centinela_data("ELIMINAR", $usuario->usuario);

			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */
            
			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Eliminado Correctamente'], 200);

		} catch (\Exception $e) {
			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}

	public function save_suspendido()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('configuracion-usuario', 'edit');
		
		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$data = [
				'fl_suspendido'	=> 1,
				'id'			=> $data_request["id"]
			];

			$this->Usuario_m->save($data);

			$usuario = $this->Usuario_m->find($data_request["id"]);

			/****************** SAVE CENTINELA *****************/
			$data_centinela = $this->centinela_data("SUSPENDIDO", $usuario->usuario);
			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */

			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Usuario Suspendido Correctamente'], 200);

		} catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}

	public function save_activar()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('configuracion-usuario', 'edit');
		
		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$data = [
				'fl_suspendido'	=> null,
				'id'			=> $data_request["id"]
			];

			$this->Usuario_m->save($data);

			$usuario = $this->Usuario_m->find($data_request["id"]);

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'USUARIOS',
				'accion'		=> 'SUSPENDIDO',
				'descripcion'	=> 	$usuario->usuario
			];

			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */

			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Usuario Activado Correctamente'], 200);

		} catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}
	
	public function save_local()
	{
		$data_request = $this->request->getPost();

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$data = [
				'id_local'		=> $data_request["id_local"],
				'id_area'		=> $data_request["id_local"],
				'id'			=> ID_USUARIO
			];

			$this->Usuario_m->save($data);

			$usuario = $this->Usuario_m->find(ID_USUARIO);

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'SISTEMA',
				'menu'			=> 'USUARIO',
				'accion'		=> 'CAMBIO AREA',
				'descripcion'	=> 	$usuario->usuario
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

}
