import TipoPersonalHTML from "./index.html.js";
import modalDelete from "./modalDelete/index.js";
import modalSave from "./modalSave/index.js";

let DOM, DOM_ID, eView;

let 
    id = null,
    action_submit = null,
    imagen_anterior = null,
    fl_autoevento = true,
    array_areas = null,
    table = null;

export default function (d) {

    $('#main').off();
    eView = d;

    eView.innerHTML = TipoPersonalHTML;

    modalSave.cargar({

        element: eView.querySelector('modal-tipo-personal-save'),
        
        callback: async (response) => {
            table.ajax.reload(null, false);
        },

        eName: 'tipo-personal-save'
    });


    modalDelete.cargar({

        element: eView.querySelector('modal-tipo-personal-delete'),

        callback: async (response) => {
            table.ajax.reload(null, false);
        },

        eName: 'tipo-personal-delete'
    });


    after_render();

}

const after_render = async () => {

    DOM_ID = '#main';
    DOM = $(DOM_ID);

   
   
    /** SUBMIT DELETE */
    // DOM.find('form[name="delete"]').validate({
    //     submitHandler: function () {
    //         submit();
    //     }
    // });

    /* NUEVO */
    DOM.on('click', 'button[name="nuevo"]', function (e) {
        e.stopImmediatePropagation();
        // nuevo();
        modalSave.crear();
    });

    
    // /* ELIMINAR */
    // DOM.on('click', 'a[name="row-delete"]', function (e) {
    //     e.stopImmediatePropagation();
    //     eliminar($(this));
    // });
    
    
    datatable();

}
 
  
 
const datatable = function () {

    table = DOM.find('table[name="registros"]').DataTable({
        ajax: BASE_API + 'configuracion/tipo_personal',
     
        columns: [
            { title: 'ID', mData: 'id', visible: false },
            {
                title: 'ACCIÓN',
                defaultContent: ``,
                render: function (data, type, row) {

                     
                    var html = `
                        <div class="btn-group" style="width:80px;">
                            <button type="button" class="btn btn-default btn-sm" name="row-edit"><i class="fadeIn animated bx bx-edit" style="color: #8e8e10; font-size: 20px;"></i></button>
                            <button type="button" class="btn btn-primary btn-primary-dark btn-sm split-bg-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"><span class="visually-hidden">Toggle Dropdown</span></button>
                            <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-end">	
                                    <a class="dropdown-item" name="row-delete" href="javascript:"><i class="lni lni-trash text-danger"></i> Anular</a>
                            </div>
                        </div>
                    `;
                    return html;
                },
                width: '100px',
            },
            { title: 'NOMBRE PERSONAL', mData: 'nombre' },
            { title: 'DESCRIPCION PERSONAL', mData: 'descripcion' },
            { title: 'DESCRIPCION PERSONAL',render: function (data, type, row) {

                if(row.estado == 1){
                    return '<span class="badge bg-success">Activo</span>';
                }else{
                    return '<span class="badge bg-danger">Anulado</span>';
                }
                
                
            } }
            
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

                modalDelete.open(data);
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

    DOM.find('h5[name="' + accion + '"]').text('Eliminar Tipo de Personal');

    /** DATA */
    HELPER.reset_form(form);

    let data = HELPER.get_attr_json(row);

    form.find('div[name="texto"]').text(data.email);

    id = data.id;
    action_submit = accion;
 

    HELPER.modalInstance('modal-' + accion).show();
}

const submit = function () {

    let ladda = HELPER.ladda(DOM_ID + ' form[name="' + action_submit + '"] button[type="submit"]');
    let formData = new FormData(document.querySelector(DOM_ID + ' form[name="' + action_submit + '"]'));

    if (id != null) { formData.append('id', id); }

    axios({
        method: 'post',
        url: BASE_API + 'configuracion/tipoPersonal/' + action_submit,
        data: formData
    })
        .then(function (response) {
            if(response.data.tipo == "success"){
                table.ajax.reload(null, false);
                HELPER.modalInstance('modal-' + action_submit).hide();
                HELPER.notificacion(response.data.mensaje, response.data.tipo);
                ladda.stop();
            }else{
                HELPER.notificacion(response.data.mensaje, response.data.tipo);
                ladda.stop();
            }
        }).catch(error => {

            HELPER.notificacion(response.data.mensaje, response.data.tipo);

            ladda.stop();

        });
}

