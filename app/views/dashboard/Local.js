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
                        <h1 style="margin:0;">Dashboard (`+data.usuario.local+`)</h1>
                    </div>
                </div>
            </section>

                <!-- Main content -->
                <section class="content" name="contenedor-dashboard">
                    
                    <div class="row">
                        <div class="col-md-6">
                            <div class="box box-primary">
                                <div class="box-header with-border">
                                    <h3 class="box-title">Tipos de Entrega</h3>                    
                                </div>
                                <div class="box-body">                                    
                                    <div id="dash_tipo_entrega" style="height: 200px; max-width: 920px; margin: 0px auto;"></div>
                                </div>                                
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="box box-primary">
                                <div class="box-header with-border">
                                    <h3 class="box-title">Estado de las Órdenes de Servicios</h3>                    
                                </div>
                                <div class="box-body">                                    
                                    <div id="dash_resumen" style="height: 200px; max-width: 920px; margin: 0px auto;"></div>
                                </div>                              
                            </div>
                        </div>
                    </div>
                </section>

            </section>



            <div class="modal inmodal fade" name="modal-documento_personal_vencido" data-backdrop="static"  role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                            <h4 class="modal-title">Documento vencidos de Personal</h4>
                        </div>
                        <div class="modal-body">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Personal</th>
                                        <th>Tipo Doc.</th>
                                        <th>Documento</th>
                                        <th>Emisión</th>
                                        <th>Vencimiento</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody name="detalle-documento_personal_vencido"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal inmodal fade" name="modal-documento_vehiculo_vencido" data-backdrop="static"  role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                            <h4 class="modal-title">Documento de Vehículos</h4>
                        </div>
                        <div class="modal-body">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Vehículo</th>
                                        <th>Tipo Doc.</th>
                                        <th>Documento</th>
                                        <th>Emisión</th>
                                        <th>Vencimiento</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody name="detalle-documento_vehiculo_vencido"></tbody>
                            </table>
                        </div>
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

        /* DOCUMENTO PERSONAL VENCIDO */
        DOM.on('click', 'a[name="documento_personal_vencido"]', function(e) {
            e.stopImmediatePropagation();
            DOM.find('div[name="modal-documento_personal_vencido"]').modal('show');
        });

         /* DOCUMENTO VEHICULO VENCIDO */
         DOM.on('click', 'a[name="documento_vehiculo_vencido"]', function(e) {
            e.stopImmediatePropagation();
            DOM.find('div[name="modal-documento_vehiculo_vencido"]').modal('show');
        });

        Componente.dash_tipo_entrega();
        Componente.dash_resumen();
        Componente.get_cantidades();
        Componente.get_documento_vehiculo_vencido();
        Componente.get_documento_personal_vencido();

        
        if(DATA_USER.usuario.fl_no_dashboard == 1)
        {
            DOM.find('section[name="contenedor-dashboard"]').remove();
        }

        $('#main').fadeIn(500);
        HELPER.load_component();
    },
    

    dash_tipo_entrega : () => {

        axios.get(BASE_API+'dashboard/dashboard/dash_tipo_entrega')
        .then(function (response) {
            
            let chart = new CanvasJS.Chart("dash_tipo_entrega", {
                theme: "light2", // "light1", "light2", "dark1", "dark2"
                exportEnabled: true,
                animationEnabled: true,
                title: {
                    text: ""
                },
                data: [{
                    type: "pie",
                    startAngle: 25,
                    toolTipContent: "<b>{label}</b>: {y}%",
                    showInLegend: "true",
                    legendText: "{label}",
                    indexLabelFontSize: 16,
                    indexLabel: "{label} - {y}%",
                    dataPoints: response.data,
                    /*dataPoints: [
                        { y: 51.08, label: "Entregados" },
                        { y: 27.34, label: "Registrados" },
                        { y: 10.62, label: "Pendientes de Entrega" },
                        { y: 5.02, label: "Microsoft Edge" },
                        { y: 4.07, label: "Safari" },
                        { y: 1.22, label: "Opera" },
                        { y: 0.44, label: "Others" }
                    ]*/
                }]
            });

            chart.render();

        }).catch(error => {
            console.log(error);
        }); 

    },

    dash_resumen : () => {

        axios.get(BASE_API+'dashboard/dashboard/dash_resumen')
        .then(function (response) {
            
            let chart = new CanvasJS.Chart("dash_resumen", {
                animationEnabled: true,
                theme: "light2", // "light1", "light2", "dark1", "dark2"
                title: {
                    text: ""
                },
                subtitles: [{
                    text: "",
                    fontSize: 16
                }],
                axisY: {
                    scaleBreaks: {
                        customBreaks: [{
                            startValue: 10000,
                            endValue: 35000
                        }]
                    }
                },
                data: [{
                    type: "column",
                    dataPoints: response.data
                }]
            });
            chart.render();
            

        }).catch(error => {
            console.log(error);
        }); 

    },

    get_cantidades : () => {

        axios.get(BASE_API+'dashboard/dashboard/get_cantidades')
        .then(function (response) {
            
            DOM.find('h3[name="cantidad-orden"]').attr('value_contador_animate', response.data.cantidad_orden);
            DOM.find('h3[name="cantidad-guia_transportista"]').attr('value_contador_animate', response.data.cantidad_guia_transportista);
            DOM.find('h3[name="cantidad-manifiesto"]').attr('value_contador_animate', response.data.cantidad_manifiesto);
            DOM.find('h3[name="cantidad-desembarque"]').attr('value_contador_animate', response.data.cantidad_desembarque);
            DOM.find('h3[name="cantidad-cliente"]').attr('value_contador_animate', response.data.cantidad_cliente);
            DOM.find('h3[name="cantidad-reparto"]').attr('value_contador_animate', response.data.cantidad_reparto);

            HELPER.counter_animate(200, 0);

        }).catch(error => {
            console.log(error);
        }); 

    },

    get_documento_vehiculo_vencido : () => {

        axios.get(BASE_API+'dashboard/dashboard/get_documento_vehiculo_vencido')
        .then(function (response) {

            DOM.find('h3[name="documento_vehiculo_vencido"]').text(response.data.length);

            let html = '';

            response.data.forEach(row => {

                let estado = '<span class="label label-success"><i class="fa fa-check"></i> Vigente</span>';
          
                  if(row.estado == 'VENCIDO')
                  {
                    estado = '<span class="label label-danger">Vencido</span>';
                  }
                  else if(row.estado == 'POR VENCER')
                  {
                    estado = '<span class="label label-warning">Por Vencer</span>';
                  }
          
                html += `
                  <tr>
                    <td>`+row.vehiculo+`</td>
                    <td>`+row.tipo_documento+`</th>
                    <td>`+row.documento+`</th>
                    <td>`+HELPER.fecha(row.fecha_emision)+`</th>
                    <td>`+HELPER.fecha(row.fecha_vencimiento)+`</th>
                    <td>`+estado+`</th>
                  </tr>
                `;
          
            });

            DOM.find('tbody[name="detalle-documento_vehiculo_vencido"]').html(html);
        }).catch(error => {
            console.log(error);
        }); 

    },

    get_documento_personal_vencido : () => {

        axios.get(BASE_API+'dashboard/dashboard/get_documento_personal_vencido')
        .then(function (response) {

            DOM.find('h3[name="documento_personal_vencido"]').text(response.data.length);

            let html = '';

            response.data.forEach(row => {

                let estado = '<span class="label label-success"><i class="fa fa-check"></i> Vigente</span>';
          
                  if(row.estado == 'VENCIDO')
                  {
                    estado = '<span class="label label-danger">Vencido</span>';
                  }
                  else if(row.estado == 'POR VENCER')
                  {
                    estado = '<span class="label label-warning">Por Vencer</span>';
                  }
          
                html += `
                  <tr>
                    <td>`+row.personal+`</td>
                    <td>`+row.tipo_documento+`</th>
                    <td>`+row.documento+`</th>
                    <td>`+HELPER.fecha(row.fecha_emision)+`</th>
                    <td>`+HELPER.fecha(row.fecha_vencimiento)+`</th>
                    <td>`+estado+`</th>
                  </tr>
                `;
          
            });

            DOM.find('tbody[name="detalle-documento_personal_vencido"]').html(html);
        }).catch(error => {
            console.log(error);
        }); 

    },
} 

export default Componente;