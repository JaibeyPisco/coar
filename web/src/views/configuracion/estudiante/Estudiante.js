import CursoHTML from "./EstudianteHTML.js";


let DOM, DOM_ID, eView;

let
    id_estudiante = null,
    action_submit = null, 
    imagen_anterior = null,
    table = null,
    padre_id = null,
    madre_id = null,
    apoderado_rol_padre_madre_id = null;

export default async function (d) {

    $('#main').off();

    eView = d;
    eView.innerHTML = CursoHTML;

    await after_render();

}

const after_render = async () => {
    DOM_ID = '#main';
    DOM = $(DOM_ID);

    /** SUBMIT SAVE */
    DOM.find('form[name="save"]').validate({

        /* REGLAS */
        rules: {
            id_usuario: { required: true }
        },

        messages: {
            id_usuario: 'Usuario'
        },

        submitHandler: function () {
            submit();
        }

    });

    /** SUBMIT DELETE */
    DOM.find('form[name="delete"]').validate({
        submitHandler: function () {
            submit();
        }
    });

    /* NUEVO */
    DOM.on('click', 'button[name="nuevo"]', function (e) {
        e.stopImmediatePropagation();
        nuevo();
    });

    /* EDITAR */
    DOM.on('click', 'button[name="row-edit"]', function (e) {
        e.stopImmediatePropagation();
        edit($(this));
    });

    /* ELIMINAR */
    DOM.on('click', 'a[name="row-delete"]', function (e) {
        e.stopImmediatePropagation();
        eliminar($(this));
    });

    //Agregar una fila
    DOM.on('click', 'button[name="btnAgregarItem"]', function () {
        row_agregar_item()
    });
    //Eliminar una fila
    DOM.on('click', 'button[name="btnEliminarApoderado"]', function (e) {
        let codigo = $(this).parents('tr')[0].dataset.codigo;
        row_eliminar_item(codigo);
    });

    /* PREVIEW IMAGEN */
    DOM.find('input[name="foto"]').change(function(e) {
        e.stopImmediatePropagation();
        HELPER.preview_image(this, DOM.find('img[name="foto"]'));
    });

   
    
    //Agregar una fila en tabla equipo
    eView.querySelector('button[name="agregar_apoderado"]').addEventListener('click', function(){
        agregarApoderado();
    })
    eView.querySelector('button[name="btnModalImportar"]').addEventListener('click', function(){
        modalImportarEstudiantes();
    })

    eView.querySelector('button[name="regenerate_password"]').addEventListener('click', function(){
        regenerateCodigoEstudiante();
    })

      /** SUBMIT SAVE IMPORTACIÓN*/
    $(eView.querySelector('form[name="importarEstudiantes"]')).validate({
        submitHandler: function() {
            importarEstudiantes();
        }
    });

    datatable();

    await select_usuario();

}
 
