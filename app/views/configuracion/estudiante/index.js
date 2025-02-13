import CursoHTML from "./index.html.js";
import modalImportar from "./modalImportar/index.js";
import modalSave from "./modalSave/index.js";

let DOM, DOM_ID, eView;

let
    id_estudiante = null,
    action_submit = null, 
    imagen_anterior = null,
    table = null,
    padre_id = null,
    madre_id = null,
    apoderado_rol_padre_madre_id = null;

export default async function (d) {

    $('#main').off();

    eView = d;
    eView.innerHTML = CursoHTML;

    await after_render();

}

const after_render = async () => {
    
    DOM_ID = '#main';
    DOM = $(DOM_ID);


    modalImportar.cargar(eView.querySelector('modal-importar') , function (e) {
        table.ajax.reload(null, false);
    })
     
    modalSave.cargar(
        eView.querySelector('modal-save-estudiante') 
        , function (response) {
        table.ajax.reload(null, false);
    })
    
    eView.querySelector('button[name="nuevo"]').addEventListener('click', function(){
        modalSave.show()
    })

  
    /* ELIMINAR */
    DOM.on('click', 'a[name="row-delete"]', function (e) {
        e.stopImmediatePropagation();
        eliminar($(this));
    });

    /* PREVIEW IMAGEN */
    DOM.find('input[name="foto"]').change(function(e) {
        e.stopImmediatePropagation();
        HELPER.preview_image(this, DOM.find('img[name="foto"]'));
    });

   
   
    eView.querySelector('button[name="btnModalImportar"]').addEventListener('click', function(){
         
        modalImportar.show();
    })
 

    datatable();
 

}
 
const datatable = function () {

    table = DOM.find('table[name="registros"]').DataTable({
        ajax: BASE_API + 'configuracion/estudiante',
        
        columns: [
            {
                title: 'ACCIÓN',
                defaultContent: ``,
                render: function (data, type, row) {
                    var html = /*html*/`
                   

                    <div class="btn-group" bis_skin_checked="1">
                        <button type="button" class="btn btn-primary" name="row-edit">Editar</button>
                        <button type="button" class="btn btn-primary split-bg-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">	<span class="visually-hidden">Toggle Dropdown</span>
                        </button>
                        <!-- <ul class="dropdown-menu" style="">
                            <li><a class="dropdown-item" href="#">Anular</a></li>
                        </ul> -->
                    </div>

                        `;
                    return html;
                   
                },
                width: '100px',
            },
            { title: 'ESTADO', mData: 'dni' },
            { title: 'DNI', mData: 'dni' },
            { title: 'NOMBRE COMPLETO', mData: 'estudiante' },
            { title: 'GRADO Y SECCION', mData: 'grado_seccion' },
            { title: 'CORREO', mData: 'correo_electronico' },
            { title: 'CONDICION', render: function(data, type, row){
                if(row.condicion_estudiante == 'ESTUDIANTE'){
                    return  `<small class="label label-primary">ESTUDIANTE</small>`;
                }

                if(row.condicion_estudiante == 'EGRESADO'){
                    return    `<small class="label label-success">EGRESADO</small>`;
                }

                return row.condicion_estudiante ;
            } },
        ],
        createdRow: function(row, data, indice) {
            $(row).attr('data-json', JSON.stringify(data));
            $(row).find('td').eq(0).css('width', '10px');

            row.querySelector('button[name="row-edit"]').addEventListener('click', async (e) => {
                e.stopImmediatePropagation();
                modalSave.editar(data);
            })
        }
    });
}
 