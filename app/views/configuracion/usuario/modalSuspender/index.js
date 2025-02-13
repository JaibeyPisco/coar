import modalChangePassword from './index.html.js';


let callbackSubmit;
let eView = null;
let eForm = null;
let eData = {};
const crear = (data)=>{

    HELPER.reset_form(eForm);

    eData.id = data.id;

    eForm.querySelector('input[name="usuario"]').value = data.usuario;
    eForm.querySelector('input[name="email"]').value = data.email;

    HELPER.modalInstance(eView, 'elemento').show();
}
const afterRender = ()=>{

    eForm.addEventListener('submit', async (e)=>{
        e.preventDefault();
        let ladda = HELPER.ladda('form[name="usuario-suspender"] button[type="submit"]');

        let formData = new FormData(eForm);

        if (eData.id != null) {
            formData.append('id', eData.id);
        }

        axios({
            method: 'post',
            url: BASE_API + 'configuracion/usuario/save_suspendido',
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

    })

}
const render = (domElement, callback)=>{

    domElement.innerHTML = modalChangePassword;

    eView = domElement.querySelector(`div[name="modal-usuario-suspender"]`);
    eForm = eView.querySelector(`form[name="usuario-suspender"]`);

    callbackSubmit = callback;

    afterRender();
}

export  default {
    crear,
    render
}
