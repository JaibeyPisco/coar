<?php namespace App\Controllers\Intranet_cliente;

use App\Controllers\BaseController;

use App\Models\Operacion\Orden_model;
use App\Models\Operacion\Viaje_guia_model;
use App\Models\Operacion\Viaje_monitoreo_model;
use App\Models\Configuracion\Subcliente_model;
use App\Models\Configuracion\Cliente_contacto_model;

class Rastreo_unidad extends BaseController
{
	public function __construct()
	{
		$this->Orden_m = new Orden_model();
		$this->Viaje_guia_m = new Viaje_guia_model();
		$this->Viaje_monitoreo_m = new Viaje_monitoreo_model();
		$this->Subcliente_m = new Subcliente_model();
		$this->Cliente_contacto_m = new Cliente_contacto_model();
	}

	public function get_select_subcliente()
	{
		$response = $this->Subcliente_m->select("id, razon_social as text")
		->where('id_cliente', ID_CLIENTE)
		->findAll();

		return $this->respond($response, 200);
	}

	public function get_select_contacto()
	{
		$response = $this->Cliente_contacto_m->select("id, nombre as text")
		->where('id_cliente', ID_CLIENTE)
		->findAll();

		return $this->respond($response, 200);
	}
	
	public function index()
	{		 
		$data_request = $this->request->getGet();

		$response = $this->Orden_m->distinct('viaje_orden.id_orden')
		->select('orden.*, concat(orden.serie,"-",orden.numero) as orden, orden.id as id_orden')
		->select('c.razon_social as cliente')
		->select('sc.razon_social as subcliente')
		->select('cc.nombre as cliente_contacto')
		->select('concat(r.punto_inicio," - ",r.punto_final) as ruta')
		->select('m.nombre as moneda, m.simbolo as moneda_simbolo')
		->select('coalesce(concat(v.serie,"-",v.numero), "") as viaje, v.estado_operacion, v.id as id_viaje, v.fecha_inicio, v.fecha_fin')
		->select('coalesce(concat(f.serie,"-",f.numero), "") as factura')
		->select('coalesce(vh.placa, "") as vehiculo, vh.serie_chasis, vh.modelo')
		->select('coalesce(l.descripcion, "") as local')
		
		->join('cliente c', 'c.id = orden.id_cliente', 'left')
		->join('subcliente sc', 'sc.id = orden.id_subcliente', 'left')
		->join('cliente_contacto cc', 'cc.id = orden.id_cliente_contacto', 'left')
		->join('ruta r', 'r.id = orden.id_ruta', 'left')
		->join('static_moneda m', 'm.id = orden.id_moneda')
		->join('viaje_orden', 'viaje_orden.id_orden = orden.id', 'left')
		->join('viaje v', 'v.id = viaje_orden.id_viaje')
		->join('vehiculo vh', 'vh.id = v.id_vehiculo', 'left')
		->join('factura f', 'f.id = orden.id_factura', 'left')
		->join('local l', 'l.id = orden.id_local', 'left')

		->where('DATE_FORMAT(orden.fecha, "%Y-%m-%d") >=', $data_request["fecha_inicio"])
        ->where('DATE_FORMAT(orden.fecha, "%Y-%m-%d") <=', $data_request["fecha_fin"]);

		if($data_request["serie_chasis"] != '')
		{
			$response->like('vh.serie_chasis', '%'.$data_request["serie_chasis"].'%');
		}
		
		if($data_request["referencia_carga_cliente"] != '')
		{
			$response->like('orden.referencia_carga_cliente', '%'.$data_request["referencia_carga_cliente"].'%');
		}

		if($data_request["orden_servicio"] != '')
		{
			$response->where('orden.orden_servicio', $data_request["orden_servicio"]);
		}

		if($data_request["placa"] != '')
		{
			$response->where('vh.placa', '%'.$data_request["placa"].'%');
		}

		if($data_request["serie_guia_remision"] != '' and $data_request["numero_guia_remision"])
		{
			$response->where("orden.id in (select id_orden from viaje_guia where serie = '".$data_request["serie_guia_remision"]."' and numero = '".$data_request["numero_guia_remision"]."' and tipo = 'REMITENTE')");
		}

		if($data_request["id_ruta"] != '')
		{
			$response->where('orden.id_ruta', $data_request["id_ruta"]);
		}

		if($data_request["id_subcliente"] != '')
		{
			$response->where('orden.id_subcliente', $data_request["id_subcliente"]);
		}

		if($data_request["id_cliente_contacto"] != '')
		{
			$response->where('orden.id_cliente_contacto', $data_request["id_cliente_contacto"]);
		}

		$response = $response->where('orden.id_cliente', ID_CLIENTE)
		->where('orden.id_empresa', ID_EMPRESA)		
		->findAll();

		$response_new = [];

		foreach ($response as $row) {
			
			$row->guias_remitente = $this->Viaje_guia_m->where('id_orden', $row->id)->findAll();

			if($row->id_viaje != null)
			{
				$guias = $this->Viaje_guia_m->where('(id_orden = '.$row->id_orden.' or id_viaje = '.$row->id_viaje.')')->where('fl_estado', 1)->findAll();
			}
			else
			{
				$guias = $this->Viaje_guia_m->where('id_orden', $row->id)->where('fl_estado', 1)->findAll();
			}

			$guia_remitente = [];
			$guia_transportista = [];
			$guia_tercero = [];

			foreach ($guias as $guia) {
				
				switch ($guia->tipo) {
					case 'REMITENTE':
						$guia_remitente[] = $guia->serie.'-'.$guia->numero;
					break;
					
					case 'TRANSPORTISTA':
						$guia_transportista[] = $guia->serie.'-'.$guia->numero;
					break;

					case 'TERCERO':
						$guia_tercero[] = $guia->serie.'-'.$guia->numero;
					break;
				}
			}

			$row->guia_remitente = implode(', ', $guia_remitente);
			$row->guia_transportista = implode(', ', $guia_transportista);
			$row->guia_tercero = implode(', ', $guia_tercero);

			/**** */

			$monitoreo = $this->Viaje_monitoreo_m->select('viaje_monitoreo.*, em.nombre as estado, em.color_bg, em.color_text')
			->join('estado_monitoreo em', 'em.id = viaje_monitoreo.id_estado_monitoreo')
			->where('id_viaje', $row->id_viaje)
			->orderBy('fecha', 'desc')
			->orderBy('id', 'desc')
			->first();

			$row->ultimo_monitoreo = (is_object($monitoreo)) ? $monitoreo : null;

			if($data_request["id_estado_monitoreo"] != '')
			{
				if(is_object($monitoreo) && $data_request["id_estado_monitoreo"] == $monitoreo->id_estado_monitoreo)
				{
					$response_new[] = $row;
				}
				
			}
			else
			{
				$response_new[] = $row;
			}

			
		}

		return $this->respond(['data' => $response_new], 200);
	}
	
}