const datatable = function () {

    table = DOM.find('table[name="registros"]').DataTable({
        ajax: BASE_API + 'configuracion/estudiante',
        
        columns: [
            {
                title: 'ACCIÓN',
                defaultContent: ``,
                render: function (data, type, row) {
                    var html = `
                    <div class="btn-group" style="width:80px;">
                        <button type="button" class="btn btn-default btn-sm" name="row-edit"><i class="fadeIn animated bx bx-edit" style="color: #8e8e10; font-size: 20px;"></i></button>
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

const regenerateCodigoEstudiante = () =>{
 
    var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var passwordLength = 12;
    var password = "";

    for (var i = 0; i <= passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber +1);
    
    }

    eView.querySelector('input[name="codigo_estudiante"]').value = password;
    

}
const nuevo = function () {

    // LIMPIAR TABLA 
    DOM.find('tbody[name="detalle_curso"] tr').remove();

    let accion = 'save';
    let form = DOM.find('form[name="save"]');

    DOM.find('h5[name="' + accion + '"]').text('Nuevo Estudiante');

    form.find('img[name="foto"]').attr('src', BASE_FILES+'images/sin_imagen.jpg');

    /** DATA */
    HELPER.reset_form(form);

    id_estudiante = null;
    action_submit = accion;
    apoderado_rol_padre_madre_id = null
    padre_id = null
    madre_id = null

    imagen_anterior = null;
 
    HELPER.modalInstance('modal-' + accion ).show()

}

const edit = function (row) {

    eView.querySelector('tbody[name="tabla_agregar_apoderado"').innerHTML = '';

    let accion = 'save';
    let form = eView.querySelector('form[name="save"]');

    eView.querySelector('h5[name="' + accion + '"]').innerText = 'Editar Alumno';

    HELPER.reset_form($(form));

    let data = HELPER.get_attr_json(row);

    form.querySelector('img[name="foto"]').src = BASE_FILES + 'images/' + data.foto;

    form.querySelector('input[name="apellidos_nombres"]').value = data.apellidos_nombres; 
    form.querySelector('textarea[name="obsv"]').value = data.obsv; 

    $(form.querySelector('select[name="grado"]')).val(data.grado).change();
    $(form.querySelector('select[name="seccion"]')).val(data.seccion).change();
    $(form.querySelector('select[name="sexo"]')).val(data.sexo).change();
    
    form.querySelector('input[name="dni"]').value = data.dni; 
    form.querySelector('input[name="correo_electronico"]').value = data.correo_electronico; 

    form.querySelector('input[name="fecha_nacimiento"]').value = data.fecha_nacimiento; 
    form.querySelector('input[name="codigo_estudiante"]').value = data.codigo_estudiante; 
    
    form.querySelector('input[name="lav"]').value = data.lav; 
    form.querySelector('input[name="llaves"]').value = data.llaves; 
    form.querySelector('input[name="pabellon"]').value = data.pabellon; 
    form.querySelector('input[name="ala"]').value = data.ala; 
    form.querySelector('input[name="banos"]').value = data.banos; 
    form.querySelector('input[name="monitor_acompana"]').value = data.monitor_acompana; 
    form.querySelector('input[name="cama_ropero"]').value = data.cama_ropero; 
    form.querySelector('input[name="duchas"]').value = data.duchas; 
    form.querySelector('input[name="urinarios"]').value = data.urinarios;
    
    form.querySelector('textarea[name="lugar_nacimiento"]').value = data.lugar_nacimiento; 
    form.querySelector('input[name="fecha_caducidad_dni"]').value = data.fecha_caducidad_dni; 
    form.querySelector('textarea[name="num_telefonico"]').value = data.num_telefonico; 
    form.querySelector('textarea[name="religion"]').value = data.religion; 
    form.querySelector('textarea[name="region_domicilio_actual"]').value = data.region_domicilio_actual; 
    form.querySelector('textarea[name="provincia_domicilio_actual"]').value = data.provincia_domicilio_actual; 
    form.querySelector('textarea[name="distrito_domicilio_actual"]').value = data.distrito_domicilio_actual; 
    form.querySelector('textarea[name="direccion_domicilio_actual"]').value = data.direccion_domicilio_actual; 
    form.querySelector('textarea[name="referencia_domicilio_actual"]').value = data.referencia_domicilio_actual; 

    $(eView.querySelector('input[name="madre_viva"]')).prop('checked', (data.madre_viva  == 1) ? true: false);
    $(eView.querySelector('input[name="madre_con_estudiante"]')).prop('checked', (data.madre_con_estudiante  == 1) ? true: false);
    form.querySelector('input[name="apellidos_nombres_madre"]').value = data.apellidos_nombres_madre;
    form.querySelector('input[name="dni_madre"]').value = data.dni_madre;
    form.querySelector('input[name="grado_instruccion_madre"]').value = data.grado_instruccion_madre;
    form.querySelector('input[name="num_celular_madre"]').value = data.num_celular_madre;
    form.querySelector('input[name="correo_electronico_madre"]').value = data.correo_electronico_madre;
    form.querySelector('input[name="ocupacion_actual_madre"]').value = data.ocupacion_actual_madre;
    form.querySelector('textarea[name="motivo_madre_no_vive_con_estudiante"]').value = data.motivo_madre_no_vive_con_estudiante; 

    $(eView.querySelector('input[name="padre_vivo"]')).prop('checked', (data.padre_vivo  == 1) ? true: false);
    $(eView.querySelector('input[name="padre_con_estudiante"]')).prop('checked', (data.padre_con_estudiante  == 1) ? true: false);

    form.querySelector('input[name="apellidos_nombres_padre"]').value = data.apellidos_nombres_padre;
    form.querySelector('input[name="dni_padre"]').value = data.dni_padre;
    form.querySelector('input[name="grado_instruccion_padre"]').value = data.grado_instruccion_padre;
    form.querySelector('input[name="num_celular_padre"]').value = data.num_celular_padre;
    form.querySelector('input[name="correo_electronico_padre"]').value = data.correo_electronico_padre;
    form.querySelector('input[name="ocupacion_actual_padre"]').value = data.ocupacion_actual_padre;
    form.querySelector('textarea[name="motivo_padre_no_vive_con_estudiante"]').value = data.motivo_padre_no_vive_con_estudiante; 

    form.querySelector('input[name="parentesco_con_apoderado"]').value = data.parentesco_con_apoderado;
    form.querySelector('input[name="apellidos_nombres_apoderado"]').value = data.apellidos_nombres_apoderado;
    form.querySelector('input[name="grado_instruccion_padre"]').value = data.grado_instruccion_padre;
    form.querySelector('input[name="dni_apoderado"]').value = data.dni_apoderado;
    form.querySelector('input[name="num_celular_apoderado"]').value = data.num_celular_apoderado;
    form.querySelector('input[name="tipo_familia"]').value = data.tipo_familia;

    id_estudiante = data.id_estudiante;
    action_submit = accion;
    imagen_anterior = data.foto;
    apoderado_rol_padre_madre_id = data.id_apoderado_rol_padre_madre;
    padre_id = data.id_datos_padre;
    madre_id = data.id_datos_madre;

    data.apoderados.forEach(apoderado =>{
        agregarApoderado(apoderado);
    });

    HELPER.modalInstance('modal-' + accion ).show()
} 

/*const eliminar = function (row) {

    let accion = 'delete';
    let form = DOM.find('form[name="' + accion + '"]');

    DOM.find('h5[name="' + accion + '"]').text('Eliminar Estudiante');

    HELPER.reset_form(form);

    let data = HELPER.get_attr_json(row);

    console.log(data);

    form.find('div[name="texto"]').text(data.email);

    id_estudiante = data.id_estudiante;
    action_submit = accion;

    HELPER.modalInstance('modal-' + accion).show();

}*/


const select_usuario = async () => {

    let select = DOM.find('select[name="id_usuario"]');

    await axios.get(BASE_API + 'configuracion/usuario/get_select')
        .then(function (response) {

            let html = '<option value="" disasabled>Selecione al usuario</option>';

            response.data.forEach(row => {
                html += '<option value="' + row.id + '">' + row.text + '</option>';
            });

            select.html(html);
            
            let modal = eView.querySelector('div[name="modal-save"] div[class="modal-content"]');

            select.select2({
                dropdownParent: $(modal)
            });
        }).catch(error => {
            console.log(error);
        });
}

const get_detalle_apoderado_json = (tipo) => {
    let array_data = [];

    DOM.find('tbody[name="tabla_agregar_apoderado"] tr').each(function () {

       
        array_data.push({
            id : $(this).find('input[data-name="id"]').val(),
            apellidos_nombres: $(this).find(`input[data-name="apellidos_nombres"]`).val(),
            dni: $(this).find(`input[data-name='dni']`).val(),
            numero_telefonico: $(this).find(`input[data-name="numero_telefonico"]`).val(),
            grado_parentesco: $(this).find(`input[data-name="grado_parentesco"]`).val(),
            legalizado: $(this).find('input[data-name="legalizado"]').is(':checked') ? 1 : 0
        });
    });

    return array_data;
}

const agregarApoderado = async (data = null, calEvent = null) => {

    let codigo = Math.random().toString(36).substr(2);

    if (data == null) {
        data = {
            id: '',
            apellidos_nombres: '',
            dni: '',
            numero_telefonico: '',
            grado_parentesco: '',
            legalizado: '',
        };
    }

    var html = `<tr data-codigo="${codigo }"> 
                    <td style="display:none;">
                        <input type="hidden" data-name="id" style="width:150px;" value="${data.id}"/>
                    </td>
                    <td>                           
                        <input type="text" class='form-control form-control-sm' value="${data.apellidos_nombres}" data-name='apellidos_nombres'>
                    </td>

                    <td>
                        <input type="text" class='form-control form-control-sm' value="${ data.dni }" data-name='dni'>
                    </td>

                    <td>
                        <input type="text" class='form-control form-control-sm' value="${ data.numero_telefonico }" data-name='numero_telefonico'>
                    </td>
                    <td>
                        <input type="text" class='form-control form-control-sm' value="${ data.grado_parentesco }" data-name='grado_parentesco'>
                    </td>
                    <td>
                        <div class="form-check form-switch" bis_skin_checked="1">
                            <input class="form-check-input" data-name="legalizado" type="checkbox" ${(data.legalizado == 1 ? 'checked' : '')}  >  
                        </div>

                    </td>

                    <td>
                        <button type="button" class="btn btn-danger btn-sm" name="btnEliminarApoderado"><i class="lni lni-close" style="font-size: 14px;"></i></button>
                    </td>
                </tr>

        `;
 

    DOM.find('tbody[name="tabla_agregar_apoderado"]').append(html);

    return codigo;
}

const row_eliminar_item = (codigo) => {
    DOM.find('tr[data-codigo="' + codigo + '"]').remove();
}

const submit = function () {

    let ladda = HELPER.ladda(DOM_ID + ' form[name="' + action_submit + '"] button[type="submit"]');
    let formData = new FormData(document.querySelector(DOM_ID + ' form[name="' + action_submit + '"]'));

    formData.append('apoderado', JSON.stringify(get_detalle_apoderado_json()));

    if (id_estudiante != null) { formData.append('id_estudiante', id_estudiante); }
    
    if (imagen_anterior != null) { formData.append('imagen_anterior', imagen_anterior); }
    if (padre_id != null) { formData.append('padre_id', padre_id); }

    if (madre_id != null) { formData.append('madre_id', madre_id); }
    if (apoderado_rol_padre_madre_id != null) { formData.append('apoderado_rol_padre_madre_id', apoderado_rol_padre_madre_id); }
    
    axios({
        method: 'post',
        url: BASE_API + 'configuracion/estudiante/' + action_submit,
        data: formData
    })
        .then(function (response) {
            DOM.find('div[name="modal-' + action_submit + '"]').modal('hide');
            table.ajax.reload(null, false);
            HELPER.notificacion(response.data.mensaje, response.data.tipo);
            ladda.stop();
        }).catch(error => {
            ladda.stop();
        });
}


// IMPORTACION DE ESTUDIANTES

const modalImportarEstudiantes = function () {

    let accion = 'importarEstudiantes';
    let form = eView.querySelector('form[name="importarEstudiantes"]');

    eView.querySelector('h5[name="' + accion + '"]').innerText = 'Exportar masivamente estudiantes';
 
    /** DATA */
    HELPER.reset_form($(form));

    action_submit = accion;
    
    HELPER.modalInstance('modal-' + accion ).show()

}

const importarEstudiantes = () =>{
    let ladda = HELPER.ladda(DOM_ID+' form[name="' + action_submit + '"] button[name="submit"]');
    let formData = new FormData(document.querySelector(DOM_ID+' form[name="' + action_submit + '"]'));

    axios({
        method: 'post',
        url: BASE_API + 'configuracion/estudiante/' + action_submit,
        data: formData
    })
    .then(function(response) { 
        table.ajax.reload(null, false);
        HELPER.modalInstance('modal-' + action_submit ).hide()
        
        HELPER.notificacion(response.data.mensaje, response.data.tipo);
        ladda.stop();
    }).catch(error => {
        ladda.stop();
    });
}
