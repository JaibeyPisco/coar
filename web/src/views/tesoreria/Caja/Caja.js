/**
 * @author Gerson Magán
 * @email gersonctk@hotmail.com
 * @create date 2021-02-04 15:09:03
 * @modify date 2021-02-04 15:09:03
 * @desc [description]
 */

import Imprimir_caja from './Imprimir.js'

let DOM, DOM_ID ;
let Componente = {
    render: async (d, tipo = 'CAJA') => {

        let titulo = 'Caja';

        if(tipo == 'CAJA_RAPIDA')
        {
            titulo = 'Caja Rápida';
        }
        
        $('#main').off();
        d.innerHTML = `

        <div id="main">
            <!-- Content Header (Page header) -->
            <section class="content-header">
                <div class="row">
                    <div class="col-md-8 content-header" style="padding-top:5px;">
                        <h1 style="margin:0; ">
                            `+titulo+`
                            <small>Tesoreria</small>
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
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                            <h4 name="save" class="modal-title">Modal title</h4>
                        </div>
                        <form name="save">
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Fecha <span class="text-red">(*)</span></label>
                                            <div class="form-group">
                                            <input type="date" class="form-control" name="fecha" />
                                            </div>                              
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Serie <span class="text-red">(*)</span></label>
                                            <div class="form-group">
                                            <input type="text" class="form-control" name="serie" disabled />
                                            </div>                              
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Número <span class="text-red">(*)</span></label>
                                            <div class="form-group">
                                            <input type="text" class="form-control" name="numero" disabled/>
                                            </div>                              
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Manifiesto <small>( Para gastos y  descuentos)</small></label>
                                            <div class="form-group">
                                            <select name="id_manifiesto" data-select="VIAJE" class="form-control"></select>
                                            </div>                              
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Motivo <span class="text-red">(*)</span></label>
                                            <input type="text" name="motivo" class="form-control" list="list-motivo_caja" autocomplete="off" />
                                            <datalist id="list-motivo_caja">
                                                <option value="GASTOS OPERATIVOS" />
                                                <option value="COMBUSTIBLE" />
                                                <option value="OTROS" />
                                            </datalist>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Modalidad de Pago <span class="text-red">(*)</span></label>
                                            <select data-select="FORMA_PAGO" name="modalidad" class="form-control"></select>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Moneda <span class="text-red">(*)</span></label>
                                            <select name="id_moneda" data-select="MONEDA" class="form-control select"></select>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Tipo Cambio <span class="text-red">(*)</span></label>
                                            <input type="number" step="any" name="tipo_cambio" class="form-control" autocomplete="off">
                                        </div>
                                    </div>      
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Importe <span class="text-red">(*)</span></label>
                                            <input type="text" name="importe" class="form-control" autocomplete="off">
                                        </div>                         
                                    </div>  
                                    <div class="col-md-8">
                                        <div class="form-group">
                                            <label>Descripción <span class="text-red">(*)</span></label>
                                            <input type="text" class="form-control" name="descripcion" />                             
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Local</label>
                                            <select name="id_local" data-select="LOCAL" class="form-control select"></select>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>Tipo Persona <span class="text-red">(*)</span></label>
                                            <select name="tipo_persona" class="form-control select">
                                                <option value="">Seleccione...</option>
                                                <option value="PROVEEDOR">PROVEEDOR</option>
                                                <option value="CONDUCTOR">CONDUCTOR</option>
                                                <option value="ADMINISTRATIVO">ADMINISTRATIVO</option>
                                                <option value="OTRO">OTRO</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-8" data-campo="id_tipo_persona">
                                        <div class="form-group">
                                            <label>Persona <span class="text-red">(*)</span></label>
                                            <select name="id_tipo_persona" data-select="ID_TIPO_PERSONA" class="form-control"></select>                          
                                        </div>
                                    </div>
                                    <div class="col-md-8" data-campo="nombre_persona">
                                        <div class="form-group">
                                            <label>Nombre completo de persona <span class="text-red">(*)</span></label>
                                            <input type="text" name="nombre_persona" class="form-control" autocomplete="off">                 
                                        </div>
                                    </div>
                                    <div class="col-md-6" data-campo="id_cuenta_bancaria_persona">
                                        <div class="form-group">
                                            <label>Cuenta Bancaria de Persona <span class="text-red">(*)</span></label>
                                            <select name="id_cuenta_bancaria_persona" data-select="ID_CUENTA_BANCARIA_PERSONA" class="form-control"></select>                          
                                        </div>
                                    </div>
                                    <div class="col-md-6" data-campo="cuenta_bancaria_persona">
                                        <div class="form-group">
                                            <label>Cuenta Bancaria de Persona <span class="text-red">(*)</span></label>
                                            <input type="text" name="cuenta_bancaria_persona" class="form-control" autocomplete="off">                 
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Cuenta Bancaria de Empresa</label>
                                            <select name="id_cuenta_bancaria_empresa" data-select="CUENTA_BANCARIA_EMPRESA" class="form-control"></select>                          
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Observación</label>
                                            <textarea name="observacion" class="form-control"></textarea>                          
                                        </div>
                                    </div>
                                    <div class="col-md-12" data-campo="fl_no_liquidacion_manifiesto">
                                        <div class="form-group">
                                            <label><input type="checkbox" name="fl_no_liquidacion_manifiesto" /> No aplica para liquidación de manifiesto</label>
                                        </div>
                                    </div>
                                    <div class="col-md-12" style="display:`+((tipo != 'CAJA_RAPIDA') ? 'block' : 'none')+`">
                                        <div class="callout callout-info" style="background-color:#fff !important; margin-bottom:0; padding:12px; margin-bottom:10px;">
                                        <h4 style="color:#0097bc; margin-bottom:0;">ATENCIÓN:</h4>
                                        <p style="color:#004a95">Esta solicitud de caja será evaluado y autorizado por un usuario encargado.</p>
                                        </div>
                                    </div>
                                                    
                                </div>
                            </div>
                            <div class="modal-footer" align="center" style="display:block">
                                <button type="button" name="cerrar" class="btn btn-white pull-left" data-dismiss="modal">Cerrar</button>
                                <button type="submit" name="submit" class="btn btn-primary">Guardar</button>
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

        Componente.after_render(tipo);     
        
    },

    after_render: async (tipo) => {

        DOM_ID = '#main';
        DOM = $(DOM_ID);        

        /** SUBMIT SAVE */
        DOM.find('form[name="save"]').validate({

            /* REGLAS */
            rules: {
                fecha: {required: true},
                motivo: {required: true},
                modalidad: {required: true},
                id_moneda: {required: true},
                importe: {required: true},
                descripcion: {required: true},
                tipo_persona: {required: true},
                id_tipo_persona: {required: true},
                nombre_persona: {required: true},
                id_cuenta_bancaria_persona: {required: true},
                cuenta_bancaria_persona: {required: true},
                tipo_cambio: {required:true},
                id_local: {required:true},
            },
          
            messages: {
                fecha: 'Fecha',
                motivo: 'Motivo',
                modalidad: 'Modalidad',
                id_moneda: 'Moneda',
                importe: 'Importe',
                descripcion: 'Descripción',
                tipo_persona: 'Tipo de Persona',
                id_tipo_persona: 'Persona',
                nombre_persona: 'Persona',
                id_cuenta_bancaria_persona: 'Cuenta Bancaria de la Persona',
                cuenta_bancaria_persona: 'Cuenta Bancaria de la Persona',
                tipo_cambio: 'Tipo Cambio',
                id_local: 'Local'
            },

            submitHandler: function() {
                Componente.submit();
            }
          
        });

        /* DATATABLE UPDATE*/
        DOM.on('click', 'button[name="update_datatable"]', function(e) {
            e.stopImmediatePropagation();
            Componente.table.ajax.reload(null, false);
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

        /* PRINT */
        DOM.on('click', 'button[name="row-print"]', function(e) {
            e.stopImmediatePropagation();
            
            let data = HELPER.get_attr_json($(this));
            Imprimir_caja.print(data.id);
        });

        /* EDITAR */
        DOM.on('click', 'a[name="row-edit"]', function(e) {
            e.stopImmediatePropagation();
            Componente.edit($(this));
        });


        /* ELIMINAR */
        DOM.on('click', 'a[name="row-delete"]', function(e) {
            e.stopImmediatePropagation();
            Componente.delete($(this));
        });

        /* CHANGE TIPO PERSONA */
        DOM.on('change', 'select[name="tipo_persona"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
                Componente.change_tipo_persona();
                Componente.select_cuenta_bancaria_persona();
            }            
        });

        /* CHANGE ID TIPO PERSONA */
        DOM.on('change', 'select[name="id_tipo_persona"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
                Componente.select_cuenta_bancaria_persona();
                Componente.change_id_tipo_persona();
            }            
        });

        /* CHANGE CUENTA BANCARIA PERSONA*/
        DOM.on('change', 'select[name="id_cuenta_bancaria_persona"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
                Componente.change_id_cuenta_bancaria_persona();
            }            
        });

        /* CHANGE MODALIDAD */
        DOM.on('change', 'select[name="modalidad"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
                Componente.change_tipo_persona();
            }            
        });

        /* CHANGE MONEDA*/
        DOM.on('change', 'select[name="id_moneda"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
                Componente.select_cuenta_bancaria_empresa();
                Componente.change_moneda();
            }            
        });


        /* CHANGE VIAJE*/
        DOM.on('change', 'select[name="id_manifiesto"]', function(e) {
            e.stopImmediatePropagation();
            if(Componente.fl_auto_event == true)
            {
                Componente.change_manifiesto();
            }            
        });
        

        DOM.find('input[name="fecha_inicio"]').val(HELPER.primer_dia_mes());
        DOM.find('input[name="fecha_fin"]').val(HELPER.fecha_actual());

        Componente.tipo = tipo;

        Componente.datatable();
        Componente.select_manifiesto();
        Componente.select_cuenta_bancaria_empresa();
        Componente.select_moneda();
        Componente.select_local();
        Componente.select_medio_pago();

        HELPER.load_component();
    },

    /**** DATA */
    id: null,
    action_submit: null,
    imagen_anterior: null,
    fl_auto_event: true,
    tipo: null,

    /************ */

    select_medio_pago: () => {

        let select = DOM.find('select[data-select="FORMA_PAGO"]');       
        select.empty();
        select.append($('<option></option>').attr('value', '').text('Seleccionar...'));

        axios.get(BASE_API+'configuracion/forma_pago/get_select')
        .then(function (response) {
            response.data.forEach(row => {
                select.append('<option value="'+row.text+'" data-fl_numero_operacion="'+row.fl_numero_operacion+'">'+row.text+'</option>');
            });

            select.select2();
        }).catch(error => {
            console.log(error);
        }); 

    },

    change_moneda: async (get_helper = true) => {
        let value = DOM.find('select[name="id_moneda"]').val();

        if(value == 1)
        {
            DOM.find('input[name="tipo_cambio"]').prop('disabled', true);
            DOM.find('input[name="tipo_cambio"]').val('');
        }
        else if(value != '')
        {
            DOM.find('input[name="tipo_cambio"]').prop('disabled', false);
            if(get_helper)
            {
                DOM.find('input[name="tipo_cambio"]').val(await HELPER.get_tipo_cambio(value));
            }
            
        }
    },

    change_manifiesto: async () => {

        let id_manifiesto = DOM.find('select[name="id_manifiesto"]').val();
        
        if(id_manifiesto != null)
        {
            await axios.get(BASE_API + 'tesoreria/caja/get_manifiesto/'+id_manifiesto)
            .then(function (response) {
                
                DOM.find('select[name="id_moneda"]').val(response.data.id_moneda).change();
                DOM.find('div[data-campo="fl_no_liquidacion_manifiesto"]').show();
                
            }).catch(error => {
                console.log(error);
            }); 
        }
        else
        {
            DOM.find('div[data-campo="fl_no_liquidacion_manifiesto"]').hide();
            DOM.find('input[name="fl_no_liquidacion_manifiesto"]').prop('checked', false);
        }
    },

    select_moneda: async () => {

        let select = DOM.find('select[data-select="MONEDA"]');  

        await axios.get(BASE_API + 'recursos/data_static/moneda')
        .then(function (response) {

            let html = '<option value="">Seleccione...</option>';

            response.data.forEach(row => {
                html += '<option value="'+row.id+'">'+row.text+'</option>';
            });

            select.html(html);
            select.select2();
        }).catch(error => {
            console.log(error);
        }); 
    },

    select_local: async () => {

        let select = DOM.find('select[data-select="LOCAL"]');  

        await axios.get(BASE_API + 'configuracion/local/get_select')
        .then(function (response) {

            let html = '<option value="">Seleccione...</option>';

            response.data.forEach(row => {
                html += '<option value="'+row.id+'">'+row.text+'</option>';
            });

            select.html(html);
            select.select2();
        }).catch(error => {
            console.log(error);
        }); 
    },
    

    change_id_tipo_persona: async () => {

        let tipo_persona = DOM.find('select[name="tipo_persona]').val();

        if(tipo_persona != 'OTRO')
        {
            let nombre = DOM.find('select[name="id_tipo_persona"] option:selected').text()
            DOM.find('input[name="nombre_persona"]').val(nombre);
        }
        
    },

    change_id_cuenta_bancaria_persona: async () => {

        let tipo_persona = DOM.find('select[name="tipo_persona]').val();

        if(tipo_persona != 'OTRO')
        {
            let nombre_cuenta = DOM.find('select[name="id_cuenta_bancaria_persona"] option:selected').text()
            DOM.find('input[name="cuenta_bancaria_persona"]').val(nombre_cuenta);
        }
        
    },


    select_cuenta_bancaria_persona : async () => {        

        let id = DOM.find('select[name="id_tipo_persona"]').val();
        let tipo_persona = DOM.find('select[name="tipo_persona"]').val();

        let select = DOM.find('select[data-select="ID_CUENTA_BANCARIA_PERSONA"]');     
        select.empty();  
        select.append($('<option></option>').attr('value', '').text('Seleccione...'));

        if(id != '' && id != null)
        {
            await axios.get(BASE_API + 'configuracion/cuenta_bancaria_persona/get_select?tipo='+tipo_persona+'&id='+id)
            .then(function (response) {
                response.data.forEach(row => {
                    select.append('<option value="'+row.id+'">'+row.text+'</option>');
                });

                select.select2();
            }).catch(error => {
                console.log(error);
            }); 
        }        

    },

    change_tipo_persona: async () => {

        let tipo_persona = DOM.find('select[name="tipo_persona"]').val();
        
        let url;
        let select_tipo_persona = true;

        DOM.find('div[data-campo="id_tipo_persona"]').show();
        DOM.find('select[name="id_tipo_persona"]').prop('disabled', false);
        DOM.find('div[data-campo="nombre_persona"]').hide();

        switch (tipo_persona) {
            case 'CONDUCTOR':
                url = BASE_API  + 'configuracion/personal/get_select?tipo=CONDUCTOR';
            break;
        
            case 'ADMINISTRATIVO':
                url = BASE_API  +   'configuracion/personal/get_select?tipo=ADMINISTRATIVO';
            break;

            case 'PROVEEDOR':
                url = BASE_API  +   'configuracion/socio/get_select_simple?fl_proveedor=true';
            break;

            case 'OTRO':                    
                select_tipo_persona = false;

                DOM.find('select[name="id_tipo_persona"]').prop('disabled', true);
                DOM.find('div[data-campo="id_tipo_persona"]').hide();
                DOM.find('div[data-campo="nombre_persona"]').show();

            break;

            default:
                select_tipo_persona = false;
            break;
        }
        
        if(select_tipo_persona)
        {
            await Componente.select_tipo_persona(url);
        }   

        /** CAMPOS CUENTA BANCARIA */
        let modalidad = DOM.find('select[name="modalidad"]').val();

        DOM.find('select[name="id_cuenta_bancaria_persona"]').prop('disabled', false);
        DOM.find('input[name="cuenta_bancaria_persona"]').prop('disabled', false);
        DOM.find('div[data-campo="id_cuenta_bancaria_persona"]').show();
        DOM.find('div[data-campo="cuenta_bancaria_persona"]').hide();

        if(modalidad != 'EFECTIVO')
        {
            if(tipo_persona == 'OTRO')
            {
                DOM.find('select[name="id_cuenta_bancaria_persona"]').prop('disabled', true);
                DOM.find('div[data-campo="id_cuenta_bancaria_persona"]').hide();
                DOM.find('div[data-campo="cuenta_bancaria_persona"]').show();
            }
            else
            {
                DOM.find('div[data-campo="id_cuenta_bancaria_persona"]').show();
                DOM.find('div[data-campo="cuenta_bancaria_persona"]').hide();
            }
        }
        else
        {
            DOM.find('select[name="id_cuenta_bancaria_persona"]').prop('disabled', true);
            DOM.find('input[name="cuenta_bancaria_persona"]').prop('disabled', true);
        }
    },

    select_tipo_persona: async (url) => {

        let select = DOM.find('select[data-select="ID_TIPO_PERSONA"]');  

        await axios.get(url)
        .then(function (response) {

            let html = '<option value="">Seleccione...</option>';

            response.data.forEach(row => {
                html += '<option value="'+row.id+'">'+row.text+'</option>';
            });

            select.html(html);
            select.select2();
        }).catch(error => {
            console.log(error);
        }); 
    },

    select_cuenta_bancaria_empresa: async () =>
    {
        let select = DOM.find('select[data-select="CUENTA_BANCARIA_EMPRESA"]');       
        select.empty();
        select.append($('<option></option>').attr('value', '').text('Seleccionar...'));

        let id_moneda = DOM.find('select[name="id_moneda"]').val();

        if(id_moneda != '')
        {
            await axios.get(BASE_API+'configuracion/cuenta_bancaria_empresa/get_select?id_moneda='+id_moneda)
            .then(function (response) {
                response.data.forEach(row => {
                    select.append('<option value="'+row.id+'">'+row.text+'</option>');
                });

                select.select2();
            }).catch(error => {
                console.log(error);
            }); 
        }
        
    },

    select_manifiesto: async () => {

        DOM.find('select[data-select="VIAJE"]').select2({
            ajax: {
              url: BASE_API + "operacion/manifiesto/get_select",
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
            placeholder: "Buscar por Serie-Número o dia/mes/año ",
            minimumInputLength: 6,
            allowClear:true
        });

    },

    datatable: function() {

        this.table = DOM.find('table[name="registros"]').DataTable({
            ajax:   {
                    url: BASE_API + 'tesoreria/caja',
                    data: function (d) {
                        d.fecha_inicio = DOM.find('input[name="fecha_inicio"]').val();
                        d.fecha_fin = DOM.find('input[name="fecha_fin"]').val();
                        d.tipo = Componente.tipo;
                    }
            },

            columns: [{
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
                                    <li><a class="dropdown-item" name="row-delete" href="javascript:"><i class="far fa-ban"></i> Anular</a></li>
                                </ul>
                            </div>
                        `;

                        return html;
                    },
                    width: '100px',
                },
                { title: 'FECHA', render: function(data, type, row) { return HELPER.fecha(row.fecha); }},
                { title: 'NÚMERO', mData: 'caja' },
                { title: 'TIPO', render: function(data, type, row) { 

                    let html = '';

                    if(row.tipo == 'CAJA_RAPIDA')
                    {
                        html = '<small class="label label-info"> CAJA RÁPIDA</small>';
                    }
                    else
                    {
                        html = '<small class="label label-default"> REGULAR</small>';
                    }

                    return html; 
                    }
                },
                { title: 'TIPO MOVIMIENTO', mData: 'tipo_movimiento' },
                { title: 'MANIFIESTO', mData: 'manifiesto' },
                { title: 'MOTIVO', mData: 'motivo' },
                { title: 'MODALIDAD', mData: 'modalidad' },
                { title: 'DESCRIPCION', mData: 'descripcion' },
                { title: 'PERSONA', mData: 'nombre_persona' },
                { title: 'IMPORTE', render: function(data, type, row) { return row.simbolo_moneda+' '+row.importe; }, class:'text-right'},
                { title: 'TIPO CAMBIO', mData: 'tipo_cambio' },
                { title: 'ESTADO', defaultContent: ``,                    
                    render: function(data, type, row) {
                        
                        let html = ``;

                        if(row.fl_estado == 0)
                        {
                            html = `
                                <small class="label label-danger"> ANULADO</small>
                            `;
                        }
                        else if(row.fl_estado == 1)
                        {
                            html = `
                                <small class="label label-default"> EN EVALUACIÓN</small>
                            `;
                        }
                        else if(row.fl_estado == 2)
                        {
                            html = `
                                <small class="label label-primary"> APROBADO</small>
                            `;
                        }
                        else if(row.fl_estado == 3)
                        {
                            html = `
                                <small class="label label-success"> PROCESADO</small>
                            `;
                        }

                        return html;
                    }
                },
                { title: 'COMENTARIO', mData: 'comentario_autorizacion', visible: (Componente.tipo == 'CAJA_RAPIDA') ? false : true },
            ],
            createdRow: function (row, data, indice) {
                $(row).attr('data-json', JSON.stringify(data));

                if(data.fl_estado == 0)
                {
                    $(row).css('text-decoration', 'line-through');
                    $(row).css('color', 'red');
                }
            },
        });

    },

    get_correlativo: async () => {

        await axios.get(BASE_API+'tesoreria/caja/get_correlativo')
        .then(function (response) {

            DOM.find('input[name="numero"]').val(response.data.numero);
            DOM.find('input[name="serie"]').val(response.data.serie);

        }).catch(error => {
            console.log(error);
        });

    },

    new: function() {

        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Nueva Caja');

        /** DATA */
        HELPER.reset_form(form);

        form.find('input[name="fecha"]').val(HELPER.fecha_actual());
        
        this.get_correlativo();

        form.find('select[name="id_moneda"]').val(1).change();

        form.find('select[name="id_local"]').val(GLOBAL.usuario.id_local).change();

        this.id = null;
        this.action_submit = accion;
        
        DOM.find('div[data-campo="fl_no_liquidacion_manifiesto"]').hide();
        DOM.find('tbody[name="detalle-cuenta_bancaria"]').html('');
        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    edit: async (row) => {
        
        let accion = 'save';
        let form = DOM.find('form[name="save"]');

        DOM.find('h4[name="'+accion+'"]').text('Editar Caja');

        /** DATA */
        HELPER.reset_form(form);

        DOM.find('div[data-campo="fl_no_liquidacion_manifiesto"]').hide();

        let data = HELPER.get_attr_json(row);

        Componente.fl_auto_event = false;

        form.find('input[name="fecha"]').val(data.fecha);

        form.find('input[name="serie"]').val(data.serie);
        form.find('input[name="numero"]').val(data.numero);

        if(data.id_manifiesto != null)
        {
            form.find('select[name="id_manifiesto"]').html('');
            form.find('select[name="id_manifiesto"]').append(new Option(data.manifiesto, data.id_manifiesto));
        }        

        form.find('input[name="descripcion"]').val(data.descripcion);
        form.find('input[name="motivo"]').val(data.motivo).change();
        form.find('select[name="modalidad"]').val(data.modalidad).change();
        form.find('input[name="importe"]').val(data.importe);
        form.find('select[name="tipo_persona"]').val(data.tipo_persona).change();
        form.find('input[name="fl_no_liquidacion_manifiesto"]').prop('checked', parseInt(data.fl_no_liquidacion_manifiesto));
        
        
        await Componente.change_manifiesto();

        await Componente.change_tipo_persona();

        form.find('select[name="id_tipo_persona"]').val(data.id_tipo_persona).change();
        form.find('input[name="nombre_persona"]').val(data.nombre_persona);

        await Componente.change_tipo_persona();

        form.find('select[name="id_moneda"]').val(data.id_moneda).change();

        await Componente.change_moneda(false);
        form.find('input[name="tipo_cambio"]').val(data.tipo_cambio);


        form.find('select[name="id_tipo_persona"]').val(data.id_tipo_persona).change();

        await Componente.select_cuenta_bancaria_persona();

        form.find('select[name="id_cuenta_bancaria_persona"]').val(data.id_cuenta_bancaria_persona).change();
        form.find('input[name="cuenta_bancaria_persona"]').val(data.cuenta_bancaria_persona);

        await Componente.select_cuenta_bancaria_empresa();

        form.find('select[name="id_cuenta_bancaria_empresa"]').val(data.id_cuenta_bancaria_empresa).change();
        form.find('textarea[name="observacion"]').html(data.observacion);

        form.find('select[name="id_local"]').val(data.id_local).change();

       

        Componente.fl_auto_event = true;

        Componente.id = data.id;
        Componente.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    delete: function(row) {

        let accion = 'delete';
        let form = DOM.find('form[name="'+accion+'"]');

        DOM.find('h4[name="'+accion+'"]').text('Anular Caja');

        /** DATA */
        HELPER.reset_form(form);
        
        let data = HELPER.get_attr_json(row);

        form.find('div[name="texto"]').text(data.serie+'-'+data.numero);

        this.id = data.id;
        this.action_submit = accion;

        DOM.find('div[name="modal-'+accion+'"]').modal('show');
    },

    submit: function() {
        
        let ladda = HELPER.ladda(DOM_ID+' form[name="' + this.action_submit + '"] button[type="submit"]');
        let formData = new FormData(document.querySelector(DOM_ID+' form[name="' + this.action_submit + '"]'));

        if (this.id != null) { formData.append('id', this.id); }

        formData.append('tipo', Componente.tipo);

        axios({
            method: 'post',
            url: BASE_API + 'tesoreria/caja/' + this.action_submit,
            data: formData
        })
        .then(function(response) { 
            Componente.table.ajax.reload(null, false);
            DOM.find('div[name="modal-'+Componente.action_submit+'"]').modal('hide');
            HELPER.notificacion(response.data.mensaje, 'success');

            if(Componente.action_submit == 'save')
            {
                Imprimir_caja.print(response.data.id_caja);
            }
            ladda.stop();
        }).catch(error => {
            ladda.stop();
        });
    },
} 

export default Componente;