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
                            Utilidad
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
                            <div class="col-md-8" style="padding-top:19px;">
                                <button class="btn btn-warning" name="update_datatable"><i class="fa fa-search"></i> Buscar</button>
                                <button class="btn btn-primary" name="print"><i class="fa fa-print"></i> Imprimir</button>
                                <button class="btn btn-success" name="exportar"><i class="fa fa-file-excel"></i> Exportar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /.box -->

                <!-- Default box -->
                <div class="box box-warning">
                    <div class="box-body">
                    <div class="table-responsive">
                        <table id="table_reporte" class="table table-striped table-bordered nowrap" style="width:100%;" data-cols-width="40, 20, 20">
                            <thead>
                                <tr>
                                    <th colspan="3" style="font-weight:bold; font-size:16px; text-align:center;" data-a-h="center">REPORTE DE UTILIDAD<br> <span style="font-size:16px;" name="rango_fecha"></span></th>
                                </tr>                                
                            </thead>
                            <tbody name="detalle"></tbody>
                        </table>
                    </div>
                    </div>
                </div>
                <!-- /.box -->

                <!-- Default box -->
                <div class="box box-warning">
                    <div class="box-body">
                        <div class="row">
                            <div class="col-md-12" style="text-align:center;">
                                <span style="font-weight: bold; font-size: 20px;"><i class="fa fa-chart-bar"></i> GRÁFICO DE RESUMEN DE GASTOS Y VENTAS</span>
                            </div>
                            <div class="col-md-12" style="text-align:center;">
                                <div id="dash_resumen" style="height: 200px; max-width: 920px; margin: 0px auto;"></div>
                            </div>
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
            Componente.get_data();
        });
        /* PRINT */
        DOM.on('click', 'button[name="print"]', function(e) {
            e.stopImmediatePropagation();
            HELPER.print(DOM.find('div[name="table_reporte"]').html());
        });

        /* EXPORTAR EXCEL*/
        DOM.on('click', 'button[name="exportar"]', function(e) {
            e.stopImmediatePropagation();
            TableToExcel.convert(document.getElementById("table_reporte"));
        });

        /* CHANGE FECHA INICIO*/
        DOM.on('change', 'input[data-filtro="fecha_inicio"]', function(e) {
            e.stopImmediatePropagation();
            Componente.get_data();
        });

        /* CHANGE FECHA FIN*/
        DOM.on('change', 'input[data-filtro="fecha_fin"]', function(e) {
            e.stopImmediatePropagation();
            Componente.get_data();
        });

        Componente.get_data();
        await Componente.dash_resumen();

        HELPER.load_component();
    },

    total_gasto_ruta: 0,
    total_gasto_mantenimiento: 0,
    total_caja_chica_sede: 0,
    total_gasto_fijo: 0,
    total_venta_ruta: 0,


    get_data: async() => {

        let parametros = {
            fecha_inicio: DOM.find('input[data-filtro="fecha_inicio"]').val(),
            fecha_fin: DOM.find('input[data-filtro="fecha_fin"]').val()
        };

        axios.get(BASE_API+'reporte/utilidad?'+jQuery.param(parametros))
        .then(function (response) {

            DOM.find('span[name="rango_fecha"]').text('Desde: '+HELPER.fecha(DOM.find('input[data-filtro="fecha_inicio"]').val())+'  Hasta: '+HELPER.fecha(DOM.find('input[data-filtro="fecha_fin"]').val()));

            let data = response.data;
            let html = '';
            let total_egreso = 0;
            let total_ingreso = 0;
            let rentabilidad = 0;

            let total_gasto_ruta = 0;
            let total_gasto_mantenimiento = 0;
            let total_caja_chica_sede = 0;
            let total_gasto_fijo_lati = 0;
            let total_gasto_fijo_a = 0;
            let total_venta_ruta = 0;

            /** GASTO POR RUTA */

            html += `<tr><td colspan="3" style="text-align: center; font-weight: bold; color: red;">GASTO POR RUTA</td></tr>`;

            data.gasto_ruta.forEach(row => {

                let total_x_ruta = 0;

                html += `
                    <tr>
                        <td colspan="3"></td>
                    </tr>
                    <tr>
                        <th colspan="3" style="vertical-align:top;text-align:left; background-color: #F4B084;">VEHÍCULO:   `+row.vehiculo+`</th>
                    </tr>
                    
                    
                    
                    `;
                let peajes = 0, combustible = 0,viaatico = 0 ,otros_gastos = 0 ,lavadero = 0, roturas = 0;

               
                row.detalle.forEach(det => {
                   
                  if (det.tipo == "PEAJES") {
                      
                    peajes = peajes + parseFloat(det.importe);
                  }
                  else if (det.tipo == "COMBUSTIBLE")
                  {
                    combustible = combustible + parseFloat(det.importe);
                  }
                  else if (det.tipo == "VIATICOS")
                  {
                    viaatico = viaatico + parseFloat(det.importe);
                  }
                  else if (det.tipo == "OTROS GASTOS")
                  {
                    otros_gastos = otros_gastos + parseFloat(det.importe);
                  }
                  else if (det.tipo == "LAVADERO")
                  {
                    lavadero = lavadero + parseFloat(det.importe);
                  }
                  else if (det.tipo == "ROTURAS")
                  {
                    roturas = roturas + parseFloat(det.importe);
                  }
                    total_x_ruta = total_x_ruta + parseFloat(det.importe);

                });

                if (peajes > 0 ) {
                    html += `

                    <tr>
                        <td colspan="2" style="vertical-align:top;text-align:left;">PEAJES </td>
                        <td style="vertical-align:top;text-align:right;">`+peajes+`</td>
                    </tr>  `;
                }
                

                if (combustible > 0 ) {
                    html += `
                    <tr>
                        <td colspan="2" style="vertical-align:top;text-align:left;"> COMBUSTIBLE</td>
                        <td style="vertical-align:top;text-align:right;">`+combustible+`</td>
                    </tr>
                       `;
                }
                
                if (viaatico > 0 ) {
                    html += `
                    <tr>
                        <td colspan="2" style="vertical-align:top;text-align:left;"> VIATICOS</td>
                        <td style="vertical-align:top;text-align:right;">`+viaatico+`</td>
                    </tr>
                     `;
                }
                
                if (otros_gastos > 0 ) {
                    html += `
                    <tr>
                        <td colspan="2" style="vertical-align:top;text-align:left;">OTROS GASTOS </td>
                        <td style="vertical-align:top;text-align:right;">`+otros_gastos+`</td>
                    </tr>
                      `;
                }
                
                if (lavadero > 0 ) {
                    html += `
                    <tr>
                        <td colspan="2" style="vertical-align:top;text-align:left;">LAVADERO </td>
                        <td style="vertical-align:top;text-align:right;">`+lavadero+`</td>
                    </tr>
                      `;
                }
                
                if (roturas > 0 ) {
                    html += `
                    <tr>
                        <td colspan="2" style="vertical-align:top;text-align:left;"> ROTURAS</td>
                        <td style="vertical-align:top;text-align:right;">`+roturas+`</td>
                    </tr>
                     `;
                }
                
                   
                    
                    
                html += `    
                    
                    <tr>
                        <td colspan="2" style="vertical-align:top;text-align:right; background-color: #2F75B5; color: white;">GASTO POR VEHÍCULO</td>
                        <td style="vertical-align:top;text-align:right; background-color: #2F75B5; color: white;">`+ total_x_ruta.toFixed(2) +`</td>
                    </tr>`;

                total_gasto_ruta = total_gasto_ruta + parseFloat(total_x_ruta);

            });

            /** GASTO DE MANTENIMIENTO */

            html += `<tr><td colspan="3" style="text-align: center; font-weight: bold; color: red;">GASTO DE MANTENIMIENTO</td></tr>`;

            data.gasto_mantenimiento.forEach(row => {

                let total_x_mantenimiento = 0;

                html += `
                    <tr>
                        <td colspan="3"></td>
                    </tr>
                    <tr>
                        <th colspan="3" style="vertical-align:top;text-align:left; background-color: #F4B084;">VEHÍCULO:   `+row.vehiculo+`</th>
                    </tr>`;

                row.detalle.forEach(det => {

                    html += `
                        <tr>
                            <td colspan="2" style="vertical-align:top;text-align:left;">`+det.tipo+`</td>
                            <td style="vertical-align:top;text-align:right;">`+det.importe+`</td>
                        </tr>`;

                    total_x_mantenimiento = total_x_mantenimiento + parseFloat(det.importe);

                });

                html += `
                    <tr>
                        <td colspan="2" style="vertical-align:top;text-align:right; background-color: #2F75B5; color: white;">GASTO POR VEHÍCULO</td>
                        <td style="vertical-align:top;text-align:right; background-color: #2F75B5; color: white;">`+ total_x_mantenimiento.toFixed(2) +`</td>
                    </tr>`;

                total_gasto_mantenimiento = total_gasto_mantenimiento + parseFloat(total_x_mantenimiento);

            });

            /** GASTO DE REPARTO */


            /** GASTOS DE CAJA CHICA SEDES */

            html += `<tr><td colspan="3" style="text-align: center; font-weight: bold; color: red;">GASTOS DE CAJA CHICA SEDES</td></tr>`;

            data.gasto_caja_chica.forEach(row => {

                let total_x_caja_chica_sede = 0;

                html += `
                    <tr>
                        <td colspan="3"></td>
                    </tr>
                    <tr>
                        <th colspan="3" style="vertical-align:top;text-align:left; background-color: #F4B084;">`+row.local+`</th>
                    </tr>`;

                row.detalle.forEach(det => {

                    html += `
                        <tr>
                            <td colspan="2" style="vertical-align:top;text-align:left;">`+det.motivo+`</td>
                            <td style="vertical-align:top;text-align:right;">`+det.importe+`</td>
                        </tr>`;

                    total_x_caja_chica_sede = total_x_caja_chica_sede + parseFloat(det.importe);

                });

                html += `
                    <tr>
                        <td colspan="2" style="vertical-align:top;text-align:right; background-color: #2F75B5; color: white;">GASTO POR SEDE</td>
                        <td style="vertical-align:top;text-align:right; background-color: #2F75B5; color: white;">`+ total_x_caja_chica_sede.toFixed(2) +`</td>
                    </tr>`;

                    total_caja_chica_sede = total_caja_chica_sede + parseFloat(total_x_caja_chica_sede);

            });

            /** GASTOS FIJOS */

            /** GASTOS FIJOS: LUZ AGUA TELEFONO INTERNET*/

            html += `<tr><td colspan="3" style="text-align: center; font-weight: bold; color: red;">GASTOS FIJOS</td></tr>
                    <tr>
                        <td colspan="3"></td>
                    </tr>
                    <tr>
                        <th colspan="3" style="vertical-align:top;text-align:left; background-color: #F4B084;">LUZ, AGUA, TELEFONO Y INTERNET</th>
                    </tr>`;

            data.gasto_fijo_lati.forEach(row => {

                html += `
                    <tr>
                        <td colspan="2" style="vertical-align:top;text-align:left;">`+row.sede+`</td>
                        <td style="vertical-align:top;text-align:right;">`+row.importe+`</td>
                    </tr>`;

                    total_gasto_fijo_lati = total_gasto_fijo_lati + parseFloat(row.importe);
                

            });

            html += `
                    <tr>
                        <td colspan="2" style="vertical-align:top;text-align:right; background-color: #2F75B5; color: white;">GASTO POR SERVICIO</td>
                        <td style="vertical-align:top;text-align:right; background-color: #2F75B5; color: white;">`+ total_gasto_fijo_lati.toFixed(2) +`</td>
                    </tr>`;

            /** GASTOS FIJOS: ALQUILER*/

            html += `
                    <tr>
                        <td colspan="3"></td>
                    </tr>
                    <tr>
                        <th colspan="3" style="vertical-align:top;text-align:left; background-color: #F4B084;">ALQUILERES</th>
                    </tr>`;

            data.gasto_fijo_a.forEach(row => {

                html += `
                    <tr>
                        <td colspan="2" style="vertical-align:top;text-align:left;">`+row.sede+`</td>
                        <td style="vertical-align:top;text-align:right;">`+row.importe+`</td>
                    </tr>`;

                    total_gasto_fijo_a = total_gasto_fijo_a + parseFloat(row.importe);
                

            });

            html += `
                    <tr>
                        <td colspan="2" style="vertical-align:top;text-align:right; background-color: #2F75B5; color: white;">GASTO POR ALQUILERES</td>
                        <td style="vertical-align:top;text-align:right; background-color: #2F75B5; color: white;">`+ total_gasto_fijo_a.toFixed(2) +`</td>
                    </tr>`;

            
            /** VENTAS POR RUTAS*/

            html += `<tr><td colspan="3" style="text-align: center; font-weight: bold; color: red;">VENTAS POR RUTAS</td></tr>
                    <tr>
                        <td colspan="3"></td>
                    </tr>
                    <tr>
                        <th colspan="3" style="vertical-align:top;text-align:left; background-color: #F4B084;">RUTAS</th>
                    </tr>`;

            data.venta_ruta.forEach(row => {

                html += `
                    <tr>
                        <td colspan="2" style="vertical-align:top;text-align:left;">`+row.ruta+`</td>
                        <td style="vertical-align:top;text-align:right;">`+row.importe+`</td>
                    </tr>`;

                    total_venta_ruta = total_venta_ruta + parseFloat(row.importe);
                

            });

            html += `
                    <tr>
                        <td colspan="2" style="vertical-align:top;text-align:right; background-color: #2F75B5; color: white;">TOTAL VENTAS</td>
                        <td style="vertical-align:top;text-align:right; background-color: #2F75B5; color: white;">`+ total_venta_ruta.toFixed(2) +`</td>
                    </tr>`;


            /** CALCULANDO LOS TOTALES */

            total_egreso = total_gasto_ruta + total_gasto_mantenimiento + total_caja_chica_sede + total_gasto_fijo_lati + total_gasto_fijo_a;
            total_ingreso = total_venta_ruta;
            rentabilidad = parseFloat(total_ingreso) - parseFloat(total_egreso);

            Componente.total_gasto_ruta = total_gasto_ruta;
            Componente.total_gasto_mantenimiento = total_gasto_mantenimiento;
            Componente.total_caja_chica_sede = total_caja_chica_sede;
            Componente.total_gasto_fijo = total_gasto_fijo_lati + total_gasto_fijo_a;
            Componente.total_venta_ruta = total_venta_ruta;

            /** RESUMEN */

            html += `<tr>
                        <td colspan="3"></td>
                     </tr>
                     <tr>
                        <td colspan="3" style="text-align: center; font-weight: bold; color: red;">RESUMEN</td>
                     </tr>                
                     <tr>
                        <th style="text-align:center; background-color: #F4B084;">DESCRIPCIÓN</th>
                        <th style="text-align:center; background-color: #F4B084;">EGRESOS</th>
                        <th style="text-align:center; background-color: #F4B084;">INGRESOS</th>
                     </tr>
                     <tr>
                        <th style="text-align:left;">GASTO POR RUTAS</th>
                        <th style="text-align:right;">`+total_gasto_ruta.toFixed(2)+`</th>
                        <th style="text-align:right;"></th>
                     </tr>
                     <tr>
                        <th style="text-align:left;">GASTO DE MANTENIMIENTO</th>
                        <th style="text-align:right;">`+total_gasto_mantenimiento.toFixed(2)+`</th>
                        <th style="text-align:right;"></th>
                     </tr>
                     <tr>
                        <th style="text-align:left;">GASTOS DE CAJA CHICA SEDES</th>
                        <th style="text-align:right;">`+total_caja_chica_sede.toFixed(2)+`</th>
                        <th style="text-align:right;"></th>
                     </tr>
                     <tr>
                        <th style="text-align:left;">GASTO FIJOS</th>
                        <th style="text-align:right;">`+(total_gasto_fijo_lati + total_gasto_fijo_a).toFixed(2)+`</th>
                        <th style="text-align:right;"></th>
                     </tr>
                     <tr>
                        <th style="text-align:left;">VENTAS POR RUTAS</th>
                        <th style="text-align:right;"></th>
                        <th style="text-align:right;">`+total_venta_ruta.toFixed(2)+`</th>
                     </tr>
                     <tr>
                        <th style="text-align:right; background-color: #2F75B5; color: white;">TOTALES</th>
                        <th style="text-align:right; background-color: #2F75B5; color: white;">`+total_egreso.toFixed(2)+`</th>
                        <th style="text-align:right; background-color: #2F75B5; color: white;">`+total_ingreso.toFixed(2)+`</th>
                     </tr>`;

            /** RENTABILIDAD */

            html += `                
                    <tr>
                        <td colspan="2" style="text-align:right; font-weight: bold; color: red; font-size: 18px;">RENTABILIDAD</td>
                        <td style="text-align:right; font-weight: bold; color: red; font-size: 18px;">`+rentabilidad.toFixed(2)+`</td>
                    </tr>`;

            DOM.find('tbody[name="detalle"]').html(html);


            Componente.dash_resumen();


        }).catch(error => {
            console.log(error);
        });
     },

     dash_resumen : async() => {

        console.info(Componente.total_venta_ruta);

        let chart = new CanvasJS.Chart("dash_resumen", {
            animationEnabled: true,
            theme: "light2", 
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
                dataPoints: [
                    { label: 'GASTO POR RUTAS', y: Componente.total_gasto_ruta, x: 0 },
                    { label: 'GASTO DE MANTENIMIENTO', y: Componente.total_gasto_mantenimiento, x: 1},
                    { label: 'GASTO DE CAJA CHICA SEDES', y: Componente.total_caja_chica_sede, x: 2},
                    { label: 'GASTOS FIJOS', y: Componente.total_gasto_fijo, x: 3},
                    { label: 'VENTAS POR RUTAS', y: Componente.total_venta_ruta, x: 4}
                ]
    
            }]
        });
        chart.render();
            

    },

    
    

    
} 

export default Componente;