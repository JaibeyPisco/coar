<?php namespace App\Controllers\Configuracion;

use App\Controllers\BaseController;

use App\Models\Configuracion\Socio_model;
use App\Models\Configuracion\Socio_contacto_model;
use App\Models\Configuracion\Socio_direccion_model;
// use App\Models\Configuracion\Cuenta_bancaria_persona_model;
use App\Models\Image_model;

class Socio extends BaseController
{
	public function __construct()
	{
		$this->Socio_m = new Socio_model();
		$this->Socio_contacto_m = new Socio_contacto_model();
		$this->Socio_direccion_m = new Socio_direccion_model();
		// $this->Cuenta_bancaria_persona_m = new Cuenta_bancaria_persona_model();
	}

	public function get_contactos($id_socio)
	{
		$response = $this->Socio_contacto_m->select('socio_contacto.*')
		->select('d.nombre as documento')
		->join('static_documento d', 'd.id = socio_contacto.id_documento', 'left')
		->where('id_socio', $id_socio)
		->findAll();

		return $this->respond($response, 200);
	}

	public function buscar()
	{
		$data_request = $this->request->getGet();

		$response = $this->Socio_m->select('socio.*')
		->select("coalesce(concat(u.id, ' - ', u.departamento, ' - ', u.provincia, ' - ', u.distrito), '') as ubigeo")
		->select('d.nombre as documento')
		->join('static_ubigeo u', 'u.id = socio.id_ubigeo', 'left')
		->join('static_documento d', 'd.id = socio.id_documento', 'left');

		if(isset($data_request["numero"]))
		{
			$response->where('socio.numero_documento', $data_request["numero"]);
		}

		if(isset($data_request["id_socio"]))
		{
			$response->where('socio.id', $data_request["id_socio"]);
		}
		
		$response = $response->where('id_empresa', ID_EMPRESA)
		->first();

		if(!is_object($response))
		{
			return $this->respond(null, 200);
		}

		// $response->cuentas_bancarias = $this->Cuenta_bancaria_persona_m->where('id_socio', $response->id)->findAll();	
		$response->contactos = $this->Socio_contacto_m->where('id_socio', $response->id)->findAll();
		$response->direcciones = $this->Socio_direccion_m->where('id_socio', $response->id)->findAll();

		return $this->respond($response, 200);
	}

	public function get_select_contacto($id_socio)
	{
		$response = $this->Socio_contacto_m->select("id, nombre as text")
		->where('id_socio', $id_socio)
		->findAll();

		return $this->respond($response, 200);
	}

	public function get_select()
	{
		$data_request = $this->request->getGet();

		$response = $this->Socio_m->select("id, concat('(',numero_documento,') ',razon_social) as text")
		->where("(numero_documento like '".$data_request["buscar"]."' or razon_social like '%".$data_request["buscar"]."%')")
		->where('id_empresa', ID_EMPRESA)
		->findAll(5);

		return $this->respond($response, 200);
	}

	public function get_select_simple()
	{
		$data_request = $this->request->getGet();

		$response = $this->Socio_m->select("id, razon_social as text")
		->where('id_empresa', ID_EMPRESA);

		if(isset($data_request["fl_cliente"]))
		{
			$response->where('fl_cliente', 1);
		}

		if(isset($data_request["fl_proveedor"]))
		{
			$response->where('fl_proveedor', 1);
		}

		$response = $response->findAll();

		return $this->respond($response, 200);
	}

