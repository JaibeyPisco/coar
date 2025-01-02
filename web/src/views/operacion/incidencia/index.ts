import IncidenciaHTML from "./index.html.ts";

import modalFotos from "./modalFotos/index.ts";
import ModalMonitoreo from './monitoreo/index.js';

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

    await ModalMonitoreo.cargar(
        eView.querySelector('modal-monitoreo'),

        function (response) {
            eTable.ajax.reload(null, false);
        },

        modalFotos,

    )

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

            { title: 'ESTADOS', render: function(data, type, row){

                    return '<div class="badge rounded-pill text-primary bg-whg-primary p-2 text-uppercase px-3"><i class="bx bxs-circle me-1"></i>Iniciado</div>';
            } },

            { title: 'MONITOREO', render: function(data, type, row){
                
                return '<button type="button" class="btn btn-default btn-sm radius-30 px-4" name="monitorear">Monitorear </button>';

        } },

            { title: 'ESTUDIANTE', mData: 'estudiante' },

            { title: 'DESCRIPCION', mData: 'descripcion' },
            { title: 'FOTOS', render: function (data, type, row) {


                    if (row.cantidad_archivos.length > 0) {
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

            row.querySelector('button[name="monitorear"]').addEventListener('click', function(e){
                e.preventDefault();
                ModalMonitoreo.show(data);
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



export default function (d: HTMLElement) {
    //  $('#main').off();

    eView = d;

    eView.innerHTML = IncidenciaHTML



    after_render();

}
