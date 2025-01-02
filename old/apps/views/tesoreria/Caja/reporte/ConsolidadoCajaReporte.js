let DOM, DOM_ID ;
let Componente = {
    render: async (d) => {
        
        $('#main').off();
        d.innerHTML = `

        <div id="main">

            <!--breadcrumb-->
            <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                <div class="breadcrumb-title pe-3">Tesoreria</div>
                <div class="ps-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0 p-0">
                            <li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Consolidado Caja</li>
                        </ol>
                    </nav>
                </div>
            </div>
            <!--end breadcrumb-->

            <hr/>

            <!-- Main content -->
            <section class="content">

            
                <!-- Default box -->
                <div class="card">
                    <div class="card-body">
                        <div class="row">        
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label>Fecha Desde</label>
                                    <input type="date" data-filtro="fecha_inicio" class="form-control form-control-sm" autocomplete="off">
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label>Fecha Hasta</label>
                                    <input type="date"  data-filtro="fecha_fin" class="form-control form-control-sm" autocomplete="off">
                                </div>
                            </div>
                            
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Usuario</label>
                                    <select data-filtro="id_usuario" data-select="USUARIO" class="form-control form-control-sm" autocomplete="off"></select>
                                </div>
                            </div>
                            
                            <div class="col-md-4" style="padding-top:19px;">
                                <button class="btn btn-sm btn-warning btn-sm" name="update_datatable"><i class="fadeIn animated bx bx-search"></i> Buscar</button>
                                <button class="btn btn-sm btn-primary btn-sm" name="print"><i class="fadeIn animated bx bx-printer" style="font-size: 18px;"></i> Imprimir</button>
                                <button class="btn btn-sm btn-success btn-sm" name="exportar"><i class='bx bx-file'></i> Exportar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /.box -->

                <!-- Default box -->
                <div class="card">
                    <div class="card-body">
                    <div class="table-responsive" name="table_reporte">                        
                        <table id="table_reporte" class="table table-striped table-bordered nowrap" style="width:100%;" data-cols-width="20, 20">
                            <thead>
                                <tr>
                                    <th colspan="7" style="font-weight:bold; text-align:center;" data-a-h="center">REPORTE CONSOLIDADO DE CAJAS <br> <span name="rango_fecha"></span></th>
                                </tr>                                
                            </thead>
                            <tbody name="detalle"></tbody>
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
            console.log(document.getElementById("table_reporte"));
            TableToExcel.convert(document.getElementById("table_reporte"));
        });

        Componente.select_usuario();
        Componente.get_data();

        HELPER.load_component();
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

    get_data: () => {

        let parametros = {
            fecha_inicio: DOM.find('input[data-filtro="fecha_inicio"]').val(),
            fecha_fin: DOM.find('input[data-filtro="fecha_fin"]').val(),
            id_usuario: DOM.find('select[data-filtro="id_usuario"]').val(),
         
        };

        axios.get(BASE_API+'tesoreria/reporte/ConsolidadoCajaReporte?'+jQuery.param(parametros))
        .then(function (response) {

            DOM.find('span[name="rango_fecha"]').text('Desde: '+HELPER.fecha(DOM.find('input[data-filtro="fecha_inicio"]').val())+'  Hasta: '+HELPER.fecha(DOM.find('input[data-filtro="fecha_fin"]').val()));

            let html = '';
 
            let general_t_egreso = 0;

            response.data.areas.forEach(local => {

                let cont_caja_local = 0;

                let html_local = `
                    <tr>
                        <th colspan="7" style="text-align:left; background-color:#11498a; color:#fff;" data-b-a-s="thin" data-fill-color="0f4e99" data-f-color="ffffff">`+local.nombre+`</th>
                    </tr>
                `;

                let html_caja_chica = `                    
                    <tr style="background-color:#ccc;">
                        <th data-b-a-s="thin">USUARIO</th>
                         
                        <th style="text-align:center;" data-b-a-s="thin">EGRESO</th>
                    </tr>
                `;

                let cont_caja_chica = 0;

             
                let t_egreso = 0;
                

                response.data.usuarios.forEach(usuario => {
 
                    let usuario_t_egreso = 0;

                    let cont_usuario = 0;
                    
                    response.data.caja_chica.forEach(caja => {
                      
                        if(caja.id_local == local.id)
                        {
                            cont_caja_chica++;  

                            if(caja.id_usuario == usuario.id)
                            {
                                cont_usuario++;
 
                                usuario_t_egreso = usuario_t_egreso + parseFloat(caja.total_egreso);
                            }                            
                            
                        }                    
        
                    });

                    if(cont_usuario > 0)
                    {
                        html_caja_chica += `
                            <tr>
                                <td data-b-a-s="thin">`+usuario.usuario+`</td>
                                <td style="text-align:right;" data-b-a-s="thin">`+HELPER.currency(usuario_t_egreso)+`</td>
                            </tr>
                        `;
                    }
                    
                    t_egreso = t_egreso + usuario_t_egreso;
                });

                

                if(cont_caja_chica > 0)
                {

                    html_caja_chica += `
                        <tr>
                            <th>TOTALES</th>
                            <th style="text-align:right;">`+HELPER.currency(t_egreso)+`</th>
                        </tr>
                    `;

                    html_local += html_caja_chica;
                    cont_caja_local++;
                }

                if(cont_caja_local > 0)
                {
                    html += html_local;
 
                    general_t_egreso = general_t_egreso + t_egreso;
                }

            });


            html += `
                <tr style="background-color:#D64343; color:#fff;">
                    <th>TOTAL GENERAL</th>
                    <th style="text-align:right;">`+HELPER.currency(general_t_egreso)+`</th>
                </tr>
            `;


            DOM.find('tbody[name="detalle"]').html(html);


        }).catch(error => {
            console.log(error);
        });
    },
} 

export default Componente;