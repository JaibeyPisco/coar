import modalSaveHTML from './index.html.js';

let eData = {}, eView, eForm, callbackSubmit;

const select_documento_entidad = async () => {
    let select = $(eView).find('select[data-select="DOCUMENTO_ENTIDAD"]');

    select.append($('<option></option>').attr('value', '').text('Seleccione...'));

    await axios.get(BASE_API + 'recursos/data_static/documento_entidad')
        .then(function (response) {
            response.data.forEach(row => {
                select.append('<option value="' + row.id + '">' + row.text + '</option>');
            });
        }).catch(error => {
            console.log(error);
        });
}


const select_tipo_personal = async () => {
    let select = $(eView).find('select[data-select="TIPO_PERSONAL"]');

    select.append($('<option></option>').attr('value', '').text('Seleccione...'));
    try {

        const data = (await axios.get(BASE_API + 'configuracion/tipo_personal/get_select')).data;

        data.forEach(row => {
            select.append('<option value="' + row.id + '">' + row.nombre + '</option>');
        });
    } catch (error) {
        console.log(error);
    }


}

const change_tipo_contratacion = () => {


    let value = $(eForm).find('select[name="tipo_contratacion"]').val();

    if (value == 'TERCERO') {

        $(eForm).find('select[name="id_proveedor"]').prop('disabled', false);
    } else {

        $(eForm).find('select[name="id_proveedor"]').prop('disabled', true);
    }
}


const select_ubigeo = async () => {
    let modal = eView.querySelector('div[name="modal-personal-save"] div[class="modal-content"]');

    $(eView).find('select[data-select="UBIGEO"]').select2({
        ajax: {
            url: BASE_API + 'recursos/data_static/ubigeo',
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
        placeholder: "Departamento - Provincia - Distrito",
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

const select_proveedor = async () => {

    let modal = eView.querySelector('div[name="modal-personal-save"] div[class="modal-content"]');

    $(eView).find('select[data-select="PROVEEDOR"]').select2({
        ajax: {
            url: BASE_API + 'configuracion/proveedor/get_select',
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
        placeholder: "Departamento - Provincia - Distrito",
        minimumInputLength: 3,
        allowClear: true,
        language: {
            inputTooShort: function () {
                return 'Digite mínimo 3 caracteres';
            }
        },
        dropdownParent: $(modal)



    });
}


const crear = () => {

    HELPER.reset_form(eForm);


    eView.querySelector('.modal-title').innerText = 'Nuevo Personal';
    eForm.querySelector('img[name="imagen"]').src = BASE_FILES+'images/sin_imagen.jpg';
    eForm.querySelector('img[name="imagen_firma"]').src = BASE_FILES+'images/sin_imagen.jpg';

    eData.id = null;

    eData.imagen_anterior = null;
    eData.firma_anterior = null;


    modalShow();

}


const modalShow = () => {
    $(eView).modal('show');
}

const editar = (data) => {

    eData.id = data.id;
    eData.imagen_anterior = data.imagen
    eData.firma_anterior = data.firma

    console.log(data);
    eForm.querySelector('img[name="imagen"]').src = BASE_FILES+'images/'+   data.imagen;
    eForm.querySelector('img[name="imagen_firma"]').src = BASE_FILES+'images/'+  data.firma;

    $(eForm).find('select[name="tipo_personal"]').val(data.id_tipo_personal).change();
    $(eForm).find('select[name="id_documento"]').val(data.id_tipo_documento).change();

    eForm.querySelector('input[name="numero_documento"]').value = data.numero_documento;
    eForm.querySelector('input[name="nombre"]').value = data.nombre;
    eForm.querySelector('input[name="apellido"]').value = data.apellido;

    eForm.querySelector('input[name="direccion"]').value = data.direccion;
    eForm.querySelector('input[name="comentario1"]').value = data.comentario;


    if (data.id_proveedor != null) {
        $(eForm).find('select[name="id_ubigeo"]').html('').append(new Option(data.proveedor, data.id_proveedor));
    }
    if (data.ubigeo != null) {
        $(eForm).find('select[name="id_ubigeo"]').html('').append(new Option(data.ubigeo, data.id_ubigeo));
    }


    modalShow();
}


async function afterRender() {

    eForm.addEventListener('submit', async (e) => {

        e.preventDefault();

        try {

            let ladda = HELPER.ladda('form[name="save-personal"] button[type="submit"]');

            let formData = new FormData(document.querySelector('form[name="save-personal"]'));

            if (eData.id != null) {
                formData.append('id', eData.id);
            }

            axios({
                method: 'post',
                url: BASE_API + 'configuracion/personal/save',
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


        } catch (error) {
            console.log(error);
        }

    });


    await select_documento_entidad();


    await select_ubigeo();
    await select_tipo_personal();
    await  select_proveedor();


    $(eView).find('input[name="imagen"]').change(function (e) {
        e.preventDefault();
        HELPER.preview_image(e.target, $(eForm).find('img[name="imagen"]'));
    });

    $(eView).find('input[name="imagen_firma"]').change(function (e) {
        e.preventDefault();
        HELPER.preview_image(e.target, $(eForm).find('img[name="imagen_firma"]'));
    });


    eView.querySelector('select[name="tipo_contratacion"]').addEventListener('change', function (e) {
        e.preventDefault();
        change_tipo_contratacion();
    });



}

const cargar = ({element, callback, eName}) => {

    callbackSubmit = callback;

    element.innerHTML = modalSaveHTML;
    if (eData.imagen_anterior != null) { formData.append('imagen_anterior', eData.imagen_anterior); }
    if (eData.firma_anterior != null) { formData.append('firma_anterior', eData.firma_anterior); }
    eView = element.querySelector(`div[name="modal-personal-save"]`);

    eForm = eView.querySelector(`form[name="save-personal"]`);


    eData.id = null;

    afterRender();
}

export default {
    cargar,
    crear,
    editar
}
