<?php

namespace App\Controllers\Configuracion;

use CodeIgniter\HTTP\ResponseInterface;

use Exception;
use App\Models\Image_model;
use App\Controllers\BaseController;
use PhpOffice\PhpSpreadsheet\IOFactory;

use PhpOffice\PhpSpreadsheet\Shared\Date;

use App\Models\Configuracion\EstudianteModel;


use App\Models\Configuracion\Padres_apoderados_model;
use App\Models\Configuracion\Usuario_model;

class Estudiante extends BaseController
{


	private Padres_apoderados_model $Padres_apoderados_m;
	private EstudianteModel $EstudianteModel;
	private Usuario_model $Usuario_m;

	public function __construct()
	{

		$this->EstudianteModel = new EstudianteModel();
		$this->Usuario_m = new Usuario_model();
		$this->Padres_apoderados_m = new Padres_apoderados_model();
	}

	public function getSelect(): ResponseInterface
	{

		$data_get = $this->request->getGet();

		$response = $this->EstudianteModel
        ->select("id, CONCAT(apellidos, ' ', nombres, ' | DNI ', dni, ' | GRADO Y SECCIÓN ', grado, '° ', seccion) as text")
        ->groupStart()
            ->like('apellidos', $data_get["buscar"], 'both')
            ->orLike('nombres', $data_get["buscar"], 'both')
            ->orLike('dni', $data_get["buscar"], 'both')
        ->groupEnd()
        ->findAll();

		return $this->respond($response, 200);
	}

	public function index(): ResponseInterface
	{
		$response = $this->EstudianteModel->select(
			'id, CONCAT(grado, "° ", seccion) as grado_seccion,  CONCAT(apellidos, " " ,nombres) as estudiante, correo_electronico, dni, condicion_estudiante'
		)->findAll();

		return $this->respond(['data' => $response], 200);
	}

	public  function  editar(int $id_estudiante): ResponseInterface
	{
		try {

			$db = \Config\Database::connect();

			$estudiantes = $db->table('estudiante')->where("id", $id_estudiante)->get()->getRow();

			$estudiantes->apoderados = $db->table('padres_apoderados')
				->where("id_estudiante", $id_estudiante)
				->where("tipo", 'APODERADO')
				->get()->getResult();

			$estudiantes->padre = $db->table('padres_apoderados')
				->where("id_estudiante", $id_estudiante)
				->where("tipo", 'PADRE')
				->get()->getRow();

			$estudiantes->madre = $db->table('padres_apoderados')
				->where("id_estudiante", $id_estudiante)
				->where("tipo", 'MADRE')
				->get()->getRow();

			$estudiantes->padre_apoderado = $db->table('padres_apoderados')
				->where("id_estudiante", $id_estudiante)
				->where("tipo", 'PADRE_APODERADO')
				->get()->getRow();

			return $this->respond($estudiantes, 200);
		} catch (Exception $e) {
			return $this->respond(['error' => true, "mensaje" => $e->getMessage()], 200);
		}
	}

	public function save()
	{
		$data_request = $this->request->getPost();

		if (isset($data_request["id"])) {
			$this->Helper->validar_permisos('configuracion-estudiante', 'edit');
		} else {
			$this->Helper->validar_permisos('configuracion-estudiante', 'new');
		}

		try {
			$db = \Config\Database::connect();
			$db->transStart(); // Inicia la transacción

			$id_estudiante = $this->insertDataEstudiante($db, $data_request);

			$this->insertDataPadre($data_request, $id_estudiante);
			$this->insertDataMadre($data_request, $id_estudiante);
			$this->insertDataApoderadoRolPadreMadre($data_request, $id_estudiante);
			$this->insertDataApoderados($data_request, $id_estudiante);

			$data_centinela = [
				'modulo'        => 'CONFIGURACION',
				'menu'          => 'ESTUDIANTE',
				'accion'        => (isset($data_request["id"])) ? 'EDITAR' : 'NUEVO',
				'descripcion'   => $data_request["nombres"] . ' ' . $data_request["apellidos"],
			];

			$this->Centinela_m->registrar($data_centinela);

			$db->transComplete(); // Finaliza la transacción

			// Verificar si la transacción falló
			if ($db->transStatus() === false) {
				throw new \Exception("Error en la transacción");
			}

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Estudiante y Usuario Guardado Correctamente'], 200);
		} catch (\Exception $e) {
			$db->transRollback(); // Revertir cambios en caso de error
			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}
	}


