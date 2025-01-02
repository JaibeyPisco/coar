/**
 * @author Gerson Magán
 * @email gersonctk@hotmail.com
 * @create date 2021-02-04 15:09:03
 * @modify date 2021-02-04 15:09:03
 * @desc [description]
 */

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
                            Flujo de Caja
                            <small>Reportes</small>
                        </h1>
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
                                    <input type="date" data-filtro="fecha_inicio" class="form-control" autocomplete="off">
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label>Fecha Hasta</label>
                                    <input type="date"  data-filtro="fecha_fin" class="form-control" autocomplete="off">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Local Anexo</label>
                                    <select data-filtro="id_local" data-select="LOCAL" class="form-control" autocomplete="off"></select>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Usuario</label>
                                    <select data-filtro="id_usuario" data-select="USUARIO" class="form-control" autocomplete="off"></select>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>Medio de Pago</label>
                                    <select data-filtro="medio_pago" class="form-control" autocomplete="off">
                                        <option value="">TODOS</option>
                                        <option value="EFECTIVO">EFECTIVO</option>
                                        <option value="TARJETA">TARJETA</option>
                                        <option value="DEPOSITO">DEPOSITO</option>
                                        <option value="TRANSFERENCIA">TRANSFERENCIA</option>
                                        <option value="CHEQUE">CHEQUE</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-3" style="padding-top:19px;">
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
                        <table name="registros" class="table table-striped table-bordered nowrap" style="width:100%;">
                            <tfoot>
                                <tr>
                                    <th colspan="5"></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    </div>
                </div>
                <!-- /.box -->

            </section>
            <!-- /.content -->
            

        </div>            
        `;
        
        await Componente.after_render();       
        
    },
    
    after_render: async () => {

        DOM_ID = '#main';
        DOM = $(DOM_ID);        

        DOM.find('input[data-filtro="fecha_inicio"]').val(HELPER.fecha(null, 'YYYY-MM-DD'));
        DOM.find('input[data-filtro="fecha_fin"]').val(HELPER.fecha(null, 'YYYY-MM-DD'));
        
        /* DATATABLE UPDATE*/
        DOM.on('click', 'button[name="update_datatable"]', function(e) {
            e.stopImmediatePropagation();
            Componente.table.ajax.reload(null, false);
        });

        Componente.select_local();
        Componente.select_usuario();
        Componente.datatable();

        HELPER.load_component();
    },

    select_local: async () => {
        let select = DOM.find('select[data-select="LOCAL"]');     
        select.empty();  
        select.append($('<option></option>').attr('value', '').text('TODOS'));

        await axios.get(BASE_API + 'configuracion/local/get_select')
        .then(function (response) {
            response.data.forEach(row => {
                select.append('<option value="'+row.id+'">'+row.text+'</option>');
            });

            select.select2();
        }).catch(error => {
            console.log(error);
        });
    },

    select_usuario: async () => {
        let select = DOM.find('select[data-select="USUARIO"]');     
        select.empty();  
        select.append($('<option></option>').attr('value', '').text('TODOS'));

        await axios.get(BASE_API + 'configuracion/usuario/get_select')
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
            ajax: {
                url: BASE_API + 'tesoreria/reporte/flujo_caja',
                data: function (d) {
                    d.fecha_inicio = DOM.find('input[data-filtro="fecha_inicio"]').val();
                    d.fecha_fin = DOM.find('input[data-filtro="fecha_fin"]').val();
                    d.id_local = DOM.find('select[data-filtro="id_local"]').val();
                    d.id_usuario = DOM.find('select[data-filtro="id_usuario"]').val();
                    d.medio_pago = DOM.find('select[data-filtro="medio_pago"]').val();
                }
            },

            ordering:false,

            columns: [
                { title: 'LOCAL ANEXO', mData: 'local'},
                { title: 'FECHA', render: function(data, type, row) { return HELPER.fecha(row.fecha); }},
                { title: 'MEDIO PAGO', mData: 'modalidad'},
                { title: 'NÚMERO OPERACION', render: function(data, type, row) { 

                    let value = '';

                    if(row.numero_operacion_orden_pago != '')
                    {
                        value = row.numero_operacion_orden_pago;
                    }

                    if(row.numero_operacion_factura_pago != '')
                    {
                        value = row.numero_operacion_factura_pago; 
                    }

                    return value; 
                    }
                },
                { title: 'DESCRIPCIÓN', mData: 'descripcion', class:'text-right'},
                { title: 'ORDEN', mData: 'orden', class:'text-center'},

                { title: 'FACTURA', render: function(data, type, row) { 
                    
                    let value = '';

                    if(row.factura != '')
                    {
                        value = row.factura;
                    }
                    else if(row.factura_orden != '')
                    {
                        value = row.factura_orden;
                    }

                    return value; 
                }, class:'text-center'}, 

                { title: 'INGRESOS', render: function(data, type, row) { 
                    let value = '';
                    if(row.tipo_movimiento == 'INGRESO')
                    {
                        value = row.importe;
                    }
                    return value; 
                }, class:'text-right'},        
                { title: 'EGRESOS', render: function(data, type, row) { 
                    let value = '';
                    if(row.tipo_movimiento == 'EGRESO')
                    {
                        value = row.importe;
                    }
                    return value; 
                }, class:'text-right'},      
                { title: 'USUARIO', mData: 'usuario', class:'text-center' },
            ],

            footerCallback: function ( row, data, start, end, display ) {
                                    
                let total_ingreso = 0;
                let total_egreso = 0;

                data.forEach(item => {                        
                    
                    if(item.tipo_movimiento == 'INGRESO')
                    {
                        total_ingreso = total_ingreso + parseFloat(item.importe);
                    }
                    else if(item.tipo_movimiento == 'EGRESO')
                    {
                        total_egreso = total_egreso + parseFloat(item.importe);    
                    }
                   
                       
                    
                });            

                let api = this.api();


                $(api.column(5).footer()).html('<span style="float:left;">'+GLOBAL.moneda_sistema.simbolo+'</span> <span style="float:right;">'+total_ingreso.toFixed(2)+'</span>');
                $(api.column(6).footer()).html('<span style="float:left;">'+GLOBAL.moneda_sistema.simbolo+'</span> <span style="float:right;">'+total_egreso.toFixed(2)+'</span>');
                
            },
        });

    },
} 

export default Componente;