import indexHTML from "./index.html.js";
import FotoComponent from "../../../uiElements/FotoComponent.js";

let DOM, DOM_ID, eView;

let eForm = null;
let eData = null;
let editor = null;

let FotoComponent_cls = new FotoComponent();

const after_render = async () => {
    $('#main').off();
    DOM_ID = '#main';
    DOM = $(DOM_ID);

    await  events();
    await initialData();
}
const initialData = async  () =>{

    editor = await ClassicEditor.create(eForm.querySelector('div[name="descripcion"]'));

    await  nuevo();

    FotoComponent_cls.render({
        domElement: document.querySelector('foto-component'),

        callBackSubmit: async function (response) {

        }
    })


}
const events = () =>{

    eForm.querySelector('button[name="nuevo_item"]').addEventListener('click', function(e){
        e.preventDefault()
        agregarEstudiantes()
    });

    // Eliminar una fila en tabla areas
    DOM.on('click', 'button[name="delete-item"]', function (e) {
        let estudiantes = getEstudiantesArray();

        if(estudiantes.length === 1){
            HELPER.notificacion('Debe agregar al menos un estudiante', 'warning');
            return;
        }

        let codigo = e.target.getAttribute('data-codigo');
        eView.querySelector('div[data-codigo="' + codigo + '"]').remove();
    })

    eForm.addEventListener('submit', function (e) {
        e.preventDefault();
        submit();
    })


}


const agregarEstudiantes =  async (data = null) => {

    let codigo = Math.random().toString(36).substr(2);

    let  html = /*html*/`
        <div bis_skin_checked="1" data-codigo="${codigo}">
            <div class="row">
                <div class="col-md-10">
                    <div class="form-group mb-3" bis_skin_checked="1">
                        <select name="id_estudiante" data-select="ESTUDIANTE" class="form-select" autocomplete="off"></select>
                    </div>
                </div>               
                <div class="col-md-2" bis_skin_checked="1">
                    <div class="form-group mb-3" bis_skin_checked="1">
                        <button type="button" name="delete-item" class="btn btn-warning btn-sm" data-codigo="${codigo}"><i class="fa fa-times"></i> Quitar</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    eView.querySelector('div[name="estudiantes"]').insertAdjacentHTML('beforeend', html);
   
   await selectEstudiante();
  
    return codigo;
}

const getEstudiantesArray = () =>{

    let arrayData = [];

    eView.querySelectorAll('div[name="estudiantes"] > div').forEach((elem) =>{

       let data = {
            'id_estudiante': elem.querySelector('select[name="id_estudiante"]').value,
       }

       arrayData.push(data);
    })

    return arrayData;
}



const selectEstudiante = async () => {
     
    DOM.find('select[data-select="ESTUDIANTE"]').select2({
        ajax: {
            url: BASE_API+'configuracion/estudiante/getSelect',
            dataType: 'json',
            delay: 250,
            data: function(params) {
            return {buscar:params.term};
            },
            processResults: function(data, params) {      
            return {results: data};
            },
            cache: true,
        },
        escapeMarkup: function(markup) {
            return markup;
        },
        placeholder: "APELLIDO Y NOMBRE - DNI - GRADO Y SECCIÓN",
        minimumInputLength: 3,
        allowClear: true,
        language: {
            inputTooShort: function () {
            return 'Digite mínimo 3 caracteres';
            }
        }
    });
    
}


const getInitial =  async () => {

    const data = (await    axios.get(BASE_API + 'operacion/Incidencia/getInitial')).data;

    let secuencia = data.secuencia;

    eView.querySelector('input[data-name="numero"]').value  =  secuencia.serie+'-'+secuencia.numero;

    HELPER.selectData({
        data: data.lugares,
        element: eView.querySelector('select[data-select="LUGAR"]'),
        flSelect2: true
    })

    HELPER.selectData({
        data: data.tipo_incidencias,
        element: eView.querySelector('select[data-select="TIPOINCIDENCIA"]'),
        flSelect2: true
    })

}


const nuevo = async () => {

    /** DATA */
    HELPER.reset_form(eForm);

    eForm.querySelector('div[name="estudiantes"]').innerHTML = '';
    eForm.querySelector('input[name="fecha_hora"]').value = HELPER.fecha_hora()

    editor.setData('');

    FotoComponent_cls.reset();

    await agregarEstudiantes()
    await getInitial();

}

const submit = function () {

    

    let ladda = HELPER.ladda('form[name="save-incidencia"] button[type="submit"]');

    let formData = new FormData(eForm);

    formData.append('estudiantes',  JSON.stringify(getEstudiantesArray()));

    formData.append('descripcion',  editor.getData());

    let fotos_adjuntas = FotoComponent_cls.getDetalleFoto();

    formData.append('fotos', JSON.stringify(fotos_adjuntas));


    axios({
        method: 'post',
        url: BASE_API + 'operacion/Incidencia/save',
        data: formData
    })
    .then(async  function (response) {

        await nuevo()

        HELPER.notificacion(response.data.mensaje, 'success');

        ladda.stop();

    }).catch(error => {
        ladda.stop();
    });
}

export default async function (d) {

    eView = d;
    eView.innerHTML = indexHTML;

    eForm = eView.querySelector('form[name="save-incidencia"]');


   await after_render();

}
