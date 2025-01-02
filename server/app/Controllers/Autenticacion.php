<?php namespace App\Controllers;

use App\Libraries\CreatorJwt;
use CodeIgniter\API\ResponseTrait;
use App\Models\Helper_model;
use App\Models\Configuracion\Usuario_model;

use CodeIgniter\Controller;

class Autenticacion extends Controller
{
	use ResponseTrait;
	private $CreatorJwt;
	private $Helper;

	public function __construct()
	{
		$this->CreatorJwt = new CreatorJwt();
		$this->Helper = new Helper_model();
	}

	public function login($data_request = null)
	{		
		if($data_request == null)
		{
			$data_request = $this->request->getPost();
		}
		
		$Usuario_m = new Usuario_model();

		$usuario = $Usuario_m->where('usuario', $data_request["usuario"])
		->orwhere('usuario.email', $data_request["usuario"])
		->where('usuario.estado',1)
		->first();

		if(is_object($usuario))
		{
			if($usuario->fl_suspendido == 1)
			{
				return $this->respond(['mensaje' => 'Usuario Suspendido', 'tipo' => 'warning'], 400);
			}

			$password_form = hash('sha512', $data_request["password"] . $usuario->salt);

			if($usuario->password == $password_form)
			{
				$login_date = Date('Y-m-d h:i:s');
				$tokenData['uniqueId'] = $usuario->id;
				$tokenData['role'] = $usuario->tipo;
				$tokenData['timeStamp'] = $login_date;
				$jwtToken = $this->CreatorJwt->GenerateToken($tokenData);

				$Usuario_m->save([
					'id' 			=> $usuario->id, 
					'login_date' 	=> $login_date,
					'token'			=> $jwtToken
				]);

				//Ejecutar login en el backend de Chat nodejs

				// URL de la API RESTful
				$url = 'http://localhost:3001/api/auth/login';

				// Datos que deseas enviar a la API
				$data = array(
					'user' => $data_request["usuario"],
					'password' => $data_request["password"]
				);

				// Configuración de curl
				$curl = curl_init();
				curl_setopt($curl, CURLOPT_URL, $url);
				curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
				curl_setopt($curl, CURLOPT_POST, true);
				curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));

				// Hacer la solicitud a la API
				$response = curl_exec($curl);

				// Procesar la respuesta de la API
				$data = json_encode($response, true);

				// Cerrar la conexión curl
				curl_close($curl);

				//Fin ejecutar login

				return $this->respond(['Token' => $jwtToken, 'id_usuario' => $usuario->id, 'datos' => $data], 200);
			}
			else {
				return $this->respond(['mensaje' => 'Usuario o Contraseña incorrecta', 'tipo' => 'warning'], 400);
			}
		}
		else {
			return $this->respond(['mensaje' => 'Usuario o Contraseña incorrecta', 'tipo' => 'warning'], 400);
		}	
		
	}

	public function recuperar()
	{
		$data_request = $this->request->getPost();
		$Usuario_m = new Usuario_model();

		$usuario = $Usuario_m->select('salt')
							->where('email', $data_request["email"])
							->first();

		if(is_object($usuario))
		{
			$db = \Config\Database::connect();
			$system = $db->table('static_system')->get()->getRow();

			$email = \Config\Services::email();

			$config['mailType'] = 'html';

			$email->initialize($config);

			$email->setFrom($system->email_robot, $system->empresa);
			$email->setTo($data_request["email"]);

			$htmlContent = '<p><a href="'.$_ENV['BASE_URL_FRONTEND'].'#/restablecer/'.$usuario->salt.'">Haz click aquí para restablecer tu contraseña</a></p>';
			$email->setSubject('Restablecer Contraseña');
			$email->setMessage($htmlContent);

			$email->send();
			$mensaje = 'Hemos enviado un mensaje a '.$data_request["email"].' para que puedas retablecer tu contraseña';
			return $this->respond(['mensaje' => $mensaje], 200);
		}
		else
		{
			return $this->respond(['mensaje' => 'Correo electrónico no existe'], 400);
		}
	}

	public function restablecer_verificar()
	{
		$data_request = $this->request->getPost();
		$Usuario_m = new Usuario_model();

		$usuario = $Usuario_m->where('salt', $data_request["s"])->first();

		if(is_object($usuario))
		{
			return $this->respond($usuario, 200);
		}
		else
		{
			return $this->respond(['mensaje' => 'Error de validación'], 400);
		}
	}

	public function restablecer()
    {
		$data_request = $this->request->getPost();
		$Usuario_m = new Usuario_model();

		try {

			$db = \Config\Database::connect();
			$db->transStart();			

			$usuario = $Usuario_m->select('id, email')
								->where('salt', $data_request["salt"])
								->first();

			if(is_object($usuario))
			{
				$Usuario_m = new Usuario_model();

				$random_salt = hash('sha512', uniqid(mt_rand(1, mt_getrandmax()), true));
				$password = hash('sha512', $data_request["password"] . $random_salt);

				$data = array(
					'password'      => $password,
					'salt'        	=> $random_salt,
					'id'  			=> $usuario->id,
				);

				if($Usuario_m->save($data))
				{
					$data_request["usuario"] = $usuario->email;
					$data_request["clave"] = $data_request["password"];

					$db->transComplete();

					return $this->login($data_request);
				}
				else
				{
					return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->errores($Usuario_m->errors())], 400);
				}

			}
			else
			{
				return $this->respond(['mensaje' => 'Error'], 400);
			}

		} catch (\Exception $e) {
			return $this->respond(['tipo' => 'danger', 'mensaje' => $this->Helper->mensaje_cath($e)], 400);
		}

	}
	
	public function logout()
	{

		$received_Token = $this->request->getServer('HTTP_TOKEN');
		
		$jwtData = $this->CreatorJwt->DecodeToken($received_Token);

		$Usuario_m = new Usuario_model;
		$usuario = $Usuario_m->where('tipo', $jwtData["role"])
		->where('login_date', $jwtData["timeStamp"])
		->where('token', $received_Token)
		->where('id', $jwtData["uniqueId"])
		->first();


		$Usuario_m = new Usuario_model();
		
			$usuario = $Usuario_m->save(
				[
					'id'	=> $usuario->id,
					'token'	=> ''
				]
			);	
		
		return $this->respond([], 200);
	}
	

	//--------------------------------------------------------------------

}
