import indexHtml from "./index.html.js";
import tabInformacionGeneral from "./tabInformacionGeneral/index.js";
import tabApoderados from "./tabApoderados/index.js";
import tabPadres from "./tabPadres/index.js";
 


let eView, eForm, callbackSubmit, eData = null;

let imagen_anterior = null;

const cargar = (element, callback) => {

    element.innerHTML = indexHtml;
    callbackSubmit = callback;

    eView = element.querySelector('div[name="modal-save-estudiante"]');
    eForm = element.querySelector('form[name="save-estudiante"]');

    afterRender();
}

const show = () => {

    eData = null;

    HELPER.reset_form(eForm);

    eView.querySelector('img[name="foto"]').src = BASE_FILES+'images/sin_imagen.jpg';

    imagen_anterior = null;
    HELPER.modalInstance(eView, 'elemento').show();
}

const afterRender = () => {

    tabInformacionGeneral.cargar(eView.querySelector('tab-informacion-general'))
    tabApoderados.cargar(eView.querySelector('tab-informacion-apoderados'))
    tabPadres.cargar(eView.querySelector('tab-informacion-padres'))

    events();
}

const editar = async (row) => {
    
    eData= (await axios.get(BASE_API + 'configuracion/estudiante/editar/' + row.id)).data;

       
    tabInformacionGeneral.editar(eData);

    imagen_anterior = eData.foto;

    if(eData.padre != null){

        tabPadres.editarPadre(eData.padre);
    }
    if(eData.madre != null){

        tabPadres.editarMadre(eData.madre);
    }

    if(eData.padre_apoderado != null){

        tabPadres.editarApoderadoRolPadre(eData.padre_apoderado);
    }

    tabApoderados.editar(eData.apoderados)

    HELPER.modalInstance(eView, 'elemento').show();
}

 

const events = () => {
    
    eForm.addEventListener('submit', async (e) => {
        console.log('here')

        e.preventDefault();

        try {
            console.log('wee');
            let ladda = HELPER.ladda('form[name="save-estudiante"] button[type="submit"]');

            let formData = new FormData(eForm);

            formData.append('apoderados', JSON.stringify(tabApoderados.get_detalle_apoderado_json()));

            if (eData.id != null) { formData.append('id_estudiante', eData.id ); }
            

            if (imagen_anterior != null) { formData.append('imagen_anterior', imagen_anterior); }
            if (eData.padre  != null) { formData.append('padre_id', eData.padre.id); }

            if (eData.madre != null) { formData.append('madre_id', eData.madre.id); }

            if (eData.padre_apoderado != null) { formData.append('apoderado_rol_padre_madre_id', eData.padre_apoderado.id); }

            console.log('w1111ee');

            axios({
                method: 'post',
                url: BASE_API + 'configuracion/estudiante/save',
                data: formData
            })
                .then(async (response) => {

                    HELPER.notificacion(response.data.mensaje, 'success');

                    callbackSubmit(response);

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

export default {
    cargar, show, editar
}