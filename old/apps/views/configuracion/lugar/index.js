
import indexHTML from './index.html.js';
import modalSave from './modalSave/index.js';

let eView, eTable, eName = 'lugar';

export default  async (element)=>  { 
    eView = element;

    eView.innerHTML = indexHTML(eName);

    await after_render();

    modalSave.cargar(
        eView.querySelector(`modal-lugar-save`), 
        async (response) => {
            
            eTable.ajax.reload(null, false);
    }, eName+'-save');

}

const after_render = async ()=> {

    eView.querySelector('button[name="nuevo"]').addEventListener('click', function(e) {
        e.preventDefault();
        modalSave.crear()
    } 

);
    datatable();
}


const  datatable = () => {

        eTable = $(eView).find('table[name="registros"]').DataTable({
            ajax:BASE_API + 'configuracion/lugar',
            responsive: false,
            columns: [{
                    title: 'ACCIÓN',                
                    render: function(data, type, row) {
                        let html = `
                            <div class="btn-group" style="width:80px;">
                                <button type="button" class="btn btn-default  btn-sm" name="row-edit">EDITAR</button>
                                <button type="button" class="btn btn-default btn-sm  dropdown-toggle dropdown-toggle-split " data-bs-toggle="dropdown"><span class="visually-hidden">Toggle Dropdown</span></button>
                                <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-end">	
                                    <a class="dropdown-item" name="row-delete" href="javascript:;"><i class="fadeIn animated bx bx-trash" style="color: red; font-size: 18px;"></i> Eliminar</a>
                                </div>
                            </div>
                        `;

                        return html;
                    },
                },                
                { title: 'NOMBRE', mData: 'nombre' },
                { title: 'REFERENCIA', mData: 'referencia' },
                
            ],
            createdRow: function(row, data, dataIndex) {

                row.querySelector('button[name="row-edit"]').addEventListener('click',function(e) {
                    e.preventDefault();
                   
                    modalSave.editar(data);
                });
            }
        });

    }
 