<?php

namespace App\Controllers\Configuracion;

use Exception;
use App\Models\Image_model;
use App\Controllers\BaseController;
use PhpOffice\PhpSpreadsheet\IOFactory;

use PhpOffice\PhpSpreadsheet\Shared\Date;
use App\Models\Configuracion\ApoderadoModel;
use App\Models\Configuracion\DatosMadreModel;
use App\Models\Configuracion\DatosPadreModel;
use App\Models\Configuracion\EstudianteModel;

use PhpOffice\PhpSpreadsheet\Reader\Xlsx as ReaderXlsx;
use App\Models\Configuracion\ApoderadoRolPadreMadreModel;
use App\Models\Configuracion\Usuario_model;

class Estudiante extends BaseController
{

	private DatosMadreModel $DatosMadreModel;
	private DatosPadreModel $DatosPadreModel;
	private ApoderadoModel $ApoderadoModel;
	private ApoderadoRolPadreMadreModel $ApoderadoRolPadreMadreModel;
	private EstudianteModel $EstudianteModel;
	private Usuario_model $Usuario_m;

	public function __construct()
	{
		$this->DatosMadreModel = new  DatosMadreModel();
		$this->DatosPadreModel  = new DatosPadreModel();
		$this->ApoderadoModel  = new ApoderadoModel();
		$this->ApoderadoRolPadreMadreModel  = new ApoderadoRolPadreMadreModel();
		$this->EstudianteModel = new EstudianteModel();
		$this->Usuario_m = new Usuario_model();
	}

	public function getSelect()
	{

		$data_get = $this->request->getGet();

		$response = $this->EstudianteModel->select("id, CONCAT(apellidos_nombres, ' | DNI ', dni, ' | GRADO Y SECCIÓN ', grado, '° ', seccion) as text")
			->like('apellidos_nombres', $data_get["buscar"], 'both')
			->orLike('dni ', $data_get["buscar"], 'both')->findAll();

		return $this->respond($response, 200);
	}

