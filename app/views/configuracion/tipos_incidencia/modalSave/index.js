import modalSave from "./index.html.js";

let eView = null, eForm = null, eData = {}, callbackSubmit = null;
const crear = async  () =>{

    HELPER.reset_form(eForm);

    eView.querySelector('.modal-title').innerText = 'Nuevo Tipo incidencia';

    eData.id = null;

    await modalShow();
}

const modalShow = async () =>{

   HELPER.modalInstance('modal-save-tipo-incidencia').show();

}

const modalHide = async () =>{
    HELPER.modalInstance('modal-save-tipo-incidencia').hide();

}


const editar = async (data) =>{
    HELPER.reset_form(eForm);
    eData = data;

    eView.querySelector('.modal-title').innerText = 'Editar Tipo incidencia';

    eForm.querySelector('input[name="nombre_incidencia"]').value = data.nombre;

    eView.querySelector('select[name="nivel_incidencia"]').value = data.nivel_incidencia;
    eView.querySelector('select[name="nivel_incidencia"]').dispatchEvent(new Event('change'));




    modalShow();
}

const afterRender = async  ()=>{

    eForm.addEventListener('submit', function(e) {
        try {
            e.preventDefault();

            let ladda = HELPER.ladda('form[name="save-tipo-incidencia"] button[type="submit"]');

            let formData = new FormData(eForm);

            if (eData.id != null) { formData.append('id', eData.id); }

            axios({
                method: 'post',
                url: BASE_API + 'configuracion/tiposIncidencias/save',
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

    eForm = eView.querySelector(`form[name="save-tipo-incidencia"]`);

   await afterRender();

}

export  default  {
    crear,
    editar,
    cargar
}