export  default  `
    <div id="main">
            
             <!--breadcrumb-->
             <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                <div class="breadcrumb-title pe-3">Configuración</div>
                <div class="ps-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0 p-0">
                            <li class="breadcrumb-item"><a href="javascript:;"><i class="fadeIn animated bx bx-slider-alt"></i></a>
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">Usuarios</li>
                        </ol>
                    </nav>
                </div>
                <div class="ms-auto">
                    <div class="btn-group">
                        <button type="button" class="btn btn-success btn-success-dark px-4 btn-sm"   name="nuevo"><i class="lni lni-circle-plus"  "></i>Nuevo</button>
                    </div>
                </div>
            </div>
            <!--end breadcrumb-->
 

            <!-- Main content -->
            <section class="content">
                <div class="card   radius-10 w-100">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table name="registros" class="table table-striped table-hover table-bordered border-default border-2" style="width:100%; font-weight: 500; font-size: 13px; vertical-align: middle;"></table>
                        </div>
                    </div>
                </div>
            </section>
            <!-- /.content -->

            <modal-save-usuario></modal-save-usuario>
            
            <modal-usuario-change-password></modal-usuario-change-password>
               <modal-usuario-suspender></modal-usuario-suspender>
            <!-- MODAL DELETE -->
            <div class="modal inmodal fade" name="modal-delete" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                            <h4 name="delete" class="modal-title">Modal title</h4>
                        </div>
                        <form name="delete">
                            <div class="row">
                                <div class="col-md-12" align="center">
                                    <i class="fad fa-trash-alt fa-4x"></i><br/>
                                </div>
                                <div class="col-md-12"  align="center" style="padding-top:10px;">
                                    <label><input type="checkbox" name="confirmacion" required/>
                                        Confirmo realizar la eliminación</label>
                                    <p style="color:red;">Esta acción no se podrá revertir</p>
                                </div>
                                <div class="col-md-12" name="texto" align="center">

                                </div>
                            </div>
                            <div class="modal-footer" align="center" style="display:block" >
                                <button type="button" name="cerrar" class="btn btn-white" data-dismiss="modal">Cerrar</button>
                                <button type="submit" name="submit" class="btn btn-danger">Eliminar Ahora!</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


          

            <!---  MODAL ACTIVAR -->
            <div class="modal inmodal fade" name="modal-save_activar" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
                            <h4 name="save_activar" class="modal-title">Modal title</h4>
                        </div>
                        <form name="save_activar">
                            <div class="modal-body text-center p-3">                
                                <div class="row mt-3">
                                    <div class="col-md-12" align="center">
                                        <i class="fa fa-play fa-4x"></i>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Usuario</label>
                                            <input type="text" data-mayus="false" name="usuario" class="form-control" autocomplete="off" disabled>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Correo electrónico</label>
                                            <input type="email" name="email" class="form-control" autocomplete="off" disabled>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer" align="center" style="display:block">
                                <button type="button" name="cerrar" class="btn btn-white" data-dismiss="modal">Cerrar</button>
                                <button type="submit" class="btn btn-success">Activar Ahora!</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
                <!-- /.modal -->



        </div>  

`;