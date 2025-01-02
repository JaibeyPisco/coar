export default /*html*/` <div id="main">
    <!--breadcrumb-->
    <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div class="breadcrumb-title pe-3">Operaciones</div>
        <div class="ps-3">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0 p-0">
                    <li class="breadcrumb-item"><a href="javascript:;"><i
                                class="fadeIn animated bx bx-slider-alt"></i></a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">INCIDENCIAS</li>
                </ol>
            </nav>
        </div>
    </div>
    <!--end breadcrumb-->

    <hr />

    <!-- Main content -->
    <section class="content">
        <div class="card border-default border-bottom border-3 radius-10 w-100">
            <div class="card-body">                                 
                <div class="row">
                    <div class="col-md-2">
                        <div class="form-group mb-3">
                            <label class="form-label" for="fecha_inicio">Fecha Inicio</label>
                            <input id="fecha_inicio" type="date" data-mayus="false" name="fecha_inicio" class="form-control form-control-sm" autocomplete="off" >
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group mb-3">
                            <label class="form-label" for="fecha_fin">Fecha Fin</label>
                            <input id="fecha_fin" type="date" data-mayus="false" name="fecha_fin" class="form-control form-control-sm" autocomplete="off" >
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="form-group">
                            <label class="form-label" for="id_estudiante">Estudiante</label>
                            <select   name="id_estudiante" data-select="ESTUDIANTE" class="form-control form-control-sm" autocomplete="off"></select>    
                        </div>
                    </div>
                    <div class="col-md-1" style="padding-top:10px;">
                        <button type="button" data-mayus="false" name="update_datatable" class="btn btn-sm btn-warning btn-sm" autocomplete="off" style="margin-top: 15px;"><i class="bx bx-search mr-1"></i>Buscar</button>
                        
                    </div>
                    <div class="col-md-2" style="padding-top:10px;">
                        <button type="button" data-mayus="false" name="atenderIncidenciaMasiva" class="btn btn-sm btn-primary" autocomplete="off" style="margin-top: 15px;"><i class="bx bx-search mr-1"></i>Atender Masivo</button>
                    </div>
                </div>
            </div>
        </div>     
        <div class="card border-default border-bottom border-3 radius-10 w-100">
            <div class="card-body">
                <div class="table-responsive">
                    <table name="registros"
                        class="table table-striped table-hover table-bordered border-default border-2"
                        style="width:100%; font-weight: 500; font-size: 13px; vertical-align: middle;"></table>
                </div>
            </div>
        </div>
        <modal-view-guia></modal-view-guia>
    </section>
    <!-- /.content -->
    
    <modal-fotos-component></modal-fotos-component>
    <modal-monitoreo></modal-monitoreo>

    <!--- MODAL -->
    <div class="modal inmodal fade" name="modal-saveIncidenciaAtencion" data-backdrop="static" tabindex="-1" role="dialog"
        aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 name="saveIncidenciaAtencion" class="modal-title">Modal title</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form name="saveIncidenciaAtencion">
                    <div class="modal-body text-center p-3">
                        <div class="row mt-3">
                            <div data-name="incidenciasMasviasSeries" class="text-primary" style="font-size:20px"></div>     
                            <div class="col-md-12" data-name="contenedor-serie">
                                <div class="card">
                                    <div class="card-body">
                                            <div class="row">                                                             
                                                <div class="col-md-4 col-sm-6 col-xs-12">
                                                    <div class="form-group mb-1">
                                                        <h6 class="mb-2">N° Incidencia</h6>
                                                        <input type="text" data-mayus="false" name="serie_numero_incidencia"
                                                        class="form-control form-control-sm" autocomplete="off" readonly >
                                                    </div>
                                                </div>                                   
                                                <div class="col-md-4 col-sm-6 col-xs-12">
                                                    <div class="form-group mb-1">
                                                        <h6 class="mb-2">Usuario Reporto</h6>
                                                        <input type="text" data-mayus="false" name="usuario_nombre"
                                                        class="form-control form-control-sm" autocomplete="off" readonly >
                                                    </div>
                                                </div>
                                                <div class="col-md-4 col-sm-6 col-xs-12">
                                                    <div class="form-group mb-1">
                                                        <h6 class="mb-2">Fecha y hora</h6>
                                                        <input type="datetime" data-mayus="false" name="fecha_hora"
                                                        class="form-control form-control-sm" autocomplete="off" readonly >
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="form-group">
                                            <h6 class="mb-3">Alumnos</h6>
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>                                                
                                                        <th scope="col">Apellidos y nombres</th>
                                                        <th scope="col">DNI</th>
                                                        <th scope="col">Grado y sección</th>
                                                    </tr>
                                                </thead>
                                                <tbody name="detalle-involucrados"></tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="form-group">
                                            <h6 class="mb-3">Incidencia</h6>
                                            <div name="incidencia"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>        
                        <div class="row">
                            <div class="col-md-12">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row" style="margin: auto;">
                                            <div class="col-md-4 col-sm-6 col-xs-12">
                                                <div class="form-group ">
                                                    <div class="form-check form-switch mb-1" bis_skin_checked="1">
                                                        <input class="form-check-input" name="se_soluciono"
                                                            type="checkbox" id="se_soluciono">
                                                        <label class="form-check-label" for="se_soluciono">¿Se soluciono?</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4 col-sm-6 col-xs-12">
                                                <div class="form-group ">
                                                    <div class="form-check form-switch mb-1" bis_skin_checked="1">
                                                        <input class="form-check-input" name="cerrar_incidencia"
                                                            type="checkbox" id="cerrar_incidencia">
                                                        <label class="form-check-label" for="cerrar_incidencia">¿Desea cerrar incidencia?</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4 col-sm-6 col-xs-12">
                                                <div class="form-group ">
                                                    <div class="form-check form-switch mb-1" bis_skin_checked="1">
                                                        <input class="form-check-input" name="derivar"
                                                            type="checkbox" id="derivar">
                                                        <label class="form-check-label" for="derivar">¿Desea derivar?</label>
                                                    </div>
                                                </div>
                                            </div>                                      
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="col-md-12" data-name="agregar_estudiante_btn_contenedor"></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group mb-1">
                                                    <h6 class="mb-3">Comentario</h6>
                                                    <div name="comentario_atencion_incidencia"></div>
                                                </div>
                                            </div>
                                        </div>                                     
                                    </div>
                                </div>  
                            </div>                                                    
                        </div>       
                    </div>
                    <div class="modal-footer" align="center" style="display:block">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="submit" class="btn btn-success">Confirmar Incidencia</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
`;