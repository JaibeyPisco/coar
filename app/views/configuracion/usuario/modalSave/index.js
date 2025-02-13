import  modalSave from "./index.html.js";

let eView = null;
let eForm = null;
let eData = {};
let callbackSubmit = null;

const crear = async  () =>{

    HELPER.reset_form(eForm);

    eData.id = null;
    eForm.querySelector('img[name="imagen"]').src = BASE_FILES+'images/sin_imagen.jpg';
    eView.querySelector('div[name="contenedor-personal"]').style.display = 'none';
    eView.querySelector('div[name="contenedor-cliente"]').style.display = 'none';

    HELPER.modalInstance(eView, 'elemento').show();

}

const editar = async  (data) =>{

    eView.querySelector('h5[name="save-usuario"]').innerText = 'Editar Usuario';

    /** DATA */
    HELPER.reset_form(eForm);

    eData.id = data.id;

    eForm.querySelector('input[name="email"]').value  = data.email;
    eForm.querySelector('input[name="usuario"]').value  = data.usuario;

    $(eForm).find('select[name="tipo_persona"]').val(data.tipo_persona).change();

    eForm.querySelector('input[name="nombre"]').value  = data.nombre;
    eForm.querySelector('input[name="apellido"]').value  = data.apellido;

    $(eForm).find('select[name="id_rol"]').val(data.id_rol).change();

    eForm.querySelector('img[name="imagen"]').src = BASE_FILES+'images/'+data.imagen;

    eForm.querySelector('input[name="clave"]').disabled = true;

    change_tipo_persona(data.tipo_persona);

    $(eForm).find('select[name="id_personal"]').val(data.id_personal).change();

    $(eForm).find('select[name="id_estudiante"]').html('');
    $(eForm).find('select[name="id_estudiante"]').append(new Option(data.estudiante, data.id_estudiante));


    HELPER.modalInstance(eView, 'elemento').show();

}

const select_personal = async  function()
{
    let select = $(eView).find('select[data-select="PERSONAL"]');

    select.append($('<option></option>').attr('value', '').text('Seleccione...'));

    const data =  (await axios.get(BASE_API+'configuracion/personal/get_select')).data

    const modal = eView.querySelector('div[class="modal-content"]');

    data.forEach(row => {
        select.append('<option value="'+row.id+'">'+row.text+'</option>');
    })


    select.select2({
        dropdownParent: $(modal),
    });


}

const select_estudiante = async  function()
{
    const modal = eView.querySelector('div[class="modal-content"]');

    $(eView).find('select[data-select="ESTUDIANTE"]').select2({
        ajax: {
            url: BASE_API + 'configuracion/estudiante/getSelect',
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {buscar: params.term};
            },
            processResults: function (data, params) {
                return {results: data};
            },
            cache: true,
        },
        escapeMarkup: function (markup) {
            return markup;
        },
        placeholder: "NOMBRES Y APELLIDOS || DNI",
        minimumInputLength: 3,
        allowClear: true,
        language: {
            inputTooShort: function () {
                return 'Digite mínimo 3 caracteres';
            }
        },
        dropdownParent: $(modal),



    });


}

const   select_rol = async  () =>
{
    let select = $(eView).find('select[data-select="rol"]');

    select.append($('<option></option>').attr('value', '').text('SUPER ADMINISTRADOR'));

    const data =  (await axios.get(BASE_API+'configuracion/rol/get_select')).data
    let modal = eView.querySelector('div[class="modal-content"]');
    data.forEach(row => {
        select.append('<option value="'+row.id+'">'+row.text+'</option>');
    });

    select.select2(
        {
            dropdownParent: $(modal)
        }
    );
    
}


