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
                            Salida de Artículos
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
                                                    <label>Tipo Destino <span class="text-red">(*)</span></label>
                                                    <select name="tipo_destino" class="form-control select">
                                                        <option value="">Seleccione...</option>
                                                        <option value="VEHICULO">VEHÍCULO</option>
                                                        <option value="PERSONAL">PERSONAL</option>
                                                        <option value="PROVEEDOR">PROVEEDOR</option>
                                                    </select>                         
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group">
                                                    <label>Vehículo <span class="text-red">(*)</span></label>
                                                    <select data-select="VEHICULO" class="form-control" name="id_vehiculo"></select>       
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label>Personal (Responsable)<span class="text-red">(*)</span></label>
                                                    <select data-select="PERSONAL" class="form-control" name="id_personal"></select>       
                                                </div>
                                            </div>                                            
                                            <div class="col-md-5">
                                                <div class="form-group">
                                                    <label>Proveedor <span class="text-red">(*)</span></label>
                                                    <select data-select="PROVEEDOR" class="form-control" name="id_proveedor"></select>       
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
                                                        <th>COSTO UNITARIO</th>
                                                        <th>IMPORTE</th>
                                                    </tr>
                                                </thead>
                                                <tbody name="detalle-item"></tbody>
                                                <tfoot>
                                                    <tr>
                                                        <td colspan="2">
                                                            <button type="button" name="agregar_item" class="btn btn-secondary" style="margin-bottom:20px;"><i class="fa fa-plus"></i> Agregar Nuevo Item</button>
                
                                                            <div class="row">
                                                                <div class="col-md-12">
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
                                                                    <td>TOTAL IMPORTE:</td>
                                                                    <td><input type="number" step="any" class="form-control" style="text-align:right;" name="total_importe" readonly /></td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    
                                                </tfoot>
                                            </table>
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
                 tipo_destino: {required: true},
                 id_proveedor: {required: true},
                 id_personal: {required: true},
                 id_vehiculo: {required: true},
                 prioridad: {required: true},
                 fl_autorizacion: {required:true}
             },
           
             messages: {
                 fecha: 'Fecha',
                 serie: 'Serie',
                 numero: 'Número',
                 tipo_destino: 'Tipo Destino',
                 id_proveedor: 'Proveedor',
                 id_vehiculo: 'Vehículo',
                 id_personal: 'Personal',
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

         DOM.on('change', 'input[data-name="cantidad"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
                let codigo = $(this).parents('tr')[0].dataset.codigo;
                Componente.calculo_importe_linea(codigo);
                Componente.array_totales_detalle = null;
            }            
        });

        DOM.on('keyup', 'input[data-name="costo_unitario"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
                let codigo = $(this).parents('tr')[0].dataset.codigo;
                Componente.calculo_importe_linea(codigo);
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

        /* TIPO DE DESTINO */
        DOM.on('change', 'select[name="tipo_destino"]', function(e) {
            e.stopImmediatePropagation();
            Componente.change_tipo_destino();           
        });

        DOM.find('input[name="fecha_inicio"]').val(HELPER.primer_dia_mes());
        DOM.find('input[name="fecha_fin"]').val(HELPER.fecha_actual());
        
 
         await Componente.select_personal();
         await Componente.select_vehiculo();   
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


     change_tipo_destino: () => {

        let value = DOM.find('select[name="tipo_destino"]').val();

        DOM.find('select[name="id_personal"]').prop('disabled', true);
        DOM.find('select[name="id_proveedor"]').prop('disabled', true);
        DOM.find('select[name="id_vehiculo"]').prop('disabled', true);

        switch (value) {
            case 'PERSONAL':
                DOM.find('select[name="id_personal"]').prop('disabled', false);
            break;
        
            case 'VEHICULO':
                DOM.find('select[name="id_vehiculo"]').prop('disabled', false);
                DOM.find('select[name="id_personal"]').prop('disabled', false);
            break;

            case 'PROVEEDOR':
                DOM.find('select[name="id_proveedor"]').prop('disabled', false);
            break;
        }
     
    },

     get_articulo: async (id_articulo, codigo_fila) => {

        if(id_articulo != '' && id_articulo != null)
        {
            await axios.get(BASE_API+'almacen/articulo/get_unique/'+id_articulo)
            .then(function (response) {
                
                DOM.find('tr[data-codigo="'+codigo_fila+'"] input[data-name="costo_unitario"]').val(response.data.costo);
                DOM.find('tr[data-codigo="'+codigo_fila+'"] span[data-name="unidad_medida"]').text(response.data.unidad_medida);
                Componente.calculo_importe_linea(codigo_fila);

            }).catch(error => {
                console.log(error);
            }); 
        }       

     },
     
 
     /************ */
  
     new: () => {

        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Nueva Salida de Artículo');

        /** DATA */
        HELPER.reset_form(form);

        DOM.find('tbody[name="detalle-item"').html('');
 
        DOM.find('input[name="fecha"]').val(HELPER.fecha_actual());
        DOM.find('input[name="serie"]').val(HELPER.fecha_ano());

        Componente.calcular_importe_total();

        Componente.id = null;
        Componente.action_submit = accion;

        Componente.get_correlativo();    
        
        DOM.find('div[name="modal-'+accion+'"]').modal('show');
 
     },
 
     edit: async (row) => {

        let accion = 'save';
        let form = DOM.find('form[name="save"]');
        HELPER.reset_form(form);

        DOM.find('tbody[name="detalle-item"').html('');

        DOM.find('h4[name="'+accion+'"]').text('Editar Salida de Artículos');

        let data = HELPER.get_attr_json(row);

         await axios.get(BASE_API+'almacen/salida_articulo/get_unique/'+data.id)
         .then( async (response) => {            
            data = response.data;

            Componente.fl_auto_event = false;

            form.find('input[name="fecha"]').val(data.fecha);

            form.find('input[name="serie"]').val(data.serie);
            form.find('input[name="numero"]').val(data.numero);

            form.find('select[name="tipo_destino"]').val(data.tipo_destino).change();

            form.find('select[name="id_proveedor"]').val(data.id_proveedor).change();
            form.find('select[name="id_personal"]').val(data.id_personal).change();
            form.find('select[name="id_vehiculo"]').val(data.id_vehiculo).change();

            form.find('textarea[name="observacion"]').html(data.observacion);

            data.detalle.forEach(row => {
                Componente.agregar_item(row);
            });
 
            Componente.id = data.id;
            Componente.action_submit = accion;
 
            Componente.fl_auto_event = true;
            Componente.calcular_importe_total();

            DOM.find('div[name="modal-'+accion+'"]').modal('show');
         }).catch(error => {
             console.log(error);
         }); 
         
     },

     anular: function(row) {

        let accion = 'anular';
        let form = DOM.find('form[name="'+accion+'"]');

        DOM.find('h4[name="'+accion+'"]').text('Anular Salida de Artículos');

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
                 costo_unitario: '',
                 importe:''          
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
                 <td style="width:150px;" ><input type="number" step="any" style="text-align:right;" data-name="costo_unitario" class="form-control" value="`+data.costo_unitario+`" readonly /></td>
                 <td style="width:150px;" ><input type="number" step="any" style="text-align:right;" data-name="importe" class="form-control" value="`+data.importe+`" readonly /></td>
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
                 costo_unitario : $(this).find('input[data-name="costo_unitario"]').val(),
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
 
         let costo_unitario = DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="costo_unitario"]').val();
         costo_unitario = parseFloat((costo_unitario != '') ? costo_unitario : 0);
  
         let importe = cantidad * costo_unitario;
         importe = Math.round((importe + Number.EPSILON) * 100) / 100;
         
         
         let obj_total = {
             cantidad: cantidad,
             costo_unitario: costo_unitario,
             importe: importe
         };
 
         console.log(obj_total);
 
         DOM.find('tr[data-codigo="'+codigo+'"] input[data-name="importe"]').val(importe.toFixed(2));
 
         Componente.calcular_importe_total();
     },
     
     /*** CALCULO TOTALES */
 
     calcular_importe_total: async () => {
 
         let total_importe = 0;
 
         DOM.find('tbody[name="detalle-item"] tr').each(function(){
            
             let importe =  parseFloat($(this).find('input[data-name="importe"]').val());
 
             total_importe = total_importe + importe;
         });
 
         DOM.find('input[name="total_importe"]').val(total_importe.toFixed(2));
 
     },
 
     /**** */
  
  
     get_correlativo: async () => {
 
         let serie = DOM.find('input[name="serie"]').val();

        await axios.get(BASE_API+'almacen/salida_articulo/get_correlativo/'+serie)
        .then(function (response) {

            DOM.find('input[name="numero"]').val(response.data.numero);

        }).catch(error => {
            console.log(error);
        });
     },
 
     select_personal: async () =>
     {
         let select = DOM.find('select[data-select="PERSONAL"]');   
         select.empty();    
         select.append($('<option></option>').attr('value', '').text('Seleccionar...'));
 
         await axios.get(BASE_API+'configuracion/personal/get_select')
         .then(function (response) {
             response.data.forEach(row => {
                 select.append('<option value="'+row.id+'">'+row.text+'</option>');
             });
 
             select.select2();
         }).catch(error => {
             console.log(error);
         }); 
     },

     select_vehiculo: async () =>
     {
         let select = DOM.find('select[data-select="VEHICULO"]');   
         select.empty();    
         select.append($('<option></option>').attr('value', '').text('Seleccionar...'));
 
         await axios.get(BASE_API+'configuracion/vehiculo/get_select')
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
                url: BASE_API + 'almacen/salida_articulo',
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

                    return (row.fl_estado != 0) ? html : '';
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
            { title: 'TIPO DESTINO', mData: 'tipo_destino'},
            { title: 'PERSONAL (RESPONSABLE)', mData: 'personal'},
            { title: 'VEHICULO', mData: 'vehiculo'},
            { title: 'PROVEEDOR', mData: 'proveedor'},
            { title: 'OBSERVACION', mData: 'observacion'},
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

            axios({
                method: 'post',
                url: BASE_API + 'almacen/salida_articulo/'+Componente.action_submit,
                data: formData
            })
            .then(function(response) { 
                
                Componente.table.ajax.reload(null, false);
                DOM.find('div[name="modal-'+Componente.action_submit+'"]').modal('hide');
                HELPER.notificacion(response.data.mensaje, 'success');

                Impresion.print(response.data.id_salida_articulo); 
            
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
            url: BASE_API + 'almacen/salida_articulo/'+Componente.action_submit,
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