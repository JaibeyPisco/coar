<?php namespace App\Controllers\Reporte;

use App\Controllers\BaseController;

class Movimiento_informacion extends BaseController
{
	public function index()
	{
		$data_request = $this->request->getGet();

		$response = $this->Centinela_m->select('centinela.*')
		->select('u.usuario')
		->join('usuario u', 'u.id = centinela.id_usuario')
		->where('DATE_FORMAT(fecha, "%Y-%m-%d") >=', $data_request["fecha_inicio"])
        ->where('DATE_FORMAT(fecha, "%Y-%m-%d") <=', $data_request["fecha_fin"]);

		$response = $response->where('centinela.id_empresa', ID_EMPRESA)		
		->findAll();	

		return $this->respond(['data' => $response], 200);
	}
	
		
}
