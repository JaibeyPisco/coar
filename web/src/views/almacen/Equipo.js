    import Comp_print_barcode from './Print_barcode.js'
    
    let DOM, DOM_ID ;
    let Componente = {

        modal: () => {
            let html = /*html*/`
                <!-- MODAL SAVE -->
                <div class="modal inmodal fade" name="modal-save" data-backdrop="static"  role="dialog" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 name="save" class="modal-title">Modal title</h4>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form name="save" enctype="multipart/form-data">
                                <div class="modal-body" >
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="form-group mb-3">
                                                        <label>Nombre <span class="text-danger">(*)</span></label>
                                                        <input type="text" name="nombre" class="form-control form-control-sm" autocomplete="off" >
                                                    </div>
                                                </div>

                                                <div class="col-md-12">
                                                    <div class="form-group mb-3">
                                                        <label>Modelo <span class="text-danger">(*)</span></label>
                                                        <input type="text" name="modelo" class="form-control form-control-sm" autocomplete="off">
                                                    </div>
                                                </div>

                                                <div class="col-md-12">
                                                    <div class="form-group mb-3">
                                                        <label>Marca <span class="text-danger">(*)</span></label>
                                                        <input type="text" name="marca" class="form-control form-control-sm" autocomplete="off">
                                                    </div>
                                                </div>

                                                <div class="col-md-12" id="box_cantidad">
                                                    <div class="form-group mb-3">
                                                        <label>Cantidad <span class="text-danger">(*)</span></label>
                                                        <input type="number" name="cantidad" class="form-control form-control-sm" autocomplete="off" min="1">
                                                    </div>
                                                </div>
                                                                        
                                                <div class="col-md-12">
                                                    <div class="row">
                                                        <div class="col-md-8">
                                                            <div class="form-group mb-3">
                                                                <label>Caracteristica </label>
                                                                <input type="file" name="archivo" class="form-control form-control-sm" autocomplete="off">
                                                            </div>
                                                        </div>
                                                        <div class="col-md-4" name="ver_archivo" style="margin-top:25px !important;"></div>
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="form-group mb-3">
                                                        <label>Vida Util <span class="text-danger">(*)</span></label>
                                                        <input type="text" name="vida_util" class="form-control form-control-sm" autocomplete="off" >
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label>Descripción <span class="text-danger">(*)</span></label>
                                                        <textarea type="text" name="descripcion" class="form-control form-control-sm" rows="3" autocomplete="off" ></textarea>
                                                    </div>
                                                </div>
                                            </div>                                             
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer" align="center" style="display:block">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                    <button type="submit" name="submit" class="btn btn-primary">Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            `;

            return html;
        },

        render: async (d, parent_comp = false) => {

            Componente.parent_comp = parent_comp;

            let main_random = 'main_'+Math.random().toString(36).substr(2);

            $('#'+main_random).off();

            if(parent_comp != false)
            {
                d.html(`
                    <div id="`+main_random+`">`+Componente.modal(true)+`</div>
                `);
            }
            else
            {
                d.innerHTML = `

                <div id="`+main_random+`">
                    <!--breadcrumb-->
                    <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                        <div class="breadcrumb-title pe-3">Almacén</div>
                        <div class="ps-3">
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb mb-0 p-0">
                                    <li class="breadcrumb-item"><a href="javascript:;"><i class="fadeIn animated bx bx-cabinet"></i></a>
                                    </li>
                                    <li class="breadcrumb-item active" aria-current="page">Equipo</li>
                                </ol>
                            </nav>
                        </div>
                        <div class="ms-auto">
                            <div class="btn-group">
                                <button type="button" class="btn btn-success px-4" style="font-size:15px;" name="nuevo"><i class="lni lni-circle-plus" style="font-size:15px;"></i>Nuevo</button>
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

                    `+Componente.modal()+`

                    <!-- MODAL DELETE -->
                    <div class="modal inmodal fade" name="modal-delete" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
                        <div class="modal-dialog modal-sm">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 name="delete" class="modal-title">Modal title</h4>
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
                                        <button type="submit" name="submit" class="btn btn-danger">Eliminar Ahora!</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <!-- MODAL GENERAR CODIGO EN BARRA -->
                    <div class="modal inmodal fade" name="modal-generar_codigo_barra" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
                        <div class="modal-dialog modal-md">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 name="generar_codigo_barra" class="modal-title">Modal title</h4>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <form name="generar_codigo_barra">
                                    <div class="modal-body" >
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col-md-12" align="center">
                                                        <div id="barcode_print"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>                              
                                    </div>
                                    <div class="modal-footer" align="center" style="display:block" >
                                        <button type="button" name="cerrar" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                        <button type="submit" name="submit" class="btn btn-success">Generar Impresión</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <!---  MODAL SUSPENDER -->
                    <div class="modal inmodal fade" name="modal-save_suspendido" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
                        <div class="modal-dialog modal-sm">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 name="save_suspendido" class="modal-title">Modal title</h4>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <form name="save_suspendido">
                                    <div class="modal-body text-center p-3">                
                                        <div class="row mt-3">
                                            <div class="col-md-12 mb-4" align="center">
                                                <i class="lni lni-pause" style="font-size:80px; color:red"></i><br/>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label>Nombre</label>
                                                    <input type="text" data-mayus="false" name="nombre_suspendido" class="form-control form-control-sm" autocomplete="off" disabled>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer" align="center" style="display:block">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                        <button type="submit" class="btn btn-warning">Suspender Ahora!</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- /.modal -->

                    <!---  MODAL ACTIVAR -->
                    <div class="modal inmodal fade" name="modal-save_activar" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
                        <div class="modal-dialog modal-sm">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 name="save_activar" class="modal-title">Modal title</h4>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <form name="save_activar">
                                    <div class="modal-body text-center p-3">                
                                        <div class="row mt-2 mb-3">
                                            <div class="col-md-12 mb-4" align="center">
                                                <i class="lni lni-play" style="font-size:80px; color:green"></i><br/>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group mb-3">
                                                    <label>Nombre</label>
                                                    <input type="text" data-mayus="false" name="nombre_activar" class="form-control form-control-sm" autocomplete="off" disabled>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer" align="center" style="display:block">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                        <button type="submit" class="btn btn-success">Activar Ahora!</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- /.modal -->

                </div>
                `;

            }

            await Componente.after_render(main_random);
            HELPER.load_component();

        },

        after_render: async (main_random) => {

            DOM_ID = '#'+main_random;
            DOM = $(DOM_ID);

            /** SUBMIT SAVE */
            DOM.find('form[name="save"]').validate({

                /* REGLAS */
                rules: {
                    nombre: {required:true},
                    modelo: {required:true},
                    marca: {required:true},
                    caracteristica: {required:true},
                    descripcion: {required:true},
                    vida_util: {required:true}
                },

                messages: {
                    nombre: 'Nombre',
                    modelo: 'Modelo',
                    marca: 'Marca',
                    caracteristica: 'Caracteristicas',
                    descripcion: 'Descripcion',
                    vida_util: 'Vida Util'
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

            /** SUBMIT GENERAR CODIGO EN BARRA */
            DOM.find('form[name="generar_codigo_barra"]').validate({
                submitHandler: function() {

                    axios.get(BASE_API+'almacen/equipo/get_equipo_id?id='+Componente.id)
                    .then(function (response) {

                        console.log("datasa: ", response.data);

                        var fechaActual = new Date();
                        var anio = fechaActual.getFullYear();
                        var mes = fechaActual.getMonth() + 1;
                        var anioBimestre = anio + "-";

                        if (mes == 1 || mes == 2 || mes == 3 || mes == 4 || mes == 5 || mes == 6) {
                            anioBimestre += "I";
                        } else {
                            anioBimestre += "II";
                        }

                        Comp_print_barcode.producto_unico(response.data, anioBimestre);
                    
                    }).catch(error => {
                        console.log(error);
                    });

                }
            });

            /** SUBMIT SAVE SUSPENDIDO */
            DOM.find('form[name="save_suspendido"]').validate({
                submitHandler: function() {
                    Componente.submit();
                }
            });

            /** SUBMIT SAVE ACTIVAR */
            DOM.find('form[name="save_activar"]').validate({
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

            /* GENERAR CODIGO EN BARRA */
            DOM.on('click', 'a[name="row-print_barcode"]', function(e) {
                e.stopImmediatePropagation();
                Componente.generar_codigo_barra($(this));
            });

            /* ELIMINAR */
            DOM.on('click', 'a[name="row-delete"]', function(e) {
                e.stopImmediatePropagation();
                Componente.delete($(this));
            });

            /* SUSPENDER  */
            DOM.on('click', 'a[name="row-suspender"]', function(e) {
                e.stopImmediatePropagation();
                Componente.suspender($(this));
            });

            /* ACTIVAR  */
            DOM.on('click', 'a[name="row-activar"]', function(e) {
                e.stopImmediatePropagation();
                Componente.activar($(this));
            });

            Componente.datatable();
            Componente.get();

            HELPER.load_component();
        },

        /**** DATA */
        id: null,
        action_submit: null,
        archivo_anterior: null,
        /************ */

        get: function() {

            axios.get(BASE_API + 'almacen/equipo')
            .then(function(response) {
                Componente.table.clear().rows.add(response.data).draw(false);
            }).catch(error => {
                console.log(error);
            });
        },

        datatable: function() {
            this.table = DOM.find('table[name="registros"]').DataTable({
                lengthChange:false,
                paginate: false,
                columns: [
                        { title: 'ID', mData: 'id', visible:false },
                        {
                        title: 'ACCIÓN',
                        defaultContent: ``,
                        render: function(data, type, row) {

                            let opcion_suspender = ' <a class="dropdown-item" name="row-suspender" href="javascript:;"><i class="lni lni-pause" style="color: red; font-size:14px;"></i> Suspender</a>';

                            if(row.fl_suspendido == 1)
                            {
                                opcion_suspender = '<a class="dropdown-item"name="row-activar" href="javascript:;"><i class="lni lni-play text-success"></i> Activar</a>';
                            }
                             
                            var html = `
                            <div class="btn-group" style="width:80px;">
                                <button type="button" class="btn btn-default btn-sm" name="row-edit"><i class="fadeIn animated bx bx-edit" style="color: #8e8e10; font-size: 20px;"></i></button>
                                <button type="button" class="btn btn-primary btn-sm split-bg-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"><span class="visually-hidden">Toggle Dropdown</span></button>
                                <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-end">
                                    <a class="dropdown-item" name="row-print_barcode" href="javascript:;"><i class="fadeIn animated bx bx-barcode-reader" style="font-size: 18px;"></i> Codigo en Barra</a>	
                                    `+opcion_suspender+`
                                    <a class="dropdown-item" name="row-delete" href="javascript:;"><i class="fadeIn animated bx bx-trash" style="color: red; font-size: 18px;"></i> Eliminar</a>
                                </div>
                            </div>
                        `;

                        return html;
                        },
                        width: '100px',
                    },
                    { title: 'ESTADO', render: function(data, type, row) {
                    
                        let html = '<span class="badge bg-gradient-quepal text-white shadow-sm w-100">ACTIVO</span>'
                        
                        if(row.fl_suspendido == 1)
                        {
                            html = '<span class="badge bg-gradient-bloody text-white shadow-sm w-100">SUSPENDIDO</span>';
                        }
    
                        return html;
                    } },
                    { title: 'SERIE Y NUMERO', mData: 'serie_numero' },
                    { title: 'NOMBRE', mData: 'nombre' },
                    { title: 'MODELO', mData: 'modelo' },
                    { title: 'MARCA', mData: 'marca' },
                    { title: 'ARCHIVO', 
                        defaultContent: ``,                    
                        render: function(data, type, row) {
                            return  (row.archivo != null) ? `<a target="_blank" class="btn btn-sm btn-outline-primary radius-30" href="`+BASE_FILES+`uploads/`+row.archivo+`" style="font-size:14px;"><i class="lni lni-eye"></i> Ver / <i class='bx bx-download'></i> Descargar</a>` : '';
                        }, 
                     },
                    { title: 'DESCRIPCION', mData: 'descripcion' },
                    { title: 'VIDA UTIL', mData: 'vida_util' },
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

            let accion = 'save';
            let form = DOM.find('form[name="save"]');

            DOM.find('h4[name="'+accion+'"]').text('Nuevo Equipo');
            DOM.find('div[name="ver_archivo"]').html("");

            /** DATA */
            HELPER.reset_form(form);

            //tenemos que activar el input de cantidad
            DOM.find('div[id="box_cantidad"]').prop('disabled', false);
            DOM.find('div[id="box_cantidad"]').show();
            //fin

            this.id = null;
            this.action_submit = accion;
            this.archivo_anterior = null;

            DOM.find('div[name="modal-'+accion+'"]').modal('show');

        },

        edit: function(row) {

            let accion = 'save';
            let form = DOM.find('form[name="save"]');

            DOM.find('h4[name="'+accion+'"]').text('Editar Equipo');

            /** DATA */
            HELPER.reset_form(form);

            DOM.find('div[name="ver_archivo"]').html("");

            let data = HELPER.get_attr_json(row);

            form.find('input[name="nombre"]').val(data.nombre);
            form.find('input[name="modelo"]').val(data.modelo)
            form.find('input[name="marca"]').val(data.marca);

            //tenemos que desactivar el input de cantidad
            DOM.find('div[id="box_cantidad"]').prop('disabled', true);
            DOM.find('div[id="box_cantidad"]').hide();
            //fin

            form.find('textarea[name="descripcion"]').val(data.descripcion);
            form.find('input[name="vida_util"]').val(data.vida_util);

            this.id = data.id;
            this.archivo_anterior = data.archivo;
            this.action_submit = accion;

            if(data.archivo != null){
                DOM.find('div[name="ver_archivo"]').append(`<a target="_blank" href="`+BASE_FILES+`uploads/`+data.archivo+`"><i class="fa fa-download"></i> Ver / Descargar</a>`)
            }else{
                DOM.find('div[name="ver_archivo"]').append(`<p>No Disponible</p>`)
            }

            DOM.find('div[name="modal-'+accion+'"]').modal('show');
        },

        generar_codigo_barra: function(row) {

            let accion = 'generar_codigo_barra';
            let form = DOM.find('form[name="'+accion+'"]');
    
            DOM.find('h4[name="'+accion+'"]').text('Generar Codigo en Barra');
    
            /** DATA */
            HELPER.reset_form(form);
    
            let data = HELPER.get_attr_json(row);

            console.log("codigo en barras: ", data);
            
            DOM.find('div[id="barcode_print"]').barcode(data.serie_numero, "code128", {
                barWidth: 2
            });
    
            this.id = data.id;
            this.action_submit = accion;
    
            DOM.find('div[name="modal-'+accion+'"]').modal('show');
        },

        suspender: function(row) {

            let accion = 'save_suspendido';
            let form = DOM.find('form[name="'+accion+'"]');
    
            DOM.find('h4[name="'+accion+'"]').text('Suspender Equipo');
    
            /** DATA */
            HELPER.reset_form(form);
    
            let data = HELPER.get_attr_json(row);

            form.find('input[name="nombre_suspendido"]').val(data.nombre);
    
            this.id = data.id;
            this.action_submit = accion;
    
            DOM.find('div[name="modal-'+accion+'"]').modal('show');
        },
    
        activar: function(row) {
    
            let accion = 'save_activar';
            let form = DOM.find('form[name="'+accion+'"]');
    
            DOM.find('h4[name="'+accion+'"]').text('Activar Equipo');
    
            /** DATA */
            HELPER.reset_form(form);
    
            let data = HELPER.get_attr_json(row);

            form.find('input[name="nombre_activar"]').val(data.nombre);
    
            this.id = data.id;
            this.action_submit = accion;
    
            DOM.find('div[name="modal-'+accion+'"]').modal('show');
        },

        delete: function(row) {

            let accion = 'delete';
            let form = DOM.find('form[name="'+accion+'"]');

            DOM.find('h4[name="'+accion+'"]').text('Eliminar Equipo');

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

            if (this.archivo_anterior != null) { formData.append('archivo_anterior', this.archivo_anterior); }

            axios({
                method: 'post',
                url: BASE_API + 'almacen/equipo/' + this.action_submit,
                data: formData
            })
            .then(function(response) {
                DOM.find('div[name="ver_archivo"]').html("");
                DOM.find('div[name="modal-'+Componente.action_submit+'"]').modal('hide');
                Componente.get();
                HELPER.notificacion(response.data.mensaje, response.data.tipo);
                ladda.stop();
            }).catch(error => {
                ladda.stop();
            });
        },
    }

    export default Componente;