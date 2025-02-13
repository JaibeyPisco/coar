import indexHtml from "./index.html.js";

let eView,eForm,  callbackSubmit;

const cargar = (element, callback) =>{
    element.innerHTML = indexHtml;
    callbackSubmit = callback;

    eView = element.querySelector('div[name="modal-importar"]');
    eForm = element.querySelector('form[name="save-importar"]');

    afterRender();
}

const afterRender = ()=>{
    eForm.addEventListener('submit', async (e) => {

        e.preventDefault();

        try {

            let ladda = HELPER.ladda('form[name="save-importar"] button[name="submit"]');

            let formData = new FormData(eForm);

            axios({
                method: 'post',
                url: BASE_API + 'configuracion/estudiante/save_importar',
                data: formData
            })
                .then(async (response) => {

                    HELPER.notificacion(response.data.mensaje, 'success');

                    callbackSubmit(response.data);

                    HELPER.modalInstance(eView, 'elemento').hide();

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

const show = ()=> {

    HELPER.reset_form(eForm);

    HELPER.modalInstance(eView, 'elemento').show();
}

export default {
    cargar,
    show
}
