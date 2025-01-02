/**
 * @author Gerson Magán
 * @email gersonctk@hotmail.com
 * @create date 2021-02-04 15:09:03
 * @modify date 2021-02-04 15:09:03
 * @desc [description]
 */

import Impresion from './Impresion.js'

let DOM, DOM_ID ;
let Componente = {
    render: async (d) => {
        
        $('#main').off();
        d.innerHTML = `

        <div id="main">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <div class="row">
                <div class="col-md-8 content-header" style="padding-top:5px;">
                    <h1 style="margin:0; ">
                        Órdenes de Compras
                        <small>Almacén / Taller</small>
                    </h1>
                </div>
                <div class="col-md-4" align="right">
                    <button type="button" href="javascript:" class="btn btn-sm btn-warning" name="nuevo"><i class="fa fa-plus"></i> Nuevo</button>
                </div>
            </div>
            </section>

            <!-- Main content -->
            <section class="content">

            <!-- Default box -->
            <div class="box box-warning">
                <div class="box-body">
                <div class="row">        
                    <div class="col-md-2">
                    <div class="form-group">
                        <label>Fecha Desde</label>
                        <input type="date" name="fecha_inicio" id="fecha_inicio" class="form-control" autocomplete="off">
                    </div>
                    </div>
                    <div class="col-md-2">
                    <div class="form-group">
                        <label>Fecha Hasta</label>
                        <input type="date" name="fecha_fin" id="fecha_fin" class="form-control" autocomplete="off">
                    </div>
                    </div>
                    <div class="col-md-1" style="padding-top:19px;">
                    <button class="btn btn-warning" name="update_datatable"><i class="fa fa-search"></i> Buscar</button>
                    </div>
                </div>
                </div>
            </div>
            <!-- /.box -->

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
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 name="save" class="modal-title">Modal title</h4>
                    </div>
                    <form name="save">

                        <div class="modal-body">
                            <!-- Default box -->
                            <div class="box box-primary">
                                <div class="box-header" style="padding-bottom:0;">
                                    <i class="fa fa-file-invoice"></i>   <h3 class="box-title">Encabezado</h3>
                                </div>
                                <div class="box-body">
                                    <div class="row">
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label>Fecha <span class="text-red">(*)</span></label>
                                                <div class="form-group">
                                                <input type="date" class="form-control" name="fecha"  />
                                                </div>                              
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label>Serie <span class="text-red">(*)</span></label>
                                                <input type="text" class="form-control" name="serie" readonly/>                  
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label>Número <span class="text-red">(*)</span></label>
                                                <input type="text" class="form-control" name="numero" readonly/>                       
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label>Moneda <span class="text-red">(*)</span></label>
                                                <select name="id_moneda" data-select="MONEDA" class="form-control"></select>                         
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label>Tipo de Cambio <span class="text-red">(*)</span></label>
                                                <input type="number" step="any" class="form-control" name="tipo_cambio"/>                
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label>Condición de Pago <span class="text-red">(*)</span></label>
                                                <select name="condicion_pago" class="form-control select">
                                                    <option value="">Seleccione...</option>
                                                    <option value="CONTADO">CONTADO</option>
                                                    <option value="CREDITO">CRÉDITO</option>
                                                </select>                         
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label>Días a Pagar <span class="text-red">(*)</span></label>
                                                <input type="number" class="form-control" name="dias_pagar" min="1"/>                
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label>Prioridad <span class="text-red">(*)</span></label>
                                                <select type="text" class="form-control select" name="prioridad"/>
                                                    <option value="">Seleccione...</option>
                                                    <option value="REGULAR">REGULAR</option>
                                                    <option value="ALTA">ALTA</option>
                                                    <option value="URGENTE">URGENTE</option>
                                                </select>       
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <label>Proveedor <span class="text-red">(*)</span></label>
                                                <select type="text" class="form-control" name="id_proveedor" data-select="PROVEEDOR"/></select>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label>Número de Cotización </label>
                                                <input type="text" class="form-control" name="numero_cotizacion"/>                   
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label>Cuenta Bancaria de Proveedor </label>
                                                <select class="form-control" name="id_cuenta_bancaria_proveedor" data-select="CUENTA_BANCARIA_PROVEEDOR"/></select>
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label>Contacto del Proveedor </label>
                                                <input type="text" class="form-control" name="contacto_proveedor"/>                   
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label>Solicitante </label>
                                                <input type="text" class="form-control" name="solicitante"/>                   
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label>Motivo </label>
                                                <input type="text" class="form-control" name="motivo"/>                   
                                            </div>
                                        </div>
                                        <div class="col-md-3">
                                            <div class="form-group">
                                                <label>Lugar de Entrega </label>
                                                <input type="text" class="form-control" name="lugar_entrega"/>                   
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
            
                            <!-- Default box -->
                            <div class="box box-primary">
                                <div class="box-header" style="padding-bottom:0;">
                                    <i class="fa fa-receipt"></i>   <h3 class="box-title">Detalle</h3>
                                </div>
                                <div class="box-body">
                                    <div class="table-responsive">
                                        <table class="table table-striped nowrap" style="width:100%;">
                                            <thead>
                                                <tr>
                                                    <th>ARTÍCULO</th>
                                                    <th>CANTIDAD</th>                                        
                                                    <th>VALOR UNITARIO</th>
                                                    <th>PRECIO UNITARIO</th>
                                                    <th>IGV</th>
                                                    <th>IMPORTE</th>
                                                </tr>
                                            </thead>
                                            <tbody name="detalle-item"></tbody>
                                            <tfoot>
                                                <tr>
                                                    <td colspan="4">
                                                        <button type="button" name="agregar_item" class="btn btn-secondary" style="margin-bottom:20px;"><i class="fa fa-plus"></i> Agregar Nuevo Item</button>
            
                                                        <div class="row">
                                                            <div class="col-md-12">
                                                                <div class="form-group">
                                                                    <label>Autorizado por: </small></label>
                                                                    <input type="text" class="form-control" name="persona_autoriza" />
                                                                </div>
                                                                <div class="form-group">
                                                                    <label>Observaciones </small></label>
                                                                    <textarea class="form-control" name="observacion"/></textarea>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td colspan="3">
                                                        <table style="width:100%;">
                                                            <tr>
                                                                <td style="padding-bottom:10px">TIPO IGV:</td>
                                                                <td align="center" style="padding-bottom:10px">
                                                                    <select name="tipo_igv" class="form-control">
                                                                        <option value="" selected>INCLUIDO IGV</option>
                                                                        <option value="MAS_IGV">MÁS IGV</option>
                                                                    </select>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>TOTAL GRAVADO:</td>
                                                                <td><input type="number" step="any" class="form-control" name="total_gravada" style="text-align:right;" readonly/></td>
                                                            </tr>
                                                            <tr>
                                                                <td>TOTAL IGV:</td>
                                                                <td><input type="number" step="any" class="form-control" name="total_igv" style="text-align:right;" readonly/></td>
                                                            </tr>
                                                            <tr>
                                                                <td>TOTAL IMPORTE:</td>
                                                                <td><input type="number" step="any" class="form-control" style="text-align:right;" name="total_importe" readonly /></td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                                
                                            </tfoot>
                                        </table>
                                    </div>
                                    <div class="row" data-contenedor="firma">
                                        <div class="col-md-12" align="center">
                                            <div id="signature-pad" class="signature-pad">                                                
                                                <div class="signature-pad--body">
                                                    <canvas style="max-width: 300px; height: 150px; border: 1px black solid; " id="canvas"></canvas>
                                                </div>
                                                <div align="center">FIRMA</div>
                                                <div align="center">Creado por: `+GLOBAL.usuario.nombre+` `+GLOBAL.usuario.apellido+`</div>
                                            </div>                                    
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- /.box -->
            
                            <div align="center">
                                    <label><input type="checkbox" name="fl_autorizacion" /> Confirmo que los datos llenados en el formulario son correctos</label> <br><br>
                                    <button type="button" name="submit" class="btn btn-primary">Guardar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- MODAL DELETE -->
        <div class="modal inmodal fade" name="modal-anular" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                        <h4 name="anular" style="color:#b70000;" class="modal-title">Modal title</h4>
                    </div>
                    <form name="anular">
                        <div class="row">
                            <div class="col-md-12" align="center">
                                <i class="fad fa-trash-alt fa-4x"></i><br/>
                            </div>
                            <div class="col-md-12"  align="center" style="padding-top:10px;">
                                <label><input type="checkbox" name="confirmacion" required/>
                                    Confirmo realizar la anulación</label>
                                <p style="color:red;">Esta acción no se podrá revertir</p>
                            </div>
                            <div class="col-md-12" name="texto" align="center">

                            </div>
                        </div>
                        <div class="modal-footer" align="center" style="display:block" >
                            <button type="button" name="cerrar" class="btn btn-white" data-dismiss="modal">Cerrar</button>
                            <button type="submit" name="submit" class="btn btn-danger">Anular Ahora!</button>
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
                fecha: {required: true},
                serie: {required: true},
                numero: {required: true},
                id_moneda: {required: true},
                condicion_pago: {required: true},
                id_proveedor: {required: true},
                dias_pagar: { required: true, min: 1},
                prioridad: {required: true},
                fl_autorizacion: {required:true}
            },
        
            messages: {
                fecha: 'Fecha',
                serie: 'Serie',
                numero: 'Número',
                id_moneda: 'Moneda',
                condicion_pago: 'Condición de Pago',
                id_proveedor: 'Proveedor',
                dias_pagar: 'Dias a Pagar',
                prioridad:'Prioridad',
                fl_autorizacion: 'Seleccione el check de conformidad'
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
    DOM.find('form[name="anular"]').validate({
        submitHandler: function() {
            Componente.submit_anular();
        }
    });

        /* DATATABLE UPDATE*/
    DOM.on('click', 'button[name="update_datatable"]', function(e) {
        e.stopImmediatePropagation();
        Componente.table.ajax.reload(null, false);
    });

    /* IMPRIMIR */
    DOM.on('click', 'button[name="row-print"]', function(e) {
        e.stopImmediatePropagation();

        let data = HELPER.get_attr_json($(this));
        Impresion.print(data.id);
    });

        /* NUEVO */
    DOM.on('click', 'button[name="nuevo"]', function(e) {
        e.stopImmediatePropagation();
        Componente.new();
    });

    /* EDITAR */
    DOM.on('click', 'a[name="row-edit"]', function(e) {
        e.stopImmediatePropagation();
        Componente.edit($(this));
    });

        /* ELIMINAR */
        DOM.on('click', 'a[name="row-anular"]', function(e) {
        e.stopImmediatePropagation();
        Componente.anular($(this));
    });

        /* CHANGE CONDICION PAGO*/
        DOM.on('change', 'select[name="condicion_pago"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
                Componente.change_condicion_pago();
            }            
        });

        /* CHANGE MONEDA*/
    DOM.on('change', 'select[name="id_moneda"]', function(e) {
        e.stopImmediatePropagation();
        if(Componente.fl_auto_event == true)
        {
            Componente.change_moneda();
        }            
    });


        /* AGREGAR ITEM */
        DOM.find('button[name="agregar_item"]').click(function(e) {
            e.stopImmediatePropagation();
            Componente.agregar_item();
        });

        /* QUITAR ITEM */
        DOM.on('click', 'button[name="quitar-item"]', function(e) {
            e.stopImmediatePropagation();
            Componente.quitar_item($(this));
        });

        /**** EVENTOS CALCULOS */

        /* TIPO IGV*/
        DOM.find('select[name="tipo_igv"]').change(function(e) {
            e.stopImmediatePropagation();
            Componente.calculo_consin_igv();
        });
        
        /* CANTIDAD*/ 
        DOM.on('keyup', 'input[data-name="cantidad"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
                let codigo = $(this).parents('tr')[0].dataset.codigo;
                Componente.calculo_importe_linea(codigo);
                Componente.array_totales_detalle = null;
            }            
        });

        /* PRECIO UNITARIO*/
        DOM.on('keyup', 'input[data-name="precio_unitario"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
                let codigo = $(this).parents('tr')[0].dataset.codigo;
                Componente.calculo_valor_unitario_linea(codigo);
                Componente.array_totales_detalle = null;
            }            
        });

        /* VALOR UNITARIO*/

        DOM.on('keyup', 'input[data-name="valor_unitario"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
                let codigo = $(this).parents('tr')[0].dataset.codigo;
                Componente.calculo_precio_unitario_linea(codigo);
                Componente.array_totales_detalle = null;
            }            
        });

        /* IMPORTE LINEA*/

        DOM.on('change', 'input[data-name="importe"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
                let codigo = $(this).parents('tr')[0].dataset.codigo;
                Componente.calculo_precio_unitario_importe_linea(codigo);
                Componente.array_totales_detalle = null;
            }            
        });

        /* IGV LINEA*/

        DOM.on('change', 'input[data-name="igv"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
                let codigo = $(this).parents('tr')[0].dataset.codigo;
                Componente.calculo_valor_unitario_igv_linea(codigo);
                Componente.array_totales_detalle = null;
            }            
        });

        DOM.on('change', 'select[data-name="id_articulo"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
                let codigo_fila = $(this).parents('tr')[0].dataset.codigo;
                let id = this.value;

                Componente.get_articulo(id, codigo_fila);
                Componente.array_totales_detalle = null;
            }            
        });

        DOM.on('click', 'button[name="limpiar"]', function(e) {
            e.stopImmediatePropagation();
            Componente.signaturePad.clear();
        });  

        DOM.on('change', 'select[name="id_proveedor"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
               Componente.select_cuenta_bancaria_proveedor();
            }            
        });

        DOM.find('input[name="fecha_inicio"]').val(HELPER.primer_dia_mes());
        DOM.find('input[name="fecha_fin"]').val(HELPER.fecha_actual());
        

        await Componente.select_moneda();
        await Componente.select_proveedor();   

        Componente.datatable();

        HELPER.load_component();
    },

    /**** DATA */
    id: null,
    id_orden: null,
    action_submit: null,
    fl_auto_event: true,
    array_totales_detalle: null,

    select_cuenta_bancaria_proveedor: async () => {

        let id_proveedor = DOM.find('select[name="id_proveedor"]').val();

        let select = DOM.find('select[data-select="CUENTA_BANCARIA_PROVEEDOR"]');       
        select.empty();
        select.append($('<option></option>').attr('value', '').text('Seleccionar...'));

        await axios.get(BASE_API+'configuracion/cuenta_bancaria_persona/get_select?tipo=PROVEEDOR&id='+id_proveedor)
        .then(function (response) {

            response.data.forEach(row => {
                select.append('<option value="'+row.id+'">'+row.text+'</option>');
            });

            select.select2();

        }).catch(error => {
            console.log(error);
        }); 

    },

    get_articulo: async (id_articulo, codigo_fila) => {

    if(id_articulo != '' && id_articulo != null)
    {
        await axios.get(BASE_API+'almacen/articulo/get_unique/'+id_articulo)
        .then(function (response) {
            
            DOM.find('tr[data-codigo="'+codigo_fila+'"] input[data-name="precio_unitario"]').val(response.data.costo);
            DOM.find('tr[data-codigo="'+codigo_fila+'"] span[data-name="unidad_medida"]').text(response.data.unidad_medida);
            Componente.calculo_valor_unitario_linea(codigo_fila);

        }).catch(error => {
            console.log(error);
        }); 
    }       

    },

    capturar_totales: () => {

        let array_totales_detalle = [];

        DOM.find('tbody[name="detalle-item"] tr').each(function(){
        
            let codigo = $(this).data('codigo');
            let importe =  parseFloat($(this).find('input[data-name="importe"]').val());

            let item = {
                codigo: codigo,
                importe: importe
            };

            array_totales_detalle.push(item);
        });

        Componente.array_totales_detalle = array_totales_detalle;

    },

    calculo_consin_igv: () => {

        if(Componente.array_totales_detalle == null || Componente.array_totales_detalle.length == 0)
        {
            Componente.capturar_totales();
        }        

        DOM.find('tbody[name="detalle-item"] tr').each(function(){
        
            let codigo = $(this).data('codigo');

            Componente.array_totales_detalle.forEach(row => {
                
                if(row.codigo == codigo)
                {
                    let importe = row.importe;

                    if(DOM.find('select[name="tipo_igv"]').val() == 'MAS_IGV')
                    {
                        importe = row.importe + (row.importe * (GLOBAL.porcentaje_igv / 100));
                    }

                    $(this).find('input[data-name="importe"]').val(importe);
                    Componente.calculo_precio_unitario_importe_linea(codigo);
                }

            });
            
        });
    },

    /************ */

    new: () => {

        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Nueva Orden compra');

        /** DATA */
        HELPER.reset_form(form); 

        DOM.find('tbody[name="detalle-item"').html('');

        DOM.find('input[name="fecha"]').val(HELPER.fecha_actual());
        DOM.find('input[name="serie"]').val((GLOBAL.ajuste.almacen_serie_orden_comp != null && GLOBAL.ajuste.almacen_serie_orden_comp != '') ? GLOBAL.ajuste.almacen_serie_orden_comp : HELPER.fecha_ano());

        Componente.calcular_importe_total();

        Componente.id = null;
        Componente.action_submit = accion;

        Componente.get_correlativo();    

        DOM.find('div[data-contenedor="firma"]').show();

        DOM.find('div[name="modal-'+accion+'"]').modal('show');

        setTimeout(() => {
            // DIBUJAR  CANVAS
            let wrapper = document.getElementById("signature-pad");

            let canvas = wrapper.querySelector("canvas");
                Componente.signaturePad = new SignaturePad(canvas, {
                backgroundColor: 'rgb(255, 255, 255)'
            });

            let ratio =  Math.max(window.devicePixelRatio || 1, 1);

            canvas.width = canvas.offsetWidth * ratio;
            canvas.height = canvas.offsetHeight * ratio;
            canvas.getContext("2d").scale(ratio, ratio);

            Componente.signaturePad.clear();  
        }, 500);    

    },

    edit: async (row) => {

        let accion = 'save';
        let form = DOM.find('form[name="save"]');
        HELPER.reset_form(form);

        DOM.find('tbody[name="detalle-item"').html('');

        DOM.find('h4[name="'+accion+'"]').text('Editar Orden compra');

        let data = HELPER.get_attr_json(row);

        await axios.get(BASE_API+'almacen/orden_compra/get_unique/'+data.id)
        .then( async (response) => {            
        data = response.data;

        Componente.fl_auto_event = false;

        form.find('input[name="fecha"]').val(data.fecha);

        form.find('input[name="serie"]').val(data.serie);
        form.find('input[name="numero"]').val(data.numero);
        form.find('select[name="id_moneda"]').val(data.id_moneda).change();
        form.find('select[name="condicion_pago"]').val(data.condicion_pago).change();

        await Componente.change_condicion_pago();

        form.find('select[name="id_proveedor"]').html('');
        form.find('select[name="id_proveedor"]').append(new Option(data.proveedor, data.id_proveedor));

        await Componente.select_cuenta_bancaria_proveedor();

        form.find('select[name="id_cuenta_bancaria_proveedor"]').val(data.id_cuenta_bancaria_proveedor).change();
        form.find('input[name="numero_cotizacion"]').val(data.numero_cotizacion);
        form.find('input[name="contacto_proveedor"]').val(data.contacto_proveedor);

        form.find('select[name="prioridad"]').val(data.prioridad).change();

        form.find('input[name="solicitante"]').val(data.solicitante);
        form.find('input[name="motivo"]').val(data.motivo);
        form.find('input[name="lugar_entrega"]').val(data.lugar_entrega);
        form.find('textarea[name="observacion"]').html(data.observacion);
        form.find('input[name="dias_pagar"]').val(data.dias_pagar);
        form.find('input[name="persona_autoriza"]').val(data.persona_autoriza);
        

        if(data.cliente_ubigeo != null)
        {
            form.find('select[name="id_ubigeo"]').html('')
            .append(new Option(data.cliente_ubigeo, data.cliente_ubigeo));
        }

        data.detalle.forEach(row => {
            Componente.agregar_item(row);
        });

        Componente.id = data.id;
        Componente.action_submit = accion;

        Componente.fl_auto_event = true;
        Componente.calcular_importe_total();
        Componente.change_moneda();

        DOM.find('div[data-contenedor="firma"]').hide();

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
        }).catch(error => {
            console.log(error);
        }); 
        
    },

    anular: function(row) {

        let accion = 'anular';
        let form = DOM.find('form[name="'+accion+'"]');

        DOM.find('h4[name="'+accion+'"]').text('Anular Orden de Compra');

        /** DATA */
        HELPER.reset_form(form);
        
        let data = HELPER.get_attr_json(row);

        form.find('div[name="texto"]').text(data.email);

        this.id = data.id;
        this.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    

    /***** ITEMS */

    agregar_item: async (data = null) => {
        
        let codigo = Math.random().toString(36).substr(2);

        if(data == null)
        {
            data = {
                id_articulo: '',
                cantidad: '1',
                valor_unitario: '',
                precio_unitario:'',
                subtotal:'',
                igv:'',
                importe:'',
                porcentaje_igv:GLOBAL.porcentaje_igv                
            };
        }


        let html = `
            <tr data-codigo="`+codigo+`">
                <td><select data-select="ARTICULO" data-name="id_articulo" class="form-control"></select></td>
                <td style="width:200px;">
                <div class="input-group" style="margin:0;">
                <input type="number" step="any" data-name="cantidad" style="text-align:right; float:right;" class="form-control" value="`+data.cantidad+`" />
                <span class="input-group-addon" data-name="unidad_medida">-</span>
                </div>
                </td>
                <td style="width:150px;" ><input type="number" step="any" style="text-align:right;" data-name="valor_unitario" class="form-control" value="`+data.valor_unitario+`" /></td>
                <td style="width:150px;" ><input type="number" step="any" style="text-align:right;" data-name="precio_unitario" class="form-control" value="`+data.precio_unitario+`" /></td>
                <td style="display:none;"><input type="number" step="any" data-name="subtotal" class="form-control" value="`+data.subtotal+`" /></td>
                <td style="display:none;"><input type="number" step="any" data-name="porcentaje_igv"class="form-control" value="`+data.porcentaje_igv+`" /></td>
                <td style="width:150px;" ><input type="number" step="any" style="text-align:right;" data-name="igv"class="form-control" value="`+data.igv+`" /></td>
                <td style="width:150px;" ><input type="number" step="any" style="text-align:right;" data-name="importe" class="form-control" value="`+data.importe+`" /></td>
                <td style="width:10px;"><button type="button" name="quitar-item" class="btn btn-danger"><i class="fa fa-times"></i></button></td>
            </tr>
        `;

        DOM.find('tbody[name="detalle-item"]').append(html);

        await Componente.select_articulo(codigo);  

        if(data.id_articulo != '' && data.id_articulo != null)
        {
            DOM.find('tr[data-codigo="'+codigo+'"] select[data-name="id_articulo"]').html('');
            DOM.find('tr[data-codigo="'+codigo+'"] select[data-name="id_articulo"]').append(new Option(data.articulo, data.id_articulo));
        }

        Componente.calculo_importe_linea(codigo);

        return codigo;
    },

    select_articulo: async (codigo_linea) =>
    {
        DOM.find('tr[data-codigo="'+codigo_linea+'"] select[data-select="ARTICULO"]').select2({
            ajax: {
            url: BASE_API+'almacen/articulo/get_select',
            dataType: 'json',
            delay: 250,
            data: function(params) {
                return {buscar:params.term};
            },
            processResults: function(data, params) {      
                return {results: data};
            },
            cache: true,
            },
            escapeMarkup: function(markup) {
            return markup;
            },
            placeholder: "Buscar por nombre o código de Barra",
            minimumInputLength: 3,
            allowClear: true,
            language: {
            inputTooShort: function () {
                return 'Digite mínimo 3 caracteres';
            }
            }
        });
    },

    quitar_item: (dom) => {

        var tr = dom.parents('tr');
        var codigo = tr[0].dataset.codigo;

        $('tr[data-codigo="'+codigo+'"]').remove();

        Componente.calcular_importe_total();

    },

    item_json: () => {

        let detalle = [];

        DOM.find('tbody[name="detalle-item"] tr').each(function(){

            if($(this).find('textarea[data-name="descripcion"]').val() == '')
            {
                HELPER.notificacion('Existe item sin Descripción', 'warning');
                detalle = [];
                return false;         
            }
        
            let item = {
                id_articulo : $(this).find('select[data-name="id_articulo"]').val(),
                cantidad : $(this).find('input[data-name="cantidad"]').val(),
                valor_unitario : $(this).find('input[data-name="valor_unitario"]').val(),
                precio_unitario : $(this).find('input[data-name="precio_unitario"]').val(),
                subtotal : $(this).find('input[data-name="subtotal"]').val(),
                porcentaje_igv : $(this).find('input[data-name="porcentaje_igv"]').val(),
                igv : $(this).find('input[data-name="igv"]').val(),
                importe : $(this).find('input[data-name="importe"]').val()

            };

            detalle.push(item);
        });

        return detalle;
    },

    /************
     * 
     *  CALCULOS
     */

    calculo_importe_linea: async (codigo) => {

        let cantidad = DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="cantidad"]').val();
        cantidad =  parseFloat((cantidad != '') ? cantidad : 0);

        let valor_unitario = DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="valor_unitario"]').val();
        valor_unitario = parseFloat((valor_unitario != '') ? valor_unitario : 0);

        let precio_unitario = DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="precio_unitario"]').val();
        precio_unitario = parseFloat((precio_unitario != '') ? precio_unitario : 0);

        let importe = cantidad * precio_unitario;
        importe = Math.round((importe + Number.EPSILON) * 100) / 100;
        
        let subtotal = cantidad * valor_unitario;
        subtotal = Math.round((subtotal + Number.EPSILON) * 100) / 100;

        let igv = importe - subtotal;
        igv = Math.round((igv + Number.EPSILON) * 100) / 100;
        
        let obj_total = {
            cantidad: cantidad,
            valor_unitario: valor_unitario,
            precio_unitario: precio_unitario,
            subtotal: subtotal,
            igv: igv,
            importe: importe
        };

        console.log(obj_total);

        DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="subtotal"]').val(subtotal.toFixed(2));
        DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="igv"]').val(igv.toFixed(2));
        DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="importe"]').val(importe.toFixed(2));

        Componente.calcular_importe_total();
    },

    calculo_valor_unitario_linea: async (codigo) => {

        let precio_unitario = DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="precio_unitario"]').val();
        precio_unitario = parseFloat((precio_unitario != '') ? precio_unitario : 0);

        let valor_unitario = precio_unitario / ((GLOBAL.porcentaje_igv / 100) + 1);

        DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="valor_unitario"]').val(valor_unitario.toFixed(7));

        Componente.calculo_importe_linea(codigo);
    },

    calculo_precio_unitario_linea: async (codigo) => {

        let valor_unitario = DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="valor_unitario"]').val();
        valor_unitario = parseFloat((valor_unitario != '') ? valor_unitario : 0);

        let precio_unitario = valor_unitario * (1 + (GLOBAL.porcentaje_igv / 100));

        DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="precio_unitario"]').val(precio_unitario.toFixed(2));

        Componente.calculo_importe_linea(codigo);
    },

    calculo_precio_unitario_importe_linea: async (codigo) => {

        let importe = DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="importe"]').val();
        importe = parseFloat((importe != '') ? importe : 0);

        let cantidad = DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="cantidad"]').val();

        if(cantidad == '')
        {
            DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="cantidad"]').val(1);
            cantidad = 1;
        }
        
        cantidad =  parseFloat(cantidad);

        let precio_unitario = importe / cantidad;

        DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="precio_unitario"]').val(precio_unitario.toFixed(2));

        Componente.calculo_valor_unitario_linea(codigo);
    },

    calculo_valor_unitario_igv_linea: async (codigo) => {

        let igv = DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="igv"]').val();
        igv = parseFloat((igv != '') ? igv : 0);
        
        let monto_base = igv / (GLOBAL.porcentaje_igv / 100);
        let importe = monto_base + igv;

        DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="importe"]').val(importe.toFixed(2));

        Componente.calculo_precio_unitario_importe_linea(codigo);
    },

    /*** CALCULO TOTALES */

    calcular_importe_total: async () => {

        let total_gravada = 0;
        let total_igv = 0;
        let total_importe = 0;

        DOM.find('tbody[name="detalle-item"] tr').each(function(){
        
            let subtotal =  parseFloat($(this).find('input[data-name="subtotal"]').val());
            let igv = parseFloat($(this).find('input[data-name="igv"]').val());
            let importe =  parseFloat($(this).find('input[data-name="importe"]').val());

            total_gravada = total_gravada + subtotal;
            total_igv = total_igv + igv;
            total_importe = total_importe + importe;
        });

        DOM.find('input[name="total_gravada"]').val(total_gravada.toFixed(2));
        DOM.find('input[name="total_igv"]').val(total_igv.toFixed(2));
        DOM.find('input[name="total_importe"]').val(total_importe.toFixed(2));

    },

    /**** */



    change_condicion_pago: () => {

        let condicion_pago = DOM.find('select[name="condicion_pago"]').val();

        if(condicion_pago == 'CONTADO')
        {
            DOM.find('input[name="dias_pagar"]').prop('disabled', true);
        }
        else
        {
            DOM.find('input[name="dias_pagar"]').prop('disabled', false);
        }
    },

    change_moneda: () => {

        let value = DOM.find('select[name="id_moneda"]').val();

        if(value == 1)
        {
            DOM.find('input[name="tipo_cambio"]').prop('disabled', true)
            .val('');
        }
        else
        {
            DOM.find('input[name="tipo_cambio"]').prop('disabled', false)
            .val(GLOBAL.tipo_cambio);
        }
    },
    

    get_correlativo: async () => {

        let serie = DOM.find('input[name="serie"]').val();

    await axios.get(BASE_API+'almacen/orden_compra/get_correlativo/'+serie)
    .then(function (response) {

        DOM.find('input[name="numero"]').val(response.data.numero);

    }).catch(error => {
        console.log(error);
    });
    },

    select_moneda: async () =>
    {
        let select = DOM.find('select[data-select="MONEDA"]');       
        select.append($('<option></option>').attr('value', '').text('Seleccionar...'));

        await axios.get(BASE_API+'recursos/data_static/moneda')
        .then(function (response) {
            response.data.forEach(row => {
                select.append('<option value="'+row.id+'">'+row.text+'</option>');
            });

            select.select2();
        }).catch(error => {
            console.log(error);
        }); 
    },

    select_proveedor: async () => {

        DOM.find('select[data-select="PROVEEDOR"]').select2({
            ajax: {
                url: BASE_API + "configuracion/socio/get_select?fl_proveedor=true",
                dataType: 'json',
                delay: 250,
                data: function(params) {
                return {buscar:params.term};
                },
                processResults: function(data, params) {      
                return {results: data};
                },
                cache: true,
            },
            escapeMarkup: function(markup) {
                return markup;
            },
            placeholder: "Buscar Razón Social o Número de Documento",
            minimumInputLength: 6,
            allowClear:true
        });

    },

    datatable: function() {

        this.table = DOM.find('table[name="registros"]').DataTable({
            ajax:  {
                url: BASE_API + 'almacen/orden_compra',
                data: function (d) {
                    d.fecha_inicio = DOM.find('input[name="fecha_inicio"]').val();
                    d.fecha_fin = DOM.find('input[name="fecha_fin"]').val();
                }
            },

            columns: [
            { title: 'ID', mData: 'id', visible: false},
            {
                title: 'ACCIÓN',
                defaultContent: ``,                    
                render: function(data, type, row) {
                    var html = `
                        <div class="btn-group" style="width:120px;">
                            <button type="button" class="btn btn-default btn-sm" name="row-print">VISUALIZAR</button>     
                            <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">
                                <i class="fa fa-angle-down"></i>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-left" role="menu">
                                <li><a class="dropdown-item" name="row-edit" href="javascript:"><i class="far fa-pencil"></i> Editar</a></li>
                                <li><a class="dropdown-item" name="row-anular" href="javascript:"><i class="far fa-ban"></i> Anular</a></li>
                            </ul>
                        </div>
                    `;

                    return html;
                },
                width: '100px',
            },
            { title: 'ESTADO', defaultContent: ``,                    
                render: function(data, type, row) {
                    
                    let html = ``;

                    if(row.fl_estado == 0)
                    {
                        html = `<small class="label label-danger">ANULADO</small>`;                        
                    }
                    else if(row.fl_estado == 1)
                    {
                        html = `<small class="label label-primary">REGISTRADO</small>`;
                    }
                    else if(row.fl_estado == 2)
                    {
                        html = `<small class="label label-SUCCESS">PROCESADO</small>`;
                    }

                    return html;
                }
            },
            { title: 'FECHA', render: function(data, type, row) { return HELPER.fecha(row.fecha); }},
            { title: 'SERIE', mData: 'serie'},
            { title: 'NÚMERO', mData: 'numero' },
            { title: 'PROVEEDOR', mData: 'proveedor'},
            { title: 'IMPORTE', render: function(data, type, row) { return row.simbolo_moneda+' '+row.total_importe; }},
            { title: 'TIPO CAMBIO', mData: 'tipo_cambio' },
            { title: 'PRIORIDAD', mData: 'prioridad' },
        ],
            order: [[ 0, 'asc' ]]
        });

    },

    submit: function() {
        
        let items = Componente.item_json();
        
        if(items.length == 0 )
        {
            HELPER.notificacion('No existe items', 'warning');
        }
        else
        {
            let ladda = HELPER.ladda(DOM_ID+' form[name="save"] button[name="submit"]');
            let formData = new FormData(document.querySelector(DOM_ID+' form[name="save"]'));

            if (this.id != null) { formData.append('id', this.id); }

            formData.append('detalle', JSON.stringify(items));

            let canvas = document.getElementById('canvas');
            let imagen_firma = canvas.toDataURL("image/png");
            formData.append('firma_base64', Componente.dataURLtoFile(imagen_firma, 'firma.png'));

            axios({
                method: 'post',
                url: BASE_API + 'almacen/orden_compra/'+Componente.action_submit,
                data: formData
            })
            .then(function(response) { 
                
                Componente.table.ajax.reload(null, false);
                DOM.find('div[name="modal-'+Componente.action_submit+'"]').modal('hide');
                HELPER.notificacion(response.data.mensaje, 'success');

                Impresion.print(response.data.id_orden_compra); 
            
                ladda.stop();
            }).catch(error => {
                ladda.stop();
            });
        }
        
    },

    submit_anular: function() {        
        
        let ladda = HELPER.ladda(DOM_ID+' form[name="save"] button[name="submit"]');
        let formData = new FormData(document.querySelector(DOM_ID+' form[name="save"]'));

        if (this.id != null) { formData.append('id', this.id); }

        axios({
            method: 'post',
            url: BASE_API + 'almacen/orden_compra/'+Componente.action_submit,
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

    dataURLtoFile:(dataurl, filename) => {

        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
    },
} 

export default Componente;