	public function get_select_factura_pendiente()
	{
		$data_request = $this->request->getGet();

		$response = $this->Socio_m->distinct('f.id_cliente')
		->select('f.id_cliente, f.cliente_razon_social as text')
		->join('factura f', 'f.id_cliente = socio.id', 'left')
		->where('f.fl_pagado', null)
		->where('f.estado !=','ANULADO')
		->where('DATE_FORMAT(f.fecha, "%Y-%m-%d") >=', $data_request["fecha_inicio"])
		->where('DATE_FORMAT(f.fecha, "%Y-%m-%d") <=', $data_request["fecha_fin"])
		->where('f.condicion_pago', $data_request["condicion_pago"])
		->where('f.id_empresa', ID_EMPRESA)	
		
		->findAll();

		return $this->respond($response, 200);
	}


 
	public function get_unique($id_socio)
	{		
		$response = $this->Socio_m->select('socio.*')
		->select('coalesce(concat(u.id, " - ", u.departamento, " - ", u.provincia, " - ", u.distrito), "") as ubigeo')
		->join('static_ubigeo u', 'u.id = socio.id_ubigeo', 'left')
		->where('socio.id', $id_socio)
		->where('id_empresa', ID_EMPRESA)		
		->first();

        return $this->respond($response, 200);
	}

	public function index()
	{		
		$data_request = $this->request->getGet();

		$response = $this->Socio_m->select('socio.*')
		->select("coalesce(concat(u.id, ' - ', u.departamento, ' - ', u.provincia, ' - ', u.distrito), '') as ubigeo")
		->select('d.nombre as documento')
		->join('static_ubigeo u', 'u.id = socio.id_ubigeo', 'left')
		->join('static_documento d', 'd.id = socio.id_documento', 'left');

		if($data_request["id_documento"] != '')
		{
			$response->where("socio.id_documento", $data_request["id_documento"]);
		}

		if($data_request["numero_documento"] != '')
		{
			$response->where("socio.numero_documento", $data_request["numero_documento"]);
		}

		if($data_request["razon_social"] != '')
		{
			$response->where("(socio.razon_social like '%".$data_request["razon_social"]."%')");
		}

		$response = $response->where('id_empresa', ID_EMPRESA)
		->orderBy('id', 'desc')
		->findAll(100);

		foreach ($response as $row) {
			
			// $row->cuentas_bancarias = $this->Cuenta_bancaria_persona_m->where('id_socio', $row->id)->findAll();	
			$row->contactos = $this->Socio_contacto_m->where('id_socio', $row->id)->findAll();
			$row->direcciones = $this->Socio_direccion_m->where('id_socio', $row->id)->findAll();

		}

        return $this->respond(['data' => $response], 200);
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('configuracion-socio', 'edit');
		}
		else
		{
			$this->Helper->validar_permisos('configuracion-socio', 'new');
		} 

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			/** GUARDAR IMAGEN */
			$Imagen_upload = new Image_model();			
			$imagen = $Imagen_upload->guardar($this->request->getFile('imagen'), 'socio', (isset($data_request["imagen_anterior"])) ? $data_request["imagen_anterior"] : null);
					
			/** GUARDAR */
			$data_socio = [
				'imagen'          			=> $imagen,
				'id_documento'              => trim($data_request["id_documento"]),
				'numero_documento'          => trim($data_request["numero_documento"]),
				'razon_social'              => $this->Helper->limpiar_nombre(trim($data_request["razon_social"])),
				'id_ubigeo'                 => (isset($data_request["id_ubigeo"])) ? trim($data_request["id_ubigeo"]) : null,
				'direccion'                 => trim($data_request["direccion"]),
				'telefono'                  => trim($data_request["telefono"]),
				'persona_encargado'         => trim($data_request["persona_encargado"]),
				'email'         			=> trim($data_request["email"]),
				'fl_domicilio'              => (isset($data_request["fl_domicilio"])) ? 1 : null,
			];

			if(isset($data_request["id"]))
			{
				$data_socio["id"] = $data_request["id"];
			}
			else
			{
				$data_socio["id_empresa"] = ID_EMPRESA;

			}

			switch ($data_request["tipo"]) {
				case 'AMBOS':

					$data_socio["tipo"] = $data_request["tipo"];
					$data_socio["fl_proveedor"] = 1;
					$data_socio["fl_cliente"] = 1;
					
					break;
				case 'CLIENTE':
					$data_socio["tipo"] = $data_request["tipo"];
					$data_socio["fl_proveedor"] = null;
					$data_socio["fl_cliente"] = 1;

					break;
				case 'PROVEEDOR':
					$data_socio["tipo"] = $data_request["tipo"];
					$data_socio["fl_proveedor"] = 1;
					$data_socio["fl_cliente"] = null;

					break;
			}