	public function index()
	{
		$response = $this->EstudianteModel->select('estudiante.id as id_estudiante, CONCAT(estudiante.grado, "° ", estudiante.seccion) as grado_seccion, estudiante.*, datos_madre.*, datos_madre.id as id_datos_madre, datos_padre.*, datos_padre.id as id_datos_padre, apoderado_rol_padre_madre.*, apoderado_rol_padre_madre.id as id_apoderado_rol_padre_madre ')
			->join('datos_madre', 'datos_madre.id = estudiante.madre_id', 'left')
			->join('datos_padre', 'datos_padre.id = estudiante.padre_id', 'left')
			->join('apoderado_rol_padre_madre', 'apoderado_rol_padre_madre.id = estudiante.apoderado_rol_padre_madre_id', 'left')
			->findAll();

		foreach ($response as $estudiante) {
			$estudiante->apoderados = $this->ApoderadoModel->where('id_estudiante', $estudiante->id_estudiante)->findAll();
		}

		return $this->respond(['data' => $response], 200);
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
			$db->query('SET AUTOCOMMIT = 0');
			$db->transStart();

			if(isset($data_request["id_estudiante"]))
			{
				$existing_estudiante = $this->EstudianteModel
					->select('dni, correo_electronico')
					->where('id !=', $data_request["id_estudiante"])
					->groupStart()
						->where('dni', trim($data_request["dni"]))
						->orWhere('correo_electronico', trim($data_request["correo_electronico"]))
					->groupEnd()
					->first();
				if ($existing_estudiante) {
					if ($existing_estudiante->dni == trim($data_request["dni"])) {
						return $this->respond(['tipo' => 'warning', 'mensaje' => 'El dni ya se encuentra en uso'], 200);
					}
					if ($existing_estudiante->correo_electronico == trim($data_request["correo_electronico"])) {
						return $this->respond(['tipo' => 'warning', 'mensaje' => 'El correo electronico ya se encuentra en uso'], 200);
					}
				}
			}
			else
			{
				$existing_estudiante = $this->EstudianteModel
					->select('dni, correo_electronico')
					->groupStart()
						->where('dni', trim($data_request["dni"]))
						->orWhere('correo_electronico', trim($data_request["correo_electronico"]))
					->groupEnd()
					->first();
				if ($existing_estudiante) {
					if ($existing_estudiante->dni == trim($data_request["dni"])) {
						return $this->respond(['tipo' => 'warning', 'mensaje' => 'El dni ya se encuentra en uso'], 200);
					}
					if ($existing_estudiante->correo_electronico == trim($data_request["correo_electronico"])) {
						return $this->respond(['tipo' => 'warning', 'mensaje' => 'El correo electronico ya se encuentra en uso'], 200);
					}
				}
			}

			$idMadreData = $this->insertDataMadre($db, $data_request);

			$idPadreData = $this->insertDataPadre($db, $data_request);

			$idApoderadoRolPadreMadre  = $this->insertDataApoderadoRolPadreMadre($db, $data_request);

			//Formatear ids a enteros
			$idMadreDataInt = intval($idMadreData);
			$idPadreDataInt = intval($idPadreData);
			$idApoderadoRolPadreMadreInt = intval($idApoderadoRolPadreMadre);
			//Fin Formatear ids a enteros

			$resultadoDataEstudiante = $this->insertDataEstudiante($db, $data_request, $idMadreDataInt, $idPadreDataInt, $idApoderadoRolPadreMadreInt);

			$apoderadoData = $this->insertDataApoderados($data_request, $resultadoDataEstudiante[0]);

			$this->save_centinela_data(
				(isset($data_request["id_estudiante"])) ? 'EDITAR' : 'NUEVO',
				$data_request['apellidos_nombres']
			);

			$db->transComplete();

			if($resultadoDataEstudiante[1] == true){
				return $this->respond(['tipo' => 'success', 'mensaje' => 'Estudiante y Usuario Guardado Correctamente'], 200);
			}else{
				return $this->respond(['tipo' => 'success', 'mensaje' => 'Estudiante Guardado Correctamente'], 200);
			}
		} catch (\Exception $e) {
			
			$db->transRollback();

			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		
		}
	}

	private function insertDataMadre($db, $data_request)
	{

		$madreData = [
			'madre_viva' =>  isset($data_request['madre_viva'])  ? 1 : 0,
			'madre_con_estudiante' =>  isset($data_request['madre_con_estudiante']) ? 1 : 0,
			'apellidos_nombres_madre' => $data_request['apellidos_nombres_madre'],
			'dni_madre' => $data_request['dni_madre'],
			'grado_instruccion_madre' => $data_request['grado_instruccion_madre'],
			'ocupacion_actual_madre' => $data_request['ocupacion_actual_madre'],
			'num_celular_madre' => $data_request['num_celular_madre'],
			'correo_electronico_madre' => $data_request['correo_electronico_madre'],
			'motivo_madre_no_vive_con_estudiante' => $data_request['motivo_madre_no_vive_con_estudiante']
		];

		if (isset($data_request["madre_id"])) {
			$madreData["id"] = $data_request["madre_id"];
		}

		$this->DatosMadreModel->save($madreData);

		$idMadreData = (isset($data_request["madre_id"])) ? $data_request["madre_id"] : $db->insertID();

		return $idMadreData;

	}

	private function insertDataPadre($db, $data_request)
	{

		$padreData = [
			'padre_vivo' => isset($data_request['padre_vivo'])  ? 1 : 0,
			'padre_con_estudiante' => isset($data_request['padre_con_estudiante']) ? 1 : 0,
			'apellidos_nombres_padre' => $data_request['apellidos_nombres_padre'],
			'dni_padre' => $data_request['dni_padre'],
			'grado_instruccion_padre' => $data_request['grado_instruccion_padre'],
			'ocupacion_actual_padre' => $data_request['ocupacion_actual_padre'],
			'correo_electronico_padre' => $data_request['correo_electronico_padre'],
			'num_celular_padre' => $data_request['num_celular_padre'],
			'motivo_padre_no_vive_con_estudiante' => $data_request['motivo_padre_no_vive_con_estudiante']
		];

		if (isset($data_request["padre_id"])) {
			$padreData["id"] = $data_request["padre_id"];
		}

		$this->DatosPadreModel->save($padreData);

		$idPadreData = (isset($data_request["padre_id"])) ? $data_request["padre_id"] : $db->insertID();

		return $idPadreData;

	}

	private function insertDataApoderadoRolPadreMadre($db, $data_request)
	{

		$apoderadoRolPadreMadreData = [
			'parentesco_con_apoderado' => $data_request['parentesco_con_apoderado'],
			'apellidos_nombres_apoderado' => $data_request['apellidos_nombres_apoderado'],
			'dni_apoderado' => $data_request['dni_apoderado'],
			'num_celular_apoderado' => $data_request['num_celular_apoderado'],
			'tipo_familia' => $data_request['tipo_familia']
		];


		if (isset($data_request["apoderado_rol_padre_madre_id"])) {
			$apoderadoRolPadreMadreData["id"] = $data_request["apoderado_rol_padre_madre_id"];
		}

		$this->ApoderadoRolPadreMadreModel->save($apoderadoRolPadreMadreData);

		$idApoderadoRolPadreMadre = (isset($data_request["apoderado_rol_padre_madre_id"])) ? $data_request["apoderado_rol_padre_madre_id"] : $db->insertID();

		return $idApoderadoRolPadreMadre;

	}

	private function insertDataEstudiante($db, $data_request, $idMadreDataInt, $idPadreDataInt, $idApoderadoRolPadreMadreInt)
	{

		$Imagen_upload = new Image_model();

		$imagen = $Imagen_upload->guardar($this->request->getFile('foto'), 'estudiante', (isset($data_request["imagen_anterior"])) ? $data_request["imagen_anterior"] : null);

		$data = [
			'apellidos_nombres' => $data_request['apellidos_nombres'],
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
			'padre_id' => $idPadreDataInt,
			'madre_id' => $idMadreDataInt,
			'apoderado_rol_padre_madre_id' => $idApoderadoRolPadreMadreInt,
			'codigo_estudiante' => $data_request['codigo_estudiante'],
		];

		if (isset($data_request["id_estudiante"])) {
			$data["id"] = intval($data_request["id_estudiante"]);
		}

		$this->EstudianteModel->save($data);

		$idEstudiante = (isset($data_request["id_estudiante"])) ? $data_request["id_estudiante"] : $db->insertID();

		$idEstudianteInt = intval($idEstudiante);



		return [$idEstudianteInt];
	}

	private function insertDataApoderados($data_request, $idEstudiante)
	{

		$this->ApoderadoModel->where('id_estudiante', $idEstudiante)->delete();

		$apoderadoData = [];

		foreach (json_decode($data_request["apoderado"]) as $row) {

			$apoderadoData[] = [
				'apellidos_nombres' => $row->apellidos_nombres,
				'dni' => $row->dni,
				'numero_telefonico' => $row->numero_telefonico,
				'grado_parentesco' => $row->grado_parentesco,
				'legalizado' => $row->legalizado,
				'id_estudiante' => $idEstudiante
			];
		}

		if (count($apoderadoData) > 0) {
			$this->ApoderadoModel->insertbatch($apoderadoData);
		}

	}


	// IMPORTACIÓN DE ESTUDIANTES
	public function importarEstudiantes()
	{
		$data_request = $this->request->getPost();

		$respuesta = explode(".", $_FILES["fileexportar"]['name']);
		$extension = $respuesta[(count($respuesta)) - 1];

		if ($extension != 'xlsx') {
			return $this->respond(['tipo' => 'warning', 'mensaje' => 'El archivo debe ser excel']);
		}

		$this->Helper->validar_permisos('configuracion-estudiante', 'new');

		$db = \Config\Database::connect();
		$db->query('SET AUTOCOMMIT = 0');
		$db->transStart();


		try {

			$filename = $_FILES["fileexportar"];

			$spreadsheet = IOFactory::load($filename['tmp_name']);

			$worksheet = $spreadsheet->getActiveSheet();
			$data = $worksheet->toArray();

			$highestRow = $worksheet->getHighestRow();

			$dataMadre = [];
			$dataPadre = [];
			$dataEstudiante = [];
			$dataApoderadoRolPadreMadre = [];
			$dataApoderado = [];

			$contador = 0;

			for ($i = 5; $i <= $highestRow; $i++) {

				$dni =  $worksheet->getCell('F' . $i)->getValue();

				if ($dni != null || $dni != '') {


					$getFechaNacimiento = (array) (Date::excelToDateTimeObject($worksheet->getCell('J' . $i)->getValue()));
					$getFechaNacimiento = explode(" ", $getFechaNacimiento["date"]);
					$setFechaNacimiento = $getFechaNacimiento[0];

					// VALIDAR FECHA VACIA O NULA 
					$fechaCaducidadDNI = $worksheet->getCell('U' . $i)->getValue();

					$setFechaCaducidadDNI = '';

					if ($fechaCaducidadDNI != NULL) {

						$getFechaCaducidadDNI = (array) (Date::excelToDateTimeObject($fechaCaducidadDNI));
						$getFechaCaducidadDNI = explode(" ", $getFechaCaducidadDNI["date"]);
						$setFechaCaducidadDNI = $getFechaCaducidadDNI[0];
					}


					$dataEstudiante = [
						'apellidos_nombres' =>  $worksheet->getCell('B' . $i)->getValue(),
						'obsv' =>  $worksheet->getCell('C' . $i)->getValue(),
						'grado' =>  $worksheet->getCell('D' . $i)->getValue(),
						'seccion' =>  $worksheet->getCell('E' . $i)->getValue(),
						'dni' => $dni,
						'foto' => 'sin_imagen.jpg',
						'sexo' => $worksheet->getCell('H' . $i)->getValue(),
						'correo_electronico' =>  $worksheet->getCell('I' . $i)->getValue(),
						'fecha_nacimiento' => $setFechaNacimiento,
						'lav' =>  $worksheet->getCell('K' . $i)->getValue(),
						'llaves' =>  $worksheet->getCell('L' . $i)->getValue(),
						'pabellon' =>  $worksheet->getCell('M' . $i)->getValue(),
						'ala' => $worksheet->getCell('N' . $i)->getValue(),
						'cama_ropero' =>  $worksheet->getCell('O' . $i)->getValue(),
						'duchas' =>  $worksheet->getCell('P' . $i)->getValue(),
						'banos' =>  $worksheet->getCell('Q' . $i)->getValue(),
						'urinarios' =>  $worksheet->getCell('R' . $i)->getValue(),
						'monitor_acompana' =>  $worksheet->getCell('S' . $i)->getValue(),
						'lugar_nacimiento' =>  $worksheet->getCell('T' . $i)->getValue(),
						'fecha_caducidad_dni' => $setFechaCaducidadDNI,
						'num_telefonico' =>  $worksheet->getCell('V' . $i)->getValue(),
						'religion' =>  $worksheet->getCell('W' . $i)->getValue(),
						'region_domicilio_actual' =>  $worksheet->getCell('X' . $i)->getValue(),
						'provincia_domicilio_actual' =>  $worksheet->getCell('Y' . $i)->getValue(),
						'distrito_domicilio_actual' =>  $worksheet->getCell('Z' . $i)->getValue(),
						'direccion_domicilio_actual' =>  $worksheet->getCell('AA' . $i)->getValue(),
						'referencia_domicilio_actual' =>  $worksheet->getCell('AB' . $i)->getValue(),
						'codigo_estudiuante' => $this->regenerateCodigoEstudiante()
					];

					$dataMadre = [
						'madre_viva' => ($worksheet->getCell('AC' . $i)->getValue() == 'SI') ? 1 : 0,
						'madre_con_estudiante' => ($worksheet->getCell('AD' . $i)->getValue() == 'SI') ? 1 : 0,
						'apellidos_nombres_madre' => $worksheet->getCell('AE' . $i)->getValue(),
						'dni_madre' =>  $worksheet->getCell('AF' . $i)->getValue(),
						'grado_instruccion_madre' =>  $worksheet->getCell('AG' . $i)->getValue(),
						'ocupacion_actual_madre' =>  $worksheet->getCell('AH' . $i)->getValue(),
						'num_celular_madre' => $worksheet->getCell('AI' . $i)->getValue(),
						'correo_electronico_madre' =>  $worksheet->getCell('AJ' . $i)->getValue(),
						'motivo_madre_no_vive_con_estudiante' =>  $worksheet->getCell('AK' . $i)->getValue(),
					];

					// datos_padre table
					$dataPadre  = [
						'padre_vivo' => ($worksheet->getCell('AL' . $i)->getValue() == 'SI') ? 1 : 0,
						'padre_con_estudiante' => ($worksheet->getCell('AM' . $i)->getValue() == 'SI') ? 1 : 0,
						'apellidos_nombres_padre' =>  $worksheet->getCell('AN' . $i)->getValue(),
						'dni_padre' =>  $worksheet->getCell('AO' . $i)->getValue(),
						'grado_instruccion_padre' =>  $worksheet->getCell('AP' . $i)->getValue(),
						'ocupacion_actual_padre' =>  $worksheet->getCell('AQ' . $i)->getValue(),
						'correo_electronico_padre' =>  $worksheet->getCell('AR' . $i)->getValue(),
						'num_celular_padre' =>  $worksheet->getCell('AS' . $i)->getValue(),
						'motivo_padre_no_vive_con_estudiante' =>  $worksheet->getCell('AT' . $i)->getValue(),
					];

					$dataApoderadoRolPadreMadre = [
						'parentesco_con_apoderado' => $worksheet->getCell('AU' . $i)->getValue(),
						'apellidos_nombres_apoderado' => $worksheet->getCell('AV' . $i)->getValue(),
						'dni_apoderado' => $worksheet->getCell('AW' . $i)->getValue(),
						'num_celular_apoderado' => $worksheet->getCell('AX' . $i)->getValue(),
						'tipo_familia' => $worksheet->getCell('AY' . $i)->getValue(),
					];


					// // apoderado table
					$dataApoderado1 = [
						'apellidos_nombres' =>  $worksheet->getCell('AZ' . $i)->getValue(),
						'dni' =>  $worksheet->getCell('BA' . $i)->getValue(),
						'numero_telefonico' =>   $worksheet->getCell('BB' . $i)->getValue(),
						'grado_parentesco' =>   $worksheet->getCell('BC' . $i)->getValue(),
						'legalizado' => ($worksheet->getCell('BD' . $i)->getValue() == 'SI') ? 1 : 0,
					];

					// // apoderado table
					$dataApoderado2 = [
						'apellidos_nombres' =>  $worksheet->getCell('BE' . $i)->getValue(),
						'dni' =>  $worksheet->getCell('BF' . $i)->getValue(),
						'numero_telefonico' =>   $worksheet->getCell('BG' . $i)->getValue(),
						'grado_parentesco' =>   $worksheet->getCell('BH' . $i)->getValue(),
						'legalizado' => ($worksheet->getCell('BI' . $i)->getValue() == 'SI') ? 1 : 0,
					];

					// // apoderado table
					$dataApoderado3 = [
						'apellidos_nombres' =>  $worksheet->getCell('BJ' . $i)->getValue(),
						'dni' =>  $worksheet->getCell('BK' . $i)->getValue(),
						'numero_telefonico' =>   $worksheet->getCell('BL' . $i)->getValue(),
						'grado_parentesco' =>   $worksheet->getCell('BM' . $i)->getValue(),
						'legalizado' => ($worksheet->getCell('BN' . $i)->getValue() == 'SI') ? 1 : 0,
					];
					// // apoderado table
					$dataApoderado4 = [
						'apellidos_nombres' =>  $worksheet->getCell('BO' . $i)->getValue(),
						'dni' =>  $worksheet->getCell('BP' . $i)->getValue(),
						'numero_telefonico' =>   $worksheet->getCell('BQ' . $i)->getValue(),
						'grado_parentesco' =>   $worksheet->getCell('BR' . $i)->getValue(),
						'legalizado' => ($worksheet->getCell('BS' . $i)->getValue() == 'SI') ? 1 : 0,
					];
					// // apoderado table
					$dataApoderado5 = [
						'apellidos_nombres' =>  $worksheet->getCell('BT' . $i)->getValue(),
						'dni' =>  $worksheet->getCell('BU' . $i)->getValue(),
						'numero_telefonico' =>   $worksheet->getCell('BV' . $i)->getValue(),
						'grado_parentesco' =>   $worksheet->getCell('BW' . $i)->getValue(),
						'legalizado' => ($worksheet->getCell('BX' . $i)->getValue() == 'SI') ? 1 : 0,
					];
					// // apoderado table
					$dataApoderado6 = [
						'apellidos_nombres' =>  $worksheet->getCell('BY' . $i)->getValue(),
						'dni' =>  $worksheet->getCell('BZ' . $i)->getValue(),
						'numero_telefonico' =>   $worksheet->getCell('CA' . $i)->getValue(),
						'grado_parentesco' =>   $worksheet->getCell('CB' . $i)->getValue(),
						'legalizado' => ($worksheet->getCell('CC' . $i)->getValue() == 'SI') ? 1 : 0,
					];

					// // apoderado table
					$dataApoderado7 = [
						'apellidos_nombres' =>  $worksheet->getCell('CD' . $i)->getValue(),
						'dni' =>  $worksheet->getCell('CE' . $i)->getValue(),
						'numero_telefonico' =>   $worksheet->getCell('CF' . $i)->getValue(),
						'grado_parentesco' =>   $worksheet->getCell('CG' . $i)->getValue(),
						'legalizado' => ($worksheet->getCell('CH' . $i)->getValue() == 'SI') ? 1 : 0,
					];


					$estudianteDNI = $this->EstudianteModel->select('dni')->where('dni', $dataEstudiante['dni'])->first();

					if (!is_object($estudianteDNI)) {


						$this->DatosMadreModel->save($dataMadre);
						$idMadreData =  $db->insertID();


						$this->DatosPadreModel->save($dataPadre);
						$idPadreData =  $db->insertID();


						$this->ApoderadoRolPadreMadreModel->save($dataApoderadoRolPadreMadre);
						$idApoderadoRolPadreMadre  = $db->insertID();


						$dataEstudiante['padre_id'] =  $idPadreData;
						$dataEstudiante['madre_id'] =  $idMadreData;

						$dataEstudiante['apoderado_rol_padre_madre_id'] =  $idApoderadoRolPadreMadre;



						$this->EstudianteModel->save($dataEstudiante);

						$idEstudiante = $db->insertID();




						if ($dataApoderado1['dni'] != '') {
							$dataApoderado1['id_estudiante'] = $idEstudiante;
							$dataApoderado[] = $dataApoderado1;
						}

						if ($dataApoderado2['dni'] != '') {
							$dataApoderado2['id_estudiante'] = $idEstudiante;
							$dataApoderado[] = $dataApoderado2;
						}

						if ($dataApoderado3['dni'] != '') {
							$dataApoderado3['id_estudiante'] = $idEstudiante;
							$dataApoderado[] = $dataApoderado3;
						}

						if ($dataApoderado4['dni'] != '') {
							$dataApoderado4['id_estudiante'] = $idEstudiante;
							$dataApoderado[] = $dataApoderado4;
						}

						if ($dataApoderado5['dni'] != '') {
							$dataApoderado5['id_estudiante'] = $idEstudiante;
							$dataApoderado[] = $dataApoderado5;
						}

						if ($dataApoderado6['dni'] != '') {
							$dataApoderado6['id_estudiante'] = $idEstudiante;
							$dataApoderado[] = $dataApoderado6;
						}

						if ($dataApoderado7['dni'] != '') {
							$dataApoderado7['id_estudiante'] = $idEstudiante;
							$dataApoderado[] = $dataApoderado7;
						}

						$contador++;
					}


				}
			}

			if(count($dataApoderado) > 0 ){
                $this->ApoderadoModel->insertBatch($dataApoderado);
            }

			$db->transComplete();

			return $this->respond(['tipo' => 'success', 'mensaje' => 'Se han importado correctamente ' . $contador . ' registros'], 200);
		} catch (\Exception $e) {

			$db->transRollback();

			return $this->respond(['tipo' => 'warning', 'mensaje' => $e->getMessage()]);
			//throw $th;
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
