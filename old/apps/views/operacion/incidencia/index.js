import IncidenciaHTML from "./index.html.js";
import modalFotos from "./modalFotos/index.js";


let eForm, eData, eTable, eView;

const after_render = async () => {

    datatable();

    eView.querySelector('input[name="fecha_inicio"]').value = HELPER.primer_dia_mes();
    eView.querySelector('input[name="fecha_fin"]').value = HELPER.fecha_actual();
   await selectEstudiante();

   await  renderCompoment();
}

const renderCompoment = async () => {
    await modalFotos.load (
        eView.querySelector ('modal-fotos-component')
    );

}

const  datatable = () => {

    eTable = $(eView).find('table[name="registros"]').DataTable({
        ajax:{
            url: BASE_API + 'operacion/Incidencia',
            data: function (d) {
                d.fecha_inicio = eView.querySelector('input[name="fecha_inicio"]').value;
                d.fecha_fin = eView.querySelector('input[name="fecha_fin"]').value;
                d.id_estudiante = eView.querySelector('select[name="id_estudiante"]').value;
            }
        },



        columns: [
            { title: 'ID', mData : 'id', visible:false},
            {title: 'ACCIÓN',
                render: function(data, type, row) {
                    let html = `
                                <div class="btn-group" style="width:80px;">
                                    <button type="button" class="btn btn-default  btn-sm" name="row-edit">EDITAR</button>
                                    <button type="button" class="btn btn-default btn-sm  dropdown-toggle dropdown-toggle-split " data-bs-toggle="dropdown"><span class="visually-hidden">Toggle Dropdown</span></button>
                                    <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-end">	
                                        <a class="dropdown-item" name="row-delete" href="javascript:;"><i class="fadeIn animated bx bx-trash" style="color: red; font-size: 18px;"></i> Eliminar</a>
                                    </div>
                                </div>
                            `;

                    return html;
                },
            },
            { title: 'INCIDENCIA', mData: 'incidencia' },
            { title: 'ESTUDIANTE', mData: 'estudiante' },
            { title: 'DESCRIPCION', mData: 'descripcion' },
            { title: 'FOTOS', render: function (data, type, row) {
                        console.log(row.cantidad_archivos > 0);

                    if (row.cantidad_archivos && row.cantidad_archivos.length > 0) {
                            return '<button type="button" class="btn btn-success  btn-sm" name="row-ver-fotos"><i class="lni lni-eye"></button>'
                        }

                        return  '';

                }
            },

        ],
        createdRow: function(row, data, dataIndex) {
            row.querySelector('button[name="row-ver-fotos"]').addEventListener('click', function() {
                modalFotos.show(data.id);
            })
        }
    });

}