			$this->Socio_m->save($data_socio);

			$id_socio = (isset($data_request["id"])) ? $data_request["id"] : $db->insertID();

			/****** SAVE CUENTAS BANCARIAS */

			$this->Helper->eliminar_registros_detalle('cuenta_bancaria_persona', 'id_socio', $id_socio, json_decode($data_request["detalle_cuenta_bancaria"]));

			foreach (json_decode($data_request["detalle_cuenta_bancaria"]) as $row) {
				$data_detalle_cuenta = [
					'id_socio'		=> $id_socio,
					'banco'			=> $row->banco,
					'tipo'			=> $row->tipo,
					'numero'		=> $row->numero,
					'full_data'		=> $row->banco.' - '.$row->tipo.' - '.$row->numero,
					'fl_detraccion'	=> $row->fl_detraccion,
				];

				if(is_numeric($row->id))
				{
					$data_detalle_cuenta["id"] = $row->id;
				}

				// $this->Cuenta_bancaria_persona_m->save($data_detalle_cuenta);
			}

			/*** SAVE CONTACTOS DE CLIENTE */

			$this->Helper->eliminar_registros_detalle('socio_contacto', 'id_socio', $id_socio, json_decode($data_request["detalle_contacto"]));

			foreach (json_decode($data_request["detalle_contacto"]) as $row) {

				$data_detalle_contacto = [
					'id_socio'			=> $id_socio,
					'nombre'			=> $row->nombre,
					'telefono'			=> $row->telefono,
					'email'				=> $row->email,
					'otros'				=> $row->otros,
					'id_documento'		=> $row->id_documento,
					'numero_documento'	=> $row->numero_documento
				];

				if(is_numeric($row->id))
				{
					$data_detalle_contacto["id"] = $row->id;
				}

				$this->Socio_contacto_m->save($data_detalle_contacto);
			}

			/*** SAVE DIRECCION DE CLIENTE */

			$this->Helper->eliminar_registros_detalle('socio_direccion', 'id_socio', $id_socio, json_decode($data_request["detalle_direccion"]));

			foreach (json_decode($data_request["detalle_direccion"]) as $row) {

				$data_detalle_direccion= [
					'id_socio'			=> $id_socio,
					'direccion'			=> $row->direccion,
				];

				if(is_numeric($row->id))
				{
					$data_detalle_direccion["id"] = $row->id;
				}

				$this->Socio_direccion_m->save($data_detalle_direccion);
			}

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'CLIENTES',
				'accion'		=> (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
				'descripcion'	=> trim($data_request["razon_social"])
			];

			$this->Centinela_m->registrar($data_centinela);
			/*************************************************** */

			$db->transComplete();

			$data_socio["id_socio"] = $id_socio;
			
			return $this->respond(['tipo' => 'success', 'mensaje' => 'Guardado Correctamente', 'socio' => $data_socio], 200);

		} catch (\Exception $e)
		{
		  return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}
	

	public function delete()
	{
		$data_request = $this->request->getPost();

		/* VALIDAR PERMISO */
		$this->Helper->validar_permisos('configuracion-socio', 'delete');

		try {

			$db = \Config\Database::connect();
			$db->transStart();

			$socio = $this->Socio_m->find($data_request["id"]);

			// $this->Cuenta_bancaria_persona_m->where('id_socio', $data_request["id"])->delete();
			$this->Socio_m->where('id', $data_request["id"])
			->delete();
			
			/** ELIMINAR IMAGEN */
			$Imagen_upload = new Image_model();
			$Imagen_upload->eliminar($socio->imagen);

			/****************** SAVE CENTINELA *****************/
			$data_centinela = [
				'modulo'		=> 'CONFIGURACIÓN',
				'menu'			=> 'CLIENTES',
				'accion'		=> 'ELIMINAR',
				'descripcion'	=> 	$socio->razon_social
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
