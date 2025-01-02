<?php namespace App\Controllers\Publico;

use CodeIgniter\API\ResponseTrait;

use CodeIgniter\Controller;

class Consulta_comprobante extends Controller
{
	use ResponseTrait;

    public function get_comprobante()
    {
        $data_request = $this->request->getPost();

        $db = \Config\Database::connect();

        $response = $db->table('factura')
        ->select('json_api, total_importe, serie, numero, enlace')
        ->select('e.logo')
        ->select('comp.nombre as comprobante')
        ->select('c.razon_social as cliente')
        ->select('m.simbolo as simbolo_moneda')

        ->join('static_comprobante comp', 'comp.id = factura.id_comprobante')
        ->join('static_moneda m', 'm.id = factura.id_moneda')
        ->join('empresa e', 'e.id = factura.id_empresa')
        ->join('socio c', 'c.id = factura.id_cliente')

        ->where('e.numero_documento', $data_request["ruc_empresa"])
        ->where('comp.codigo_sunat', $data_request["tipo_comprobante"])
        ->where('factura.serie', $data_request["serie"])
        ->where('CAST(factura.numero AS UNSIGNED)', $data_request["numero"])
        ->where('factura.total_importe', $data_request["total_importe"])
        ->where('factura.fecha', $data_request["fecha_emision"])

        ->get()
        ->getRow();
        

        if(!is_object($response))
        {
            return $this->respond([
                'respuesta' => 'false',
                'mensaje'   => 'Comprobante no Encontrado'
            ], 400);
        }

        if($response->json_api == null && $response->enlace != null)
        {
            return $this->respond([
                'respuesta' => 'redireccionar',
                'enlace'    => $response->enlace
            ], 200);
        }


        $json_api = json_decode($response->json_api);

        unset($response->json_api);

        $response = array_merge((array)$response, [
            "ruta_xml"  => $json_api->ruta_xml,
            "ruta_pdf"  => $json_api->ruta_pdf,
        ]);

        return $this->respond($response, 200);
    }

}
