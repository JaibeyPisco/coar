import modalSave from './index.html.js';

let eData = {}, eView, eForm, callbackSubmit;


async function afterRender() {

    events();

    eData.id = null;
}


const events = async () => {

    eForm.addEventListener('submit', async (e) => {

        e.preventDefault();

        try {

            let ladda = HELPER.ladda('form[name="save-estado-monitoreo"] button[name="submit"]');

            let formData = new FormData(eForm);

            let color_bg = eView.querySelector('input[name="color_bg"]').value;

            formData.append('color_text', HELPER.isDark(color_bg));

            if (eData.id != null) {
                formData.append('id', eData.id);
            }
            axios({
                method: 'post',
                url: BASE_API + 'configuracion/estado_monitoreo/save',
                data: formData
            })
                .then(async (response) => {

                    HELPER.notificacion(response.data.mensaje, 'success');

                    callbackSubmit(response.data);

                    HELPER.modalInstance(eView, 'elemento').hide()

                    ladda.stop();

                }).catch(error => {
                console.log(error);
                ladda.stop();
            });


        } catch (error) {
            console.log(error);
        }

    });


}


const crear = () => {

    HELPER.reset_form(eForm);

    eView.querySelector('.modal-title').innerText = 'Nuevo Lugar';

    eData.id = null;

    modalShow();

}

const modalShow = () => {

    $(eView).modal('show');
}

const editar = (data) => {

    eData.id = data.id;

    eView.querySelector('input[name="nombre"]').value = data.nombre;

   let select = eView.querySelector('select[name="tipo"]');
   select.value = data.tipo;
    select.dispatchEvent(new Event('change', { bubbles: true }))

    eView.querySelector('input[name="color_bg"]').value = data.color_bg;

    $('#picker').farbtastic('#color');

    modalShow();
}


const cargar = async (element, callback, eName) => {

    callbackSubmit = callback;

    element.innerHTML = modalSave(eName);

    eView = element.querySelector(`div[name="modal-estado-monitoreo"]`);

    eForm = eView.querySelector(`form[name="save-estado-monitoreo"]`);

    eData.id = null;

    $('#picker').farbtastic('#color');

  await afterRender();
}


// Se exporta los modulos
export default {
    crear,
    editar,
    cargar
}
