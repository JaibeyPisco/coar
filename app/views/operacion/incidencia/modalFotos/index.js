import  modalFotos from './index.html.js';

 let eView;

const show = async (id_incidencia, id_incidencia_monitoreo) => {

    try {

        console.log({id_incidencia, id_incidencia_monitoreo});
        const tableBody = eView.querySelector('tbody[name="lista_fotos"]');

        if (!tableBody) {
            throw new Error('Element with name "lista_fotos" not found');
        }

        tableBody.innerHTML = '';

        let url = BASE_API+'operacion/Incidencia/get_archivos/'+id_incidencia;

        if(id_incidencia_monitoreo != undefined){
            url += '/'+id_incidencia_monitoreo;
        }
        const data = (await  axios.get(url)).data;

        console.log(data);

        let html = '';

        data.forEach( (row) => {
            html += `
                    <tr data-json='`+JSON.stringify(row)+`'>
                        <td style="width:80px; vertical-align:middle;">
                            <a href="${BASE_FILES}/images/${row.archivo}" target="_blank"><img src="${BASE_FILES}/images/${row.archivo}" style="height:40px;" /></a>
                        </td>
                        <td style="vertical-align:middle;">
                           ${row.nombre}
                        </td>
                         
                    </tr>
            `;
        });

        tableBody.insertAdjacentHTML('beforeend', html);

        HELPER.modalInstance(eView, 'elemento').show();

    }catch (e) {
        console.log(e)
    }



}
const load = async (element) => {

    element.innerHTML = modalFotos;

    const foundElement  = element.querySelector('div[name="modal-fotos"]');
    if (!foundElement) {
        throw new Error('Element with name "modal-fotos" not found');
    }

    eView = foundElement;

    if (!eView) {
        throw new Error('Element with name "modal-fotos" not found');
    }

    console.log(eView);


}

export  default {
   load,
    show,
 }
