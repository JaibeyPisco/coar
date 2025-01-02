import RolHTML from "./RolHTML.js";

let DOM, DOM_ID ;
let  id = null,
    action_submit = null,
    imagen_anterior =  null,
    table = null;

export default  function (d) {
        
        $('#main').off();

        d.innerHTML = RolHTML();

        after_render();
}

const after_render = () => {

        DOM_ID = '#main';
        DOM = $(DOM_ID);        

        /* SUBMIT SAVE */
        DOM.find('form[name="save"]').validate({

            /* REGLAS */
            rules: {
                nombre: { required: true }
            },

            messages: {
                nombre: 'Nombre'
            },

            submitHandler: function() {
                submit();
            }

        });

        /** SUBMIT DELETE */
        DOM.find('form[name="delete"]').validate({
            submitHandler: function() {
                 submit();
            }
        });

        /* NUEVO */
        DOM.on('click', 'button[name="nuevo"]', function(e) {
            e.stopImmediatePropagation();
            nuevo();
        });

        /* EDITAR */
        DOM.on('click', 'button[name="row-edit"]', function(e) {
            e.stopImmediatePropagation();
             edit($(this));
        });

        /* ELIMINAR */
        DOM.on('click', 'a[name="row-delete"]', function(e) {
            e.stopImmediatePropagation();
            eliminar($(this));
        });


        
        /* ALL VIEW SELECT */
        DOM.on('click', 'input[name="check_all"]', function(e) {
            e.stopImmediatePropagation();

            if($(this).is(':checked'))
            {
                DOM.find('input[name="'+this.value+'"]').prop('checked', true);
            }
            else
            {
                DOM.find('input[name="'+this.value+'"]').prop('checked', false);
            }            
        });

        datatable();

      //   
    }


    /************ */
    const select_all_permiso  =  function(value_permiso)
    {
        let flag_check = false;
        if($(this.el+' div[name="modal-save"]').find('input[name="m_'+value_permiso+'"]').is(':checked'))
        {
            flag_check = true;
        }

        $(this.el+' table[name="tabla-permiso"] tbody tr').each(function(){      
            $(this).find('input[name="'+value_permiso+'"]').prop('checked', flag_check);
        });
    }


    const  datatable =  function() {

        table = DOM.find('table[name="registros"]').DataTable({
            ajax:BASE_API + 'configuracion/rol',
         
            columns: [{
                    title: 'ACCIÓN',
                    defaultContent: ``,                    
                    render: function(data, type, row) {
                        var html = `
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
                { title: 'NOMBRE', mData: 'nombre' },
            ],
            createdRow: function(row, data, indice) {
                $(row).attr('data-json', JSON.stringify(data));
                $(row).find('td').eq(0).css('width', '10px');
            }
        });

    }



    const nuevo = function() {

        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h5[name="'+accion+'"]').text('Nuevo Rol');

        /** DATA */
        HELPER.reset_form(form);

        form.find('img[name="imagen"]').attr('src', BASE_FILES+'images/sin_imagen.jpg');

        id = null;
        action_submit = accion;
        imagen_anterior = null;

        HELPER.modalInstance("modal-" + accion).show();
    }

    const edit =  function(row) {
        
        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h5[name="'+accion+'"]').text('Modificar Rol');

        /** DATA */
        HELPER.reset_form(form);

        let data = HELPER.get_attr_json(row);

        form.find('input[name="nombre"]').val(data.nombre);
        form.find('input[name="fl_no_dashboard"]').prop('checked', parseInt(data.fl_no_dashboard));

        let tabla = DOM.find('tbody[name="tabla-permiso"]');

        data.permisos.forEach(row => {

            var fila = tabla.find('tr[data-menu="'+row.menu+'"]');

            if (row.view == 1) {
                fila.find('input[name="view"]').prop('checked', true);
            }

            if (row.new == 1) {
                fila.find('input[name="new"]').prop('checked', true);
            }

            if (row.edit == 1) {
                fila.find('input[name="edit"]').prop('checked', true);
            }

            if (row.delete == 1) {
                fila.find('input[name="delete"]').prop('checked', true);
            }
        });

        id = data.id;
        action_submit = accion;

        HELPER.modalInstance("modal-" + accion).show();
    }


   const eliminar =  function(row) {

        let accion = 'delete';
        let form = DOM.find('form[name="'+accion+'"]');

        DOM.find('h5[name="'+accion+'"]').text('Eliminar Rol');

        /** DATA */
        HELPER.reset_form(form);
        
        let data = HELPER.get_attr_json(row);

        form.find('div[name="texto"]').text(data.email);

         id = data.id;
        action_submit = accion;

       HELPER.modalInstance("modal-" + accion).show();
    }

const submit =  function() {

    let ladda = HELPER.ladda(DOM_ID+' form[name="' + action_submit + '"] button[type="submit"]');
    let formData = new FormData(document.querySelector(DOM_ID+' form[name="' + action_submit + '"]'));

    if (id != null) { formData.append('id', id); }


    var permisos = [];
    var index = 0;

    DOM.find('tbody[name="tabla-permiso"] tr').each(function(){
        if($(this).attr('data-menu') != undefined)
        {
            var view = false;
            if($(this).find('input[name="view"]').is(':checked'))
            {
                view = true;
            }

            var _new = false;
            if($(this).find('input[name="new"]').is(':checked'))
            {
                _new = true;
            }

            var edit = false;
            if($(this).find('input[name="edit"]').is(':checked'))
            {
                edit = true;
            }

            var _delete = false;
            if($(this).find('input[name="delete"]').is(':checked'))
            {
                _delete = true;
            }

            if(view === true || _new === true || edit === true || _delete === true)
            {
                permisos[index] = {
                    menu: $(this).attr('data-menu'),
                    view: view,
                    new: _new,
                    edit: edit,
                    delete: _delete,
                };

                index++;
            }


        }
    });

    if(permisos.length <= 0 && action_submit == 'save')
    {
        HELPER.notificacion('No ha seleccionado ningún módulo', 'warning');
        ladda.stop();
        return false;
    }

    formData.append('permisos', JSON.stringify(permisos));

    axios({
        method: 'post',
        url: BASE_API + 'configuracion/rol/' + action_submit,
        data: formData
    })
    .then(function(response) {
        if(response.data.tipo == "success"){
            table.ajax.reload(null, false);
            HELPER.modalInstance("modal-" + action_submit).hide();
            HELPER.notificacion(response.data.mensaje, response.data.tipo);
            ladda.stop();
        }else{
            HELPER.notificacion(response.data.mensaje, response.data.tipo);
            ladda.stop();
        }
    }).catch(error => {
        ladda.stop();
    });
}
