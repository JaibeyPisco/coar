import MonitoreoModal from './index.html.js';
import FotoComponent from "../../../uiElements/FotoComponent.js";
import modalFotos from '../modalFotos/index.js';

let eView = null;
let eForm = null;
let callbackSubmit = null;
let eData = {};

let problema = null;
let acuerdos = null;
let descripcion_privada = null;
 
 
let FotoComponent_cls = new FotoComponent();

const cargar = async(domElment, callback) =>{

    domElment.innerHTML = MonitoreoModal;

    callbackSubmit = callback;

    eView = domElment.querySelector('div[name="modal-monitoreo"]');

    

    eForm = eView.querySelector('form[name="save-monitoreo"]');

    await  after_render();

}

const show = async (data ) => {

    resetInfo();

    eData.id_incidencia = data.id;

    // await modalFotos.load (
    //     eView.querySelector ('modal-fotos-components')
    // );

  await  listar_estados_monitoreo();

    HELPER.modalInstance(eView, 'elemento').show();

}

const resetInfo = () => {

    HELPER.reset_form(eForm);

    problema.setData('');
    acuerdos.setData('');
    descripcion_privada.setData('');
    FotoComponent_cls.reset();

    FotoComponent_cls.reset();
}


const select_estados_monitoreo = async () => {

    let select = $(eView).find('select[data-select="ESTADO_MONITOREO"]');

    select.append($('<option></option>').attr('value', '').text('Seleccione...'));

    try {

        const data = (await axios.get(BASE_API + 'configuracion/estado_monitoreo/get_select?tipo=INCIDENCIA')).data;

        let modal = eView.querySelector('div[class="modal-content"]');

        data.forEach(row => {
            select.append('<option value="' + row.id + '">' + row.text + '</option>');
        });

        select.select2({
            dropdownParent: $(modal),
        })

    } catch (error) {
        console.log(error);
    }


}

const listar_estados_monitoreo = async () => {



    let listadoMonitoreos = eView.querySelector('div[name="listar-estados-monitoreos"]');

    listadoMonitoreos.innerHTML = '';

    const data = (await  axios.get(BASE_API + 'operacion/Incidencia_monitoreo/get_listado_estados_monitoreo/'+eData.id_incidencia)).data;

    let html =  '';

    data.forEach(row => {

        let codigo_aleatorio = Math.random().toString(36).substr(2);
        html +=  `
                 <!-- timeline item 1 event content -->
            
                <div class="col py-1" codigo="${codigo_aleatorio}">
                    <div class="card radius-15 shadow-sm border-0">
                <div class="card-body p-2">
                    <!-- Encabezado -->
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <h6 class="card-title text-muted mb-0">Estado: 
                            <span class="badge" style="color: ${row.color_text}; background-color: ${row.color_bg}; padding: 3px 8px; border-radius: 5px;">
                                ${row.estado_monitoreo}
                            </span>
                        </h6>
                        <small class="text-muted">${HELPER.leerFecha(row.fecha_hora)}</small>
                    </div>
                    <hr/>
                    
                    <!-- Información principal -->
                    <table class="table table-borderless table-sm mb-0">
                        <tbody>
                            <tr>
                                <th class="text-muted">Usuario Responsable:</th>
                                <td>${row.usuario}</td>
                            </tr>
                             <tr>
                                <th class="text-muted">Fotos:</th>
                                <td><span type="button" class="btn btn-success  btn-sm" name="row-fotos-estados" data-id="${row.id}"><i class="lni lni-eye"></i></span></td>
                            </tr>
                            <tr>
                                <th class="text-muted">Estudiante:</th>
                                <td>${row.estudiante} (DNI: ${row.dni})</td>
                            </tr>
                            <tr>
                                <th class="text-muted">Problema:</th>
                                <td>${row.problema}</td>
                            </tr>
                            <tr>
                                <th class="text-muted">Acuerdos:</th>
                                <td>${row.acuerdos}</td>
                            </tr>
                            <tr>
                                <th class="text-muted">Descripción Privada:</th>
                                <td>${row.descripcion_privada}</td>
                            </tr>
                             <tr>
                                <th class="text-muted">Archivo:</th>
                                <td>

                                ${(row.archivo != null)? ` <a target="_blank" href="`+BASE_FILES+`uploads/`+row.archivo+`"></i> Ver / Descargar</a>`:''}
                                 </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    })


    listadoMonitoreos.insertAdjacentHTML('beforeend', html);


    // listadoMonitoreos.addEventListener('click', async function (e) {
    //     const button = e.target.closest('[name="row-fotos-estados"]');

    //     if (button) {
    //          const id = button.dataset.id;

    //         // Ejecutar la lógica deseada (por ejemplo, abrir un modal)
    //         await modalFotos.show(eData.id_incidencia, id);
    //     }
    // });


};

const submit = function () {

    let ladda = HELPER.ladda('form[name="save-monitoreo"] button[type="submit"]');

    let formData = new FormData(eForm);

    formData.append('problema',  problema.getData());
    formData.append('acuerdos',  acuerdos.getData());
    formData.append('descripcion_privada',  descripcion_privada.getData());

    formData.append('id_incidencia',  eData.id_incidencia);

    let fotos_adjuntas = FotoComponent_cls.getDetalleFoto();

    formData.append('fotos', JSON.stringify(fotos_adjuntas));

    axios({
        method: 'post',
        url: BASE_API + 'operacion/Incidencia_monitoreo/save',
        data: formData
    })
        .then(async  function (response) {

            HELPER.notificacion(response.data.mensaje, 'success');

            resetInfo();

            await  listar_estados_monitoreo();

            callbackSubmit(response.data.data);

            ladda.stop();

        }).catch(error => {
        ladda.stop();
    });
}

const after_render = async () => {

    problema = await ClassicEditor.create(eForm.querySelector('div[name="problema"]'));
    acuerdos = await ClassicEditor.create(eForm.querySelector('div[name="acuerdos"]'));
    descripcion_privada = await ClassicEditor.create(eForm.querySelector('div[name="descripcion_privada"]'));

    FotoComponent_cls.render({
        domElement: document.querySelector('foto-component'),
        callBackSubmit: async function (response) {
            //callbackSubmit(response);
        }
    });

    eForm.addEventListener('submit', function (e) {
        e.preventDefault();
        submit();
    })


    await  select_estados_monitoreo();

}



export default {
    cargar,
    show
}