import modalDeleteHTML from './index.html.js';

let eData = {}, eView, eForm, callbackSubmit;

async function afterRender() {

    eForm.addEventListener('submit', async (e) => {
        
        e.preventDefault();
       
        try {
            
            let ladda = HELPER.ladda('form[name="delete-estado-monitoreo"] button[type="submit"]');
            
            let formData = new FormData(eForm);

            if (eData.id != null) { formData.append('id', eData.id); }
            axios({
                method: 'post',
                url: BASE_API + 'configuracion/estado_monitoreo/delete',
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

const open = (data) => {

    HELPER.reset_form(eForm);

    eView.querySelector('.modal-title').innerText = 'Eliminar Estado de Monitoreo';

    eData.id = data.id;

    HELPER.modalInstance(eView, 'elemento').show();
   

}
 
 
const cargar = ({element, callback}) => {

    callbackSubmit = callback;

    element.innerHTML = modalDeleteHTML;

    eView = element.querySelector(`div[name="modal-estado-monitoreo"]`);

    eForm = eView.querySelector(`form[name="delete-estado-monitoreo"]`);

    eData.id = null;

    afterRender();
}

export default {
    cargar,
    open
}
