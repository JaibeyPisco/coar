import  modalFotos from './index.html.js'
 let eView;
const show = async (id_incidencia) => {



    try {
        eView.querySelector('tbody[name="lista_fotos"]').innerHTML = '';
        const  data = (await  axios.get(BASE_API+'operacion/Incidencia/get_archivos/'+id_incidencia)).data;
        let html = '';

        data.forEach(row => {
            html += `
                    <tr data-json='`+JSON.stringify(row)+`'>
                        <td style="width:10px; vertical-align:middle;">
                            `+HELPER.fecha(row.fecha)+`
                        </td>
                        <td style="width:80px; vertical-align:middle;">
                            <a href="${BASE_FILES}/images/${row.archivo}" target="_blank"><img src="${BASE_FILES}/images/${row.archivo}" style="height:40px;" /></a>
                        </td>
                        <td style="vertical-align:middle;">
                           ${row.nombre}
                        </td>
                         
                    </tr>
            `;
        });

        eView.querySelector('tbody[name="lista_fotos"]').insertAdjacentHTML('beforeend', html);

        HELPER.modalInstance(eView, 'elemento').show();
    }catch (e) {
        console.log(e)
    }



}
const load = async (element) => {

    element.innerHTML = modalFotos;

    eView = element.querySelector('div[name="modal-fotos"]');

    console.log(eView);


}

export  default {
   load,
    show,
 }
