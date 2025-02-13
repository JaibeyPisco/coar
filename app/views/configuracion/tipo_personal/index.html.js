export default /*html*/` <div id="main">
    <!--breadcrumb-->
    <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div class="breadcrumb-title pe-3">Configuración</div>
        <div class="ps-3">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0 p-0">
                    <li class="breadcrumb-item"><a href="javascript:;"><i
                                class="fadeIn animated bx bx-slider-alt"></i></a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Tipo De Personales</li>
                </ol>
            </nav>
        </div>
        <div class="ms-auto">
            <div class="btn-group">
                        <button type="button" class="btn btn-success btn-success-dark px-4" style="font-size:15px;" name="nuevo"><i
                        class="lni lni-circle-plus" style="font-size:15px;"></i>Nuevo</button>
            </div>
        </div>
    </div>
    <!--end breadcrumb-->
 
 
    <!-- Main content -->
    <section class="content">
        <div class="card   radius-10 w-100">
            <div class="card-body">
                <div class="table-responsive">
                    <table name="registros"
                        class="table table-striped table-hover table-bordered border-default border-2"
                        style="width:100%; font-weight: 500; font-size: 13px; vertical-align: middle;"></table>
                </div>
            </div>
        </div>
    </section>
    <!-- /.content -->

    <modal-tipo-personal-save></modal-tipo-personal-save>
    <modal-tipo-personal-delete></modal-tipo-personal-delete>

 
</div>
`;