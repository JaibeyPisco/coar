<?php namespace App\Controllers\Reporte;

use App\Controllers\BaseController;
use App\Models\Configuracion\EstudianteModel;
use App\Models\Configuracion\ApoderadoModel;
use App\Models\Configuracion\DatosMadreModel;
use App\Models\Configuracion\DatosPadreModel;
use App\Models\Configuracion\ApoderadoRolPadreMadreModel;
use App\Models\Operacion\IncidenciaModel;

class Incidencias extends BaseController
{
 
	private ApoderadoModel $ApoderadoModel;
	private EstudianteModel $EstudianteModel;
	 
	private IncidenciaModel $IncidenciaEstudianteModel;

	public function __construct()
	{
	 
		$this->ApoderadoModel  = new ApoderadoModel();
		$this->EstudianteModel = new EstudianteModel();
		
		$this->IncidenciaEstudianteModel = new IncidenciaModel();
	}

	public function index()
	{
		$response = $this->EstudianteModel->select('estudiante.id as id_estudiante, CONCAT(estudiante.grado, "° ", estudiante.seccion) as grado_seccion, estudiante.*, datos_madre.*, datos_madre.id as id_datos_madre, datos_padre.*, datos_padre.id as id_datos_padre, apoderado_rol_padre_madre.*, apoderado_rol_padre_madre.id as id_apoderado_rol_padre_madre ')
			->join('datos_madre', 'datos_madre.id = estudiante.madre_id')
			->join('datos_padre', 'datos_padre.id = estudiante.padre_id')
			->join('apoderado_rol_padre_madre', 'apoderado_rol_padre_madre.id = estudiante.apoderado_rol_padre_madre_id')
			->findAll();

		foreach ($response as $estudiante) {
			$estudiante->apoderados = $this->ApoderadoModel->where('id_estudiante', $estudiante->id_estudiante)->findAll();
		}

		return $this->respond(['data' => $response], 200);
	}

	public function getIncidenciasPorEstudiante()
	{
		$data_request = $this->request->getGet();

		$response = $this->IncidenciaEstudianteModel->select('incidenciaestudiantes.id , CONCAT(incidenciaestudiantes.serie, "-", incidenciaestudiantes.numero) as serie_numero, incidenciaestudiantes.fecha, incidenciaestudiantes.se_soluciono, incidenciaestudiantes.incidencia_derivada, incidenciaestudiantes.incidencia_cerrada, incidenciaestudiantes.describir_incidencia')
		->select('e.apellidos_nombres as nombre_completo_estudiante')
		->select('ti.necesita_abordaje_directa, ti.nombre_incidencia, ti.id_usuario_encargado')
		->select('CONCAT(u.nombre, " ", u.apellido) as nombre_completo_encargado_incidencia')
		->select('iat.comentario_atencion_incidencia')
		->select('iab.acuerdos')
		->join('estudiante e', 'e.id = incidenciaestudiantes.id_estudiante_principal')
		->join('tipos_incidencias ti', 'ti.id = incidenciaestudiantes.id_tipo_incidencia', 'left')
		->join('usuario u', 'u.id = ti.id_usuario_encargado', 'left')
		->join('incidenciaatencion iat', 'iat.id_incidencia = incidenciaestudiantes.id', 'left')
		->join('incidenciaabordaje iab', 'iab.id_incidencia = incidenciaestudiantes.id', 'left')
		->where('incidenciaestudiantes.id_estudiante_principal', $data_request["id_estudiante"])
		->where('DATE_FORMAT(incidenciaestudiantes.fecha, "%Y-%m-%d") >=', $data_request["fecha_inicio"])
        ->where('DATE_FORMAT(incidenciaestudiantes.fecha, "%Y-%m-%d") <=', $data_request["fecha_fin"])
		->findAll();

		return $this->respond(['data' => $response], 200);
	}
		
}
