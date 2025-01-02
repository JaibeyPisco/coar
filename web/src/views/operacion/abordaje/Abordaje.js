import AbordajeHTML from "./AbordajeHTML.js";
import  {viewGuia} from '../nuevaIncidenciaReporte/index.js';


let DOM, DOM_ID, eView;

let    /**** DATA */
    id_incidencia = null,
    datos_estudiante = null,
    datos_incidencia_atencion = null,
    datos_incidencia_abordaje = null,
    action_submit = null,
    imagen_anterior = null,
    fl_autoevento = true,
    array_areas = null,
    table = null,
    descripcion_abordaje = null,
    acuerdos_abordaje = null,
    privado_abordaje = null,
    atenderAbordajeMasivaObj = [] ;
/************ */

export default function (d) {

    $('#main').off();
    eView = d;

    eView.innerHTML = AbordajeHTML

    after_render();
}

const after_render = async () => {

    DOM_ID = '#main';
    DOM = $(DOM_ID);
 
    DOM.find('form[name="save"]').validate({
     
        submitHandler: function () {
            submit();
        }
    });
 
    DOM.on('click', 'button[name="row-atender_incidencia"]', function (e) {
        e.stopImmediatePropagation();
        atenderIncidenciaOpenModal($(this));
    });


    DOM.on('click', 'button[name="nuevo_item"]', function (e) {
        e.stopImmediatePropagation();
        rowAgregarAlumnosInvolucrados()
    });

    /* VER DETALLE */
    DOM.on('click', 'a[name="row-ver_reporte_incidencia"]', function (e) {
        e.stopImmediatePropagation();
        ver_detalle($(this));
    });

    // Eliminar una fila en tabla areas
    DOM.on('click', 'button[name="delete-item"]', function (e) {

        let codigo = e.target.getAttribute('data-codigo');
        eView.querySelector('div[data-codigo="' + codigo + '"]').remove();

    })

    eView.querySelector('button[name="atenderIncidenciaMasiva"]').addEventListener('click', function(){
        btnAtenderAbordajeMasiva();
    });
 
    descripcion_abordaje = await ClassicEditor.create(eView.querySelector('div[name="descripcion_abordaje"]'));
    acuerdos_abordaje = await ClassicEditor.create(eView.querySelector('div[name="acuerdos_abordaje"]'));
    privado_abordaje = await ClassicEditor.create(eView.querySelector('div[name="privado_abordaje"]'));

    selectAlumnos();

    /* DATATABLE UPDATE*/
    DOM.on('click', 'button[name="update_datatable"]', function(e) {
        e.stopImmediatePropagation();
        table.ajax.reload(null, false);
    });

    DOM.find('input[name="fecha_inicio"]').val(HELPER.fecha_actual());
    DOM.find('input[name="fecha_fin"]').val(HELPER.fecha_actual());

    datatable();
}

