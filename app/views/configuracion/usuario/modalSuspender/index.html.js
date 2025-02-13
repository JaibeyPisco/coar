export  default  `

        <!---  MODAL SUSPENDER -->
            <div class="modal inmodal fade" name="modal-usuario-suspender" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header">
                             <h5 name="usuario-suspender" class="modal-title">Suspender usuario</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form name="usuario-suspender">
                            <div class="modal-body text-center p-3">                
                                <div class="row mt-3">
                                    <div class="col-md-12" align="center">
                                        <i class="fa fa-pause fa-4x"></i>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Usuario</label>
                                            <input type="text" data-mayus="false" name="usuario" class="form-control form-control-sm" autocomplete="off" disabled>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Correo electrónico</label>
                                            <input type="email" name="email" class="form-control form-control-sm" autocomplete="off" disabled>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer" align="center" style="display:block">
                                <button type="button" name="cerrar" class="btn btn-white btn-sm pull-left" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" class="btn btn-warning btn-sm">Suspender Ahora!</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
                <!-- /.modal -->
`;