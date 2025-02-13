

import indexHtml from "./index.html.js";

let eView, eTable, eForm, eData = {
    name: 'guiaTransportista-masivo'
}, callBackSubmit;

const crear = () => {

    HELPER.reset_form($(eForm));

    eView.querySelector('.modal-title').innerText = 'Nuevo Registro';


    eData.id = null;
    eData.method = 'post';

     if ($.fn.DataTable.isDataTable(eTable)) {
        eTable.ajax.reload();
    } else {
         loadTable();
     }

    $(eView).modal('show');

}


 const afterRender = async  () => {

    $(document).on('shown.bs.modal', function() {
        $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
    });


    $(document).on('change', 'input[name="fl_check_masivo_todo"]', function() {
        let isChecked = $(this).is(':checked');

        // Marcar o desmarcar todos los checkboxes de la tabla
        $('table[name="listar-estudiantes"] tbody input[type="checkbox"]').prop('checked', isChecked);
    });

    $(eView.querySelector('select[name="grado_seccion"]')).select2({
        dropdownParent: $(eView.querySelector('div[class="modal-content"]'))
    });


    eView.querySelector('select[name="grado_seccion"]').addEventListener('change', function (e) {
        e.preventDefault();

        alert('herer');
        eTable.ajax.reload(null, false);
    })

 }


 const loadTable = () => {

    eTable = $(`table[name="listar-estudiantes"]`).DataTable({
        ajax:{
            url:BASE_API + 'operacion/Incidencia_reporte/listStudents',
            data: function(d)
                {
                   d.grado_seccion = eView.querySelector('select[name="grado_seccion"]').value;
             }
         },

         buttons: [],
         scrollY: (window.innerHeight - 500) + "px",

         autoWidth: false,  // Desactiva el ancho automático para ocupar todo el espacio
         responsive: true,  // Habilita la respuesta dinámica en móviles
         scrollX: true,  // Agrega desplazamiento horizontal si es necesario

         columns: [

             {
                 title: '<input type="checkbox" name="fl_check_masivo_todo" />',
                 render: function(data, type, row){
                     return `<input type="checkbox" name="fl_check_masivo" data-id_orden="`+row.id_orden+`" />`;
                 },
                 orderable:false

             },
             { title: 'ESTADO', mData: 'dni' },
             { title: 'DNI', mData: 'dni' },
             { title: 'NOMBRE COMPLETO', mData: 'estudiante' },
             { title: 'GRADO Y SECCION', mData: 'grado_seccion' },
             { title: 'CORREO', mData: 'correo_electronico' },

         ],


     });

 }

const cargar = async  (element, callBack, eName) => {

    eData.name = eName;

    callBackSubmit = callBack;

    element.innerHTML = indexHtml(eData.name);

    eView = element.querySelector(`div[name='modal-reporte_incidencia']`);

    eForm = eView.querySelector(`form[name="save-reporte_incidencia"]`);

    await afterRender();

}

export default {

    cargar,

    crear,

}