const datatable = function () {

    table = DOM.find('table[name="registros"]').DataTable({
        ajax: {
            url: BASE_API + 'operacion/IncidenciaAbordajeEstudiante',
            data: function (d) {
                d.fecha_inicio = DOM.find('input[name="fecha_inicio"]').val();
                d.fecha_fin = DOM.find('input[name="fecha_fin"]').val();
                d.id_estudiante = DOM.find('select[name="id_estudiante"]').val();
            }
        },
        lengthChange: false,
        paginate: true,
        pageLength: 10,
        scrollY: 'auto',
        scrollMaxHeight: '500px',
        columns: [
            { title: 'ID', mData: 'IdIncidenciaestudiantes', visible: false },
            {
                title: '<input type="checkbox" data-name="checkAllItem" />',
                render: function(data, type, row) {
                   
                    let atenderIncidencia= '';
                    if (GLOBAL.usuario.encargado_atender_abordajes == 1 && GLOBAL.usuario.id == row.id_usuario_encargado) {

                        if (row.necesita_abordaje_directa === '1' || row.incidencia_derivada === '1') {
                            atenderIncidencia  = '<input type="checkbox" data-name="checkItem" />';
                        } else{
                            atenderIncidencia = '';
                        }
                    } else {
                        atenderIncidencia =  ''; // No mostrar el checkbox si no se cumple la condición
                    }
 
                    return atenderIncidencia
 
                },
                width: '10px', class:'text-center'
            },

            {
                title: 'ACCIÓN',
                defaultContent: ``,
                render: function (data, type, row) {

                    let btnAtenderIncidencia = '';

                    if(GLOBAL.usuario.encargado_atender_abordajes == 1 && GLOBAL.usuario.id == row.id_usuario_encargado){
                        if (row.necesita_abordaje_directa === '1' || row.incidencia_derivada === '1') {
                            btnAtenderIncidencia = /*html*/`
                                <div class="btn-group" style="width: 80px;">
                                    <button type="button" class="btn btn-default btn-sm" name="row-atender_incidencia"><i class="fadeIn animated bx bx-edit" style="color: #8e8e10; font-size: 20px;"></i> Atender</button>
                                    <button type="button" class="btn btn-primary btn-primary-dark btn-sm split-bg-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"><span class="visually-hidden">Toggle Dropdown</span></button>
                                    <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-end">	
                                        <a class="dropdown-item" name="row-ver_reporte_incidencia" href="javascript:;"><i class="lni lni-eye" style="color: #8e8e10; font-size: 20px;"></i> Ver Detalle</a>
                                    </div>
                                </div>
                            `;
                        }else{
                            btnAtenderIncidencia  = /*html*/`
                                <div class="btn-group" style="width: 40px;">
                                    <button type="button" class="btn btn-primary btn-primary-dark btn-sm split-bg-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"><span class="visually-hidden">Toggle Dropdown</span></button>
                                    <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-end">	
                                        <a class="dropdown-item" name="row-ver_reporte_incidencia" href="javascript:;"><i class="lni lni-eye" style="color: #8e8e10; font-size: 20px;"></i> Ver Detalle</a>
                                    </div>
                                </div>
                            `;
                        }
                    }else{
                        btnAtenderIncidencia  = /*html*/`
                            <div class="btn-group" style="width: 40px;">
                                <button type="button" class="btn btn-primary btn-primary-dark btn-sm split-bg-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"><span class="visually-hidden">Toggle Dropdown</span></button>
                                <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-end">	
                                    <a class="dropdown-item" name="row-ver_reporte_incidencia" href="javascript:;"><i class="lni lni-eye" style="color: #8e8e10; font-size: 20px;"></i> Ver Detalle</a>
                                </div>
                            </div>
                        `;
                    }

                    return btnAtenderIncidencia;

                },
                width: '120px'
            },
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
                    }else if(row.necesita_abordaje_directa == "0" && row.se_soluciono == "0" && row.incidencia_derivada == "0"){
                        html = '<div class="badge rounded-pill text-warning bg-light-warning p-2 text-uppercase px-3"><i class="bx bxs-circle me-1"></i>PENDIENTE</div>';
                    }
                    return html;

                }
            },
            {
                title: 'N° INCIDENCIA', render: (data, type, row) => {
                    return row.serie + '-' + row.numero
                }
            },
            {
                title: 'ESTUDIANTE', render: function (data, type, row) {
                    return row.nombre_estudiante + '| DNI ' + row.dni_estudiante + ' | ' + row.grado_seccion ;
                }
            },
            { title: 'TIPO INCIDENCIA', mData: 'nombre_incidencia' }
        ],
        createdRow: function (row, data, indice) {
            $(row).attr('data-json', JSON.stringify(data));
            $(row).find('td').eq(0).css('width', '10px');
        },
        drawCallback:function(){
            eView.querySelector('input[data-name="checkAllItem"]').addEventListener('change', function(){

                eView.querySelectorAll('input[data-name="checkItem"]').forEach(input => {
                    input.checked = this.checked;
                });
    
            });
        },

        order: [
            ['0', 'asc']
        ]
    });

}

const ver_detalle = async (row) => {

    let data = HELPER.get_attr_json(row);

    await getDatosEstudiantePorEstudiantePrincipalId(data.id_estudiante_principal);

    await getIndicenciaAtencionPorIndicenciaEstudianteId(data.id);

    await getIndicenciaAbordajePorIndicenciaEstudianteId(data.id)

    viewGuia(datos_estudiante, data, datos_incidencia_atencion, datos_incidencia_abordaje, 'modal-view-guia', eView);

};

const getDatosEstudiantePorEstudiantePrincipalId = async (id_estudiante_principal) => {

    await axios.get(BASE_API + 'operacion/incidenciaestudiante/getEstudiantePorEstudiantePrincipalId?id_estudiante_principal=' + id_estudiante_principal)
        .then(function (response) {

            datos_estudiante = response.data;

        }).catch(error => {
            console.log(error);
        });

};

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


