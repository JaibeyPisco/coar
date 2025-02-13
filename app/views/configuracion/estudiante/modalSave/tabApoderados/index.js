import indexHtml from "./index.html.js";
let eView;
const cargar = (element, callback) =>{
    eView = element;



    eView.innerHTML = indexHtml;
    eView.querySelector('tbody[name="tabla_agregar_apoderado"]').innerHTML = '';
 

    afterRender();
}

const afterRender = ()=> {
     eView.querySelector('button[name="agregar_apoderado"]').addEventListener('click', function(){
        agregarApoderado();
    })

    eView.addEventListener('click', function (e) {
        if (e.target.matches('button[name="btnEliminarApoderado"]')) {
            let codigo = e.target.closest('tr').dataset.codigo;
            $('tr[data-codigo="' + codigo + '"]').remove();
        }
    });
}
const editar = (data) =>{
    eView.querySelector('tbody[name="tabla_agregar_apoderado"]').innerHTML='';

    data.forEach(element => {
        agregarApoderado(element);
    });
}

const get_detalle_apoderado_json = () => {
    let array_data = [];

    $('tbody[name="tabla_agregar_apoderado"] tr').each(function () {

       
        array_data.push({
            id : $(this).find('input[data-name="id"]').val(),
            apellidos: $(this).find(`input[data-name="apellidos"]`).val(),
            nombres: $(this).find(`input[data-name="nombres"]`).val(),
            dni: $(this).find(`input[data-name='dni']`).val(),
            numero_telefonico: $(this).find(`input[data-name="numero_telefonico"]`).val(),
            grado_parentesco: $(this).find(`input[data-name="grado_parentesco"]`).val(),
            legalizado: $(this).find('input[data-name="legalizado"]').is(':checked') ? 1 : 0
        });
    });

    return array_data;
}

const agregarApoderado = async (data = null, calEvent = null) => {

    let codigo = Math.random().toString(36).substr(2);



    if (data == null) {
        data = {
            id: '',
            apellidos: '',
            nombres: '',
            dni: '',
            telefono: '',
            parentesco_estudiante: '',
            fl_legalizado: '',
        };
    }

    let html = `<tr data-codigo="${codigo }"> 
                    <td style="display:none;">
                        <input type="hidden" data-name="id" style="width:150px;" value="${data.id}"/>
                    </td>
                    <td>                           
                        <input type="text" class='form-control form-control-sm' value="${data.apellidos}" data-name='apellidos'>
                    </td>
                     <td>                           
                        <input type="text" class='form-control form-control-sm' value="${data.nombres}" data-name='nombres'>
                    </td>

                    <td>
                        <input type="number" class='form-control form-control-sm' value="${ data.dni }" data-name='dni'>
                    </td>

                    <td>
                        <input type="number" class='form-control form-control-sm' value="${ data.telefono }" data-name='numero_telefonico'>
                    </td>
                    <td>
                        <input type="text" class='form-control form-control-sm' value="${ data.parentesco_estudiante }" data-name='grado_parentesco'>
                    </td>
                    <td>
                        <div class="form-check form-switch" bis_skin_checked="1">
                            <input class="form-check-input" data-name="legalizado" type="checkbox" ${(data.fl_legalizado == 1 ? 'checked' : '')}  >  
                        </div>

                    </td>

                    <td>
                        <button type="button" class="btn btn-danger btn-sm" name="btnEliminarApoderado"><i class="lni lni-close" style="font-size: 14px;"></i></button>
                    </td>
                </tr>

        `;
 
    eView.querySelector('tbody[name="tabla_agregar_apoderado"]').insertAdjacentHTML('beforeend', html);


    return codigo;
}


export default {
    cargar, get_detalle_apoderado_json, editar
}
 