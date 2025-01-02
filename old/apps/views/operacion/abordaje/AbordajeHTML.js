export default /*html*/` <div id="main">
    <!--breadcrumb-->
    <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div class="breadcrumb-title pe-3">Operaciones</div>
        <div class="ps-3">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0 p-0">
                    <li class="breadcrumb-item"><a href="javascript:;"><i class="fadeIn animated bx bx-slider-alt"></i></a></li>
                    <li class="breadcrumb-item active" aria-current="page">ABORDAJE</li>
                </ol>
            </nav>
        </div>
    </div>
    <!--end breadcrumb-->

    <hr />

    <!-- Main content -->
    <section class="content">
        <div class="card">
            <div class="card-body">                                 
                <div class="row">
                    <div class="col-md-2">
                        <div class="form-group ">
                            <label class="form-label" for="fecha_inicio">Fecha Inicio</label>
                            <input id="fecha_inicio" type="date" data-mayus="false" name="fecha_inicio" class="form-control form-control-sm" autocomplete="off" >
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group ">
                            <label class="form-label" for="fecha_fin">Fecha Fin</label>
                            <input id="fecha_fin" type="date" data-mayus="false" name="fecha_fin" class="form-control form-control-sm" autocomplete="off" >
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="form-group ">
                            <label class="form-label" for="id_estudiante">Estudiante</label>
                            <select id="id_estudiante" name="id_estudiante" data-select="ESTUDIANTE" class="form-select" autocomplete="off"></select>    
                        </div>
                    </div>
                    <div class="col-md-1" style="padding-top:10px;">
                        <div class="form-group">                                             
                            <button type="date" data-mayus="false" name="update_datatable" class="btn btn-sm btn-warning " autocomplete="off" style="margin-top: 15px;"><i class="bx bx-search mr-1"></i> Buscar</button>
                        </div>
                    </div>
                    <div class="col-md-2" style="padding-top:10px;">
                        <button type="button" data-mayus="false" name="atenderIncidenciaMasiva" class="btn btn-sm btn-primary btn-primary-dark" autocomplete="off" style="margin-top: 15px;"><i class="bx bx-search mr-1"></i>Atender Masivo</button>
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

    <!--- MODAL -->
    <div class="modal inmodal fade" name="modal-save" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen">
            <form name="save">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 name="save" class="modal-title">Modal title</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center p-3">
                        <div class="row mt-1">
                            <div class="col-md-12">
                                <div class="card border-primary border-top border-3">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-3">
                                                <div class="form-group mb-1">
                                                    <h6 class="mb-3">N° Incidencia</h6>
                                                    <span data-mayus="false" name="serie_numero_incidencia" class="fs-6 fw-bold" autocomplete="off"></span>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group mb-1">
                                                    <h6 class="mb-3">Reporto</h6>
                                                    <span data-mayus="false" name="usuario_nombre" class="fs-6 fw-bold" autocomplete="off"></span>
                                                </div>
                                            </div>                                       
                                            <div class="col-md-3">
                                                <div class="form-group mb-1">
                                                    <h6 class="mb-3">Fecha de abordaje: </h6>
                                                    <input type="date" data-mayus="false" name="fecha_abordaje" class="form-control form-control-sm" readonly>
                                                </div>
                                            </div> 
                                            <div class="col-md-3">
                                                <div class="form-group mb-1">
                                                    <h6 class="mb-3">Hora de abordaje: </h6>
                                                    <input type="time" data-mayus="false" name="hora_inicio_abordaje" class="form-control form-control-sm" readonly>
                                                </div>
                                            </div> 
                                        </div>
                                    </div>
                                </div>                            
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">                             
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="card border-primary border-top border-3">
                                            <div class="card-body">
                                                <span class="fs-5 fw-bold"> Estudiante/s</span>
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
                                    <div class="col-md-6">
                                        <div class="card border-primary border-top border-3">
                                            <div class="card-body">
                                                <div class="form-group mb-3">
                                                    <span class="fs-5 fw-bold">Descripción</span>
                                                    <div name="incidencia"></div>
                                                </div> 
                                            </div>
                                        </div>   
                                    </div>
                                </div>                                                          
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="card border-primary border-top border-3">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group mb-1">
                                                    <h6 class="mb-3">Hora finalización</h6>
                                                    <input type="time" name="hora_fin_abordaje" class="form-control  form-control-sm" autocomplete="off" />
                                                </div>
                                            </div>
                                            <!-- <div class="col-md-6">
                                                <div class="form-group mb-1">
                                                    <h6 class="mb-3">Tiene más sesiones</h6>
                                                    <input type="number" name="cantidad_sesiones_programadas" class="form-control  form-control-sm" autocomplete="off" />
                                                </div>
                                            </div> -->
                                        </div>                                    
                                    </div>
                                </div>                                                          
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="card border-primary border-top border-3">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group mb-3">
                                                    <h6 class="mb-2">DESCRIPCIÓN</h6>
                                                    <div name="descripcion_abordaje"></div>
                                                </div>
                                            </div> 
                                            <div class="col-md-6">
                                                <div class="form-group mb-3">
                                                    <h6 class="mb-2">ACUERDOS</h6>
                                                    <div name="acuerdos_abordaje"></div>
                                                </div>
                                            </div> 
                                            <div class="col-md-6">
                                                <div class="form-group mb-1">
                                                    <h6 class="mb-2">PRIVADO</h6>
                                                    <div name="privado_abordaje"></div>
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
                        <button type="submit" class="btn btn-success">Confirmar Ahora</button>
                    </div>
                </div>
            </form>
        </div>
    </div>

</div>
`;