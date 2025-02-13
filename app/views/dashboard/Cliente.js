/**
 * @author Gerson Magán
 * @email gersonctk@hotmail.com
 * @create date 2021-02-04 15:09:03
 * @modify date 2021-02-04 15:09:03
 * @desc [description]
 */

let DOM, DOM_ID ;
let Componente = {
    render: async (d, data) => {
        
        $('#main').off();
        d.innerHTML = `
        <style> 
            h3{
                margin:0 !important;
            }

            p{
                margin:0 !important;
            }
        </style>
        <div id="main" style="display:none;">
            <!-- Content Header (Page header) -->
            <section class="content-header">
                <div class="row">
                    <div class="col-md-8 content-header" style="padding-top:5px;">
                        <h1 style="margin:0;">Dashboard CLIENTES</h1>
                    </div>
                </div>
            </section>

                <!-- Main content -->
                <section class="content" name="contenedor-dashboard">
                    
                    <div class="row">
                        <div class="col-md-12">
                            <div class="box box-info">
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
                                        <div class="col-md-2" style="padding-top:19px;">
                                            <button type="button" class="btn btn-warning" name="update_datatable"><i class="fa fa-search"></i> Buscar</button>
                                        </div>
                                    </div>
                                </div>                                
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="box box-info">
                                <div class="box-header with-border">
                                    <h3 class="box-title">Más Peso Enviado por Cliente</h3>
                                </div>
                                <div class="box-body">
                                    <div class="table-responsive table-sm">
                                        <table class="table no-margin table-striped">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Cliente</th>
                                                    <th style="text-align:center;">N°. Documento</th>
                                                    <th style="text-align:center;">N°. Celular</th>
                                                    <th style="text-align:center;">Peso Total</th>
                                                </tr>
                                            </thead>
                                            <tbody name="cliente_peso"></tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="box box-info">
                                <div class="box-header with-border">
                                    <h3 class="box-title">Cantidad de Envios por Cliente</h3>
                                </div>
                                <div class="box-body">
                                    <div class="table-responsive table-sm">
                                        <table class="table no-margin table-striped">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Cliente</th>
                                                    <th style="text-align:center;">N°. Documento</th>
                                                    <th style="text-align:center;">N°. Celular</th>
                                                    <th style="text-align:center;">Envios</th>
                                                </tr>
                                            </thead>
                                            <tbody name="cliente_cantidad"></tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </section>

        </div>            
        `;

        await Componente.after_render();       
        
    },

    after_render: async () => {

        DOM_ID = '#main';
        DOM = $(DOM_ID);
        
        /* DATATABLE UPDATE*/
        DOM.on('click', 'button[name="update_datatable"]', function(e) {
            e.stopImmediatePropagation();
           
            Componente. get_cliente_peso();
            Componente. get_cliente_cantidad();
        });

        DOM.find('input[name="fecha_inicio"]').val(HELPER.primer_dia_mes());
        DOM.find('input[name="fecha_fin"]').val(HELPER.fecha_actual());

        Componente.get_cliente_peso();
        Componente. get_cliente_cantidad();

        if(DATA_USER.usuario.fl_no_dashboard == 1)
        {
            DOM.find('section[name="contenedor-dashboard"]').remove();
        }

        $('#main').fadeIn(500);
        HELPER.load_component();
    },

    get_cliente_peso : () => {

        let fecha_inicio = DOM.find('input[name="fecha_inicio"]').val();
        let fecha_fin = DOM.find('input[name="fecha_fin"]').val();

        let data = 'fecha_inicio='+fecha_inicio+'&fecha_fin='+fecha_fin;


        axios.get(BASE_API+'dashboard/dashboard/get_cliente_peso?'+ data)
        .then(function (response) {
        let cont = 1;
        let html = ``;
       
        /* console.log(response); */

        response.data.forEach(row => {
                html += `
                <tr>
                    <td>`+cont+`</td>
                    <td>`+row.razon_social+`</td>
                    <td style="text-align:center;">`+row.numero_documento+`</td>
                    <td style="text-align:center;">`+row.telefono+`</td>
                    <td style="text-align:center;">`+row.total_peso+`</td>
                </tr>
                `;
                cont ++;

            });
    
            DOM.find('tbody[name="cliente_peso"]').html(html);
    
        }).catch(error => {
            console.log(error);
        }); 
    },

    get_cliente_cantidad : () => {

        let fecha_inicio = DOM.find('input[name="fecha_inicio"]').val();
        let fecha_fin = DOM.find('input[name="fecha_fin"]').val();

        let data = 'fecha_inicio='+fecha_inicio+'&fecha_fin='+fecha_fin;


        axios.get(BASE_API+'dashboard/dashboard/get_cliente_cantidad?'+ data)
        .then(function (response) {
        let cont = 1;
        let html = ``;
       
        /* console.log(response); */

        response.data.forEach(row => {
                html += `
                <tr>
                    <td>`+cont+`</td>
                    <td>`+row.razon_social+`</td>
                    <td style="text-align:center;">`+row.numero_documento+`</td>
                    <td style="text-align:center;">`+row.telefono+`</td>
                    <td style="text-align:center;">`+row.cantidad+`</td>
                </tr>
                `;
                cont ++;

            });
    
            DOM.find('tbody[name="cliente_cantidad"]').html(html);
    
        }).catch(error => {
            console.log(error);
        }); 
    },
} 

export default Componente;