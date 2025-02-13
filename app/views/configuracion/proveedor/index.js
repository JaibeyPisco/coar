import proveedorHTML from './index.html.js';
import modalSave from './modalSave/index.js';
import modalDelete from "./modalDelete/index.js";


let DOM, DOM_ID, eView, table;
const datatable = function () {

        table = DOM.find('table[name="registros"]').DataTable({
            ajax: BASE_API + 'configuracion/proveedor',

            columns: [{
                title: 'ACCIÓN',
                defaultContent: ``,
                render: function (data, type, row) {

                    return `
                        <div class="btn-group" style="width:80px;">
                            <button type="button" class="btn btn-default btn-sm" name="row-edit"><i class="fadeIn animated bx bx-edit" style="color: #8e8e10; font-size: 20px;"></i></button>
                            <button type="button" class="btn btn-primary btn-primary-dark btn-sm split-bg-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"><span class="visually-hidden">Toggle Dropdown</span></button>
                            <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-end">	
                                    <a class="dropdown-item" name="row-delete" href="javascript:"><i class="lni lni-trash text-danger"></i> Eliminar</a>
                            </div>
                        </div>
                    `;
                },
                width: '100px',
            },
                {
                    title: 'DOCUMENTO', render: function (data, type, row) {
                        return row.nombre_documento + ' ' + row.numero_documento;
                    }
                },
                {title: 'RAZÓN SOCIAL', mData: 'razon_social'},
                {title: 'DIRECCIÓN', mData: 'direccion'},
            ],
            createdRow: function (row, data, indice) {
                $(row).attr('data-json', JSON.stringify(data));
                $(row).find('td').eq(0).css('width', '10px');

                row.querySelector('button[name="row-edit"]').addEventListener('click', function (e) {
                    modalSave.editar(data);
                })
                row.querySelector('a[name="row-delete"]').addEventListener('click', function (e) {
                    modalDelete.eliminar(data);
                })
            }
        });

    }



const afterRender = async () => {

    DOM_ID = '#main';
    DOM = $(DOM_ID);

    modalSave.cargar(
        document.querySelector('modal-save-proveedor'), function () {
            table.ajax.reload(null, false);
        });

    modalDelete.cargar(
        document.querySelector('modal-eliminar-proveedor'), function () {
            table.ajax.reload(null, false);
        });

    /* NUEVO */
    eView.querySelector('button[name="nuevo"]').addEventListener('click', function (e) {
        e.preventDefault();
        modalSave.crear();
    })


    datatable();

}
export default async (d) => {

    eView = d;

    eView.innerHTML = proveedorHTML;

    await afterRender();

}

