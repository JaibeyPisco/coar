import modalDeleteHTML from './index.html.js';

let eData = {}, eView, eForm, callbackSubmit;

async function afterRender() {

    eForm.addEventListener('submit', async (e) => {
        
        e.preventDefault();
       
        try {
            
            let ladda = HELPER.ladda('form[name="incidencia-derivar"] button[type="submit"]');
            
            let formData = new FormData(eForm);

             formData.append('id', eData.id); 

            formData.append('incidencia', eData.incidencia);
            

            axios({
                method: 'post',
                url: BASE_API + 'operacion/incidencia/derivar',
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

const open = (data) => {

    HELPER.reset_form(eForm);

    eView.querySelector('.modal-title').innerText = 'Derivar incidencia';

    eData.id = data.id;
    eData.incidencia = data.incidencia
   
    HELPER.modalInstance(eView, 'elemento').show();
}
 
 
const cargar = (element, callback) => {

    callbackSubmit = callback;

    element.innerHTML = modalDeleteHTML;

    eView = element.querySelector(`div[name="modal-incidencia-derivar"]`);

    eForm = eView.querySelector(`form[name="incidencia-derivar"]`);

    eData.id = null;

    afterRender();
}

export default {
    cargar,
    open
}
