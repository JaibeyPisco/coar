let DOM, DOM_ID, eView ;
let Usuario = {
    render: (d) => {
        
        $('#main').off();
        eView = d;
        eView.innerHTML = /*html*/`

        <div id="main">
  
            <!--breadcrumb-->
            <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                        <div class="breadcrumb-title pe-3">Usuario</div>
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
                                    <button type="button" class="btn btn-success px-4 btn-sm" name="nuevo"><i class="lni lni-circle-plus"></i>Nuevo</button>
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
                            <h4 name="save" class="modal-title">Modal title</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form name="save">
                            <div class="modal-body" >
                            <div class="row">
                                    <div class="col-md-4" align="center">
                                        <div class="row">
                                            <div class="col-md-12" align="center">
                                                <div>
                                                    <img name="imagen" style="max-width:100%;" class="img_rectangle">
                                                </div>
                                                <div>
                                                    <label class="btn btn-default btn-sm" style="width:100%;">
                                                        <i class="fa fa-search"></i> Examinar
                                                        <input type="file" name="imagen" style="display:none;">
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                    <div class="row">
                                        <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Nombre</label>
                                            <input type="text" name="nombre" class="form-control" autocomplete="off">
                                        </div>
                                        </div>
                                        <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Apellidos</label>
                                            <input type="text" name="apellido" class="form-control" autocomplete="off">
                                        </div>
                                        </div>
                                        <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Correo Electrónico</label>
                                            <input type="email" name="email" class="form-control" autocomplete="off">
                                        </div>
                                        </div>
                                        <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Usuario</label>
                                            <input type="text" data-mayus="false" name="usuario" class="form-control mayus_false" autocomplete="off">
                                        </div>
                                        </div>
                                        <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Contraseña</label>
                                            <input type="text" name="clave" class="form-control" autocomplete="off">
                                        </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label>Membresia</label>
                                                <select name="id_membresia" data-select="membresia" class="form-control select"></select>
                                            </div>
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
            
            <!-- MODAL DELETE -->
            <div class="modal inmodal fade" name="modal-delete" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                            <h4 name="delete" class="modal-title">Modal title</h4>
                        </div>
                        <form name="delete">
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
                            <div class="modal-footer" align="center" style="display:block" >
                                <button type="button" name="cerrar" class="btn btn-white" data-dismiss="modal">Cerrar</button>
                                <button type="submit" name="submit" class="btn btn-danger">Eliminar Ahora!</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!---  MODAL SAVE PASSWORD -->
            <div class="modal inmodal fade" name="modal-save_password" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                            <h4 name="save_password" class="modal-title">Modal title</h4>
                        </div>
                        <form name="save_password">
                            <div class="modal-body text-center p-3">                
                                <div class="row mt-3">
                                    <div class="col-md-12" align="center">
                                        <i class="fa fa-lock fa-4x"></i>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Usuario</label>
                                            <input type="text" data-mayus="false" name="usuario" class="form-control" autocomplete="off" disabled>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Correo electrónico</label>
                                            <input type="email" name="email" class="form-control" autocomplete="off" disabled>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Nueva Contraseña</label>
                                            <input type="text" name="password" data-mayus="false" class="form-control mayus_false" autocomplete="off" required>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer" align="center" style="display:block">
                                <button type="button" name="cerrar" class="btn btn-white" data-dismiss="modal">Cerrar</button>
                                <button type="submit" class="btn btn-primary">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
                <!-- /.modal -->



        </div>            
        `;

        Usuario.after_render();
    },

    after_render: () => {

        DOM_ID = '#main';
        DOM = $(DOM_ID);        

        /** SUBMIT SAVE */
        DOM.find('form[name="save"]').validate({
            submitHandler: function() {
                Usuario.submit();
            }
        });

        /** SUBMIT SAVE PASSWORD */
        DOM.find('form[name="save_password"]').validate({
            submitHandler: function() {
                Usuario.submit();
            }
        });

        /** SUBMIT DELETE */
        DOM.find('form[name="delete"]').validate({
            submitHandler: function() {
                Usuario.submit();
            }
        });

        /* NUEVO */
        DOM.on('click', 'button[name="nuevo"]', function(e) {
            e.stopImmediatePropagation();
            Usuario.new();
        });

        /* EDITAR */
        DOM.on('click', 'button[name="row-edit"]', function(e) {
            e.stopImmediatePropagation();
            Usuario.edit($(this));
        });

        /* ELIMINAR */
        DOM.on('click', 'a[name="row-delete"]', function(e) {
            e.stopImmediatePropagation();
            Usuario.delete($(this));
        });

        
        /* PREVIEW IMAGEN */
        DOM.find('input[name="imagen"]').change(function(e) {
            e.stopImmediatePropagation();
            HELPER.preview_image(this, DOM.find('img[name="imagen"]'));
        });

        /* EDITAR PASSWORD */
        DOM.on('click', 'a[name="row-edit_password"]', function(e) {
            e.stopImmediatePropagation();
            Usuario.edit_password($(this));
        });

        Usuario.datatable();
        Usuario.get();
        Usuario.select_membresia();

        HELPER.load_component();
    },

    /**** DATA */
    id: null,
    action_submit: null,
    imagen_anterior: null,

    /************ */

    select_membresia: function()
    {
        let select = DOM.find('select[data-select="membresia"]');

        select.append($('<option></option>').attr('value', '').text('SUPER USUARIO'));

        axios.get(BASE_API+'super_usuario/membresia/get_select')
        .then(function (response) {
            response.data.forEach(row => {
                select.append('<option value="'+row.id+'">'+row.text+'</option>');
            });

             let modal = eView.querySelector('div[name="modal-save"] div[class="modal-content"]');

            select.select2({
                dropdownParent: $(modal)
            });
            
            
        }).catch(error => {
            console.log(error);
        }); 
        
    },

    get: function() {
        
        axios.get(BASE_API + 'super_usuario/usuario')
        .then(function(response) {
            Usuario.table.clear().rows.add(response.data).draw(false);
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
                                        <a class="dropdown-item" name="row-edit_password" href="javascript:;"><i class="fadeIn animated bx bx-key" style="color: red; font-size: 18px;"></i> Cambiar Contraseña</a>
                                        <a class="dropdown-item" name="row-delete" href="javascript:;"><i class="fadeIn animated bx bx-trash" style="color: red; font-size: 18px;"></i> Eliminar</a>
                                    </div>
                                </div>
                        `;

                        return html;
                    },
                    width: '100px',
                },
                { title: 'NOMBRE', mData: 'nombre' },
                { title: 'APELLIDO', mData: 'apellido' },
                { title: 'USUARIO', mData: 'usuario' },
                { title: 'EMAIL', mData: 'email' },
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

        DOM.find('h4[name="'+accion+'"]').text('Nuevo Usuario');

        /** DATA */
        HELPER.reset_form(form);

        form.find('img[name="imagen"]').attr('src', BASE_FILES+'images/sin_imagen.jpg');

        this.id = null;
        this.action_submit = accion;
        this.imagen_anterior = null;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    edit: function(row) {
        
        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Editar Usuario');

        /** DATA */
        HELPER.reset_form(form);

        let data = HELPER.get_attr_json(row);

        form.find('input[name="nombre"]').val(data.nombre);
        form.find('input[name="apellido"]').val(data.apellido);
        form.find('input[name="email"]').val(data.email);
        form.find('input[name="usuario"]').val(data.usuario);
        form.find('select[name="id_membresia"]').val(data.id_membresia).change();
        form.find('img[name="imagen"]').attr('src', BASE_FILES+'images/'+data.imagen);

        this.id = data.id;
        this.action_submit = accion;
        this.imagen_anterior = data.imagen;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    edit_password: function(row) {

        let accion = 'save_password';
        let form = DOM.find('form[name="'+accion+'"]');

        DOM.find('h4[name="'+accion+'"]').text('Cambiar Contraseña');

        /** DATA */
        HELPER.reset_form(form);

        let data = HELPER.get_attr_json(row);

        form.find('input[name="usuario"]').val(data.usuario);
        form.find('input[name="email"]').val(data.email);

        this.id = data.id;
        this.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    delete: function(row) {

        let accion = 'delete';
        let form = DOM.find('form[name="'+accion+'"]');

        DOM.find('h4[name="'+accion+'"]').text('Eliminar Usuario');

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
        if (this.imagen_anterior != null) { formData.append('imagen_anterior', this.imagen_anterior); }

        axios({
            method: 'post',
            url: BASE_API + 'super_usuario/usuario/' + this.action_submit,
            data: formData
        })
        .then(function(response) {
            Usuario.get();
            DOM.find('div[name="modal-'+Usuario.action_submit+'"]').modal('hide');
            HELPER.notificacion(response.data.mensaje, 'success');
            ladda.stop();
        }).catch(error => {
            ladda.stop();
        });
    },
} 

export default Usuario;