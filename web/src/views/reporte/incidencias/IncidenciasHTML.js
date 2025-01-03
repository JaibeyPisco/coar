export default /*html*/` <div id="main">
    <!--breadcrumb-->
    <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div class="breadcrumb-title pe-3">Reportes Generales</div>
        <div class="ps-3">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0 p-0">
                    <li class="breadcrumb-item"><a href="javascript:;"><i class="fadeIn animated bx bx-spreadsheet"></i></a></li>
                    <li class="breadcrumb-item active" aria-current="page">Incidencias</li>
                </ol>
            </nav>
        </div>
    </div>
    <!--end breadcrumb-->

    <hr/>

    <!-- Main content -->
    <section class="content">

        <div class="card border-default border-bottom border-3 radius-10 w-100">
            <div class="card-body">
                <div class="table-responsive">
                    <table name="registros" class="table table-striped table-hover table-bordered border-default border-2" style="width:100%; font-weight: 500; font-size: 13px; vertical-align: middle;"></table>
                </div>
            </div>
        </div>

        <modal-view-guia></modal-view-guia>

    </section>
    <!-- /.content -->

    <!-- MODAL VER INCIDENCIAS -->
    <div class="modal" name="modal-ver_incidencias" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 name="ver_incidencias" class="modal-title">Incidencias</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body modal-fondo">
                    <h3 name="estudiante_responsable" class="d-flex justify-content-center align-content-center"></h3>
                    <div class="card border-default border-bottom border-3 radius-10 w-100">
                        <div class="card-body">                                 
                            <div class="row">
                                <div class="col-md-3">
                                    <div class="form-group mb-3">
                                        <label class="form-label" for="fecha_inicio">Fecha Inicio</label>
                                        <input id="fecha_inicio" type="date" data-mayus="false" name="fecha_inicio" class="form-control form-control-sm" autocomplete="off" >
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group mb-3">
                                        <label class="form-label" for="fecha_fin">Fecha Fin</label>
                                        <input id="fecha_fin" type="date" data-mayus="false" name="fecha_fin" class="form-control form-control-sm" autocomplete="off" >
                                    </div>
                                </div>
                                <div class="col-md-2" style="padding-top:14px;">
                                    <button type="button" data-mayus="false" name="update_datatable" class="btn btn-sm btn-warning" autocomplete="off" style="margin-top: 15px;"><i class="bx bx-search mr-1"></i>Buscar</button>                                   
                                </div>
                                <div class="col-md-4" style="padding-top:14px;">
                                    <button type="button" data-mayus="false" name="generar_reporte" class="btn btn-sm btn-info" autocomplete="off" style="margin-top: 15px;"><i class="bx bx-detail mr-1"></i>Generar Reporte</button>                                   
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div class="card border-default border-bottom border-3 radius-10 w-100">
                        <div class="card-body">
                            <div class="table-responsive">
                                <table name="registros_incidencias_por_estudiante" class="table table-striped table-hover table-bordered border-default border-2" style="width:100%; font-weight: 500; font-size: 13px; vertical-align: middle;"></table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" align="center" style="display:block">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- FIN MODAL VER INCIDENCIAS -->
</div>
`;