	private function insertDataMadre($data_request, $id_estudiante, $tipo = 'FORM')
	{
		if ($tipo == 'FORM') {
			$madreData = [
				'tipo' => 'MADRE',
				'vive' =>  isset($data_request['madre_viva'])  ? 1 : 0,
				'vive_con_estudiante' =>  isset($data_request['madre_con_estudiante']) ? 1 : 0,
				'nombres' => $data_request['nombres_madre'],
				'apellidos' => $data_request['apellidos_madre'],
				'dni' => $data_request['dni_madre'],
				'grado_instruccion' => $data_request['grado_instruccion_madre'],
				'ocupacion_actual' => $data_request['ocupacion_actual_madre'],
				'telefono' => $data_request['num_celular_madre'],
				'correo_electronico' => $data_request['correo_electronico_madre'],
				'motivo_no_vive_con_estudiante' => $data_request['motivo_madre_no_vive_con_estudiante'],
				'id_estudiante' => $id_estudiante,

			];
		}else{
			$madreData = $data_request;
		}
		$madreData['id_estudiante'] = $id_estudiante;

		if (isset($data_request["madre_id"])) {

			$this->Padres_apoderados_m->update($data_request["madre_id"], $madreData);
		} else {
			$this->Padres_apoderados_m->insert($madreData);
		}
	}

	private function insertDataPadre($data_request, $id_estudiante, $tipo = "FORM")
	{

		if ($tipo == 'FORM') {
			$padreData = [
				'tipo' => 'PADRE',
				'vive' => isset($data_request['padre_vivo'])  ? 1 : 0,
				'vive_con_estudiante' => isset($data_request['padre_con_estudiante']) ? 1 : 0,
				'nombres' => $data_request['nombres_padre'],
				'apellidos' => $data_request['apellidos_padre'],
				'dni' => $data_request['dni_padre'],
				'grado_instruccion' => $data_request['grado_instruccion_padre'],
				'ocupacion_actual' => $data_request['ocupacion_actual_padre'],
				'telefono' => $data_request['correo_electronico_padre'],
				'correo_electronico' => $data_request['correo_electronico_padre'],
				'motivo_no_vive_con_estudiante' => $data_request['motivo_padre_no_vive_con_estudiante'],
				

			];
		} else {
			$padreData = $data_request;
		}

		$padreData['id_estudiante'] = $id_estudiante;
  
		 

		if (isset($data_request["padre_id"]) && !empty($data_request["padre_id"])) {
			$this->Padres_apoderados_m->update($data_request["padre_id"], $padreData);
		} else {
			$this->Padres_apoderados_m->insert($padreData);
		}
	}

	private function insertDataApoderadoRolPadreMadre($data_request, $id_estudiante,  $tipo = "FORM")
	{
		if ($tipo == 'FORM') {

			$apoderadoRolPadreMadreData = [
				'tipo' => 'PADRE_APODERADO',
				'parentesco_estudiante' => $data_request['parentesco_con_apoderado'],
				'nombres' => $data_request['nombres_apoderado'],
				'apellidos' => $data_request['apellidos_apoderado'],
				'dni' => $data_request['dni_apoderado'],
				'telefono' => $data_request['num_celular_apoderado'],
				'id_estudiante' => $id_estudiante,
				'tipo_familia' => $data_request['tipo_familia']
			];
		} else {
			$apoderadoRolPadreMadreData = $data_request;
		}

		$apoderadoRolPadreMadreData['id_estudiante'] = $id_estudiante;

		if (isset($data_request["apoderado_rol_padre_madre_id"]) && !empty($data_request["apoderado_rol_padre_madre_id"])) {
			$this->Padres_apoderados_m->update($data_request["apoderado_rol_padre_madre_id"], $apoderadoRolPadreMadreData);
		} else {
			$this->Padres_apoderados_m->insert($apoderadoRolPadreMadreData);
		}
	}