const btnAtenderAbordajeMasiva = () =>{
       
    let arraySeleccionados = [];
    
    eView.querySelectorAll('table[name="registros"] tbody tr').forEach(tr => {
        
        
        if (tr.querySelector('input[type="checkbox"]')) {
            if (tr.querySelector('input[type="checkbox"]').checked) {
                let dataItem = JSON.parse(tr.getAttribute('data-json'));
                arraySeleccionados.push(dataItem);
            }
        }
    });

    if(arraySeleccionados.length == 0){
        HELPER.notificacion('No existen cuentas por pagar seleccioandas', 'info');
        return false;
    }

    atenderAbordajeMasivo (arraySeleccionados);
 
    // cancelarCuotas.setPagar(arraySeleccionados);

}

const atenderAbordajeMasivo = (row) => {

    let accion = 'save';
    let form = eView.querySelector('form[name="save"]');

    eView.querySelector('h4[name="' + accion + '"]').innerText = 'Atender Derivación';

    /** DATA */
    // HELPER.reset_form($(form));

    // let data = HELPER.get_attr_json(row); 

    let serie_numero_incidencia =  form.querySelector('span[name="serie_numero_incidencia"]')
    let incidencia_text =  form.querySelector('div[name="incidencia"]')
    
    // incidencia.innerHTML = data.describir_incidencia
    // form.querySelector('span[name="nombre_alumno"]').innerHTML = data.nombre_estudiante
    // form.querySelector('span[name="usuario_nombre"]').innerHTML = data.usuario_nombre
    // form.querySelector('span[name="serie_numero_incidencia"]').innerHTML = data.serie + '-' + data.numero;
    // form.querySelector('input[name="fecha_abordaje"]').value = HELPER.fecha_actual();
    // form.querySelector('input[name="hora_inicio_abordaje"]').value = HELPER.hora();
 
    // descripcion_abordaje.setData(data.preguntas_abordaje)
    descripcion_abordaje.setData('')

    acuerdos_abordaje.setData('')
    privado_abordaje.setData('')

    // id_incidencia = data.id;
    action_submit = accion;
    imagen_anterior = null;

    atenderAbordajeMasivaObj = [];
    
    let detalleInvolucrados = eView.querySelector('tbody[name="detalle-involucrados"]');

    
    detalleInvolucrados.innerHTML = ''
    incidencia_text.innerHTML = '';
    const incidencias = [];

    row.forEach(estudiante => {

        atenderAbordajeMasivaObj.push({
            'id_incidencia': estudiante.IdIncidenciaestudiantes,
        });

        incidencia_text.innerHTML += estudiante.describir_incidencia
        // incidenicias
            incidencias.push( estudiante.serie+"-" +estudiante.numero)
            detalleInvolucrados.innerHTML += `
                <tr>
                    <td>${estudiante.nombre_estudiante}</td>
                    <td>${estudiante.dni_estudiante}</td>
                    <td>${estudiante.grado_seccion}</td>
                </tr>
                
        `;
    });

    serie_numero_incidencia.innerHTML = incidencias;
    
    HELPER.modalInstance('modal-' + accion).show();

}
 
const atenderIncidenciaOpenModal = (row) => {

    let accion = 'save';
    let form = eView.querySelector('form[name="save"]');

    eView.querySelector('h5[name="' + accion + '"]').innerText = 'Atender Derivación';

    /** DATA */
    HELPER.reset_form($(form));

    let data = HELPER.get_attr_json(row);

    console.log

    let incidencia =  form.querySelector('div[name="incidencia"]')
    
    incidencia.innerHTML = data.describir_incidencia
    // form.querySelector('span[name="nombre_alumno"]').innerHTML = data.nombre_estudiante
    form.querySelector('span[name="usuario_nombre"]').innerHTML = data.usuario_nombre
    form.querySelector('span[name="serie_numero_incidencia"]').innerHTML = data.serie + '-' + data.numero;
    form.querySelector('input[name="fecha_abordaje"]').value = HELPER.fecha_actual();
    form.querySelector('input[name="hora_inicio_abordaje"]').value = HELPER.hora();
 
    descripcion_abordaje.setData(data.preguntas_abordaje)

    acuerdos_abordaje.setData('')
    privado_abordaje.setData('')

    id_incidencia = data.id;
    action_submit = accion;
    imagen_anterior = null
    
    let detalleInvolucrados = eView.querySelector('tbody[name="detalle-involucrados"]');

    detalleInvolucrados.innerHTML = `
            <tr>
            <td>${data.nombre_estudiante}</td>
            <td>${data.dni_estudiante}</td>
            <td>${data.grado_seccion}</td>
            <td>PRINCIPAL</td>
            </tr>
    `;

    if(data.estudiantesInvolucrados.length >=1){
        data.estudiantesInvolucrados.forEach(estudiantesInvolucrado => {
            detalleInvolucrados.innerHTML += `
                <tr>
                <td>${estudiantesInvolucrado.nombre_estudiante}</td>
                <td>${estudiantesInvolucrado.dni_estudiante}</td>
                <td>${estudiantesInvolucrado.grado_seccion}</td>
                <td>${estudiantesInvolucrado.etapa_incidencia_registro}</td>
                </tr>
            `;
        });
    }

    if(data.atencionIncidencia.length >= 1){
        data.atencionIncidencia.forEach(atencionIncidencia => {
            incidencia.innerHTML +=  `
                <span class="fs-5 fw-bold">Atención</span>`+
                atencionIncidencia.comentario_atencion_incidencia+`
            `;
            
        });
    };
    
    HELPER.modalInstance('modal-' + accion).show();

}

