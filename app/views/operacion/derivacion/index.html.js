export default /*html*/` <div id="main">

<style>
        .form-group {
            margin-bottom: 5px !important;
        }
        td, th{
            font-size:12px !important;
        }
        .tbl-detalle_orden{
            margin-bottom:0 !important;
        }

        .tbl-detalle_orden td, .tbl-detalle_orden th{
            padding-top:0 !important; 
            padding-bottom:0 !important; 
        }

        .tbl-detalle_orden th{
            background-color:#FFE372 !important;
        }
        
        table[name="registros"] td{
            padding:1px 5px !important;
        }

        table[name="registros"] .btn
        {
            border-radius:5px !important;
        }

    </style>
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
        <div class="card   radius-10 w-100">
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
                   
                </div>
            </div>
        </div>     
        <div class="card   radius-10 w-100">
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
    <modal-delete></modal-delete>
    <modal-derivar></modal-derivar>
    <modal-finalizar></modal-finalizar>


</div>
`;