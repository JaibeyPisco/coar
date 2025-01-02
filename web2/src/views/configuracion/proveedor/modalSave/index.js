import modalSaveHTML from './index.html.js';

// Elementos y datos globales
let eView, callbackSubmit, eForm, eData = {};

const modalShow = () => {
    $(eView).modal('show');
};


const crear = () => {
    resetFormulario();

    setModalTitle('Nuevo Proveedor');

    eForm.querySelector('img[name="imagen"]').src = BASE_FILES+'images/sin_imagen.jpg';

    eData.id = null;
    eData.imagen_anterior = null;

    modalShow();
};


const editar = (data) => {

    resetFormulario();

    setModalTitle('Editar Proveedor');
    eData = data;

    eView.querySelector('select[name="id_documento"]').value = eData.id_documento;
    eView.querySelector('select[name="id_documento"]').dispatchEvent(new Event('change'));

    eForm.querySelector('input[name="numero_documento"]').value = eData.numero_documento;
    eForm.querySelector('input[name="razon_social"]').value = eData.razon_social;
    eForm.querySelector('input[name="direccion"]').value = eData.direccion;
    eForm.querySelector('input[name="contacto_nombre"]').value = eData.contacto_nombre;
    eForm.querySelector('input[name="contacto_celular"]').value = eData.telefono;

    eForm.querySelector('img[name="imagen"]').src = BASE_FILES + 'images/' + eData.imagen;

    eData.imagen_anterior = eData.imagen;

    if (data.id_ubigeo != null) {
        $(eForm).find('select[name="id_ubigeo"]').html('').append(new Option(eData.ubigeo, eData.id_ubigeo));
    }

    modalShow();
};


const afterRender = async function () {
    await cargarSelects();

    eView.addEventListener('submit', async function (e) {
        e.preventDefault();
        try {
            let ladda = HELPER.ladda('form[name="save-proveedor"] button[type="submit"]');

            let formData = new FormData(eForm);

            if (eData.id !== null) formData.append('id', eData.id);
            if (eData.imagen_anterior != null) { formData.append('imagen_anterior', eData.imagen_anterior); }

            await axios.post(`${BASE_API}configuracion/proveedor/save`, formData)
                .then(response => {

                    HELPER.notificacion(response.data.mensaje, 'success');

                    callbackSubmit(response.data);

                    $(eView).modal('hide');
                })
                .catch(console.error)
                .finally(() => ladda.stop());
        } catch (error) {
            console.error(error);
        }

    })

    $(eView).find('input[name="imagen"]').change(function (e) {
        e.preventDefault();

        HELPER.preview_image(e.target, $(eForm).find('img[name="imagen"]'));
    });
};


const cargarSelects = async () => {
    await cargarSelectDocumentoEntidad();
    configurarSelectUbigeo();
};


const cargarSelectDocumentoEntidad = async () => {

    const select = $(eView).find('select[data-select="DOCUMENTO_ENTIDAD"]');
    select.append($('<option></option>').attr('value', '').text('Seleccione...'));

    await axios.get(`${BASE_API}recursos/data_static/documento_entidad`)
        .then(response => {
            response.data.forEach(row => {
                select.append(`<option value="${row.id}">${row.text}</option>`);
            });
        })
        .catch(console.error);
};


const configurarSelectUbigeo = () => {

    const modal = eView.querySelector('div[name="modal-save-proveedor"] div[class="modal-content"]');

    $(eView).find('select[data-select="UBIGEO"]').select2({
        ajax: {
            url: `${BASE_API}recursos/data_static/ubigeo`,
            dataType: 'json',
            delay: 250,
            data: params => ({buscar: params.term}),
            processResults: data => ({results: data}),
            cache: true,
        },
        escapeMarkup: markup => markup,
        placeholder: "Departamento - Provincia - Distrito",
        minimumInputLength: 3,
        allowClear: true,
        language: {
            inputTooShort: () => 'Digite mínimo 3 caracteres',
        },
        dropdownParent: $(modal),

    });
};


const resetFormulario = () => {
    HELPER.reset_form(eForm);
};


const setModalTitle = (title) => {
    eView.querySelector('.modal-title').innerText = title;
};


const cargar = (domElement, callback) => {

    callbackSubmit = callback;
    domElement.innerHTML = modalSaveHTML;

    eView = domElement.querySelector('div[name="modal-save-proveedor"]');
    eForm = eView.querySelector('form[name="save-proveedor"]');

    eData.id = null;

    afterRender();
};

// Exportar funciones principales
export default {
    cargar,
    crear,
    editar,
};
