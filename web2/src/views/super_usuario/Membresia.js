let DOM, DOM_ID ;
let Membresia = {
    render: (d) => {
        
        $('#main').off();
        d.innerHTML = /*html*/`

        <div id="main">
         
            <!--breadcrumb-->
            <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                        <div class="breadcrumb-title pe-3">Membresias</div>
                        <div class="ps-3">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb mb-0 p-0">
                                        <li class="breadcrumb-item"><a href="javascript:;"><i class='fadeIn animated bx bx-book-content'></i></a>
                                        </li>
                                        <li class="breadcrumb-item active" aria-current="page">Configuración</li>
                                    </ol>
                                </nav>
                            </div>
                            <div class="ms-auto">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-success px-4 btn-sm"   name="nuevo"><i class="lni lni-circle-plus"></i>Nuevo</button>
                                </div>
                            </div>
                        </div>
                        <!--end breadcrumb-->
            
                        <hr/>
            
                    <!-- Main content -->
                    <section class="content">
                        <div class="card border-default border-bottom border-3 radius-10 w-100">
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
                            <h4 name="save" class="modal-title">Modal title</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form name="save">
                            <div class="modal-body" >
                                <div class="row">                
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Nombre </label>
                                            <input type="text" name="nombre" class="form-control" autocomplete="off" required>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Token de Integración </label>
                                            <input type="text" name="token_integracion" class="form-control" autocomplete="off">
                                        </div>
                                    </div>
                                    <div class="col-md-12" style="display:none;">
                                        <div class="form-group">
                                            <label>Cantidad de Usuarios </label>
                                            <input type="number" name="cantidad_usuario" class="form-control" autocomplete="off">
                                        </div>
                                    </div>
                                
                                </div>
                            </div>
                            <div class="modal-footer" align="center" style="display:block">
                                <button type="button" class="btn btn-secondary btn-sm pull-left" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" name="submit" class="btn btn-primary btn-sm">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

 
                <!-- MODAL SAVE -->
                <div class="modal inmodal fade" name="modal-delete" data-backdrop="static"  role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-md">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 name="delete" class="modal-title">Modal title</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form name="delete">
                            <div class="modal-body" >
                                 <div class="row">
                                    <div class="col-md-12" align="center">
                                        <i class="fad fa-trash-alt fa-4x"></i><br/>
                                    </div>
                                    <div class="col-md-12"  align="center" style="padding-top:10px;">
                                        <label><input type="checkbox" name="confirmacion" required/>
                                            Confirmo realizar la eliminación</label>
                                        <p style="color:red;">Esta acción no se podrá revertir</p>
                                    </div>
                                    <div class="col-md-12" name="texto" align="center">

                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer" align="center" style="display:block">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" name="submit" class="btn btn-danger">Eliminar Ahora!</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>



        </div>            
        `;

        Membresia.after_render();
    },

    after_render: () => {

        DOM_ID = '#main';
        DOM = $(DOM_ID);        

        /** SUBMIT SAVE */
        DOM.find('form[name="save"]').validate({
            submitHandler: function() {
                Membresia.submit();
            }
        });

        /** SUBMIT SAVE PASSWORD */
        DOM.find('form[name="save_password"]').validate({
            submitHandler: function() {
                Membresia.submit();
            }
        });

        /** SUBMIT DELETE */
        DOM.find('form[name="delete"]').validate({
            submitHandler: function() {
                Membresia.submit();
            }
        });

        /* NUEVO */
        DOM.on('click', 'button[name="nuevo"]', function(e) {
            e.stopImmediatePropagation();
            Membresia.new();
        });

        /* EDITAR */
        DOM.on('click', 'button[name="row-edit"]', function(e) {
            e.stopImmediatePropagation();
            Membresia.edit($(this));
        });

        /* ELIMINAR */
        DOM.on('click', 'a[name="row-delete"]', function(e) {
            e.stopImmediatePropagation();
            Membresia.delete($(this));
        });

        /* EDITAR PASSWORD */
        DOM.on('click', 'a[name="row-edit_password"]', function(e) {
            e.stopImmediatePropagation();
            Membresia.edit_password($(this));
        });

        Membresia.datatable();
        Membresia.get();

        HELPER.load_component();
    },

    /**** DATA */
    id: null,
    action_submit: null,

    /************ */

    get: function() {
        
        axios.get(BASE_API + 'super_usuario/membresia')
        .then(function(response) {
            Membresia.table.clear().rows.add(response.data).draw(false);
        }).catch(error => {
            console.log(error);
        }); 
    },

    datatable: function() {

        this.table = DOM.find('table[name="registros"]').DataTable({

            lengthChange:false,
            paginate: false,
            columns: [{
                    title: '',
                    defaultContent: ``,                    
                    render: function(data, type, row) {
                        var html = `
                           
 
                            
                            <div class="btn-group" style="width:80px;">
                                <button type="button" class="btn btn-default btn-sm" name="row-edit"><i class="fadeIn animated bx bx-edit" style="color: #8e8e10; font-size: 20px;"></i></button>
                                <button type="button" class="btn btn-primary btn-sm split-bg-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"><span class="visually-hidden">Toggle Dropdown</span></button>
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
                { title: 'TOKEN INTEGRACIÓN', mData: 'token_integracion' },
                { title: 'CANTIDAD USUARIOS', mData: 'cantidad_usuario' },
            ],
            createdRow: function(row, data, indice) {
                $(row).attr('data-json', JSON.stringify(data));
                $(row).find('td').eq(0).css('width', '10px');
            }
        });

    },

    new: function() {

        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Nuevo Membresia');

        /** DATA */
        HELPER.reset_form(form);

        this.id = null;
        this.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    edit: function(row) {
        
        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Editar Membresia');

        /** DATA */
        HELPER.reset_form(form);

        let data = HELPER.get_attr_json(row);

        form.find('input[name="nombre"]').val(data.nombre);
        form.find('input[name="token_integracion"]').val(data.token_integracion);
        form.find('input[name="cantidad_usuario"]').val(data.cantidad_usuario);

        this.id = data.id;
        this.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    delete: function(row) {

        let accion = 'delete';
        let form = DOM.find('form[name="'+accion+'"]');

        DOM.find('h4[name="'+accion+'"]').text('Eliminar Membresia');

        /** DATA */
        HELPER.reset_form(form);
        
        let data = HELPER.get_attr_json(row);

        form.find('div[name="texto"]').text(data.email);

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
            url: BASE_API + 'super_usuario/membresia/' + this.action_submit,
            data: formData
        })
        .then(function(response) {
            Membresia.get();
            DOM.find('div[name="modal-'+Membresia.action_submit+'"]').modal('hide');
            HELPER.notificacion(response.data.mensaje, 'success');
            ladda.stop();
        }).catch(error => {
            ladda.stop();
        });
    },
} 

export default Membresia;