const change_tipo_persona = async (tipo_persona) => {

    $(eView).find('div[name="contenedor-personal"]').hide('slide');
    $(eView).find('div[name="contenedor-cliente"]').hide('slide');

    $(eView).find('select[name="id_personal"]').prop('disabled', true);
    $(eView).find('select[name="id_cliente"]').prop('disabled', true);

    /** OCULTAR CAMPOS PARA DIGITAR NOMBRE Y APELLIDO */
    $(eView).find('input[name="nombre"]').prop('disabled', true);
    $(eView).find('input[name="apellido"]').prop('disabled', true);

    $(eView).find('div[name="contenedor-nombre"]').hide('slide');
    $(eView).find('div[data-no_cliente="true"]').show('slide');

    if (tipo_persona == 'DOCENTE') {
        // Mostrar y habilitar el contenedor y select correspondiente
        $(eView).find('div[name="contenedor-personal"]').show('slide');
        $(eView).find('select[name="id_personal"]').prop('disabled', false).attr('required', true);

        // Ocultar y deshabilitar otros campos
        $(eView).find('div[name="contenedor-cliente"], div[name="contenedor-nombre"]').hide('slide');
        $(eView).find('select[name="id_cliente"]').prop('disabled', true).removeAttr('required');
        $(eView).find('input[name="nombre"], input[name="apellido"]').prop('disabled', true).removeAttr('required');

    } else if (tipo_persona == 'ESTUDIANTE') {
        // Mostrar y habilitar el contenedor y select correspondiente
        $(eView).find('div[name="contenedor-cliente"]').show('slide');
        $(eView).find('select[name="id_cliente"]').prop('disabled', false).attr('required', true);
        $(eView).find('div[data-no_cliente="true"]').hide('slide');

        // Ocultar y deshabilitar otros campos
        $(eView).find('div[name="contenedor-personal"], div[name="contenedor-nombre"]').hide('slide');
        $(eView).find('select[name="id_personal"]').prop('disabled', true).removeAttr('required');
        $(eView).find('input[name="nombre"], input[name="apellido"]').prop('disabled', true).removeAttr('required');
    } else {
        // Mostrar y habilitar campos para digitar nombre y apellido
        $(eView).find('input[name="nombre"], input[name="apellido"]').prop('disabled', false).attr('required', true);
        $(eView).find('div[name="contenedor-nombre"]').show('slide');

        // Ocultar y deshabilitar otros campos
        $(eView).find('div[name="contenedor-personal"], div[name="contenedor-cliente"]').hide('slide');
        $(eView).find('select[name="id_personal"], select[name="id_cliente"]').prop('disabled', true).removeAttr('required');
    }

}

const events = () =>{

    eView.querySelector('select[name="tipo_persona"]').addEventListener('change', function (e) {
       change_tipo_persona(e.target.value);
    })

    eForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        submit(e)
    });
}


const submit = async () =>{

    let ladda = HELPER.ladda('form[name="save-usuario"] button[type="submit"]');

    let formData = new FormData(eForm);

    if (eData.id != null) {

        formData.append('id', eData.id);
    }

    axios({
        method: 'post',
        url: BASE_API + 'configuracion/usuario/save',
        data: formData
    })
        .then(async (response) => {

            HELPER.notificacion(response.data.mensaje, 'success');

            callbackSubmit(response.data);

            $(eView).modal('hide');

            ladda.stop();

        }).catch(error => {
        console.log(error);
        ladda.stop();
    });

}

const afterRender = async  () =>{
    await select_personal();
    await select_estudiante();
    await  select_rol();

    eView.querySelector('div[name="contenedor-personal"]').style.display = 'none';
    eView.querySelector('div[name="contenedor-cliente"]').style.display = 'none';

    events();

}

const cargar = async (domElement, callback) => {

    domElement.innerHTML = modalSave;

    callbackSubmit = callback;

    eView = domElement.querySelector('div[name="modal-save-usuario"]');
    eForm = eView.querySelector('form[name="save-usuario"]');

    await afterRender();
}
export  default  {
    cargar,
    crear,
    editar
}