 let DOM, DOM_ID ;
 let Componente = {
     render: async (d) => {
         
         $('#main').off();
         d.innerHTML = /*html*/`
 
         <div id="main">
            <!--breadcrumb-->
            <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                <div class="breadcrumb-title pe-3">Reportes Generales</div>
                <div class="ps-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0 p-0">
                            <li class="breadcrumb-item"><a href="javascript:;"><i class="fadeIn animated bx bx-spreadsheet"></i></a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Movimiento de Información</li>
                        </ol>
                    </nav>
                </div>
            </div>
            <!--end breadcrumb-->

            <hr/>

            <!-- Main content -->
            <section class="content">

                <!-- Default box -->
                <div class="card   radius-10 w-100">
                    <div class="card-body">
                        <div class="row">        
                            <div class="col-md-4">
                                <div class="form-group mb-3">
                                    <label class="form-label" for="fecha_inicio">Fecha Desde</label>
                                    <input type="date" name="fecha_inicio" id="fecha_inicio" class="form-control form-control-sm" autocomplete="off">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label class="form-label" for="fecha_fin">Fecha Hasta</label>
                                    <input type="date" name="fecha_fin" id="fecha_fin" class="form-control form-control-sm" autocomplete="off">
                                </div>
                            </div>
                            <div class="col-md-4" style="padding-top:27px;">
                                <button class="btn btn-sm btn-warning" name="update_datatable"><i class="fadeIn animated bx bx-search"></i> Buscar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /.box -->
                
                <div class="card   radius-10 w-100">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table name="registros" class="table table-striped table-hover table-bordered border-default border-2" style="width:100%; font-weight: 500; font-size: 13px; vertical-align: middle;"></table>
                        </div>
                    </div>
                </div>
            </section>
            <!-- /.content -->
 
             
 
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
             Componente.table.ajax.reload(null, false);
         });
  
         DOM.find('input[name="fecha_inicio"]').val(HELPER.fecha_actual());
         DOM.find('input[name="fecha_fin"]').val(HELPER.fecha_actual());
 
         Componente.datatable();
 
         HELPER.load_component();
     },
      
     datatable: function() {
 
         
         this.table = DOM.find('table[name="registros"]').DataTable({
             ajax: {
                 url: BASE_API + 'reporte/movimiento_informacion',
                 data: function (d) {
                     d.fecha_inicio = DOM.find('input[name="fecha_inicio"]').val();
                     d.fecha_fin = DOM.find('input[name="fecha_fin"]').val();
                 }
             },
              
             columns: [
                { title: 'FECHA', render: function(data, type, row) { return HELPER.fecha_hora(row.fecha); }},
                { title: 'USUARIO', mData: 'usuario' },
                { title: 'MÓDULO', mData: 'modulo' },
                { title: 'MENÚ', mData: 'menu' },
                { title: 'ACCIÓN', render: function(data, type, row) { 
                        
                    let html = '';

                    if (row.accion == 'NUEVO') {
                        html = `<span class="badge bg-gradient-quepal text-white shadow-sm w-100">${row.accion}</span>`;
                    }
                    else if (row.accion == 'EDITAR') {
                        html = `<span class="badge bg-gradient-blooker text-white shadow-sm w-100">${row.accion}</span>`;
                    }
                    else if (row.accion == 'ELIMINAR') {
                        html = `<span class="badge bg-gradient-bloody text-white shadow-sm w-100">${row.accion}</span>`;
                    }
                    else if (row.accion == 'ANULAR') {
                        html = `<span class="badge bg-gradient-cosmic text-white shadow-sm w-100">${row.accion}</span>`;
                    }
                    else  {
                        html = `<span class="badge bg-gradient-scooter text-white shadow-sm w-100">${row.accion}</span>`;
                    }
                   
 

                        return html
                    }
                },
                { title: 'DESCRIPCIÓN', mData: 'descripcion' },
             ]
         });
 
     },
 } 
 
 export default Componente;