const selectEstudiante = async () => {

    $(eView).find('select[data-select="ESTUDIANTE"]').select2({
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



export default function (d) {
    //  $('#main').off();

    eView = d;

    eView.innerHTML = IncidenciaHTML

    after_render();

}


//
// const after_render = async () => {
//
//     DOM_ID = '#main';
//     DOM = $(DOM_ID);
//
//     DOM.find('form[name="saveIncidenciaAtencion"]').validate({
//
//         submitHandler: function () {
//             submit();
//         }
//     });
//
//     DOM.on('click', 'button[name="row-seSoluciono"]', function (e) {
//         e.stopImmediatePropagation();
//         atenderIncidenciaIndividual($(this));
//     });
//
//
//
//     DOM.on('click', 'button[name="nuevo_item"]', function (e) {
//         e.stopImmediatePropagation();
//         rowAgregarAlumnosInvolucrados()
//     });
//
//     // Eliminar una fila en tabla areas
//     DOM.on('click', 'button[name="delete-item"]', function (e) {
//         let codigo = e.target.getAttribute('data-codigo');
//         eView.querySelector('div[data-codigo="' + codigo + '"]').remove();
//     })
//
//     /* VER DETALLE */
//     DOM.on('click', 'a[name="row-ver_reporte_incidencia"]', function (e) {
//         e.stopImmediatePropagation();
//         ver_detalle($(this));
//     });
//
//     eView.querySelector('button[name="atenderIncidenciaMasiva"]').addEventListener('click', function(){
//         btnAtenderIncidenciaMasiva();
//     });
//
//     habilitarDesabilitarCheckboxesIncidenciaDerivar()
//
//     comentario_atencion_incidencia = await ClassicEditor.create(eView.querySelector('div[name="comentario_atencion_incidencia"]'));
//
//     selectAlumnos();
//
//     /* DATATABLE UPDATE*/
//     DOM.on('click', 'button[name="update_datatable"]', function(e) {
//         e.stopImmediatePropagation();
//         table.ajax.reload(null, false);
//     });
//
//     DOM.find('input[name="fecha_inicio"]').val(HELPER.fecha_actual());
//     DOM.find('input[name="fecha_fin"]').val(HELPER.fecha_actual());
//
//     datatable();
// }
//
// const habilitarDesabilitarCheckboxesIncidenciaDerivar = () => {
//
//     const cerrarIncidenciaCheckbox = eView.querySelector('input[name="cerrar_incidencia"]');
//     const derivarCheckbox = eView.querySelector('input[name="derivar"]');
//
//     cerrarIncidenciaCheckbox.addEventListener('change', (e) => {
//         e.stopImmediatePropagation();
//         derivarCheckbox.disabled = e.target.checked;
//
//         if (!e.target.checked) {
//             derivarCheckbox.disabled = false;
//         }
//     });
//
//     derivarCheckbox.addEventListener('change', (e) => {
//         e.stopImmediatePropagation();
//         cerrarIncidenciaCheckbox.disabled = e.target.checked;
//
//         if (!e.target.checked) {
//             cerrarIncidenciaCheckbox.disabled = false;
//         }
//     });
//
// };
//
// const ver_detalle = async (row) => {
//
//     let data = HELPER.get_attr_json(row);
//
//     await getDatosEstudiantePorEstudiantePrincipalId(data.id_estudiante_principal);
//
//     await getIndicenciaAtencionPorIndicenciaEstudianteId(data.id);
//
//     await getIndicenciaAbordajePorIndicenciaEstudianteId(data.id);
//
//     viewGuia(datos_estudiante, data, datos_incidencia_atencion, datos_incidencia_abordaje, 'modal-view-guia', eView);
//
// };
//
// const getDatosEstudiantePorEstudiantePrincipalId = async (id_estudiante_principal) => {
//
//     await axios.get(BASE_API + 'operacion/incidenciaestudiante/getEstudiantePorEstudiantePrincipalId?id_estudiante_principal=' + id_estudiante_principal)
//         .then(function (response) {
//
//             datos_estudiante = response.data;
//
//         }).catch(error => {
//             console.log(error);
//         });
//
// };
//
// const getIndicenciaAtencionPorIndicenciaEstudianteId = async (id_incidencia_estudiante) => {
//
//     await axios.get(BASE_API + 'operacion/incidenciaestudiante/getIndicenciaAtencionPorIndicenciaEstudianteId?id_incidencia_estudiante=' + id_incidencia_estudiante)
//         .then(function (response) {
//
//             datos_incidencia_atencion = response.data;
//
//         }).catch(error => {
//             console.log(error);
//         });
//
// };
//
// const getIndicenciaAbordajePorIndicenciaEstudianteId = async (id_incidencia_estudiante) => {
//
//     await axios.get(BASE_API + 'operacion/incidenciaabordajeestudiante/getIndicenciaAbordadaPorIndicenciaEstudianteId?id_incidencia_estudiante=' + id_incidencia_estudiante)
//         .then(function (response) {
//
//             datos_incidencia_abordaje = response.data;
//
//         }).catch(error => {
//             console.log(error);
//         });
//
// };
//
// const datatable = function () {
//
//     table = DOM.find('table[name="registros"]').DataTable({
//         ajax: {
//             url: BASE_API + 'operacion/incidenciaestudiante',
//             data: function (d) {
//                 d.fecha_inicio = DOM.find('input[name="fecha_inicio"]').val();
//                 d.fecha_fin = DOM.find('input[name="fecha_fin"]').val();
//                 d.id_estudiante = DOM.find('select[name="id_estudiante"]').val();
//             }
//         },
//         lengthChange: false,
//         paginate: true,
//         pageLength: 10,
//         scrollY: 'auto',
//         scrollMaxHeight: '500px',
//         columns: [
//             { title: 'ID', mData: 'IdIncidenciaestudiantes', visible: false },
//             {
//                 title: '<input type="checkbox" data-name="checkAllItem" />',
//                 render: function(data, type, row) {
//                    let atenderIncidencia= '';
//                     if (GLOBAL.usuario.encargado_atender_incidencias == 1) {
//
//                         if (row.incidencia_cerrada === '1' || row.incidencia_derivada === '1' || row.se_soluciono === '1' || row.necesita_abordaje_directa === '1') {
//                             atenderIncidencia  = '';
//                         } else{
//                             atenderIncidencia = '<input type="checkbox" data-name="checkItem" />';
//                         }
//                     } else {
//                         atenderIncidencia =  ''; // No mostrar el checkbox si no se cumple la condición
//                     }
//
//                     return atenderIncidencia
//
//                 },
//                 width: '10px', class:'text-center'
//             },
//             {
//                 title: 'ACCIÓN',
//                 defaultContent: ``,
//                 render: function (data, type, row) {
//
//                     let atenderIncidencia = '';
//
//                     if(GLOBAL.usuario.encargado_atender_incidencias == 1){
//                         if (row.incidencia_cerrada === '1' || row.se_soluciono === '1' || row.incidencia_derivada === '1' || row.necesita_abordaje_directa === '1') {
//                             atenderIncidencia  = /*html*/`
//                                 <div class="btn-group" style="width: 40px;">
//                                     <button type="button" class="btn btn-primary btn-primary-dark btn-sm split-bg-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"><span class="visually-hidden">Toggle Dropdown</span></button>
//                                     <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-end">
//                                         <a class="dropdown-item" name="row-ver_reporte_incidencia" href="javascript:;"><i class="lni lni-eye" style="color: #8e8e10; font-size: 20px;"></i> Ver Detalle</a>
//                                     </div>
//                                 </div>
//                             `;
//                         } else{
//                             atenderIncidencia = /*html*/`
//                                 <div class="btn-group" style="width: 80px;">
//                                     <button type="button" class="btn btn-default btn-sm" name="row-seSoluciono"><i class="fadeIn animated bx bx-edit" style="color: #8e8e10; font-size: 20px;"></i> Atender</button>
//                                     <button type="button" class="btn btn-primary btn-primary-dark btn-sm split-bg-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"><span class="visually-hidden">Toggle Dropdown</span></button>
//                                     <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-end">
//                                         <a class="dropdown-item" name="row-ver_reporte_incidencia" href="javascript:;"><i class="lni lni-eye" style="color: #8e8e10; font-size: 20px;"></i> Ver Detalle</a>
//                                     </div>
//                                 </div>
//                             `;
//                         }
//                     }else{
//                         atenderIncidencia = /*html*/`
//                             <div class="btn-group" style="width: 40px;">
//                                 <button type="button" class="btn btn-primary btn-primary-dark btn-sm split-bg-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"><span class="visually-hidden">Toggle Dropdown</span></button>
//                                 <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-end">
//                                     <a class="dropdown-item" name="row-ver_reporte_incidencia" href="javascript:;"><i class="lni lni-eye" style="color: #8e8e10; font-size: 20px;"></i> Ver Detalle</a>
//                                 </div>
//                             </div>
//                         `;
//                     }
//
//                     return atenderIncidencia;
//                 },
//                 width: '100px'
//             },
//             {
//                 title: 'ESTADO', render: function (data, type, row) {
//                     let html ='';
//
//                     if (row.necesita_abordaje_directa === "1") {
//                         html = '<div class="badge rounded-pill text-primary bg-light-primary p-2 text-uppercase px-3"><i class="bx bxs-circle me-1"></i>ESPERA DE ABORDAJE</div>';
//                     }else if(row.se_soluciono == "1"){
//                         html = '<div class="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3"><i class="bx bxs-circle me-1"></i>SOLUCIONADO</div>';
//                     }else if(row.incidencia_derivada == "1"){
//                         html = '<div class="badge rounded-pill text-primary bg-light-primary p-2 text-uppercase px-3"><i class="bx bxs-circle me-1"></i>ESPERA DE ABORDAJE</div>';
//                     }else if(row.incidencia_cerrada == "1"){
//                         html = '<div class="badge rounded-pill text-dark bg-light-dark p-2 text-uppercase px-3"><i class="bx bxs-circle me-1"></i>CERRADO</div>';
//                     }else{
//                         html = '<div class="badge rounded-pill text-warning bg-light-warning p-2 text-uppercase px-3"><i class="bx bxs-circle me-1"></i>PENDIENTE</div>';
//                     }
//                     return html;
//
//                 }
//             },
//             {
//                 title: 'N° INCIDENCIA', render: (data, type, row) => {
//                     return row.serie + '-' + row.numero
//                 }
//             },
//             {
//                 title: 'ESTUDIANTE', render: function (data, type, row) {
//                     return row.nombre_estudiante + '| DNI ' + row.dni_estudiante + ' | ' + row.grado_seccion ;
//                 }
//             },
//             { title: 'TIPO INCIDENCIA', mData: 'nombre_incidencia' }
//         ],
//         createdRow: function (row, data, indice) {
//             $(row).attr('data-json', JSON.stringify(data));
//             $(row).find('td').eq(0).css('width', '10px');
//         },
//         drawCallback:function(){
//             eView.querySelector('input[data-name="checkAllItem"]').addEventListener('change', function(){
//
//                 eView.querySelectorAll('input[data-name="checkItem"]').forEach(input => {
//                     input.checked = this.checked;
//                 });
//
//             });
//         },
//         order: [
//             ['0', 'asc']
//         ]
//     });
// }
//
// const btnAtenderIncidenciaMasiva = () =>{
//
//     let arraySeleccionados = [];
//
//     eView.querySelectorAll('table[name="registros"] tbody tr').forEach(tr => {
//
//
//         if (tr.querySelector('input[type="checkbox"]')) {
//             if (tr.querySelector('input[type="checkbox"]').checked) {
//                 let dataItem = JSON.parse(tr.getAttribute('data-json'));
//                 arraySeleccionados.push(dataItem);
//             }
//         }
//     });
//
//     if(arraySeleccionados.length == 0){
//         HELPER.notificacion('No existen cuentas por pagar seleccioandas', 'info');
//         return false;
//     }
//
//     atenderIncidenciaMasiva (arraySeleccionados);
//
//
//
//     // cancelarCuotas.setPagar(arraySeleccionados);
//
// }
//
// const atenderIncidenciaMasiva = (data) =>{
//
//
//
//
//     let detalleInvolucrados = eView.querySelector('tbody[name="detalle-involucrados"]');
//     detalleInvolucrados.innerHTML = ''
//
//
//     let form = eView.querySelector('form[name="saveIncidenciaAtencion"]');
//     const incidenicias = [];
//     atenderIncidenciaMasivaObj = [];
//
//
//     eView.querySelector('h4[name="saveIncidenciaAtencion"]').innerText = 'Atender incidencia Masiva';
//
//     let describir_incidencia = form.querySelector('div[name="incidencia"]');
//
//     describir_incidencia.innerHTML = '';
//     comentario_atencion_incidencia.setData('')
//
//
//
//     data.forEach(estudiante => {
//
//         atenderIncidenciaMasivaObj.push({
//             'id_incidencia': estudiante.IdIncidenciaestudiantes,
//         });
//
//        describir_incidencia.innerHTML += estudiante.describir_incidencia
//         // incidenicias
//         incidenicias.push( estudiante.serie+"-" +estudiante.numero)
//
//         detalleInvolucrados.innerHTML += `
//             <tr>
//                 <td>${estudiante.nombre_estudiante}</td>
//                 <td>${estudiante.dni_estudiante}</td>
//                 <td>${estudiante.grado_seccion}</td>
//             </tr>
//
//         `;
//     });
//
//     action_submit = 'saveIncidenciaAtencion';
//
//     form.querySelector('div[data-name="contenedor-serie"]').style.display='none';
//     form.querySelector('div[data-name="incidenciasMasviasSeries"]').innerHTML = 'Incidencias ' +incidenicias;
//
//     HELPER.modalInstance('modal-saveIncidenciaAtencion').show();
// }
//
// const atenderIncidenciaIndividual = (row) => {
//
//     let accion = 'saveIncidenciaAtencion';
//
//     let form = eView.querySelector('form[name="saveIncidenciaAtencion"]');
//
//     eView.querySelector('h4[name="' + accion + '"]').innerText = 'Atender incidencia';
//
//     /** DATA */
//     HELPER.reset_form($(form));
//
//     let data = HELPER.get_attr_json(row);
//
//     form.querySelector('div[name="incidencia"]').innerHTML = data.describir_incidencia
//     form.querySelector('input[name="usuario_nombre"]').value = data.usuario_nombre
//     form.querySelector('input[name="serie_numero_incidencia"]').value = data.serie + '-' + data.numero;
//     form.querySelector('input[name="fecha_hora"]').value = HELPER.fecha_hora(data.fecha);
//     let detalleInvolucrados = eView.querySelector('tbody[name="detalle-involucrados"]');
//
//
//     detalleInvolucrados.innerHTML = `
//         <tr>
//             <td>${data.nombre_estudiante}</td>
//             <td>${data.dni_estudiante}</td>
//             <td>${data.grado_seccion}</td>
//         </tr>
//
//     `;
//     comentario_atencion_incidencia.setData('')
//
//     id = data.IdIncidenciaestudiantes;
//     action_submit = accion;
//     imagen_anterior = null;
//
//     HELPER.modalInstance('modal-' + accion).show();
// }
//
// const rowAgregarAlumnosInvolucrados = async (data = null) => {
//
//     let codigo = Math.random().toString(36).substr(2);
//
//     if (data == null) {
//         data = {
//             id: '',
//             id_area: '',
//             id_usuario: ''
//         };
//     };
//
//     var html = /*html*/`
//             <div class="border-top border-3 p-2 rounded" bis_skin_checked="1" data-codigo="${codigo}">
//                 <div class="row">
//                     <div class="col-md-10">
//                         <select name="id_estudiante" data-select="ESTUDIANTE" class="form-select"
//                             autocomplete="off"></select>
//                     </div>
//
//                     <div class="col-md-2" bis_skin_checked="1">
//                         <button type="button" name="delete-item" class="btn btn-warning btn-sm" data-codigo="${codigo}"><i class="fa fa-times"></i> Quitar</button>
//                     </div>
//                 </div>
//             </div>
//         `;
//
//     DOM.find('div[name="detalle-alumnosInvolucrados"]').append(html);
//
//     console.log(DOM.find('div[name="detalle-alumnosInvolucrados"]'))
//
//     selectAlumnos();
//
//     return codigo;
// }
//
// const getEstudiantesInvolucradosData = () => {
//
//     let arrayData = [];
//
//     eView.querySelectorAll('div[name="detalle-alumnosInvolucrados"] > div').forEach((elem) => {
//         let data = {
//             'id_estudiante': elem.querySelector('select[name="id_estudiante"]').value,
//         }
//         arrayData.push(data);
//     })
//
//     return arrayData;
//
// }
//
// const selectAlumnos = async () => {
//
//     console.log(GLOBAL.usuario.encargado_atender_incidencias);
//
//     DOM.find('select[data-select="ESTUDIANTE"]').select2({
//         ajax: {
//             url: BASE_API+'configuracion/estudiante/getSelect',
//             dataType: 'json',
//             delay: 250,
//             data: function(params) {
//             return {buscar:params.term};
//             },
//             processResults: function(data, params) {
//             return {results: data};
//             },
//             cache: true,
//         },
//         escapeMarkup: function(markup) {
//             return markup;
//         },
//         placeholder: "APELLIDO Y NOMBRE - DNI - GRADO Y SECCIÓN",
//         minimumInputLength: 3,
//         allowClear: true,
//         language: {
//             inputTooShort: function () {
//             return 'Digite mínimo 3 caracteres';
//             }
//         }
//     });
//
// }
//
// const submit = function () {
//
//     console.log(DOM_ID + ' form[name="' + action_submit + '"] button[type="submit"]');
//
//     let ladda = HELPER.ladda(DOM_ID + ' form[name="' + action_submit + '"] button[type="submit"]');
//
//     let formData = new FormData(document.querySelector(DOM_ID + ' form[name="' + action_submit + '"]'));
//
//     formData.append('id_incidencia', id);
//
//     // var existenInvolucradosCheckbox = eView.querySelector('input[name="existen_involucrados"]');
//
//     // if (existenInvolucradosCheckbox.checked) {
//
//     //     if (getEstudiantesInvolucradosData().length < 1) {
//     //         HELPER.notificacion('Debes agregar al menos un involucrado, caso contrario desactiva ¿Existen involucrados?', 'warning');
//     //         ladda.stop();
//     //         return;
//
//     //     }
//     // }
//
//
//     formData.append('atenderIncidenciaMasivaObj', JSON.stringify(atenderIncidenciaMasivaObj));
//
//
//     formData.append('comentario_atencion_incidencia', comentario_atencion_incidencia.getData());
//     // formData.append('estudiantesInvolucrados', JSON.stringify(getEstudiantesInvolucradosData()));
//
//     axios({
//         method: 'post',
//         url: BASE_API + 'operacion/IncidenciaEstudiante/' + action_submit,
//         data: formData
//     })
//         .then(function (response) {
//
//             table.ajax.reload(null, false);
//
//             HELPER.modalInstance('modal-' + action_submit).hide();
//
//             HELPER.notificacion(response.data.mensaje, response.data.tipo);
//
//             ladda.stop();
//
//         }).catch(error => {
//
//             HELPER.notificacion(response.data.mensaje, response.data.tipo);
//
//             ladda.stop();
//
//         });
// }

