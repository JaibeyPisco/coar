let DOM, DOM_ID ;
let Componente = {
    render: async (d) => {

        $('#main').off();
        d.innerHTML = /*html*/ `

        <div id="main">
            <!--breadcrumb-->
            <div class="page-breadcrumb d-sm-flex align-items-center mb-3">
                <div class="breadcrumb-title pe-3">Almacén</div>
                <div class="ps-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0 p-0">
                            <li class="breadcrumb-item"><a href="javascript:;"><i class="fadeIn animated bx bx-cabinet"></i></a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Compra Equipo</li>
                        </ol>
                    </nav>
                </div>
                <div class="ms-auto">
                    <div class="btn-group">
                        <button type="button" class="btn btn-success" style="font-size:15px;" name="nuevo"><i class="lni lni-circle-plus" style="font-size:15px;"></i> Nuevo</button>
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
                            <table name="registros" id="registros" class="table table-striped table-hover table-bordered border-default border-2" style="width:100%; font-size: 13px; font-weight: 500; vertical-align: middle;"></table>
                        </div>
                    </div>
                </div>
            </section>
            <!-- /.content -->

            <!-- MODAL SAVE -->
            <div class="modal inmodal fade" name="modal-save" data-backdrop="static"  role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-fullscreen">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 name="save" class="modal-title">Modal title</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form name="save">
                            <div class="modal-body" >
                                <div class="row">
                                    <div class="col-md-3">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <span style="font-size: 18px;"><b>Informacion de Compra</b></span>
                                                        <div class="card border-primary border-bottom border-3" style="margin: 0px 0px 15px 0px;">
                                                            <div class="card-body">
                                                                <div class="col-md-12">
                                                                    <div class="form-group mb-3">
                                                                        <label>Fecha Requerida <span class="text-danger">(*)</span></label>
                                                                        <input type="date" name="fecha_requerida" class="form-control form-control-sm" autocomplete="off">
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-12">
                                                                    <div class="form-group mb-3">
                                                                        <label>Tipo Documento <span class="text-danger">(*)</span></label>
                                                                        <select name="id_tipo_documento" class="form-control form-control-sm" autocomplete="off">
                                                                            <option value="">Seleccione una opcion...</option>
                                                                            <option value="BOLETA">BOLETA</option>
                                                                            <option value="FACTURA">FACTURA</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-12 mb-3">
                                                                    <div class="form-group">
                                                                        <label>Proveedor <span class="text-danger">(*)</span></label>
                                                                        <select name="id_proveedor" data-select="PROVEEDOR" class="form-control form-control-sm" autocomplete="off"></select>
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-12">
                                                                    <div class="row">
                                                                        <div class="col-md-6" align="left">
                                                                            <div class="form-group">
                                                                                <label>Serie <span class="text-danger">(*)</span></label>
                                                                                <input type="text" name="serie_documento_compra" class="form-control form-control-sm" autocomplete="off">
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-md-6" align="right">
                                                                            <div class="form-group">
                                                                                <label>Numero <span class="text-danger">(*)</span></label>
                                                                                <input type="number" name="numero_documento_compra" class="form-control form-control-sm" autocomplete="off">
                                                                            </div>
                                                                        </div>
                                                                    </div> 
                                                                </div>
                                                                <div class="col-md-12 mt-3">
                                                                    <div class="form-group">
                                                                        <label>Archivo <span class="text-danger">(*)</span></label>
                                                                        <input type="file" name="archivo" class="form-control form-control-sm" autocomplete="off">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                     
                                                </div>
                                            </div> 
                                        </div>
                                    </div>
                                    <div class="col-md-9">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <span style="font-size: 18px;"><b>Informacion de Equipo</b></span>
                                                <div class="card border-primary border-bottom border-3" style="margin: 0px 0px 15px 0px;">
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-md-8">
                                                                <div class="form-group mb-3">
                                                                    <label>Equipo <span class="text-danger">(*)</span></label>
                                                                    <input type="text" name="nombreEquipo" class="form-control form-control-sm" autocomplete="off" placeholder="Nombre">   
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group mb-3">
                                                                    <label>Precio Compra <span class="text-danger">(*)</span></label>
                                                                    <input type="number" name="precio_compra" class="form-control form-control-sm" autocomplete="off" placeholder="0">
                                                                </div>
                                                                
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group mb-3">
                                                                    <label>Lote <span class="text-danger">(*)</span></label>
                                                                    <input type="text" name="lote" class="form-control form-control-sm" autocomplete="off" placeholder="lote">   
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label>Cantidad <span class="text-danger">(*)</span></label>
                                                                    <input type="number" name="cantidad" class="form-control form-control-sm" autocomplete="off" placeholder="0">   
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="form-group">
                                                                    <label>Fecha de Vencimiento <span class="text-danger">(*)</span></label>
                                                                    <input type="date" name="fecha_vencimiento" class="form-control form-control-sm" autocomplete="off">   
                                                                </div>
                                                            </div>
                                                        </div>                                                       
                                                    </div>                     
                                                </div>
                                            </div>
                                            <div class="col-md-12">
                                                <span style="font-size: 18px;"><b>Detalle de la Compra</b></span>
                                                <div class="card border-primary border-bottom border-3" style="margin: 0px 0px 15px 0px; padding: 10px 0px 10px 0px;">
                                                    <div class="card-body">
                                                        <div class="row">
                                                            <div class="col-md-12">
                                                                <table class="table table-striped table-hover table-bordered" id="tabla-productos">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Equipo</th>
                                                                            <th>Lote</th>
                                                                            <th>F. Vencimiento</th>
                                                                            <th>Precio Compra</th>
                                                                            <th>Cantidad</th>
                                                                            <th>Subtotal</th>
                                                                            <th></th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody name="detalle_producto_compra">
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <div class="row" style="padding: 0px 10px 0px 0px;">
                                                                <div class="col-md-7"></div>
                                                                <div class="col-md-5">
                                                                    <div>
                                                                        <label>Total a Pagar:</label>
                                                                        <input class="form-control form-control-sm" readonly type="text" name="pago_total" placeholder="0">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-12" align="right">
                                                <div class="form-group">
                                                    <button type="button" name="btnAgregarProducto" class="btn btn-success"><i class="fa fa-plus"></i> Agregar Producto</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="modal-footer" align="center" style="display:block">
                                    <button type="button" name="cerrar" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                    <button type="submit" name="submit" class="btn btn-primary">Guardar</button>
                                </div>
                            </div> 
                        </form>
                    </div>
                </div>
            </div> 
 
            <!-- MODAL AUTORIZAR  COMPRA -->
             <div class="modal inmodal fade" name="modal-autorizar_compra" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
                 <div class="modal-dialog modal-sm">
                     <div class="modal-content">
                         <div class="modal-header">
                            <h4 name="autorizar_compra" class="modal-title">AUTORIZAR COMPRA</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form name="autorizar_compra">
                            <div class="modal-body">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-12" align="center">
                                                <i class="fadeIn animated bx bx-check" style="color: green; font-size: 80px;"></i>
                                            </div>
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label>Comentario</label>
                                                    <textarea required class="form-control" name="comentario"  rows="3"></textarea>
                                                </div>                         
                                            </div>
                                            <div class="col-md-12"  align="center" style="padding-top:10px;">
                                                <label><input type="checkbox" name="confirmacion" required/>
                                                    Confirmo realizar la autorización</label>                                              
                                            </div>
                                        </div>
                                    </div>
                                </div>          
                             </div>
                             <div class="modal-footer" align="center" style="display:block" >
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button> 
                                <button type="submit" name="submit" class="btn btn-success">Autorizar Ahora!</button>
                             </div>
                        </form>
                     </div>
                 </div>
             </div>
 
            <!-- MODAL DENEGADO -->
            <div class="modal inmodal fade" name="modal-denegar_compra" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 name="denegar_compra" class="modal-title">DENEGAR COMPRA</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form name="denegar_compra">
                            <div class="modal-body">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-12" align="center">
                                                <i class="fadeIn animated bx bx-x" style="color: red; font-size: 80px;"></i>
                                            </div>                                     
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label>Comentario</label>
                                                    <textarea required name="comentario" class="form-control" rows="3"></textarea>
                                                </div>                         
                                            </div>
                                            <div class="col-md-12"  align="center" style="padding-top:10px;">
                                                <label><input type="checkbox" name="confirmacion" required/>
                                                    Confirmo realizar la denegación</label>
                                                <p style="color:red;">Esta acción no se podrá revertir</p>
                                            </div>
                                        </div>
                                    </div>        
                                </div>
                            </div>
                             <div class="modal-footer" align="center" style="display:block" >
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button> 
                                <button type="submit" name="submit" class="btn btn-danger">Denegar Ahora!</button>
                             </div>
                        </form>
                    </div>
                </div>
            </div>

             <!-- MODAL VER DETALLE COMPRA -->
             <div class="modal inmodal fade" name="modal-detalle_compra" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
                 <div class="modal-dialog modal-xl">
                     <div class="modal-content">
                         <div class="modal-header">
                             <h4 name="detalle_compra" class="modal-title">Modal title</h4>
                             <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                         </div>
                             <div class="modal-body">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-12" align="center" style="margin-top:10px;">
                                                <table class="table table-striped table-hover table-bordered border-default border-2" style="width:100%; font-size: 13px; font-weight: 500; vertical-align: middle;">
                                                    <thead>
                                                        <tr>
                                                            <th>Equipo</th>
                                                            <th>Lote</th>
                                                            <th>F. Vencimiento</th>
                                                            <th>Precio</th>
                                                            <th>Cantidad</th>
                                                            <th>Subtotal</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody name="ver_compra_detalle"></tbody>
                                                </table> 
                                            </div>                                   
                                        </div>
                                    </div>
                                </div>
                                
                             </div>
                             <div class="modal-footer" align="center" style="display:block">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button> 
                             </div>
                     </div>
                 </div>
             </div>

        </div>
        `;
        await Componente.after_render();
    },

    after_render: async () => {

        /* NOTIFICACIONES ENTRADA SALIDA DE PRODUCTOS*/
        // GLOBAL.socket.on('notificacion_area', (data) => {
        //     Componente.table.ajax.reload(null, false);
        // });

        DOM_ID = '#main';
        DOM = $(DOM_ID);

        DOM.on('keyup','input[name="equipo_precio_compra"]',function(e){
            e.stopImmediatePropagation();
            let codigo = $(this).parents('tr')[0].dataset.codigo;
            Componente.calcular_monto_subtotal(codigo);
        });

        DOM.on('keyup','input[name="equipo_cantidad"]',function(e){
            e.stopImmediatePropagation();
            let codigo = $(this).parents('tr')[0].dataset.codigo;
            Componente.calcular_monto_subtotal(codigo);
        });

        /** SUBMIT SAVE */
        DOM.find('form[name="save"]').validate({

            /* REGLAS */
            rules: {
                fecha_requerida: {required: true},
                id_tipo_documento: {required: true},
                id_proveedor: {required: true},
                serie_documento_compra: {required: true},
                numero_documento_compra: {required: true},

            },

            messages: {
                fecha_requerida: 'Fecha Requerida',
                id_tipo_documento: 'Tipo de Compra',
                id_proveedor: 'Proveedor',
                serie_documento_compra: 'Serie',
                numero_documento_compra: 'Numero',
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

        /* AUTORIZAR */
        DOM.on('click', 'a[name="row-autorizar"]', function(e) {
            e.stopImmediatePropagation();
            Componente.autorizar_compra($(this));
        });

        /* DENEGAR */
        DOM.on('click', 'a[name="row-denegar"]', function(e) {
            e.stopImmediatePropagation();
            Componente.denegar_compra($(this));
        });

        /* VER DETALLE COMPRA */
        DOM.on('click', 'span[name="ver_detalle_compra"]', function(e) {
            e.stopImmediatePropagation();
            Componente.ver_detalle_compra($(this));
        });

        /* EDITAR */
        DOM.on('click', 'button[name="row-edit"]', function(e) {
            e.stopImmediatePropagation();
            Componente.edit($(this));
        });
 

        /* TESTEAR MODAL DE COMPRA */
        //Agregar una fila
        DOM.on('click','button[name="btnAgregarProducto"]', function(){
            Componente.row_agregar_producto()
        });
        //Eliminar una fila
        DOM.on('click','button[name="btnEliminarProducto"]', function(e){
            $(this).each(function(){
                console.log($(this).find('input[name="producto_subtotal"]').val());
            })
            let codigo = $(this).parents('tr')[0].dataset.codigo;
            Componente.quitar_detalle_productos(codigo);
        });

        /** SUBMIT ACEPTAR PETICION */
        DOM.find('form[name="autorizar_compra"]').validate({
            submitHandler: function() {
                Componente.submit();
            }
        });

        /** SUBMIT DENEGAR PETICION */
        DOM.find('form[name="denegar_compra"]').validate({
            submitHandler: function() {
                Componente.submit();
            }
        });
        
        DOM.find('select[name="id_tipo_documento"]').select2().on('select2:select', function(e){
            Componente.id_tipo_documento = e.params.data.id
        })

        DOM.find('select[name="id_proveedor"]').select2().on('select2:select', function(e){
            Componente.id_proveedor = e.params.data.id
        })

        /* SELECCIONANDO UN EQUIPO */
        DOM.find('select[name="id_equipo"]').select2().on('select2:select', function(e){
            Componente.id_equipo = e.params.data.id;
            Componente.nombreEquipo = e.params.data.text;
        })

        /* TESTEADA FINAL */

        Componente.datatable();

        HELPER.load_component();

        await Componente.select_proveedor();
        //await Componente.select_equipo();
    },

    /**** DATA ****/
    id: null,
    serie_numero_compra_peticion: null,
    action_submit: null,
    imagen_anterior: null,
    id_tipo_documento: null,
    id_proveedor: null,
    id_equipo: null,
    id_categoria: null,
    id_producto: null,
    id_detalle_compra: null,
    precio_compra: "",
    cantidad: "",
    nombreEquipo: "",
    nombreProducto: null,
    nombreCategoria: null,
    precio_total: null,
    lote: null,
    fecha_vencimiento: null,
    i: 0,
    total_saldo: null,
    detener: false,
    archivo_anterior: null,
    
    //Aceptar Peticion Compra
    array_productos_detalle_compra: null,

    /*************/

    datatable: function() {
        this.table = DOM.find('table[name="registros"]').DataTable({
            ajax:BASE_API + 'almacen/compra_equipo',
            lengthChange:false,
            paginate: false,
            columns: [
                { title: 'ID', mData: 'id', visible:false },
                {
                    title: 'ACCIÓN',
                    defaultContent: ``,
                    render: function(data, type, row) {
                        var html = `
                            <div class="btn-group" style="width:90px;">
                                <button type="button" class="btn btn-default btn-sm" name="row-edit"><i class="fadeIn animated bx bx-edit" style="color: #8e8e10; font-size: 20px;"></i></button>
                                <button type="button" class="btn btn-primary btn-sm px-0 split-bg-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"><span class="visually-hidden">Toggle Dropdown</span></button>                                    <i class="fa fa-angle-down"></i>
                                </button>
                                <ul class="dropdown-menu dropdown-menu-left" role="menu">
                                    <li><a class="dropdown-item" name="row-autorizar" href="javascript:;"><i class="fadeIn animated bx bx-check" style="color: green; font-size: 18px;"></i> Aceptar</a></li>
                                    <li><a class="dropdown-item" name="row-denegar" href="javascript:;"><i class="fadeIn animated bx bx-x" style="color: red; font-size: 18px;"></i> Rechazar </a></li> 
                                </ul>
                            </div>
                            `;

                        const estado = { 
                            'ANULADO': 0,
                            'REGISTRADO': 1,
                            'ACEPTADO': 2,
                            'RECHAZADO': 3,
                        }

                        if (row.id_usuario == GLOBAL.usuario.id){

                            if (GLOBAL.usuario.fl_supervisor == 1){

                                if(row.estado == estado.RECHAZADO || row.estado == estado.ANULADO || row.estado == estado.ACEPTADO){

                                    html = ``;
                                }

                            } else if (GLOBAL.usuario.fl_supervisor != 1){

                                if(row.estado == estado.REGISTRADO){
                                    html = `
                                        <div class="btn-group" style="width:90px;">
                                            <button type="button" class="btn btn-default btn-sm" name="row-edit"><i class="fadeIn animated bx bx-edit" style="color: #8e8e10; font-size: 20px;"></i></button>
                                        </div>
                                    `;
                                }

                                if(row.estado == estado.RECHAZADO){

                                    html = ``;
                                }
    
                                if(row.estado == estado.ACEPTADO){

                                    html = ``;

                                } 

                                if(row.estado == estado.ANULADO){

                                    html = ``;

                                } 
                            }

                        } else if (row.id_usuario != GLOBAL.usuario.id){

                            if (GLOBAL.usuario.fl_supervisor == 1){

                                if(row.estado == estado.RECHAZADO || row.estado == estado.ANULADO || row.estado == estado.ACEPTADO){
                                    html = ``;
                                }

                            } else if (GLOBAL.usuario.fl_supervisor != 1){
                                html = '';
                            }

                        }

                        return html;
                    }
                },
                { title: 'ESTADO', defaultContent:``,
                    render: function(data, type, row) {
                        const estado = {
                            'ANULADO': 0,
                            'REGISTRADO': 1,
                            'ACEPTADO': 2,
                            'RECHAZADO': 3,
                        }

                        if(row.estado  == estado.ANULADO){
                            return `<span class="badge bg-gradient-moonlit text-white shadow-sm w-100">ANULADO</span>`;
                        }
                        if(row.estado  == estado.REGISTRADO){
                            return `<span class="badge bg-gradient-deepblue text-white shadow-sm w-100">REGISTRADO</span>`;
                        }
                        if(row.estado  == estado.ACEPTADO){
                            return `<span class="badge bg-gradient-lush text-white shadow-sm w-100">ACEPTADO</span>`;
                        }
                        if(row.estado  == estado.RECHAZADO){
                            return `<span class="badge bg-gradient-burning text-white shadow-sm w-100">RECHAZADO</span>`;
                        }
                        
                    },
                },

                { title: 'FECHA REQUERIDAD', mData: 'fecha_requerida' },
                { title: 'TIPO DOCUMENTO', mData: 'tipo_documento' },

                { title: 'NÚMERO DOC.', defaultContent:``,render: function(data, type, row) {
                        return row.serie_documento + '-' +  row.numero_documento ;
                    },
                },
                
                { title: 'MONTO TOTAL', mData: 'monto_total' },
                { 
                    title: 'DETALLE', 
                    defaultContent: ``,
                    render:  function(data, type, row){
                        return `<span class="btn btn-sm btn-outline-primary radius-30" style="font-size:14px;" name="ver_detalle_compra"> <i class="lni lni-eye"></i> Ver detalle</span>`;
                    }
                },
                { title: 'ARCHIVO', 
                    defaultContent: ``,                    
                    render: function(data, type, row) {
                        return  (row.archivo != null) ? `<a target="_blank" class="btn btn-sm btn-outline-primary radius-30" href="`+BASE_FILES+`uploads/`+row.archivo+`" style="font-size:14px;"><i class="lni lni-eye"></i> Ver / <i class='bx bx-download'></i> Descargar</a>` : '';
                    }, 
                },
            ],
            createdRow: function (row, data, indice) {
                $(row).attr('data-json', JSON.stringify(data));

                if(data.estado == 0 || data.estado == 3)
                {
                    $(row).css('text-decoration', 'line-through');
                    $(row).css('color', 'red');
                }
            },
        });
    },

    validacion_campos: () => {
        DOM.find('input[name="delete"]').val();
    },
    quitar_detalle_productos: (codigo) => {
        DOM.find('tr[data-codigo="'+codigo+'"]').remove();
        Componente.calcular_totales();
    },

    calcular_totales: () => {

        let total_importe = 0;

        DOM.find('tbody[name="detalle_producto_compra"] tr').each(function(){
            let importe = $(this).find('input[name="equipo_subtotal"]').val();
            importe = parseFloat((importe != '') ? importe : 0);
            total_importe = total_importe + importe;
        });

        DOM.find('input[name="pago_total"]').val(total_importe.toFixed(2))
    },
    
    row_agregar_producto: () =>{

        var equipoExiste = false;
        
        Componente.nombreEquipo = DOM.find('input[name="nombreEquipo"]').val();
        Componente.precio_compra = DOM.find('input[name="precio_compra"]').val();
        Componente.cantidad = DOM.find('input[name="cantidad"]').val();
        Componente.lote = DOM.find('input[name="lote"]').val();
        Componente.fecha_vencimiento = DOM.find('input[name="fecha_vencimiento"]').val();
        
        if(Componente.nombreEquipo == ""){
            HELPER.notificacion('Ingrese el nombre del equipo', 'warning')
            return;
        }else if(Componente.precio_compra == ""){
            HELPER.notificacion('Ingrese el precio de compra del equipo', 'warning')
            return;
        }else if(Componente.cantidad == ""){
            HELPER.notificacion('Ingrese la cantidad del equipo', 'warning')
            return;
        }else if(Componente.lote == ""){
            HELPER.notificacion('Ingrese el lote del equipo', 'warning')
            return;
        }else if(Componente.fecha_vencimiento == ""){
            HELPER.notificacion('Ingrese la fecha de vencimiento del equipo', 'warning')
            return;
        }

        DOM.find('tbody[name="detalle_producto_compra"] tr').each(function(){
            let id = $(this).find('input[name="id_producto"]').val();
            if(parseInt(id) == Componente.id_equipo){
                equipoExiste = true;
            }
        });

        if(equipoExiste){
            HELPER.notificacion("El equipo ya se encuentra registrado en la tabla", "warning");
            return;
        }

        let codigo = Math.random().toString(36).substr(2);

        //calcular el subtotal de precio * cantidad
        let subtotal = parseFloat(Componente.precio_compra) * parseFloat(Componente.cantidad);
         
        var tr = $(`<tr data-codigo="${codigo}">`)
            tr.append(`<td>
                <input readonly type="hidden" value="0" name="id_detalle_compra_equipo"/>
                <input readonly type='text' class='form-control form-control-sm' value="${Componente.nombreEquipo}" name='equipo_nombre'>
            </td>`)
            tr.append(`<td><input class='form-control form-control-sm' value="${Componente.lote}" name='equipo_lote'></td>`)
            tr.append(`<td><input type='date' class='form-control form-control-sm' value="${Componente.fecha_vencimiento}" name='equipo_fecha_vencimiento'></td>`)
            tr.append(`<td><input class='form-control form-control-sm' input-index='precio-${Componente.i}' index='${Componente.i}' value="${parseFloat(Componente.precio_compra).toFixed(2)}" name='equipo_precio_compra'></td>`)
            tr.append(`<td><input class='form-control form-control-sm' input-index='cantidad-${Componente.i}' index='${Componente.i}' value="${Componente.cantidad}" name='equipo_cantidad'></td>`)
            tr.append(`<td><input readonly class='form-control form-control-sm' input-index='subtotal-${Componente.i}' value="${subtotal.toFixed(2)}" name='equipo_subtotal'></td>`)
            tr.append(`<td><button type="button" class="btn btn-danger btn-sm" name="btnEliminarProducto"><i class="lni lni-close" style="font-size: 14px;"></i></button></td>`)
        
        DOM.find('table[id="tabla-productos"]').append(tr);

        Componente.i++;

        Componente.precio_total += subtotal;
        Componente.id_producto = null;
        Componente.precio_compra = "";
        Componente.cantidad = "";

        DOM.find('input[name="precio_compra"]').val("");
        DOM.find('input[name="cantidad"]').val("");
        DOM.find('input[name="lote"]').val("");
        DOM.find('input[name="fecha_vencimiento"]').val("");

        Componente.calcular_totales()
        
    },

    get_detalle_compra_json: (tipo) => {

        let array_data = [];

        DOM.find('tbody[name="detalle_producto_compra"]  tr').each(function(){
            array_data.push({
                id: $(this).find('input[name="id_detalle_compra_equipo"]').val(),
                equipo_nombre: $(this).find('input[name="equipo_nombre"]').val(),
                equipo_precio_compra: $(this).find('input[name="equipo_precio_compra"]').val(),
                equipo_cantidad: $(this).find('input[name="equipo_cantidad"]').val(),
                equipo_subtotal: $(this).find('input[name="equipo_subtotal"]').val(),
                lote: $(this).find('input[name="equipo_lote"]').val(),
                fecha_vencimiento: $(this).find('input[name="equipo_fecha_vencimiento"]').val(),
            });     
        });

        return array_data;
    },

    obtener_un_producto: async (id_producto) =>
    {
        await axios.get(BASE_API+'sistema/producto/get_producto_id?id='+id_producto)
        .then(function (response) {
            let cantidad = parseFloat((response.data.cantidad != '') ? response.data.cantidad : 0);
            let peso = parseFloat((response.data.peso != '') ? response.data.peso : 0);

            if (response.data.cantidad == null && response.data.peso == null){
                HELPER.notificacion("El producto que esta eligiendo no se puede utilizar", "warning");
                DOM.find('button[name="btnAgregarProducto"]').prop("disabled",true);
            }else{
                DOM.find('button[name="btnAgregarProducto"]').prop("disabled",false);
            }
            
        }).catch(error => {
            console.log(error);
        });
    },

    select_proveedor: async () => {

        let select = DOM.find('select[name="id_proveedor"]');

        await axios.get(BASE_API + 'sistema/proveedor/get_select')
        .then(function (response) {

            let html = '<option value="" disasabled>Selecione el proveedor</option>';

            response.data.forEach(row => {
                html += '<option value="'+row.id+'">'+row.text+'</option>';
            });

            select.html(html);
            select.select2();
        }).catch(error => {
            console.log(error);
        });
    },

    //    ========================== FIN SELECT ==============================================

    //FUNCIONES CRUD
    new: function() {
        // LIMPIAR TABLA 
        DOM.find('tbody[name="detalle_producto_compra"] tr').remove();

        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Nueva Compra');

        /** DATA */
        HELPER.reset_form(form);

        this.id = null;
        this.action_submit = accion;
        this.archivo_anterior = null;
        
        DOM.find('input[name="fecha"]').val(HELPER.fecha_actual())
        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    edit: function(row) {

        // LIMPIAR TABLA 
        DOM.find('tbody[name="detalle_producto_compra"] tr').remove();

        let accion = 'save';
        let i = 0;
        let codigo = Math.random().toString(36).substr(2);
        let form = DOM.find('form[name="save"]');
        let codigo_producto_unidad;

        DOM.find('h4[name="'+accion+'"]').text('Editar Producto');

        /** DATA */
        HELPER.reset_form(form);

        let data = HELPER.get_attr_json(row);

        console.log(data);

        this.id = data.id;

        form.find('input[name="fecha_requerida"]').val(data.fecha_requerida);
        form.find('select[name="id_tipo_documento"]').val(data.tipo_documento).change();
        form.find('input[name="serie_documento_compra"]').val(data.serie_documento);
        form.find('input[name="numero_documento_compra"]').val(data.numero_documento);
        form.find('select[name="id_proveedor"]').val(data.id_proveedor).change();

        this.archivo_anterior = data.archivo;

        data.detalle_compra.forEach((row) => {

            var tr = $(`<tr data-codigo="${codigo}">`)
            tr.append(`<td>
                <input type="hidden" value="${row.id_detalle_compra}" name="id_detalle_compra_equipo"/>
                <input type='text' class='form-control form-control-sm' value="${row.nombre_equipo}" name='equipo_nombre'></td>`)
            tr.append(`<td><input class='form-control form-control-sm' value="${row.lote}" name='equipo_lote'></td>`)
            tr.append(`<td><input type='date' class='form-control form-control-sm' value="${row.fecha_vencimiento}" name='equipo_fecha_vencimiento'></td>`)
            tr.append(`<td><input class='form-control form-control-sm' input-index='precio-${i}' index='${i}' value="${parseFloat(row.precio_compra).toFixed(2)}" name='equipo_precio_compra'></td>`)
            tr.append(`<td><input class='form-control form-control-sm' input-index='cantidad-${i}' index='${i}' value="${row.cantidad}" name='equipo_cantidad'></td>`)
            tr.append(`<td><input readonly class='form-control form-control-sm' input-index='subtotal-${i}'  value="${row.subtotal}" name='equipo_subtotal'></td>`)
            tr.append(`<td><button type="button" class="btn btn-danger btn-sm" name="btnEliminarProducto"><i class="lni lni-close" style="font-size: 14px;"></i></button></td>`)
            
            DOM.find('table[id="tabla-productos"]').append(tr);
            
            i++;
            
            codigo = Math.random().toString(36).substr(2);

        })

        form.find('input[name="pago_total"]').val(data.monto_total);

        this.id = data.id;
        this.action_submit = accion;
        Componente.imagen_anterior = data.imagen;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    // enviar_notificacion: (tipo, datos, message, array_agregar_noti) => {
    //     switch (tipo) {
            
    //         case 'creado':
    //             array_agregar_noti.forEach(row => {
    //                 GLOBAL.socket.emit('notificacion_privada', { userId: row.id_receiver, message: message, row: row})
    //             })
    //             break;

    //         case 'autorizado':
    //             GLOBAL.socket.emit('notificacion_privada', { userId: array_agregar_noti.id_receiver, message: message, row: array_agregar_noti })
    //             break;

    //         case 'denegado':
    //             GLOBAL.socket.emit('notificacion_privada', { userId: array_agregar_noti.id_receiver, message: message, row: array_agregar_noti })
    //             break;
            
    //         case 'modificado':
    //             GLOBAL.socket.emit('notificacion_privada', { userId: array_agregar_noti.id_receiver, message: message, row: array_agregar_noti })
    //             break;
            
    //         case 'yomodificado':
    //             GLOBAL.socket.emit('notificacion_area', {'areaId': GLOBAL.usuario.id_area});
    //             break;

    //         default:
    //             break;
    //     }
    // },

      //FUNCIONES CRUD
    autorizar_compra: function(row) {
        DOM.find('div[name="modal-save"]').modal('hide');

        let data = HELPER.get_attr_json(row);
        let accion = 'autorizar_compra';

        this.serie_numero_compra_peticion = data.serie_documento + '-' + data.numero_documento;
        this.array_productos_detalle_compra = data.detalle_compra;
        this.id = data.id;
        this.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    denegar_compra: function(row) {
        DOM.find('div[name="modal-save"]').modal('hide');

        let data = HELPER.get_attr_json(row);
        let accion = 'denegar_compra';

        this.serie_numero_compra_peticion = data.serie_documento + '-' + data.numero_documento;
        this.array_productos_detalle_compra = data.detalle_compra;
        this.id = data.id;
        this.action_submit = accion;
        
        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },
    
    ver_detalle_compra: function(row) {

        let accion = 'detalle_compra';
        
        DOM.find('h4[name="'+accion+'"]').text("Detalle Compra Equipos");

        let data = HELPER.get_attr_json(row);

        let filas = ''
        data.detalle_compra.forEach(row=> {
            filas += `
                <tr>
                <td>${row.nombre_equipo}</td>
                <td>${row.lote}</td>
                <td>${row.fecha_vencimiento}</td>
                <td>${row.precio_compra}</td>
                <td>${row.cantidad}</td>
                <td>${row.subtotal}</td>
                </tr>
            `
        })
        DOM.find('tbody[name="ver_compra_detalle"]').html(filas);
        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    submit: function() {

        let ladda = HELPER.ladda(DOM_ID+' form[name="' + this.action_submit + '"] button[type="submit"]');
        let formData = new FormData(document.querySelector(DOM_ID+' form[name="' + this.action_submit + '"]'));

        if(this.action_submit == "autorizar_compra" || this.action_submit == "denegar_compra"){
            formData.append('serie_numero_compra_peticion', this.serie_numero_compra_peticion);
            formData.append('productos_detalle_compra', JSON.stringify(this.array_productos_detalle_compra))
        }else{

            if(this.verificar_tabla_producto_llena()){
                return;
            }
            if(Componente.verificar_cantidad_requerida()){
                return;
            }

            formData.append('detalle_producto_compra', JSON.stringify(Componente.get_detalle_compra_json()));

        }
        
        if (this.id != null) { 
            formData.append('id', this.id);
        }

        if (this.archivo_anterior != null) { formData.append('archivo_anterior', this.archivo_anterior); }

        axios({
            method: 'post',
            url: BASE_API + 'almacen/compra_equipo/' + this.action_submit,
            data: formData
        })
        .then(function(response) {

            if(response.data.notificacion == 'problema'){
                HELPER.notificacion(response.data.mensaje, response.data.tipo);
                ladda.stop();
                return;
            }

            /* ENVIAR NOTIFICACION */
            axios({
                method: 'post',
                url: BASE_API + 'notificacion/Compraequipo/compra/' + response.data.notificacion,
                data: formData
            })
            .then(function(response) {
                
                /* ENVIAR NOTIFICACION */
                // Componente.enviar_notificacion(response.data.tipo, response.data.datos, response.data.message, response.data.array_agregar_noti);
                /* FIN ENVIAR NOTIFICACION */

            }).catch(error => {
                console.log(error);
            });
            /* FIN ENVIAR NOTIFICACION */

            Componente.table.ajax.reload(null, false);
            // LIMPIAR TABLA 
            DOM.find('tbody[name="detalle_producto_compra"] tr').remove();
            DOM.find('div[name="modal-'+Componente.action_submit+'"]').modal('hide');
            HELPER.notificacion(response.data.mensaje, response.data.tipo);
            ladda.stop();
        }).catch(error => {
            ladda.stop();
        });
    },

    calcular_monto_subtotal: (codigo) => {
        let precio = DOM.find('tr[data-codigo="'+codigo+'"] input[name="equipo_precio_compra"]').val();
        precio = parseFloat((precio != '') ? precio : 0);

        let cantidad = DOM.find('tr[data-codigo="'+codigo+'"] input[name="equipo_cantidad"]').val();
        cantidad =  parseFloat((cantidad != '') ? cantidad : 0);

        let subtotal = precio * cantidad;
        subtotal = Math.round((subtotal + Number.EPSILON) * 100) / 100;
    
        if(precio <= 0 || cantidad <= 0){
            HELPER.notificacion('No puede dejar el valor en 0', 'warning');
            DOM.find('button[name="submit"]').prop('disabled', true);
        }
        else{
            DOM.find('tr[data-codigo="'+codigo+'"] input[name="equipo_subtotal"]').val(subtotal.toFixed(2));
            DOM.find('button[name="submit"]').prop('disabled', false);
            Componente.calcular_totales();
        }
    },

    calcular_no_exceder_importe: (codigo) => {
        let precio = DOM.find('tr[data-codigo="'+codigo+'"] input[name="equipo_precio_compra"]').val();
        precio = parseFloat((precio != '') ? precio : 0);

        let cantidad = DOM.find('tr[data-codigo="'+codigo+'"] input[name="equipo_cantidad"]').val();
        cantidad =  parseFloat((cantidad != '') ? cantidad : 0);

        let subtotal = precio * cantidad;
        subtotal = Math.round((subtotal + Number.EPSILON) * 100) / 100;
    
        if(subtotal <= 0 || cantidad <= 0){
            HELPER.notificacion('No puede dejar el valor en 0', 'warning');
            DOM.find('button[name="submit"]').prop('disabled', true);
        }
        else{
            DOM.find('tr[data-codigo="'+codigo+'"] input[name="equipo_subtotal"]').val(subtotal.toFixed(2));
            DOM.find('button[name="submit"]').prop('disabled', false);
            Componente.calcular_totales();
        }
    },

    verificar_tabla_producto_llena: function(){
        let detalle_producto_compra = DOM.find('tbody[name="detalle_producto_compra"] tr').length;
        if(parseInt(detalle_producto_compra) <= 0){
            HELPER.notificacion("No puede registrar una compra vacia", 'warning');
            return true;
        }
    },

    verificar_cantidad_requerida: function(){
        let producto_lote;
        let producto_fecha_vencimiento;
        let producto_precio_compra;
        let producto_cantidad;

        let erroExiste = Componente.get_detalle_compra_json().some(function(row, index){
            producto_lote = row.lote;
            producto_fecha_vencimiento = row.fecha_vencimiento;
            producto_precio_compra = parseFloat(row.equipo_precio_compra);
            producto_cantidad = parseFloat(row.equipo_cantidad);
            
            if(producto_lote == ""){
                HELPER.notificacion("El lote no puede estar vacio", "warning");
                return true;
            }else if(producto_fecha_vencimiento == ""){
                HELPER.notificacion("La fecha de vencimiento no puede estar vacia", "warning");
                return true;
            }else if(producto_precio_compra == 0){
                HELPER.notificacion("El precio no puede ser cero", "warning");
                return true;
            }else if(producto_cantidad == 0){
                HELPER.notificacion("La cantidad no puede ser cero", "warning");
                return true;
            }else if(isNaN(producto_precio_compra)){
                HELPER.notificacion("El precio no puede estar vacio", "warning");
                return true;
            }else if(isNaN(producto_cantidad)){
                HELPER.notificacion("La cantidad no puede estar vacia", "warning");
                return true;
            }
        });
        return erroExiste;
    }
}

export default Componente;