const rowAgregarAlumnosInvolucrados = async (data = null) => {

    let codigo = Math.random().toString(36).substr(2);

    if (data == null) {
        data = {
            id: '',
            id_area: '',
            id_usuario: ''
        };
    };

    var html = /*html*/`
                <div class="border-top border-3 p-2 rounded" bis_skin_checked="1" data-codigo="${codigo}">
                    <div class="row">
                        <div class="col-md-10">
                            <div class="form-group mb-3" bis_skin_checked="1">
                                <label for="inputProductTitle" class="form-label">Estudiante</label>
                                <select name="id_estudiante" data-select="ESTUDIANTE" class="form-select"
                                autocomplete="off"></select>
                            </div>
                        </div>
                        
                        <div class="col-md-2" bis_skin_checked="1">
                            <div class="form-group " style="margin-top:1.8rem !important"
                                bis_skin_checked="1">
                                <button type="button" name="delete-item"
                                    class="btn btn-warning btn-sm" data-codigo="${codigo}"><i
                                        class="fa fa-times"></i> Quitar Alumno</button>
                            </div>
                        </div>

                    </div>
                </div>
        `;

    DOM.find('div[name="detalle-alumnosInvolucrados"]').append(html);

    console.log(DOM.find('div[name="detalle-alumnosInvolucrados"]'))

    selectAlumnos();

    return codigo;
}

const selectAlumnos = async () => {
     
    DOM.find('select[data-select="ESTUDIANTE"]').select2({
        ajax: {
            url: BASE_API+'configuracion/estudiante/getSelect',
            dataType: 'json',
            delay: 250,
            data: function(params) {
            return {buscar:params.term};
            },
            processResults: function(data, params) {      
            return {results: data};
            },
            cache: true,
        },
        escapeMarkup: function(markup) {
            return markup;
        },
        placeholder: "APELLIDO Y NOMBRE - DNI - GRADO Y SECCIÓN",
        minimumInputLength: 3,
        allowClear: true,
        language: {
            inputTooShort: function () {
            return 'Digite mínimo 3 caracteres';
            }
        }
    });
    
}

const submit = function () {
    
    let ladda = HELPER.ladda(DOM_ID + ' form[name="' + action_submit + '"] button[type="submit"]');
 
    let formData = new FormData(document.querySelector(DOM_ID + ' form[name="' + action_submit + '"]'));
 
    formData.append('id_incidencia', id_incidencia);
    formData.append('descripcion', descripcion_abordaje.getData());
    formData.append('acuerdos', acuerdos_abordaje.getData());
    formData.append('privado', privado_abordaje.getData());

    formData.append('atenderAbordajeMasivaObj', JSON.stringify(atenderAbordajeMasivaObj));

    axios({
        method: 'post',
        url: BASE_API + 'operacion/IncidenciaAbordajeEstudiante/' + action_submit,
        data: formData
    })
        .then(function (response) {

            table.ajax.reload(null, false);

            HELPER.modalInstance('modal-' + action_submit).hide();

            HELPER.notificacion(response.data.mensaje, response.data.tipo);

            ladda.stop();

        }).catch(error => {

            HELPER.notificacion(error, "danger");

            ladda.stop();

        });
}

