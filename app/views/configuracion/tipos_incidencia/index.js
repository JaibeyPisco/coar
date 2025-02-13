import TiposIncidenciaHTML from "./index.html.js";
import  modalSave from "./modalSave/index.js";
import  modalDelete from "./modalDelete/index.js";

let DOM, DOM_ID, eView;

let 
    id = null,
    action_submit = null,
    table = null,
    editor = null;

export default function (d) {

    $('#main').off();
    eView = d;

    eView.innerHTML = TiposIncidenciaHTML

    after_render();

}

const after_render = async () => {

    DOM_ID = '#main';
    DOM = $(DOM_ID);


    await modalSave.cargar(
        eView.querySelector('modal-save-tipo-incidencia'),
        function () {
            table.ajax.reload(null, false);
        }
    );
    await modalDelete.cargar(
        eView.querySelector('modal-delete-tipo-incidencia'),
        function () {
            table.ajax.reload(null, false);
        }
    );

    eView.querySelector('button[name="nuevo"]').addEventListener('click', function (e) {
        modalSave.crear();
    })


    datatable();


}

const datatable = function () {

    table = DOM.find('table[name="registros"]').DataTable({
        ajax: BASE_API + 'configuracion/TiposIncidencias',
        
        columns: [
            { title: 'ID', mData: 'id', visible: false },
            {
                title: 'ACCIÓN',
                defaultContent: ``,
                render: function (data, type, row) {

                        return `
                        <div class="btn-group" style="width:80px;">
                            <button type="button" class="btn btn-default btn-sm" name="row-edit"><i class="fadeIn animated bx bx-edit" style="color: #8e8e10; font-size: 20px;"></i></button>
                            <button type="button" class="btn btn-primary btn-primary-dark btn-sm split-bg-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"><span class="visually-hidden">Toggle Dropdown</span></button>
                            <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-end">	
                                    <a class="dropdown-item" name="row-delete" href="javascript:"><i class="lni lni-trash text-danger"></i> Eliminar</a>
                            </div>
                        </div>
                    `;


                },
                width: '100px',
            },
         
            { title: 'NOMBRE  INCIDENCIA', mData: 'nombre' },
            { title: 'NIVEL  DE INCIDENCIA', mData: 'nivel_incidencia' },
        ],
        createdRow: function (row, data, indice) {
            $(row).attr('data-json', JSON.stringify(data));

            $(row).find('td').eq(0).css('width', '10px');

            row.querySelector('button[name="row-edit"]').addEventListener('click',function(e) {
                e.preventDefault();
                modalSave.editar(data);
            });

            row.querySelector('a[name="row-delete"]').addEventListener('click',function(e) {
                e.preventDefault();
                modalDelete.eliminar(data);
            });
        },

        order: [
            ['0', 'asc']
        ]
    });

}

const eliminar = function (row) {

    let accion = 'delete';
    let form = DOM.find('form[name="' + accion + '"]');

    DOM.find('h5[name="' + accion + '"]').text('Eliminar Tipo de incidencia');

    /** DATA */
    HELPER.reset_form(form);

    let data = HELPER.get_attr_json(row);

    form.find('div[name="texto"]').text(data.email);

    id = data.id;
    action_submit = accion;
 

    HELPER.modalInstance('modal-' + accion).show();
}

