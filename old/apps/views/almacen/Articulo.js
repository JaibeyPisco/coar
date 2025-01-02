/**
 * @author Gerson Magán
 * @email gersonctk@hotmail.com
 * @create date 2021-02-04 15:09:03
 * @modify date 2021-02-04 15:09:03
 * @desc [description]
 */

import Comp_print_qr from './Print_qr.js'

let DOM, DOM_ID ;
let Componente = {
    render: async (d) => {
        
        $('#main').off();
        d.innerHTML = /*html*/`

        <div id="main">
            <!-- Content Header (Page header) -->
            <section class="content-header">
                <div class="row">
                    <div class="col-md-8 content-header" style="padding-top:5px;">
                        <h1 style="margin:0; ">
                            Articulos
                            <small>Almacén / Taller</small>
                        </h1>
                    </div>
                    <div class="col-md-4" align="right">
                        <button type="button" class="btn btn-sm btn-warning" name="nuevo"><i class="fa fa-plus"></i> Nuevo</button>
                    </div>
                </div>
                </section>

                <!-- Main content -->
                <section class="content">

                <!-- Default box -->
                <div class="box box-warning">
                    <div class="box-body">                    
                    <div class="table-responsive">
                        <table name="registros" class="table table-striped nowrap" style="width:100%;"></table>
                    </div>
                    </div>
                </div>
                <!-- /.box -->

            </section>
            <!-- /.content -->

            <!-- MODAL SAVE -->
            <div class="modal inmodal fade" name="modal-save" data-backdrop="static"  role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                            <h4 name="save" class="modal-title">Modal title</h4>
                        </div>
                        <form name="save">
                            <div class="modal-body">
                                <div class="nav-tabs-custom">
                                    <ul class="nav nav-tabs" style="display:none;">
                                        <li class="active"><a href="#tab_1" data-toggle="tab" aria-expanded="true">Datos Básicos</a></li>
                                        <li class=""><a href="#tab_2" data-toggle="tab" aria-expanded="false">Cuentas Bancarias</a></li>
                                    </ul>
                                    <div class="tab-content">
                                        <div class="tab-pane active" id="tab_1">
                                            <div class="row">
                                                <div class="col-md-3">
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
                                                        <div class="col-md-12" style="padding-top:10px;" align="center">
                                                            <div id="qrcode" style="width:100%; display:none;"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-9">
                                                    <div class="row"> 
                                                        <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label>Nombre <span class="text-red">(*)</span></label>
                                                            <input type="text" name="nombre" class="form-control" autocomplete="off">
                                                        </div>
                                                        </div>  
                                                        <div class="col-md-8">
                                                        <div class="form-group">
                                                            <label> <i class="fa fa-qrcode"></i> Código QR </label>
                                                            <input type="text" name="codigo_barra" class="form-control" autocomplete="off">
                                                        </div>
                                                        </div>         
                                                        <div class="col-md-4">
                                                            <div class="form-group">
                                                                <label>Tipo </label>
                                                                <select name="id_tipo_articulo" data-select="TIPO_ARTICULO" class="form-control select2"></select>
                                                            </div>
                                                        </div>
                                                        
                                                        <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label>Línea </label>
                                                            <select name="id_linea" data-select="LINEA" class="form-control select2"></select>
                                                        </div>
                                                        </div>
                                                        <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label>Sub Línea </label>
                                                            <select name="id_sublinea" data-select="SUBLINEA" class="form-control select2"></select>
                                                        </div>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <div class="form-group">
                                                                <label>Marca </label>
                                                                <select name="id_marca" data-select="MARCA" class="form-control select2"></select>
                                                            </div>
                                                        </div>
                                                        
                                                        
                                                        <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label>Observación </label>
                                                            <input type="text" name="observacion" class="form-control" autocomplete="off">
                                                        </div>
                                                        </div>
                                                        <div class="col-md-12">
                                                        <div class="form-group">
                                                            <label>Descripción </label>
                                                            <textarea name="descripcion" class="form-control" style="height:105px;"></textarea>
                                                        </div>
                                                        </div>
                                                        <div class="col-md-4">
                                                        <div class="form-group">
                                                            <label>Unidad de Medida <span class="text-red">(*)</span></label>
                                                            <select name="id_unidad_medida" data-select="UNIDAD_MEDIDA" class="form-control select2"></select>
                                                        </div>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <div class="form-group">
                                                                <label>Stock Mínimo </label>
                                                                <input type="number" step="any" name="cantidad_minimo" class="form-control" autocomplete="off">
                                                            </div>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <div class="form-group">
                                                                <label>Almacén (Ubicación) </label>
                                                                <select name="id_almacen" data-select="ALMACEN" class="form-control select2"></select>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6">
                                                            <label>
                                                                <input type="checkbox" name="fl_cantidad_qr_unico" /> Imprimir una sola imagen QR (COMPRAS). <i class="fa fa-info-circle" data-toggle="tooltip" data-placement="top" title="Imprimirá una sola imagen qr y no dependerá de las cantidades ingresadas en compras, esto se puede aplicar a aquellos artículos que no se puede controlar por cantidades exactas."></i>
                                                            </label>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>                                        
                                        <div class="tab-pane" id="tab_2">
                                            <div class="row">
                                                <div class="col-md-12"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <div class="modal-footer" align="center" style="display:block">
                                <button type="button" name="cerrar" class="btn btn-white pull-left" data-dismiss="modal">Cerrar</button>
                                <button type="button" name="submit" class="btn btn-primary">Guardar</button>
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

            <!-- MODAL PRINT QR -->
            <div class="modal inmodal fade" name="modal-print_qr" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                            <h4 name="print_qr" class="modal-title">Modal title</h4>
                        </div>
                        <form name="print_qr">
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-md-12" align="center">
                                        <div id="qrcode_print"></div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Cantidad </label>
                                            <input type="number" name="cantidad" class="form-control" autocomplete="off" required min="1">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Ancho </label>
                                            <input type="number" name="ancho" class="form-control" autocomplete="off" required placeholder="150" min="50">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Altura </label>
                                            <input type="number" name="altura" class="form-control" autocomplete="off" required placeholder="150" min="50">
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <div class="modal-footer" align="center" style="display:block" >
                                <button type="button" name="cerrar" class="btn btn-white" data-dismiss="modal">Cerrar</button>
                                <button type="submit" name="submit" class="btn btn-success">Generar Impresión</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        

        </div>            
        `;

        await Componente.after_render();       
        
    },

    after_render: async () => {

        DOM_ID = '#main';
        DOM = $(DOM_ID);        

        /** SUBMIT SAVE */
        DOM.find('form[name="save"]').validate({

            /* REGLAS */
            rules: {
                nombre: {required: true},
                id_unidad_medida: {required: true},
            },
          
            messages: {
                nombre: 'Nombre del Artículo',
                id_unidad_medida: 'Unidad de Medida',
            },
          
        });

        DOM.on('click', 'form[name="save"] button[name="submit"]', function(e) {
            e.stopImmediatePropagation();
  
            if(DOM.find('form[name="save"]').valid())
            {
                Componente.submit();
            }
            
        });

        /** SUBMIT DELETE */
        DOM.find('form[name="delete"]').validate({
            submitHandler: function() {
                Componente.submit();
            }
        });

        /** SUBMIT PRINT QR */
        DOM.find('form[name="print_qr"]').validate({
            submitHandler: function() {

                axios.get(BASE_API+'almacen/articulo/get_unique/'+Componente.id)
                .then(function (response) {
                    
                    let form = DOM.find('form[name="print_qr"]');

                    Comp_print_qr.articulo_unico(response.data, form.find('input[name="cantidad"]').val(), form.find('input[name="ancho"]').val(), form.find('input[name="altura"]').val());
                   
                }).catch(error => {
                    console.log(error);
                }); 

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

        /* PRINT QR */
        DOM.on('click', 'a[name="row-print_qr"]', function(e) {
            e.stopImmediatePropagation();
            Componente.print_qr($(this));
        });
        
        /* PREVIEW IMAGEN */
        DOM.find('input[name="imagen"]').change(function(e) {
            e.stopImmediatePropagation();
            HELPER.preview_image(this, DOM.find('img[name="imagen"]'));
        });

        /** CHANGE LINEA */
        DOM.on('change', 'select[name="id_linea"]', function(e) {
            e.stopImmediatePropagation();
            Componente.select_sublinea();
        });

        /* CHANGE TEXT QRCODE */
        DOM.on('change', 'input[name="codigo_barra"]', function(e) {
            e.stopImmediatePropagation();
            Componente.generar_codigo_qr();
        });

        Componente.datatable();
        Componente.select_tipo_articulo();
        Componente.select_marca();
        Componente.select_linea();
        Componente.select_unidad_medida();
        Componente.select_almacen();

        HELPER.load_component();

        Componente.qrcode_form = new QRCode(document.getElementById("qrcode"), {
			width : 150,
			height : 150
		});

        Componente.qrcode_print = new QRCode(document.getElementById("qrcode_print"), {
			width : 150,
			height : 150
		});

    },

    /**** DATA */
    id: null,
    action_submit: null,
    imagen_anterior: null,
    fl_auto_event: true,

    /************ */

    print_qr: function(row) {

        let accion = 'print_qr';
        let form = DOM.find('form[name="'+accion+'"]');

        DOM.find('h4[name="'+accion+'"]').text('Imprimir QR');

        /** DATA */
        HELPER.reset_form(form);
        
        let data = HELPER.get_attr_json(row);

        Componente.qrcode_print.makeCode(data.codigo_barra);

        form.find('input[name="cantidad"]').val(1);
        form.find('input[name="ancho"]').val(150);
        form.find('input[name="altura"]').val(150);

        this.id = data.id;
        this.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    generar_codigo_qr: () => {
        let texto = DOM.find('input[name="codigo_barra"]').val();

        if(texto == '')
        {
            $('#qrcode').hide('slide');
        }
        else
        {
            $('#qrcode').show('slide');
            Componente.qrcode_form.makeCode(DOM.find('input[name="codigo_barra"]').val());
        }
        
    },
    
    select_almacen: async () =>
    {
        let select = DOM.find('select[data-select="ALMACEN"]');
        select.append($('<option></option>').attr('value', '').text('Ninguno...'));

        await axios.get(BASE_API+'almacen/almacen/get_select')
        .then(function (response) {
            response.data.forEach(row => {
                select.append('<option value="'+row.id+'">'+row.text+'</option>');
            });
            select.select2();
        }).catch(error => {
            console.log(error);
        }); 
    },

    select_tipo_articulo: async () =>
    {
        let select = DOM.find('select[data-select="TIPO_ARTICULO"]');
        select.append($('<option></option>').attr('value', '').text('Seleccione...'));

        await axios.get(BASE_API+'almacen/tipo_articulo/get_select')
        .then(function (response) {
            response.data.forEach(row => {
                select.append('<option value="'+row.id+'">'+row.text+'</option>');
            });
            select.select2();
        }).catch(error => {
            console.log(error);
        }); 
    },

    select_marca: async () =>
    {
        let select = DOM.find('select[data-select="MARCA"]');
        select.append($('<option></option>').attr('value', '').text('Seleccione...'));

        await axios.get(BASE_API+'almacen/marca/get_select')
        .then(function (response) {
            response.data.forEach(row => {
                select.append('<option value="'+row.id+'">'+row.text+'</option>');
            });
            select.select2();
        }).catch(error => {
            console.log(error);
        }); 
    },

    select_unidad_medida: async () =>
    {
        let select = DOM.find('select[data-select="UNIDAD_MEDIDA"]');
        select.append($('<option></option>').attr('value', '').text('Seleccione...'));

        await axios.get(BASE_API+'almacen/unidad_medida/get_select')
        .then(function (response) {
            response.data.forEach(row => {
                select.append('<option value="'+row.id+'">'+row.text+'</option>');
            });
            select.select2();
        }).catch(error => {
            console.log(error);
        }); 
    },

    select_linea: async () =>
    {
        let select = DOM.find('select[data-select="LINEA"]');
        select.append($('<option></option>').attr('value', '').text('Seleccione...'));

        await axios.get(BASE_API+'almacen/linea/get_select')
        .then(function (response) {
            response.data.forEach(row => {
                select.append('<option value="'+row.id+'">'+row.text+'</option>');
            });
            select.select2();
        }).catch(error => {
            console.log(error);
        }); 
    },

    select_sublinea: async () =>
    {
        let id_linea = DOM.find('select[name="id_linea"]').val();

        let select = DOM.find('select[data-select="SUBLINEA"]');
        select.empty();
        select.append($('<option></option>').attr('value', '').text('Seleccione...'));        
        
        await axios.get(BASE_API+'almacen/sublinea/get_select?id_linea='+id_linea)
        .then(function (response) {
            response.data.forEach(row => {
                select.append('<option value="'+row.id+'">'+row.text+'</option>');
            });
            select.select2();
        }).catch(error => {
            console.log(error);
        }); 
    },
    

    datatable: function() {

        this.table = DOM.find('table[name="registros"]').DataTable({
            ajax:BASE_API + 'almacen/articulo',

            columns: [{
                    title: 'ACCIÓN',
                    defaultContent: ``,                    
                    render: function(data, type, row) {
                        var html = `
                            <div class="btn-group" style="width:100px;">
                                <button type="button" class="btn btn-default btn-sm" name="row-edit">EDITAR</button>     
                                <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">
                                      <i class="fa fa-angle-down"></i>
                                </button>
                                <ul class="dropdown-menu dropdown-menu-left" role="menu">
                                    <li><a class="dropdown-item" name="row-print_qr" href="javascript:"><i class="far fa-qrcode"></i> Imprimir QR</a></li>
                                    <li><a class="dropdown-item" name="row-delete" href="javascript:"><i class="far fa-trash-alt"></i> Eliminar</a></li>
                                </ul>
                            </div>
                        `;

                        return html; 
                    },
                },
                { title: 'ESTADO', render: function(data, type, row) { 

                    let stock_minimo = row.cantidad_minimo;
                    stock_minimo = (stock_minimo != '') ? parseFloat(stock_minimo) : 0;

                    let stock = row.cantidad;
                    stock = (stock != '') ? parseFloat(stock) : 0;

                    if(stock == 0)
                    {
                        return '<small class="label label-danger">SIN STOCK</small>'; 
                    }
                    else if(stock < stock_minimo)
                    {
                        return '<small class="label label-warning">STOCK BAJO</small>'; 
                    }
                    
                    else
                    {
                        return '<small class="label label-success">STOCK ALTO</small>'; 
                    }

                    
                }},
                { title: 'NOMBRE', mData: 'nombre' },
                { title: 'TIPO ARTÍCULO', mData: 'tipo_articulo' },
                { title: 'LÍNEA', mData: 'linea' },
                { title: 'SUBLÍNEA', mData: 'sublinea' },
                { title: 'MARCA', mData: 'marca' },
                { title: 'UNIDAD MEDIDA', mData: 'unidad_medida' },
                { title: 'STOCK', mData: 'cantidad' },
                { title: 'STOCK MÍNIMO', mData: 'cantidad_minimo' },
                { title: 'COSTO UNITARIO', mData: 'costo' },
                { title: 'CÓDIGO DE BARRA', mData: 'codigo_barra' },
                { title: 'ALMACEN', mData: 'almacen' },
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

        DOM.find('h4[name="'+accion+'"]').text('Nuevo Articulo');

        /** DATA */
        HELPER.reset_form(form);

        form.find('img[name="imagen"]').attr('src', BASE_FILES+'images/sin_imagen.jpg');

        this.id = null;
        this.action_submit = accion;
        this.imagen_anterior = null;

        Componente.generar_codigo_qr();

        
        DOM.find('tbody[name="detalle-cuenta_bancaria"').html('');
        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    edit: async (row) => {
        
        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Editar Articulo');

        /** DATA */
        HELPER.reset_form(form);

        DOM.find('tbody[name="detalle-cuenta_bancaria"').html('');

        let data = HELPER.get_attr_json(row);

        Componente.fl_auto_event = false;

        form.find('input[name="nombre"]').val(data.nombre);
        form.find('input[name="codigo_barra"]').val(data.codigo_barra);
        form.find('select[name="id_tipo_articulo"]').val(data.id_tipo_articulo).change();
        form.find('select[name="id_linea"]').val(data.id_linea).change();

        await Componente.select_sublinea();

        form.find('select[name="id_sublinea"]').val(data.id_sublinea).change();

        form.find('select[name="id_marca"]').val(data.id_marca).change();
        form.find('input[name="observacion"]').val(data.observacion);
        form.find('textarea[name="descripcion"]').html(data.descripcion);
        form.find('input[name="cantidad_minimo"]').val(data.cantidad_minimo);
        form.find('select[name="id_unidad_medida"]').val(data.id_unidad_medida).change();
        form.find('img[name="imagen"]').attr('src', BASE_FILES+'images/'+data.imagen);
        form.find('select[name="id_almacen"]').val(data.id_almacen).change();
        form.find('input[name="fl_cantidad_qr_unico"]').prop('checked', parseInt(data.fl_cantidad_qr_unico));

        Componente.generar_codigo_qr();

        Componente.id = data.id;
        Componente.action_submit = accion;
        Componente.imagen_anterior = data.imagen;

        Componente.fl_auto_event = true;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    delete: function(row) {

        let accion = 'delete';
        let form = DOM.find('form[name="'+accion+'"]');

        DOM.find('h4[name="'+accion+'"]').text('Eliminar Articulo');

        /** DATA */
        HELPER.reset_form(form);
        
        let data = HELPER.get_attr_json(row);

        form.find('div[name="texto"]').text(data.email);

        this.id = data.id;
        this.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    submit: function() {
        
        let ladda = HELPER.ladda(DOM_ID+' form[name="' + this.action_submit + '"] button[name="submit"]');
        let formData = new FormData(document.querySelector(DOM_ID+' form[name="' + this.action_submit + '"]'));

        if (this.id != null) { formData.append('id', this.id); }
        if (this.imagen_anterior != null) { formData.append('imagen_anterior', this.imagen_anterior); }

        axios({
            method: 'post',
            url: BASE_API + 'almacen/articulo/' + this.action_submit,
            data: formData
        })
        .then(function(response) { 
            Componente.table.ajax.reload(null, false);
            DOM.find('div[name="modal-'+Componente.action_submit+'"]').modal('hide');
            HELPER.notificacion(response.data.mensaje, 'success');
            ladda.stop();
        }).catch(error => {
            ladda.stop();
        });
    },
} 

export default Componente;