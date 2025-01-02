<?php namespace App\Controllers;

use App\Libraries\CreatorJwt;
use CodeIgniter\API\ResponseTrait;
use App\Models\Helper_model;
use App\Models\Configuracion\Usuario_model;
use App\Models\Configuracion\Permiso_model;
use App\Models\Configuracion\Ajuste_avanzado_model;
use App\Models\Configuracion\Empresa_model;
use App\Models\Configuracion\Moneda_model;
use CodeIgniter\Controller;

class App extends BaseController
{
	use ResponseTrait;

	public function __construct()
	{
		$this->CreatorJwt = new CreatorJwt();
		$this->Helper = new Helper_model();
	}

	public function initial($response = true)
	{	

		$Usuario_m = new Usuario_model;
		$Ajuste_avanzado_m = new Ajuste_avanzado_model();
		$Empresa_m = new Empresa_model;
		$Moneda_m = new Moneda_model;
		
		$usuario = $Usuario_m->select('usuario.id, usuario.id_area, usuario.imagen,fl_clave, id_rol, usuario.id_local, usuario.tipo, usuario.nombre, usuario.apellido, usuario.email, usuario.id_empresa, id_personal, tipo_persona, usuario.usuario, usuario.fl_cambio_local, fl_supervisor')
			->select('r.fl_no_dashboard')
			->select('a.nombre as local')
			->select('tp.nombre as nombre_tipo_persona')
			 
			->join('rol r', 'r.id = usuario.id_rol', 'left')
			->join('area a', 'a.id = usuario.id_local', 'left')
			->join('personal p', 'p.id = usuario.id_personal', 'left')
			->join('tipo_personal tp', 'tp.id = p.id_tipo_personal', 'left')
			->find(ID_USUARIO);

		$ajustes = $Ajuste_avanzado_m->where('id_empresa', $usuario->id_empresa)->first();

		$empresa = $Empresa_m->select('logo,  numero_documento, razon_social, tipo_proveedor_electronico')->where('id', $usuario->id_empresa)->first();
		 	
		if(is_object($usuario))
		{
			/** CARGAR PERMISOS */
			$Permiso_m = new Permiso_model;
			$permisos = $Permiso_m->where('id_rol', $usuario->id_rol)->findAll();

			if ($usuario->tipo == 'ADMINISTRADOR' or $usuario->tipo == 'SUPER ADMINISTRADOR') {

				$permisos = array(
					0 => (object) array(
					'modulo'    => '',
					'view'      => 1,
					'new'       => 1,
					'edit'      => 1,
					'delete'    => 1,
					)
				);
	
				$all_permiso = true;
			}
			else
			{
				$all_permiso = false;
			}

			$response = [
				'usuario' 			=> $usuario,
				'permisos'			=> $permisos,
				'all_permiso'		=> $all_permiso,
				'ajuste'			=> $ajustes,
				'empresa'			=> $empresa
			];

			return $this->respond($response, 200);			
		}
		else
		{
			return $this->respond(['mensaje' => 'Sesión Finalizada'], 401);
		}
				
	}

}
