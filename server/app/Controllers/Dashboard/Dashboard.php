<?php namespace App\Controllers\Dashboard;

use App\Controllers\BaseController;

use App\Controllers\Operacion\Incidencia;
use App\Models\Configuracion\Usuario_model;
use App\Models\Operacion\IncidenciaModel;
 
use CodeIgniter\HTTP\ResponseInterface;


class Dashboard extends BaseController
{

    private $Usuario_m;
    private $Producto_m;
    private $IncidenciaEstudiante_m;

    public function __construct()
    {
        $this->Usuario_m = new Usuario_model();
 
        $this->IncidenciaEstudiante_m = new  IncidenciaModel();
    }

    public function getCantidades(): ResponseInterface
    {
        $response = [
            
            "cantidad_incidencias" => $this->IncidenciaEstudiante_m->countAllResults()
        ];
        return $this->respond($response, 200);
    }


    public function getTiposDeIncidenciasChar(): ResponseInterface
    {
        $data_request = $data_request = $this->request->getGet();

        $response = $this->IncidenciaEstudiante_m
            ->select('ti.nombre, COUNT(incidencias.id_tipo_incidencia) AS total_incidencias')
            ->join('tipos_incidencias AS ti', 'incidencias.id_tipo_incidencia = ti.id')
            ->groupBy('ti.nombre')
            ->orderBy('total_incidencias', 'DESC')
            ->where("date_format(incidencias.created_at, '%Y-%m-%d') >=", $data_request["startDate"])
            ->where("date_format(incidencias.created_at, '%Y-%m-%d') <=", $data_request["endDate"])
            ->findAll(5);
        return $this->respond($response, 200);
    }

    public function getEstudiantesIndenciaMayor(): ResponseInterface
    {
        $data_request = $data_request = $this->request->getGet();

        $response = $this->IncidenciaEstudiante_m
            ->select('CONCAT(estudiante.nombres, "", estudiante.nombres) as estudiante , COUNT(incidencias.id) AS total_incidencias')
            ->join('estudiante', 'estudiante.id = incidencias.id_estudiante')
            ->groupBy('estudiante.id')
            ->orderBy('total_incidencias', 'DESC')
            ->where("date_format(incidencias.created_at, '%Y-%m-%d') >=", $data_request["startDate"])
            ->where("date_format(incidencias.created_at, '%Y-%m-%d') <=", $data_request["endDate"])
            ->findAll(10);

        return $this->respond($response, 200);

    }

}
