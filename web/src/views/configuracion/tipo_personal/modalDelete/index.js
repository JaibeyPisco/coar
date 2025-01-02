import modalDeleteHTML from './index.html.js';

let eData = {}, eView, eForm, callbackSubmit;

async function afterRender() {

    eForm.addEventListener('submit', async (e) => {
        
        e.preventDefault();
       
        try {
            
            let ladda = HELPER.ladda('form[name="tipo-personal-delete"] button[type="submit"]');
            
            let formData = new FormData(document.querySelector('form[name="tipo-personal-delete"]'));

            if (eData.id != null) { formData.append('id', eData.id); }
            axios({
                method: 'post',
                url: BASE_API + 'configuracion/tipo_personal/delete',
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

    eView.querySelector('.modal-title').innerText = 'Nuevo Tipo Personal';

    eData.id = data.id;

    // eView.querySelector('.modal-title').innerText = 'Nuevo Tipo Personal';
   
    // form.find('div[name="texto"]').text(data.email);

   
    $(eView).modal('show');
}
 
 
const cargar = ({element, callback, eName }) => {

    callbackSubmit = callback;

    element.innerHTML = modalDeleteHTML;

    eView = element.querySelector(`div[name="modal-tipo-personal-delete"]`);

    eForm = eView.querySelector(`form[name="tipo-personal-delete"]`);

    eData.id = null;

    afterRender();
}

export default {
    cargar,
    open
}