	private function insertDataEstudiante($db, $data_request, $tipo = 'FORM'): int
	{
		
		if ($tipo == 'FORM') {
			$Imagen_upload = new Image_model();

			$imagen = $Imagen_upload->guardar($this->request->getFile('foto'), 'estudiante', (isset($data_request["imagen_anterior"])) ? $data_request["imagen_anterior"] : null);
	
			$data = [
				'nombres' => $data_request['nombres'],
				'apellidos' => $data_request['apellidos'],
				'obsv' => $data_request['obsv'],
				'grado' => $data_request['grado'],
				'seccion' => $data_request['seccion'],
				'dni' => $data_request['dni'],
				'foto' => $imagen,
				'sexo' => $data_request['sexo'],
				'correo_electronico' => $data_request['correo_electronico'],
				'fecha_nacimiento' => $data_request['fecha_nacimiento'],
				'lav' => $data_request['lav'],
				'llaves' => $data_request['llaves'],
				'pabellon' => $data_request['pabellon'],
				'ala' => $data_request['ala'],
				'cama_ropero' => $data_request['cama_ropero'],
				'duchas' => $data_request['duchas'],
				'banos' => $data_request['banos'],
				'urinarios' => $data_request['urinarios'],
				'monitor_acompana' => $data_request['monitor_acompana'],
				'lugar_nacimiento' => $data_request['lugar_nacimiento'],
				'fecha_caducidad_dni' => $data_request['fecha_caducidad_dni'],
				'num_telefonico' => $data_request['num_telefonico'],
				'religion' => $data_request['religion'],
				'region_domicilio_actual' => $data_request['region_domicilio_actual'],
				'provincia_domicilio_actual' => $data_request['provincia_domicilio_actual'],
				'distrito_domicilio_actual' => $data_request['distrito_domicilio_actual'],
				'direccion_domicilio_actual' => $data_request['direccion_domicilio_actual'],
				'referencia_domicilio_actual' => $data_request['referencia_domicilio_actual'],
				'codigo_estudiante' => $data_request['codigo_estudiante'],
				'condicion_estudiante' => $data_request['condicion_estudiante'],
			];
		} else {
			$data = $data_request;
		}

		if (isset($data_request["id_estudiante"])) {
			$data["id"] = intval($data_request["id_estudiante"]);
		}

		$this->EstudianteModel->save($data);

		$idEstudiante = (isset($data_request["id_estudiante"])) ? $data_request["id_estudiante"] : $db->insertID();

		$idEstudianteInt = intval($idEstudiante);

		return $idEstudianteInt;
	}

