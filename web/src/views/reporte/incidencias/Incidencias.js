import IncidenciasHTML from "./IncidenciasHTML.js";

import  {viewGuia } from '../reportes/index.js';

let DOM, DOM_ID, eView;

let
    /**** DATA */
    id_estudiante = null,
    datos_estudiante = null,
    action_submit = null, 
    imagen_anterior = null,
    table = null,
    padre_id = null,
    madre_id = null,
    apoderado_rol_padre_madre_id = null;

export default function (d) {

    $('#main').off();

    eView = d;
    eView.innerHTML = IncidenciasHTML;

    after_render();

}

const after_render = async () => {
    
    DOM_ID = '#main';
    DOM = $(DOM_ID);        
    
    /* DATATABLE UPDATE */
    DOM.on('click', 'button[name="update_datatable"]', function(e){
        e.stopImmediatePropagation();
        table.ajax.reload(null, false);
    });

    /* GENERAR REPORTE */
    DOM.on('click', 'button[name="generar_reporte"]', async function(e){
        e.stopImmediatePropagation();

        var dataTable = DOM.find('table[name="registros_incidencias_por_estudiante"]').DataTable();

        var data = dataTable.rows().data();

        var fechaDesde = DOM.find('input[name="fecha_inicio"]').val();

        var fechaHasta = DOM.find('input[name="fecha_fin"]').val();


        HELPER.modalInstance('modal-ver_incidencias').hide();

        viewGuia(datos_estudiante, fechaDesde, fechaHasta, data.toArray(), 'modal-view-guia', eView);
    });
    
    /* VER INCIDENCIAS */
    DOM.on('click', 'a[name="row-ver_incidencias"]', function(e){
        e.stopImmediatePropagation();
        ver_incidencias($(this));
    });

    DOM.on('click', 'button[name="boton_cerrar_reporte_incidencia"]', function(e){
        e.stopImmediatePropagation();
        HELPER.modalInstance('modal-ver_incidencias').show();
    });

    datatable();
   
}

const getIndicenciaAtencionPorIndicenciaEstudianteId = async (id_incidencia_estudiante) => {

    await axios.get(BASE_API + 'operacion/incidenciaestudiante/getIndicenciaAtencionPorIndicenciaEstudianteId?id_incidencia_estudiante=' + id_incidencia_estudiante)
        .then(function (response) {

            datos_incidencia_atencion = response.data;

        }).catch(error => {
            console.log(error);
        });

};

const getIndicenciaAbordajePorIndicenciaEstudianteId = async (id_incidencia_estudiante) => {

    await axios.get(BASE_API + 'operacion/incidenciaabordajeestudiante/getIndicenciaAbordadaPorIndicenciaEstudianteId?id_incidencia_estudiante=' + id_incidencia_estudiante)
        .then(function (response) {

            datos_incidencia_abordaje = response.data;

        }).catch(error => {
            console.log(error);
        });

};

const datatable = () => {

    table = DOM.find('table[name="registros"]').DataTable({
        ajax: BASE_API + 'reporte/incidencias',
        lengthChange: false,
        paginate: true,
        pageLength: 10,
        scrollY: 'auto',
        scrollMaxHeight: '500px',
        columns: [
            { title: 'ID', mData: 'id', visible: false },
            {
                title: 'ACCIÓN',
                defaultContent: ``,
                render: function (data, type, row) {
                    var html = /*html*/`
                        <div class="btn-group" style="width:40px;">
                            <button type="button" class="btn btn-primary btn-primary-dark btn-sm split-bg-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"><span class="visually-hidden">Toggle Dropdown</span></button>
                            <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-end">	
                                <a class="dropdown-item" name="row-ver_incidencias" href="javascript:;">Ver Incidencias</a>
                            </div>
                        </div>
                    `;
                    return html;
                },
                width: '100px',
            },
            { title: 'DNI', mData: 'dni' },
            { title: 'NOMBRE COMPLETO', mData: 'apellidos_nombres' },
            { title: 'GRADO Y SECCION', mData: 'grado_seccion' },
            { title: 'CORREO', mData: 'correo_electronico' },
        ]
    });

}

const datatable_incidencias_por_estudiante = async () => {

    table = DOM.find('table[name="registros_incidencias_por_estudiante"]').DataTable({
        ajax: {
            url: BASE_API + 'reporte/incidencias/getIncidenciasPorEstudiante',
            data: function (d) {
                d.id_estudiante = id_estudiante;
                d.fecha_inicio = DOM.find('input[name="fecha_inicio"]').val();
                d.fecha_fin = DOM.find('input[name="fecha_fin"]').val();
            }
        },
        lengthChange: false,
        paginate: true,
        pageLength: 10,
        scrollY: 'auto',
        scrollMaxHeight: '500px',
        columns: [
            { title: 'FECHA', mData: 'fecha' },
            { title: 'NUMERO DOCUMENTO', mData: 'serie_numero' },
            {
                title: 'ESTADO', render: function (data, type, row) {
                    let html ='';
                    if (row.necesita_abordaje_directa === "1") {
                        html = '<div class="badge rounded-pill text-primary bg-light-primary p-2 text-uppercase px-3"><i class="bx bxs-circle me-1"></i>ESPERA DE ABORDAJE</div>';
                    }else if(row.se_soluciono == 1){
                        html = '<div class="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3"><i class="bx bxs-circle me-1"></i>SOLUCIONADO</div>';
                    }else if(row.incidencia_derivada == 1){
                        html = '<div class="badge rounded-pill text-primary bg-light-primary p-2 text-uppercase px-3"><i class="bx bxs-circle me-1"></i>ESPERA DE ABORDAJE</div>';
                    }else if(row.incidencia_cerrada == 1){
                        html = '<div class="badge rounded-pill text-dark bg-light-dark p-2 text-uppercase px-3"><i class="bx bxs-circle me-1"></i>CERRADO</div>';
                    }else{
                        html = '<div class="badge rounded-pill text-warning bg-light-warning p-2 text-uppercase px-3"><i class="bx bxs-circle me-1"></i>PENDIENTE</div>';
                    }
                    return html;
                }
            },
            { title: 'ENCARGADO INCIDENCIA', mData: 'nombre_completo_encargado_incidencia' },
            { title: 'DESCRIPCION PROBLEMA', mData: 'describir_incidencia' }
        ]
    });

}

const ver_incidencias = async (row) => {

    let accion = "ver_incidencias";

    let data = HELPER.get_attr_json(row);

    id_estudiante = data.id_estudiante;
    datos_estudiante = data;

    DOM.find('h3[name="estudiante_responsable"]').text(data.apellidos_nombres);
    DOM.find('input[name="fecha_inicio"]').val(HELPER.fecha_actual());
    DOM.find('input[name="fecha_fin"]').val(HELPER.fecha_actual());

    table.ajax.reload(null, false);

    await datatable_incidencias_por_estudiante();

    HELPER.modalInstance('modal-' + accion).show();
    
}