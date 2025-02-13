import modalSave from './index.html.js';

let eData = {}, eView, eForm, callbackSubmit;


async function afterRender() {

    events();

    eData.id = null;
}


const events = () => {

    eForm.addEventListener('submit', async (e) => {

        e.preventDefault();

        try {


            let ladda = HELPER.ladda('form[name="save-lugar"] button[name="submit"]');

            let formData = new FormData(document.querySelector('form[name="save-lugar"]'));

            if (eData.id != null) {
                formData.append('id', eData.id);
            }

            axios({
                method: 'post',
                url: BASE_API + 'configuracion/lugar/save',
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
    eView.querySelector('input[name="referencia"]').value = data.referencia;

    modalShow();
}


const cargar = (element, callback, eName) => {

    callbackSubmit = callback;

    element.innerHTML = modalSave(eName);

    eView = element.querySelector(`div[name="modal-save-lugar"]`);

    eForm = eView.querySelector(`form[name="save-lugar"]`);

    eData.id = null;

    afterRender();
}


// Se exporta los modulos
export default {
    crear,
    editar,
    cargar
}
