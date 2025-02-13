<?php namespace App\Controllers\Operacion;
use App\Controllers\BaseController;
use App\Models\Configuracion\EstudianteModel;


class Incidencia_reporte extends  BaseController {

    private EstudianteModel  $estudiante_m;

    public function __construct()
    {
        $this->estudiante_m = new EstudianteModel();

    }

    public  function  listStudents()
    {
       	$response = $this->estudiante_m->select(
			'id, CONCAT(grado, "° ", seccion) as grado_seccion,  CONCAT(apellidos, " " ,nombres) as estudiante, correo_electronico, dni, condicion_estudiante'
		)->findAll();

		return $this->respond(['data' => $response], 200);
    }

}