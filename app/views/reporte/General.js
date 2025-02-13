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
                            General
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
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label>Lugar Origen</label>
                                    <select data-filtro="id_lugar_origen" data-select="LUGAR" class="form-control" autocomplete="off"></select>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label>Lugar Destino</label>
                                    <select data-filtro="id_lugar_destino" data-select="LUGAR" class="form-control" autocomplete="off"></select>
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
                        <table name="registros" class="table table-striped nowrap" style="width:100%;"></table>
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

        /*$('button[class="btn btn-default buttons-print"]').off();
        DOM.on('click', 'button[class="btn btn-default buttons-print"]', function(e) {
            e.stopImmediatePropagation();
            alert("aa");
        });*/

        Componente.select_lugar();
        Componente.datatable();

        HELPER.load_component();
    },

    select_lugar: async () => {
        let select = DOM.find('select[data-select="LUGAR"]');     
        select.empty();  
        select.append($('<option></option>').attr('value', '').text('TODOS'));

        await axios.get(BASE_API + 'configuracion/lugar/get_select')
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
                url: BASE_API + 'reporte/general',
                data: function (d) {
                    d.fecha_inicio = DOM.find('input[data-filtro="fecha_inicio"]').val();
                    d.fecha_fin = DOM.find('input[data-filtro="fecha_fin"]').val();
                    d.id_lugar_origen = DOM.find('select[data-filtro="id_lugar_origen"]').val();
                    d.id_lugar_destino = DOM.find('select[data-filtro="id_lugar_destino"]').val();
                }
            },

            columns: [
                { title: 'FECHA', render: function(data, type, row) { return HELPER.fecha(row.fecha); },},
                { title: 'ORDEN SERVICIO', mData: 'orden_servicio' },      
                { title: 'ORIGEN', mData: 'origen'},           
                { title: 'DESTINO', mData: 'destino' },
                { title: 'REMITENTE', mData: 'remitente' },
                { title: 'DESTINATARIO', mData: 'destinatario' },
                { title: 'TOTAL IMPORTE', render: function(data, type, row) { return row.simbolo_moneda+row.total_importe; }, class:'text-right', "orderDataType": "dom-text", "type": "numeric"},
                { title: 'PAGO A CUENTA', render: function(data, type, row) { return row.simbolo_moneda+row.total_pago; }, class:'text-right'},
                { title: 'POR COBRAR', render: function(data, type, row) { return row.simbolo_moneda+row.total_cobrar; }, class:'text-right'},
                { title: 'TOTAL AUMENTO', mData: 'total_aumento', class:'text-right' },
                { title: 'TOTAL DESCUENTO', mData: 'total_descuento', class:'text-right' },
                { title: 'N° COMPROBANTE', mData: 'factura', class:'text-center' },
                { title: 'ESTADO DEL COMPROBANTE', 
                    render: function(data, type, row) { 

                        let html = ``;

                        if(row.estado == 'PENDIENTE')
                        {
                            html = `
                            <small class="label label-warning">`+row.estado+`</small>`;
                        }
                        else if(row.estado == 'ACEPTADO')
                        {
                            html = `<small class="label label-success">`+row.estado+`</small>`;
                        }
                        else if(row.estado == 'REGISTRADO')
                        {
                            html = `<small class="label label-info">`+row.estado+`</small>`;
                        }
                        else if(row.estado == 'ENVIADO_PROVEEDOR')
                        {
                            html = `<small class="label label-success">ACEPTADO POR PROVEEDOR</small>`;
                        }
                        else if(row.estado == 'ANULADO')
                        {
                            html = `<small class="label label-danger">`+row.estado+`</small>`;
            
                            if(row.fl_rechazado_sunat == 1)
                            {
                                html += `<br> <button class="btn btn-danger btn-sm" style="padding:0;">RECHAZADO</button>`;
                            }
                                
                        }

 
                        return html; 

                    },
                },
                { title: 'CONDICIÓN DE PAGO', mData: 'condicion_pago', class:'text-center' },
                { title: 'MEDIO DE PAGO', mData: 'medio_pago', class:'text-center' },
                { title: 'ESTADO', 
                    render: function(data, type, row) { 

                        let html = ``;

                        if(row.id_reparto != null)
                        {
                            html = `
                            <small class="label label-warning">REPARTO</small>`;
                        }
                        else if(row.fl_entregado == 1)
                        {
                            html = `<small class="label label-success">ENTREGADO</small>`;
                        }

                        return html; 

                    },
                },
            ]
        });

    },
} 

export default Componente;