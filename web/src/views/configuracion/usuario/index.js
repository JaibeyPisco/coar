import indexHtml from "./index.html.js";
import modalSave from "./modalSave/index.js";
import modalChangePassword from "./modalChangePassword/index.js";
import modalSuspender from "./modalSuspender/index.js";


let eView = null;
let eTable = null;

const datatable = () => {

    eTable = $(eView).find('table[name="registros"]').DataTable({
        ajax: BASE_API + 'configuracion/usuario',

        columns: [
            { title: 'ID', mData: 'id', visible: false },
            {
                title: 'ACCIÓN',
                defaultContent: '',
                render: (data, type, row) => createActionButtons(row),
                width: '100px',
            },
            { title: 'ESTADO', render: (data, type, row) => createStatusLabel(row) },
            { title: 'NOMBRE', mData: 'nombre' },
            { title: 'APELLIDO', mData: 'apellido' },
            { title: 'USUARIO', mData: 'usuario' },
            { title: 'EMAIL', mData: 'email' },
            { title: 'LOCAL ANEXO', mData: 'local' },
            { title: 'TIPO PERSONA', mData: 'tipo_persona' },
            { title: 'ROL PERMISO', mData: 'rol' },
        ],
        createdRow: (row, data) => {
            $(row).attr('data-json', JSON.stringify(data));
            $(row).find('td').eq(0).css('width', '10px');

            row.querySelector('button[name="row-edit"]').addEventListener('click', () => {
                modalSave.editar(data);
            })

            row.querySelector('a[name="row-edit_password"]').addEventListener('click', () => {
                modalChangePassword.crear(data);
            })

            if( row.querySelector('a[name="row-suspender"]') != null ){
                row.querySelector('a[name="row-suspender"]').addEventListener('click', () => {
                    modalSuspender.crear(data);
                })
            }


        },
        order: [['0', 'asc']],
    });
};

const createActionButtons = (row) => {

    const suspendOption = row.fl_suspendido
        ? '<li><a class="dropdown-item" name="row-activar"><i class="far fa-play"></i> Activar Usuario</a></li>'
        : '<li><a class="dropdown-item" name="row-suspender"><i class="far fa-pause"></i> Suspender</a></li>';


         return `
                    <div class="btn-group" style="width:80px;">
                        <button type="button" class="btn btn-default btn-sm" name="row-edit"><i class="fadeIn animated bx bx-edit" style="color: #8e8e10; font-size: 20px;"></i></button>
                        <button type="button" class="btn btn-primary btn-primary-dark btn-sm split-bg-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"><span class="visually-hidden">Toggle Dropdown</span></button>
                        <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-end">	
                               
                                <li>
                                    <a class="dropdown-item" name="row-edit_password"><i class="far fa-lock"></i> Cambiar Contraseña</a></li>
                                    ${suspendOption}
<!--                                    <li><a class="dropdown-item" name="row-delete"><i class="far fa-trash-alt"></i> Eliminar</a></li>-->
                        </div>
                    </div>
                `;
};

const createStatusLabel = (row) =>
    row.fl_suspendido
        ? '<span class="badge bg-warning">SUSPENDIDO</span>'
        : '<span class="badge bg-success">ACTIVO</span>';



const loadComponents = async () => {

    modalSave.cargar(document.querySelector('modal-save-usuario'), () => {
         eTable.ajax.reload(null, false);
    });

    modalChangePassword.render(
        eView.querySelector('modal-usuario-change-password'), () => {
            eTable.ajax.reload(null, false);
    })

    modalSuspender.render(
        eView.querySelector('modal-usuario-suspender'), () => {
            eTable.ajax.reload(null, false);
        })
};

const events = () => {

    eView.querySelector('button[name="nuevo"]').addEventListener('click', () => {
        modalSave.crear();
    });



};

const afterRender = async () => {
    await datatable();
    await loadComponents();
    events();
};

export default async function (d) {
    eView = d;
    eView.innerHTML = indexHtml;
    await afterRender();
}
