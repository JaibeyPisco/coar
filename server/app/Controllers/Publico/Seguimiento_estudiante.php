<?php

namespace App\Controllers\Publico;

use App\Models\Configuracion\EstudianteModel;
use CodeIgniter\Controller;

use CodeIgniter\API\ResponseTrait;
use App\Models\Operacion\IncidenciaModel;

class seguimiento_estudiante extends Controller
{
    use ResponseTrait;
    private IncidenciaModel $IncidenciaEstudianteModel;
    private EstudianteModel $EstudianteModel;

    public function __construct()
    {

        $this->IncidenciaEstudianteModel = new IncidenciaModel();
        $this->EstudianteModel = new EstudianteModel();
    }

    public function get_empresa()
    {
        $db = \Config\Database::connect();
        $resposne  = $db->table('empresa')
            ->select('id ,  razon_social as text')
            ->get()->getResult();

        return $this->respond($resposne, 200);
    }

    public function get_seguimiento_estudiante()
    {

        try {

            $data_request = $this->request->getPost();

            $db = \Config\Database::connect();

            $query = $db->table('incidenciaestudiantes AS i')
            ->select('i.describir_incidencia AS descripcion_incidencias, i.createdField, CONCAT(i.serie, "-", i.numero) AS serie_incidencia,
                      ia.fecha_hora_atencion, ia.comentario_atencion_incidencia, 
                      u.nombre AS usuario_atencion')
            ->select('e.apellidos_nombres AS nombre_estudiante, e.id AS id_estudiante, e.foto AS foto_estudiante, e.dni as dni_estudiante')
            
            ->select('area.nombre as nombre_area')

            ->join('estudiante AS e', 'e.id = i.id_estudiante_principal', 'left')
            ->join('incidenciaatencion AS ia', 'ia.id_incidencia = i.id', 'left')
            ->join('usuario AS u', 'u.id = ia.id_usuario_atencion_incidencia', 'left')
            ->join('area', 'area.id = u.id_area', 'left')
            ->where('e.dni', $data_request['dni_estudiante'])
            ->where('e.codigo_estudiante',  $data_request['codigo_estudiante'])
            ->get();


            $results = $query->getResult();

            $results['estudiante'] = $this->EstudianteModel
            ->select('id, dni, religion, foto, grado, seccion, seccion, apellidos_nombres, sexo')
            ->where('dni', $data_request['dni_estudiante'])
            ->where('codigo_estudiante',  $data_request['codigo_estudiante'])
            ->find();


            return $this->respond($results, 200);
        } catch (\Exception $th) {
            return $this->respond($th->getMessage(), 200);
        }
    }

    public function get_seguimiento()
    {
        $data_request = $this->request->getPost();

        $db = \Config\Database::connect();

        $orden = $db->table('orden')
            ->select('orden.serie, orden.numero, orden.id, date_format(orden.fecha_sistema, "%d-%m-%Y %H:%i:%s") as fecha, direccion_entrega, orden.id_orden_entrega, orden.id_guia_transportista')
            ->select('cd.razon_social as destinatario')
            ->select('te.nombre as tipo_entrega')
            ->select('ld.nombre as destino')
            ->select('e.logo')
            ->select('u.nombre as usuario')
            ->select('gt.fl_finalizado')
            ->select('oe.fecha as fecha_entrega, oe.tipo_entrega')
            ->select('ue.nombre as usuario_entrega')

            ->join('tipo_entrega te', 'te.id = orden.id_tipo_entrega')
            ->join('socio cd', 'cd.id = orden.id_destinatario')
            ->join('lugar ld', 'ld.id = orden.id_lugar_destino')
            ->join('empresa e', 'e.id = orden.id_empresa')
            ->join('usuario u', 'u.id = orden.id_usuario')

            ->join('guia_transportista gt', 'gt.id = orden.id_guia_transportista', 'left')
            ->join('orden_entrega oe', 'oe.id = orden.id_orden_entrega', 'left')
            ->join('usuario ue', 'u.id = oe.id_usuario', 'left')

            ->where('orden.serie', $data_request["serie"])
            ->where('CAST(orden.numero AS UNSIGNED)', $data_request["numero"])
            ->where('orden.id_empresa', $data_request["empresa"])
            ->get()->getRow();

        if (!is_object($orden)) {
            return $this->respond([
                'respuesta' => 'false',
                'mensaje'   => 'Orden no Encontrado'
            ], 400);
        }

        $seguimiento = [];


        if ($orden->id_orden_entrega != null) {
            $seguimiento[] = [
                'tipo'          => 'ENTREGADO',
                'fecha'         => $orden->fecha_entrega,
                'numero'        => '',
                'descripcion'   => $orden->tipo_entrega,
                'usuario'       => $orden->usuario_entrega,
            ];
        }

        $manifiesto = $db->table('manifiesto_guia mg')
            ->select('concat(m.serie,"-",m.numero) as manifiesto, m.fecha_sistema as fecha')
            ->select('l.nombre as local')
            ->select('u.nombre as usuario')

            ->join('orden o', 'o.id_guia_transportista = mg.id_guia_transportista')
            ->join('manifiesto m', 'm.id = mg.id_manifiesto')
            ->join('local l', 'l.id = m.id_local')
            ->join('usuario u', 'u.id = m.id_usuario')

            ->where('mg.id_guia_transportista', $orden->id_guia_transportista)
            ->where('m.fl_estado', 1)
            ->limit(1)
            ->get()->getResult();

        foreach ($manifiesto as $row) {
            $seguimiento[] = [
                'tipo'          => 'EN RUTA',
                'fecha'         => $row->fecha,
                'numero'        => $row->manifiesto,
                'descripcion'   => $row->local . ' (' . $row->manifiesto . ')',
                'usuario'       => $row->usuario,
            ];
        }



        if ($orden->fl_finalizado == 1) {
            $desembarque = $db->table('desembarque_guia dg')
                ->select('concat(d.serie,"-",d.numero) as desembarque, d.fecha_sistema as fecha')
                ->select('l.nombre as local')
                ->select('u.nombre as usuario')

                ->join('orden o', 'o.id_guia_transportista = dg.id_guia_transportista')
                ->join('desembarque d', 'd.id = dg.id_desembarque')
                ->join('local l', 'l.id = d.id_local')
                ->join('usuario u', 'u.id = d.id_usuario')

                ->where('dg.id_guia_transportista', $orden->id_guia_transportista)
                ->where('d.fl_estado', 1)
                ->orderBy('d.id', 'desc')
                ->limit(1)
                ->get()->getResult();

            foreach ($desembarque as $row) {
                $seguimiento[] = [
                    'tipo'          => 'DESEMBARCANDO',
                    'fecha'         => $row->fecha,
                    'numero'        => $row->desembarque,
                    'descripcion'   => $row->local,
                    'usuario'       => $row->usuario,
                ];
            }

            $seguimiento[] = [
                'tipo'          => 'LLEGADO A AGENCIA DESTINO',
                'fecha'         => $desembarque[count($desembarque) - 1]->fecha,
                'numero'        => $orden->serie . '-' . $orden->numero,
                'descripcion'   => $orden->destino,
                'usuario'       => $desembarque[count($desembarque) - 1]->usuario,
            ];
        }


        $inventario_orden = $db->table('inventario_orden_detalle')
            ->select('inventario_orden_detalle.*, io.fecha')
            ->select('l.nombre as local')
            ->select('u.nombre as usuario')
            ->join('inventario_orden io', 'io.id = inventario_orden_detalle.id_inventario_orden')
            ->join('local l', 'l.id = io.id_local', 'left')
            ->join('usuario u', 'u.id = io.id_usuario', 'left')
            ->where('inventario_orden_detalle.id_orden', $orden->id)
            ->get()
            ->getResult();

        foreach ($inventario_orden as $row) {
            $seguimiento[] = [
                'tipo'          => 'INVENTARIO',
                'fecha'         => $row->fecha,
                'numero'        => '',
                'descripcion'   => $row->stock . '/' . $row->stock_fisico . ' BULTOS | Ub: ' . $row->ubicacion,
                'usuario'       => $row->usuario,

            ];
        }

        $reparto_orden = $db->table('reparto_detalle')
            ->select('r.*, r.fecha_sistema as fecha')
            ->select('l.nombre as local')
            ->select('u.nombre as usuario')
            ->join('reparto r', 'r.id = reparto_detalle.id_reparto')
            ->join('local l', 'l.id = r.id_local', 'left')
            ->join('usuario u', 'u.id = r.id_usuario', 'left')
            ->where('reparto_detalle.id_guia_transportista', $orden->id_guia_transportista)
            ->get()->getResult();

        foreach ($reparto_orden as $row) {
            $seguimiento[] = [
                'tipo'          => 'REPARTO A DOMICILIO',
                'fecha'         => $row->fecha,
                'numero'        => '',
                'descripcion'   => $row->serie . '-' . $row->numero,
                'usuario'       => $row->usuario,
            ];
        }

        usort($seguimiento, function ($a, $b) {
            $t1 = strtotime($a['fecha']);
            $t2 = strtotime($b['fecha']);
            return $t1 - $t2;
        });

        $seguimiento_format = [];

        foreach ($seguimiento as $row) {
            $row["fecha"] = date("d-m-Y H:i:s", strtotime($row["fecha"]));

            $seguimiento_format[] = $row;
        }


        $response = [
            'respuesta'     => 'true',
            'orden'         => $orden,
            'seguimiento'   => $seguimiento_format
        ];


        return $this->respond($response, 200);
    }
}
