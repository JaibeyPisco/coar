import modalSave from "./index.html.js";

let eView = null, eForm = null, eData = {}, callbackSubmit = null,
formName = 'delete-tipo-incidencia';

const eliminar = async  (data) =>{

    HELPER.reset_form(eForm);

    eData = data;
    // eForm.querySelector('input[name="id"]').value = data.id;

    await modalShow();
}
const modalShow = async () =>{
   HELPER.modalInstance('modal-'+formName).show();

}

const modalHide = async () =>{
    HELPER.modalInstance('modal-'+formName).hide();

}


const afterRender = async  ()=>{

    eForm.addEventListener('submit', function(e) {
        try {
            e.preventDefault();

            let ladda = HELPER.ladda('form[name="'+formName+'"] button[type="submit"]');

            let formData = new FormData(eForm);

            if (eData.id != null) { formData.append('id', eData.id); }

            axios({
                method: 'post',
                url: BASE_API + 'configuracion/tiposIncidencias/delete',
                data: formData
            })
                .then(async (response) => {

                    HELPER.notificacion(response.data.mensaje, 'success');

                    callbackSubmit(response.data);

                    await modalHide();

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

const cargar = async (domElement, callback)=>{

    eView = domElement;

    callbackSubmit = callback;

    eView.innerHTML = modalSave;

    eForm = eView.querySelector(`form[name="${formName}"]`);

   await afterRender();

}

export  default  {
    eliminar,
    cargar
}