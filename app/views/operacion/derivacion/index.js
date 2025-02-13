import IncidenciaHTML from "../incidencia/index.html.js";

import modalFotos from "../incidencia/modalFotos/index.js";
import ModalMonitoreo from './monitoreo/index.js';
import modalDelete from "../incidencia/modalDelete/index.js";
import modalDerivar from "../incidencia/modalDerivar/index.js";
import modalFinalizar from "../incidencia/modalFinalizar/index.js";


let eForm, eData, eTable, eView;

const estados = {
    'ANULADO': 0,
    'ACTIVO': 1
}

const after_render = async () => {

   

    eView.querySelector('input[name="fecha_inicio"]').value = HELPER.primer_dia_mes();
    eView.querySelector('input[name="fecha_fin"]').value = HELPER.fecha_actual();
    
   await selectEstudiante();

   await  renderCompoment();

   events();

   datatable();
}

const renderCompoment = async () => {


    await modalFotos.load (
        eView.querySelector ('modal-fotos-component')
    );

    await ModalMonitoreo.cargar(
        eView.querySelector('modal-monitoreo'),

        function (response) {
            eTable.ajax.reload(null, false);
        }
 

    )

    modalDelete.cargar(
        eView.querySelector('modal-delete'),
        function() {
            eTable.ajax.reload(null, false);
        }
    )

    modalDerivar.cargar(
        eView.querySelector('modal-derivar'),
        function() {
            eTable.ajax.reload(null, false);
        }
    )
    modalFinalizar.cargar(
        eView.querySelector('modal-finalizar'),
        function() {
            eTable.ajax.reload(null, false);
        }
    )

}
const events = () => {

    eView.querySelector('button[name="update_datatable"]').addEventListener('click', function(e) {
        e.preventDefault();
 
        eTable.ajax.reload(null, false);
    })

} 
const  datatable = () => {

    eTable = $(eView).find('table[name="registros"]').DataTable({
        ajax:{
            url: BASE_API + 'operacion/derivacion',
            data: function (d) {
                d.fecha_inicio = eView.querySelector('input[name="fecha_inicio"]').value;
                d.fecha_fin = eView.querySelector('input[name="fecha_fin"]').value;
                d.id_estudiante = eView.querySelector('select[name="id_estudiante"]').value;
                d.tipo_busqueda = eView.querySelector('select[name="tipo_busqueda"]').value;
            }
        },



        columns: [
            { title: 'ID', mData : 'id', visible:false},
            {title: 'ACCIÓN',
                render: function(data, type, row) {
                    
                    let html = '';

                    
                        html = /*html*/`
                            <div class="btn-group" style="width:80px;">
                            
                               <button type="button" class="btn btn-success btn-sm" name="row-finalizar">Finalizar</button>
                                
                            </div>
                        `;
                     
                   

                    return html;
                },
            },
            { title: 'ESTUDIANTE', mData: 'estudiante' },

            { title: 'INCIDENCIA', mData: 'incidencia' },

            {
                title: 'ESTADOS', render: function (data, type, row) {
                    let html = '<div class="badge rounded-pill bg-black badge-sm"><i class="bx bxs-circle me-1"></i>'+row.estado+'</div>';

                    if (row.ultimo_monitoreo != null) {
                        html = '<div class="badge rounded-pill bg-primary badge-sm"><i class="bx bxs-circle me-1"></i>EN PROCESO</div>';

                    }

                    if (row.estado == 'FINALIZADO') {
                        html = '<div class="badge rounded-pill bg-success badge-sm"><i class="bx bxs-circle me-1"></i>FINALIZADO</div>';

                    }

                    if (row.estado == 'DERIVADO') {
                        html = '<div class="badge rounded-pill bg-danger badge-sm"><i class="bx bxs-circle me-1"></i>'+row.estado+'</div>';

                    }

                    return html;
                }
            },

            { title: 'MONITOREO', render: function(data, type, row){
                
                
                let color = {
                    bg: '#fff',
                    text: '#000',
                    estado: 'MONITOREAR'
                };

                if (row.ultimo_monitoreo != null) {
                    let data = JSON.parse(row.ultimo_monitoreo);

                    color = {
                        bg: data.color_bg,
                        text: data.color_text,
                        estado: data.estado
                    };

                }

 

                return `<button type="button" 
                name="monitorear"
                
                class="btn btn-default btn-sm" 
                style="padding-top: 0px!important;
                padding-bottom: 0px!important;
                padding-left: .75rem;
                padding-right: .75rem;
                line-height:0px!important;
                justify-content: center!important;
                align-items: center!important;
                border-radius: .25rem!important;
                height: 20px !important;
                background-color:` + color.bg + `; color:` + color.text + `" >${color.estado}</button>`;
  

        } },

       

            { title: 'DESCRIPCION', mData: 'descripcion' },
            { title: 'TIPO INCIDENCIA', mData: 'tipo_incidencia' },
            { title: 'LUGAR', mData: 'lugar_incidencia' },
            { title: 'FOTOS', render: function (data, type, row) {


                    if (row.cantidad_archivos.length > 0) {
                            return '<button type="button" class="btn btn-success  btn-sm" name="row-ver-fotos"><i class="lni lni-eye"></button>'
                        }

                    return  '';

                }
            },


        ],
        
        createdRow: function(row, data, dataIndex) {
            console.log(parseInt(data.fl_estado) == estados.ANULADO);

            if (parseInt(data.fl_estado) == estados.ANULADO) {
                $(row).css('text-decoration', 'line-through');
                $(row).css('color', 'red');
            }

            row.querySelector('button[name="row-ver-fotos"]').addEventListener('click', function() {

                modalFotos.show(data.id);
            })

            row.querySelector('button[name="monitorear"]').addEventListener('click', function(e){
                e.preventDefault();
                ModalMonitoreo.show(data);
            })

            let buttonDelete =  row.querySelector('a[name="row-delete"]');

            if(buttonDelete != null){
                buttonDelete.addEventListener('click', function(e){
                    e.preventDefault();
                    modalDelete.open(data);
                })
            }

            let buttonDerivar =  row.querySelector('button[name="row-derivar"]');

            if(buttonDerivar != null){
                buttonDerivar.addEventListener('click', function(e){
                    e.preventDefault();
                    modalDerivar.open(data);
                })
            }

            let buttonFinalizar =  row.querySelector('button[name="row-finalizar"]');

            if(buttonFinalizar != null){
                buttonFinalizar.addEventListener('click', function(e){
                    e.preventDefault();
                    modalFinalizar.open(data);
                })
            }

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
