import modalSaveHTML from './index.html.js';

let eData = {}, eView, eForm, callbackSubmit;

async function afterRender() {

    eForm.addEventListener('submit', async (e) => {
        
        e.preventDefault();
       
        try {
            
            let ladda = HELPER.ladda('form[name="save-tipo-personal"] button[type="submit"]');
            
            let formData = new FormData(document.querySelector('form[name="save-tipo-personal"]'));

            if (eData.id != null) { formData.append('id', eData.id); }

            axios({
                method: 'post',
                url: BASE_API + 'configuracion/tipo_personal/save',
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

    eView.querySelector('.modal-title').innerText = 'Nuevo Tipo Personal';

    eData.id = null;

    modalShow();

}

const modalShow = () => {
    $(eView).modal('show');
}

const editar = (data) => {

    eData.id = data.id;

    eView.querySelector('input[name="nombre"]').value = data.nombre ;
    eView.querySelector('textarea[name="descripcion"]').value = data.descripcion;

    modalShow();
}



const cargar = ({element, callback, eName }) => {

    callbackSubmit = callback;

    element.innerHTML = modalSaveHTML;

    eView = element.querySelector(`div[name="modal-tipo-personal-save"]`);

    eForm = eView.querySelector(`form[name="save-tipo-personal"]`);

    eData.id = null;

    afterRender();
}

export default {
    cargar,
    crear, 
    editar
}