	private function insertDataApoderados($data_request, $idEstudiante,  )
	{
		$db = \Config\Database::connect();
		$builder = $db->table('padres_apoderados');

		// Obtener los IDs actuales en la base de datos
		$existingIds = $builder->select('id')
			->where('id_estudiante', $idEstudiante)
			->where('tipo', 'APODERADO')
			->get()
			->getResultArray();

		// Convertir el array de resultados en una lista de IDs
		$existingIds = array_column($existingIds, 'id');

		// IDs que vienen en la nueva solicitud
		$receivedIds = [];

		
		foreach (json_decode($data_request["apoderados"]) as $row) {
			$data = [
				'tipo' => 'APODERADO',
				'apellidos' => $row->apellidos,
				'nombres' => $row->nombres,
				'dni' => $row->dni,
				'telefono' => $row->numero_telefonico,
				'parentesco_estudiante' => $row->grado_parentesco,
				'fl_legalizado' => $row->legalizado,
				'id_estudiante' => $idEstudiante
			];

			if (!empty($row->id) && is_numeric($row->id)) {
				$receivedIds[] = $row->id; // Guardar el ID recibido para comparar

				// Verificar si el ID ya existe en la base de datos
				$exists = in_array($row->id, $existingIds);

				if ($exists) {
					// Si el registro ya existe, actualizarlo
					$builder->where('id', $row->id)->update($data);
				} else {
					// Si el ID no existe, insertarlo
					$builder->insert($data);
				}
			} else {
				// Si no hay ID, insertar el nuevo registro
				$builder->insert($data);
			}
		}

		// **Eliminar los registros que ya no están en la lista**
		$idsToDelete = array_diff($existingIds, $receivedIds);

		if (!empty($idsToDelete)) {
			$builder->whereIn('id', $idsToDelete)->delete();
		}
	}


 
	public function save_importar()
	{
		$data_request = $this->request->getPost();

		$respuesta = explode(".", $_FILES["fileexportar"]['name']);
		$extension = end($respuesta);

		if ($extension != 'xlsx') {
			return $this->respond(['tipo' => 'warning', 'mensaje' => 'El archivo debe ser Excel']);
		}

		$this->Helper->validar_permisos('configuracion-estudiante', 'new');

		$db = \Config\Database::connect();
		// $db->query('SET AUTOCOMMIT = 0');
		// $db->transStart();

		try {
			$filename = $_FILES["fileexportar"];
			$spreadsheet = IOFactory::load($filename['tmp_name']);
			$worksheet = $spreadsheet->getActiveSheet();
			$highestRow = $worksheet->getHighestRow();

			$dataEstudiante = [];
			$dataMadre = [];
			$dataPadre = [];
			$dataApoderado = [];

			$contador = 0;

			for ($i = 4; $i <= $highestRow; $i++) { // Datos desde la fila 4

				$dni = $worksheet->getCell('H' . $i)->getValue();

				if (!empty($dni)) {
					
					$setFechaNacimiento = null;
					if ($worksheet->getCell('L' . $i)->getValue()) {
						$getFechaNacimiento = (array) Date::excelToDateTimeObject($worksheet->getCell('L' . $i)->getValue());
						$setFechaNacimiento = explode(" ", $getFechaNacimiento["date"])[0];
					}

					$setFechaCaducidadDNI = null;
					if ($worksheet->getCell('W' . $i)->getValue()) {
						$getFechaCaducidadDNI = (array) Date::excelToDateTimeObject($worksheet->getCell('W' . $i)->getValue());
						$setFechaCaducidadDNI = explode(" ", $getFechaCaducidadDNI["date"])[0];
					}

					$dataEstudiante = [
						'condicion_estudiante' => $worksheet->getCell('B' . $i)->getValue(), // Nueva columna "Estado"
						'apellidos' => $worksheet->getCell('C' . $i)->getValue(), // Antes B
						'nombres' => $worksheet->getCell('D' . $i)->getValue(), // Antes C
						'obsv' => $worksheet->getCell('E' . $i)->getValue(), // Antes D
						'grado' => $worksheet->getCell('F' . $i)->getValue(), // Antes E
						'seccion' => $worksheet->getCell('G' . $i)->getValue(), // Antes F
						'dni' => $dni,
						'foto' => $worksheet->getCell('I' . $i)->getValue() ?: 'sin_imagen.jpg', // Antes H
						'sexo' => $worksheet->getCell('J' . $i)->getValue(), // Antes I
						'correo_electronico' => $worksheet->getCell('K' . $i)->getValue(), // Antes J
						'fecha_nacimiento' => $setFechaNacimiento,
						'lav' => $worksheet->getCell('M' . $i)->getValue(), // Antes L
						'llaves' => $worksheet->getCell('N' . $i)->getValue(), // Antes M
						'pabellon' => $worksheet->getCell('O' . $i)->getValue(), // Antes N
						'ala' => $worksheet->getCell('P' . $i)->getValue(), // Antes O
						'cama_ropero' => $worksheet->getCell('Q' . $i)->getValue(), // Antes P
						'duchas' => $worksheet->getCell('R' . $i)->getValue(), // Antes Q
						'banos' => $worksheet->getCell('S' . $i)->getValue(), // Antes R
						'urinarios' => $worksheet->getCell('T' . $i)->getValue(), // Antes S
						'monitor_acompana' => $worksheet->getCell('U' . $i)->getValue(), // Antes T
						'lugar_nacimiento' => $worksheet->getCell('V' . $i)->getValue(), // Antes U
						'fecha_caducidad_dni' => $setFechaCaducidadDNI,
						'num_telefonico' => $worksheet->getCell('X' . $i)->getValue(), // Antes W
						'religion' => $worksheet->getCell('Y' . $i)->getValue(), // Antes X
						'region_domicilio_actual' => $worksheet->getCell('Z' . $i)->getValue(), // Antes Y
						'provincia_domicilio_actual' => $worksheet->getCell('AA' . $i)->getValue(), // Antes Z
						'distrito_domicilio_actual' => $worksheet->getCell('AB' . $i)->getValue(), // Antes AA
						'direccion_domicilio_actual' => $worksheet->getCell('AC' . $i)->getValue(), // Antes AB
						'referencia_domicilio_actual' => $worksheet->getCell('AD' . $i)->getValue(), // Antes AC
					];

					// Datos de la madre
					// $dataMadre = [
					// 	'tipo' => 'MADRE',
					// 	'vive' => ($worksheet->getCell('AD' . $i)->getValue() == 'SI') ? 1 : 0,
					// 	'vive_con_estudiante' => ($worksheet->getCell('AE' . $i)->getValue() == 'SI') ? 1 : 0,
					// 	'apellidos' => $worksheet->getCell('AF' . $i)->getValue(),
					// 	'nombres' => $worksheet->getCell('AG' . $i)->getValue(),
					// 	'dni' => $worksheet->getCell('AH' . $i)->getValue(),
					// 	'grado_instruccion' => $worksheet->getCell('AI' . $i)->getValue(),
					// 	'ocupacion_actual' => $worksheet->getCell('AJ' . $i)->getValue(),
					// 	'telefono' => $worksheet->getCell('AK' . $i)->getValue(),
					// 	'correo_electronico' => $worksheet->getCell('AL' . $i)->getValue(),
					// 	'motivo_no_vive_con_estudiante' => $worksheet->getCell('AM' . $i)->getValue(),
					// ];

					$dataMadre = [
						'tipo' => 'MADRE',
						'vive' => ($worksheet->getCell('AE' . $i)->getValue() == 'SI') ? 1 : 0, // Antes AD
						'vive_con_estudiante' => ($worksheet->getCell('AF' . $i)->getValue() == 'SI') ? 1 : 0, // Antes AE
						'apellidos' => $worksheet->getCell('AG' . $i)->getValue(), // Antes AF
						'nombres' => $worksheet->getCell('AH' . $i)->getValue(), // Antes AG
						'dni' => $worksheet->getCell('AI' . $i)->getValue(), // Antes AH
						'grado_instruccion' => $worksheet->getCell('AJ' . $i)->getValue(), // Antes AI
						'ocupacion_actual' => $worksheet->getCell('AK' . $i)->getValue(), // Antes AJ
						'telefono' => $worksheet->getCell('AL' . $i)->getValue(), // Antes AK
						'correo_electronico' => $worksheet->getCell('AM' . $i)->getValue(), // Antes AL
						'motivo_no_vive_con_estudiante' => $worksheet->getCell('AN' . $i)->getValue(), // Antes AM
					];

					// Datos del padre
					// $dataPadre = [
					// 	'tipo' => 'PADRE',
					// 	'vive' => ($worksheet->getCell('AN' . $i)->getValue() == 'SI') ? 1 : 0,
					// 	'vive_con_estudiante' => ($worksheet->getCell('AO' . $i)->getValue() == 'SI') ? 1 : 0,
					// 	'apellidos' => $worksheet->getCell('AP' . $i)->getValue(),
					// 	'nombres' => $worksheet->getCell('AQ' . $i)->getValue(),
					// 	'dni' => $worksheet->getCell('AR' . $i)->getValue(),
					// 	'grado_instruccion' => $worksheet->getCell('AS' . $i)->getValue(),
					// 	'ocupacion_actual' => $worksheet->getCell('AT' . $i)->getValue(),
					// 	'correo_electronico' => $worksheet->getCell('AU' . $i)->getValue(),
					// 	'telefono' => $worksheet->getCell('AV' . $i)->getValue(),
					// 	'motivo_no_vive_con_estudiante' => $worksheet->getCell('AW' . $i)->getValue(),
					// ];

					$dataPadre = [
						'tipo' => 'PADRE',
						'vive' => ($worksheet->getCell('AO' . $i)->getValue() == 'SI') ? 1 : 0, // Antes AN
						'vive_con_estudiante' => ($worksheet->getCell('AP' . $i)->getValue() == 'SI') ? 1 : 0, // Antes AO
						'apellidos' => $worksheet->getCell('AQ' . $i)->getValue(), // Antes AP
						'nombres' => $worksheet->getCell('AR' . $i)->getValue(), // Antes AQ
						'dni' => $worksheet->getCell('AS' . $i)->getValue(), // Antes AR
						'grado_instruccion' => $worksheet->getCell('AT' . $i)->getValue(), // Antes AS
						'ocupacion_actual' => $worksheet->getCell('AU' . $i)->getValue(), // Antes AT
						'correo_electronico' => $worksheet->getCell('AV' . $i)->getValue(), // Antes AU
						'telefono' => $worksheet->getCell('AW' . $i)->getValue(), // Antes AV
						'motivo_no_vive_con_estudiante' => $worksheet->getCell('AX' . $i)->getValue(), // Antes AW
					];

					

					// $dataApoderadoRolPadreMadre = [
					// 	'tipo' => 'PADRE_APODERADO',
					// 	'parentesco_estudiante' => $worksheet->getCell('AX' . $i)->getValue(),
					// 	'apellidos' => $worksheet->getCell('AY' . $i)->getValue(),
					// 	'nombres' => $worksheet->getCell('AZ' . $i)->getValue(),
					// 	'dni' => $worksheet->getCell('BA' . $i)->getValue(),
					// 	'telefono' => $worksheet->getCell('BB' . $i)->getValue(),
					// 	'tipo_familia' => $worksheet->getCell('BC' . $i)->getValue(),


					// ];

					$dataApoderadoRolPadreMadre = [
						'tipo' => 'PADRE_APODERADO',
						'parentesco_estudiante' => $worksheet->getCell('AY' . $i)->getValue(), // Antes AX
						'apellidos' => $worksheet->getCell('AZ' . $i)->getValue(), // Antes AY
						'nombres' => $worksheet->getCell('BA' . $i)->getValue(), // Antes AZ
						'dni' => $worksheet->getCell('BB' . $i)->getValue(), // Antes BA
						'telefono' => $worksheet->getCell('BC' . $i)->getValue(), // Antes BB
						'tipo_familia' => $worksheet->getCell('BD' . $i)->getValue(), // Antes BC
					];

					
					$estudianteDNI = $this->EstudianteModel->select('id, dni')->where('dni', $dni)->first();

					if (is_object($estudianteDNI)) {
						$dataEstudiante['id_estudiante'] = $estudianteDNI->id;
					}


				 

					$id_estudiante = $this->insertDataEstudiante($db, $dataEstudiante, 'EXPORTACION');

					$padre =   $this->Padres_apoderados_m->select('id')->where('tipo', 'PADRE')
						->where('dni', $dataPadre['dni'])->first();

					if (is_object($padre)) {

						$dataPadre['padre_id'] = $padre->id;
					}

 
 
					$this->insertDataPadre($dataPadre, $id_estudiante, 'EXPORTACION');

					
					$madre =   $this->Padres_apoderados_m->select('id')->where('tipo', 'MADRE')
						->where('dni', $dataMadre['dni'])->first();

					if (is_object($madre)) {

						$dataMadre['madre_id'] = $madre->id;
					}


					$this->insertDataMadre($dataMadre, $id_estudiante, 'EXPORTACION');

					$rolPadre =   $this->Padres_apoderados_m->select('id')
						->where('tipo', 'PADRE_APODERADO')
						->where('dni', $dataApoderadoRolPadreMadre['dni'])->first();

					if (is_object($rolPadre)) {

						$dataApoderadoRolPadreMadre['apoderado_rol_padre_madre_id'] = $rolPadre->id;
					}


					$this->insertDataApoderadoRolPadreMadre($dataApoderadoRolPadreMadre, $id_estudiante, 'EXPORTACION	');


 
					$dataApoderados = [];

					// $apoderados = [
					// 	['BD', 'BE', 'BF', 'BG', 'BH', 'BI'],  // Apoderado 1
					// 	['BJ', 'BK', 'BM', 'BN', 'BL', 'BO'],  // Apoderado 2
					// 	['BP', 'BQ', 'BR', 'BZ', 'BT', 'BU'],  // Apoderado 3
					// 	['BV', 'BW', 'BX', 'BY', 'BZ', 'CA'],  // Apoderado 4
					// 	['CB', 'CC', 'CD', 'CE', 'CF', 'CG'],  // Apoderado 5
					// 	['CH', 'CI', 'CJ', 'CK', 'CL', 'CM'],  // Apoderado 6
					// 	['CN', 'CO', 'CP', 'CQ', 'CR', 'CS'],  // Apoderado 7
					// ];
					$apoderados = [
						['BE', 'BF', 'BG', 'BH', 'BI', 'BJ'],  // Apoderado 1  (Antes BD - BI)
						['BK', 'BL', 'BM', 'BN', 'BO', 'BP'],  // Apoderado 2  (Antes BJ - BO)
						['BQ', 'BR', 'BS', 'BT', 'BU', 'BV'],  // Apoderado 3  (Antes BP - BU)
						['BW', 'BX', 'BY', 'BZ', 'CA', 'CB'],  // Apoderado 4  (Antes BV - CA)
						['CC', 'CD', 'CE', 'CF', 'CG', 'CH'],  // Apoderado 5  (Antes CB - CG)
						['CI', 'CJ', 'CK', 'CL', 'CM', 'CN'],  // Apoderado 6  (Antes CH - CM)
						['CO', 'CP', 'CQ', 'CR', 'CS', 'CT'],  // Apoderado 7  (Antes CN - CS)
					];
					

					foreach ($apoderados as $cols) {
						$dni = trim($worksheet->getCell($cols[2] . $i)->getValue()); // Obtener y limpiar el DNI
					
						if (!empty($dni)) { // Solo agregar si el DNI no está vacío
							$existingApoderado = $this->Padres_apoderados_m->select('id')
								->where('tipo', 'APODERADO')
								->where('dni', $dni)
								->first();
					
							$apoderadoData = [
								'tipo' => 'APODERADO',
								'apellidos' => trim($worksheet->getCell($cols[0] . $i)->getValue()),
								'nombres' => trim($worksheet->getCell($cols[1] . $i)->getValue()),
								'dni' => $dni,
								'numero_telefonico' => trim($worksheet->getCell($cols[3] . $i)->getValue()),
								'grado_parentesco' => trim($worksheet->getCell($cols[4] . $i)->getValue()),
								'legalizado' => ($worksheet->getCell($cols[5] . $i)->getValue() == 'SI') ? 1 : 0,
								'id_estudiante' => $id_estudiante // Asignar el ID del estudiante al apoderado
							];
					
							// Si el apoderado ya existe, agregar su ID para actualizarlo
							if ($existingApoderado) {
								$apoderadoData['id'] = $existingApoderado->id;
							}
					
							$dataApoderados[] = $apoderadoData;
						}
					}

					$data_requestS["apoderados"] = json_encode($dataApoderados);

					$this->insertDataApoderados($data_requestS, $id_estudiante);
 

					$contador++;
				}
			}

			// $db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Se han importado correctamente ' . $contador . ' registros'], 200);
		} catch (\Exception $e) {
			$db->transRollback();
			return $this->respond(['tipo' => 'warning', 'mensaje' => $e->getMessage()]);
		}
	}


	private function regenerateCodigoEstudiante()
	{
		$chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		$passwordLength = 12;
		$password = "";

		for ($i = 0; $i < $passwordLength; $i++) {
			$randomNumber = mt_rand(0, strlen($chars) - 1);
			$password .= substr($chars, $randomNumber, 1);
		}

		return $password;
	}
}
