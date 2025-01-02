export default /*html*/`

        <div id="main">
            <!--breadcrumb-->
            <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                <div class="breadcrumb-title pe-3">Configuración</div>
                <div class="ps-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0 p-0">
                            <li class="breadcrumb-item"><a href="javascript:;"><i class="fadeIn animated bx bx-slider-alt"></i></a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Personales</li>
                        </ol>
                    </nav>
                </div>
                <div class="ms-auto">
                    <div class="btn-group">
                        <button type="button" class="btn btn-success btn-success-dark px-4  btn-sm"   name="nuevo"><i class="lni lni-circle-plus"  ></i>Nuevo</button>
                    </div>
                </div>
            </div>
            <!--end breadcrumb-->

          
            <!-- Main content -->
            <section class="content">
                <div class="card border-default border-bottom border-3 radius-10 w-100">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table name="registros" class="table table-striped table-hover table-bordered border-default border-2" style="width:100%; font-weight: 500; font-size: 13px; vertical-align: middle;"></table>
                        </div>
                    </div>
                </div>
            </section>
            <!-- /.content -->

            <modal-personal-save></modal-save-personal>

            <!-- MODAL DELETE -->
            <div class="modal inmodal fade" name="modal-delete" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 name="delete" class="modal-title">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form name="delete">
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-md-12 m-0" align="center">
                                        <i class="fadeIn animated bx bx-trash" style="font-size:100px;"></i><br/>
                                    </div>
                                    <div class="col-md-12"  align="center">
                                        <label><input type="checkbox" name="confirmacion" required/>
                                            Confirmo realizar la eliminación del personal</label>
                                        <p style="color:red;">Esta acción no se podrá revertir</p>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer" align="center" style="display:block">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" name="submit" class="btn btn-danger btn-danger-dark">Eliminar Ahora!</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>            
        `;