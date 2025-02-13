let DOM, DOM_ID ;
let Componente = {
    render: (d) => {

        $('#main').off();
        d.innerHTML = /*html*/`

        <div id="main">

            <!--breadcrumb-->
            <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                <div class="breadcrumb-title pe-3">Configuración</div>
                <div class="ps-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0 p-0">
                            <li class="breadcrumb-item"><a href="javascript:;"><i class="fadeIn animated bx bx-slider-alt"></i></a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Area</li>
                        </ol>
                    </nav>
                </div>
                <div class="ms-auto">
                    <div class="btn-group">
                        <button type="button" class="btn btn-success px-4 btn-success-dark" style="font-size:15px;" name="nuevo"><i class="lni lni-circle-plus" style="font-size:15px;"></i>Nuevo</button>
                    </div>
                </div>
            </div>
            <!--end breadcrumb-->

            <hr/>

            <!-- Main content -->
            <section class="content">
                <div class="card   radius-10 w-100">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table name="registros" class="table table-striped table-hover table-bordered border-default border-2" style="width:100%; font-weight: 500; font-size: 13px; vertical-align: middle;"></table>
                        </div>
                    </div>
                </div>
            </section>
            <!-- /.content -->

            <!-- MODAL SAVE -->
            <div class="modal inmodal fade" name="modal-save" data-backdrop="static"  role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-md">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 name="save" class="modal-title">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form name="save">
                            <div class="modal-body">
                                <div class="col-md-12">
                                    <div class="form-group mb-3">
                                        <label for="nombre" class="form-label">Nombre <span class="text-danger">(*)</span></label>
                                        <div class="input-group"> <span class="input-group-text bg-transparent"><i class='bx bxs-book' ></i></span>
                                            <input type="text" id="nombre" name="nombre" class="form-control border-start-0 form-control-sm" autocomplete="off">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="descripcion" class="form-label">Descripción</label>
                                        <div class="input-group"> <span class="input-group-text bg-transparent"><i class='fadeIn animated bx bx-right-indent'></i></span>
                                            <textarea type="text" id="descripcion" name="descripcion" class="form-control border-start-0 form-control-sm" autocomplete="off"></textarea>
                                        </div>
                                    </div>
                                </div>
                                   
                            </div>
                            <div class="modal-footer" align="center" style="display:block">
                                <button type="button" class="btn btn-secondary pull-left btn-sm" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" class="btn btn-primary btn-primary-dark btn-sm">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- MODAL DELETE -->
            <div class="modal inmodal fade" name="modal-delete" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 name="delete" class="modal-title">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form name="delete">
                            <div class="modal-body" >
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-12 m-0" align="center">
                                                <i class="fadeIn animated bx bx-trash" style="font-size:100px;"></i><br/>
                                            </div>
                                            <div class="col-md-12"  align="center" style="padding-top:10px;">
                                                <label><input type="checkbox" name="confirmacion" required/>
                                                    Confirmo realizar la eliminación de la incidencia</label>
                                                <p style="color:red;">Esta acción no se podrá revertir</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>                          
                            <div class="modal-footer" align="center" style="display:block" >
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" name="submit" class="btn btn-danger btn-danger-dark">Eliminar Ahora!</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        `;
        Componente.after_render();
    },

    after_render: () => {

        DOM_ID = '#main';
        DOM = $(DOM_ID);

        /** SUBMIT SAVE */
        DOM.find('form[name="save"]').validate({
              /* REGLAS */
            rules: {
                nombre: {required: true},
                // descripcion: {required: true}
            },
            messages: {
                nombre: 'Nombre',
                // descripcion: 'Descripcion'
            },
            submitHandler: function() {
                Componente.submit();
            }
        });

        /** SUBMIT DELETE */
        DOM.find('form[name="delete"]').validate({
            submitHandler: function() {
                Componente.submit();
            }
        });

        /* NUEVO */
        DOM.on('click', 'button[name="nuevo"]', function(e) {
            e.stopImmediatePropagation();
            Componente.new();
        });

        /* EDITAR */
        DOM.on('click', 'button[name="row-edit"]', function(e) {
            e.stopImmediatePropagation();
            Componente.edit($(this));
        });

        /* ELIMINAR */
        DOM.on('click', 'a[name="row-delete"]', function(e) {
            e.stopImmediatePropagation();
            Componente.delete($(this));
        });


        Componente.datatable();
        Componente.get();

        HELPER.load_component();
    },

    /**** DATA */
    id: null,
    action_submit: null,
    fl_autoevento: true,

    get: function() {

        axios.get(BASE_API + 'configuracion/area')
        .then(function(response) {
            Componente.table.clear().rows.add(response.data).draw(false);
        }).catch(error => {
            console.log(error);
        });
    },

    datatable: function() {

        this.table = DOM.find('table[name="registros"]').DataTable({

            
            columns: [
                    { title: 'ID', mData: 'id', visible:false },
                    {
                    title: 'ACCIÓN',
                    defaultContent: ``,
                    render: function(data, type, row) {
                        var html = `
                            <div class="btn-group" style="width:80px;">
                                <button type="button" class="btn btn-default btn-sm" name="row-edit"><i class="fadeIn animated bx bx-edit" style="color: #8e8e10; font-size: 20px;"></i></button>
                                <button type="button" class="btn btn-primary btn-sm split-bg-primary dropdown-toggle dropdown-toggle-split btn-primary-dark" data-bs-toggle="dropdown"><span class="visually-hidden">Toggle Dropdown</span></button>
                                <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-end">	
                                    <a class="dropdown-item" name="row-delete" href="javascript:;"><i class="fadeIn animated bx bx-trash" style="color: red; font-size: 18px;"></i> Eliminar</a>
                                </div>
                            </div>
                    `;
                    return html;
                    },
                    width: '100px',
                },
                { title: 'NOMBRE', mData: 'nombre' },
                { title: 'DESCRIPCIÓN', mData: 'descripcion' },
                { title: 'DESCRIPCIÓN', render: function(data, type, row){
                    if(row.estado == 0){
                        return  `<small class="badge bg-danger ">ANULADO</small>`;
                    }
                    return  `<small class="badge bg-success">ACTIVO</small>`;

                } },
            ],
            createdRow: function(row, data, indice) {
                $(row).attr('data-json', JSON.stringify(data));
                $(row).find('td').eq(0).css('width', '10px');
            },
            order:[
                ['0', 'asc']
            ]
        });
    },

    new: function() {

        Componente.id = null

        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h5[name="'+accion+'"]').text('Nueva Area');

        /** DATA */
        HELPER.reset_form(form);

        Componente.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    edit: (row) => {

        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h5[name="'+accion+'"]').text('Editar Area');

        /** DATA */
        HELPER.reset_form(form);

        let data = HELPER.get_attr_json(row);

        Componente.fl_autoevento = false;

        Componente.action_submit = accion;
        Componente.id = data.id;

        form.find('input[name="nombre"]').val(data.nombre);
        form.find('textarea[name="descripcion"]').val(data.descripcion);

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    delete: function(row) {

        let accion = 'delete';
        let form = DOM.find('form[name="'+accion+'"]');

        DOM.find('h5[name="'+accion+'"]').text('Eliminar Area');

        /** DATA */
        HELPER.reset_form(form);

        let data = HELPER.get_attr_json(row);

        this.id = data.id;
        this.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    submit: function() {

        let ladda = HELPER.ladda(DOM_ID+' form[name="' + this.action_submit + '"] button[type="submit"]');
        let formData = new FormData(document.querySelector(DOM_ID+' form[name="' + this.action_submit + '"]'));

        if (this.id != null) { formData.append('id', this.id); }

        axios({
            method: 'post',
            url: BASE_API + 'configuracion/area/' + this.action_submit,
            data: formData
        })
        .then(function(response) {
            if(response.data.tipo == "success"){
                Componente.get();
                DOM.find('div[name="modal-'+Componente.action_submit+'"]').modal('hide');
                HELPER.notificacion(response.data.mensaje, response.data.tipo);
                ladda.stop();
            }else{
                HELPER.notificacion(response.data.mensaje, response.data.tipo);
                ladda.stop();
            }
        }).catch(error => {
            ladda.stop();
        });
    },
}

export default Componente;