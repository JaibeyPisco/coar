import PersonalHTML from "./PersonalHTML.js";
import modalSave from "./modalSave/index.js";
import modalDelete from "./modalDelete/index.js";
let DOM, DOM_ID, eView;

let 
    id = null,
    action_submit = null,
  
    table = null;

export default function (d) {

    $('#main').off();

    eView = d;

    eView.innerHTML = PersonalHTML

    modalSave.cargar({

        element: eView.querySelector('modal-personal-save'),
        
        callback: async (response) => {
            table.ajax.reload(null, false);
        },

        eName: 'personal-save'
    });

    console.log(eView.querySelector('modal-personal-delete'))

    modalDelete.cargar(eView.querySelector('modal-personal-delete'), function (response) {
        table.ajax.reload(null, false);
    })

    after_render();

}

const after_render = async () => {

    DOM_ID = '#main';
    
    DOM = $(DOM_ID);

    DOM.find('form[name="save"]').validate({
        rules: {
            id_tipo_personal: {required: true},
            codigo: {required: true},
            nombre: {required: true},
            apellido: {required: true},
            telefono: {required: true}
        },
      
        messages: {
            id_tipo_personal: 'Tipo de Personal',
            codigo: 'Codigo',
            nombre: 'Nombre',
            apellido: 'Apellidos',
            telefono: 'telefono'
        },

        submitHandler: function () {
            submit();
        }
    })

    /** SUBMIT DELETE */
    DOM.find('form[name="delete"]').validate({
        submitHandler: function() {
            submit();
        }
    });

    /* NUEVO */
    DOM.on('click', 'button[name="nuevo"]', function(e) {
        e.stopImmediatePropagation();
        // nuevo();
        modalSave.crear();
    });

    /* EDITAR */
    DOM.on('click', 'button[name="row-edit"]', function(e) {
        e.stopImmediatePropagation();
        edit($(this));
    });

    /* ELIMINAR */
    

    datatable();

    // await select_tipo_personal();

    let modal = eView.querySelector('div[name="modal-save"] div[class="modal-content"]');

    let select = DOM.find('select[name="id_tipo_personal"]');
    select.select2({
        dropdownParent: $(modal)
    });

};

const datatable = () => {

    table = DOM.find('table[name="registros"]').DataTable({
        ajax:BASE_API + 'configuracion/personal',
      
        columns: [{
                title: 'ACCIÓN',
                defaultContent: ``,

                render: function(data, type, row) {
                    var html = /*html*/`
                        <div class="btn-group" style="width:80px;">
                            <button type="button" class="btn btn-default btn-sm" name="row-edit"><i class="fadeIn animated bx bx-edit" style="color: #8e8e10; font-size: 20px;"></i></button>
                            <button type="button" class="btn btn-primary btn-primary-dark btn-sm split-bg-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"><span class="visually-hidden">Toggle Dropdown</span></button>
                            <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-end">	
                                <a class="dropdown-item" name="row-delete" href="javascript:;"><i class="fadeIn animated bx bx-trash" style="color: red; font-size: 18px;"></i> Eliminar</a>
                            </div>
                        </div>
                    `;
                    return html;
                },
                width: '100px',
            },
            { title: 'TIPO PERSONAL', mData: 'nombre_tipo_personal' },

            { title: 'NOMBRE', mData: 'nombre' },
            { title: 'APELLIDO', mData: 'apellido' },
            { title: 'DIRECCION', mData: 'direccion' },
            { title: 'TIPO CONTRATACION', mData: 'tipo_contratacion' },
            { title: 'ESTADO', render: function(data, type, row){
                if(row.estado == 1){
                    return '<small class="badge bg-success">ACTIVO</small>'
                }
                return  '<small class="badge bg-danger">ANULADO</small>'
            } },
            //{title: 'TELEFONO', mData: 'telefono' },
             
        ],
        createdRow: function(row, data, indice) {
            $(row).attr('data-json', JSON.stringify(data));
            $(row).find('td').eq(0).css('width', '10px');

            row.querySelector('button[name="row-edit"]').addEventListener('click', async (e) => {
                e.stopImmediatePropagation();
                modalSave.editar(data);
            })

            row.querySelector('a[name="row-delete"]').addEventListener('click', async (e) => {
                e.stopImmediatePropagation();
                modalDelete.show(data);
            })
        }
    });

};



const nuevo = async () => {

    let accion = 'save';
    let form = DOM.find('form[name="save"]');

    DOM.find('h5[name="'+accion+'"]').text('Nuevo Personal');

    /** DATA */
    HELPER.reset_form(form);

    id = null;
    action_submit = accion;
    
    DOM.find('tbody[name="detalle-cuenta_bancaria"').html('');
    HELPER.modalInstance('modal-' + accion).show();

};

const edit = (row) => {
    
    let accion = 'save';
    let form = DOM.find('form[name="save"]');

    DOM.find('h5[name="'+accion+'"]').text('Editar Personal');

    /** DATA */
    HELPER.reset_form(form);

    DOM.find('tbody[name="detalle-cuenta_bancaria"').html('');

    let data = HELPER.get_attr_json(row);

    form.find('select[name="id_tipo_personal"]').val(data.id_tipo_personal).change();
    //form.find('select[name="id_tipo_personal"]').val(data.tipo_personal).change();      
    form.find('input[name="codigo"]').val(data.codigo);
    form.find('input[name="nombre"]').val(data.nombre);
    form.find('input[name="apellido"]').val(data.apellido);
    form.find('input[name="telefono"]').val(data.telefono);
     
    id = data.id;
    action_submit = accion;

    HELPER.modalInstance('modal-' + accion).show();

};

// const eliminar = (row) => {
//     let accion = 'delete';

//     DOM.find('div[name="modal-'+accion+'"]').modal('hide');

//     let form = DOM.find('form[name="'+accion+'"]');

//     DOM.find('h5[name="'+accion+'"]').text('Eliminar Personal');

//     /** DATA */
//     HELPER.reset_form(form);
    
//     let data = HELPER.get_attr_json(row);

//     id = data.id;
//     action_submit = accion;

//     HELPER.modalInstance('modal-' + accion).show();
// };

const submit = () => {
    
    let ladda = HELPER.ladda(DOM_ID+' form[name="' + action_submit + '"] button[type="submit"]');
    let formData = new FormData(document.querySelector(DOM_ID+' form[name="' + action_submit + '"]'));

    if (id != null) { formData.append('id', id); }

    axios({
        method: 'post',
        url: BASE_API + 'configuracion/personal/' + action_submit,
        data: formData
    })
    .then(function(response) {
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
        ladda.stop();
    });
};