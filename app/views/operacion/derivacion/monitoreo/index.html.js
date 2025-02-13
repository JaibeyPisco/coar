export default  /*html*/`
    <div class="modal fade" name="modal-monitoreo" tabindex="-1"
        aria-hidden="true">
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-4">Monitoreos</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                        <div class="row">
                            <div class="col-md-5">
                                <div class="card   radius-10 w-100">
                                    <div class="card-body">
                                      <form name="save-monitoreo">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group mb-3">
                                                    <label for="nombre" class="form-label" > Fecha y hora</label>   
                                                        <input type="datetime-local" name="fecha_hora" class="form-control border-start-0 form-control-sm" autocomplete="off" required>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group mb-3">
                                                    <label for="nombre" class="form-label">Estado de monitoreo</label>   
                                                        <select type="text" name="id_estado_monitoreo" data-select="ESTADO_MONITOREO" class="form-control select form-control-sm" required autocomplete="off">
                                                                </select>
                                                </div>
                                            </div>
                                            
                                             <div class="col-md-12">
                                                   <label class="form-label">¿Problema?</label>
                                                    <div  name="problema"></div>
                                             </div>
                                              <div class="col-md-12">
                                                   <label class="form-label">¿Acuerdos?</label>
                                                    <div   name="acuerdos"></div>
                                             </div>
                                            <div class="col-md-12">
                                                   <label class="form-label">Descripcion Privada</label>
                                                    <div   name="descripcion_privada"></div>
                                             </div>
                                             <div class="col-md-12">
                                                   <label class="form-label">Archivo</label>
                                                   <input class="form-control form-control-sm" name="archivo" type="file">
                                             </div>
                                             <div class="col-md-12">
                                                   <foto-component></foto-component>
                                            </div>
                                            
                                             <div class="col-md-12">
                                                    <button type="submit" name="submit" class="btn btn-primary btn-sm" style="width:100%;">
                                                        <i class="fa fa-save"></i> GUARDAR
                                                    </button>
                                            </div>
                                            
                                            
                                        </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-md-7">
                                <div class="card   radius-10 w-100 scrollable-card" style="height: ${(window.innerHeight - 300)}px !important">
                                      <div class="card-header bg-primary">
                                        <h5 class="card-title  text-white">Monitoreo</h5>
                                      </div>
                                    <div class="card-body">
                                           
                                         <div name="listar-estados-monitoreos">
                                        </div> 
                                           
                                            
                                    </div>
                                </div>
                            </div>

                        </div>
                </div>
                <div class="modal-footer" align="center" style="display:block">
                <button type="button" class="btn btn-white pull-left btn-sm"
                            data-bs-dismiss="modal">Cerrar</button>
                        <button name="submit" type="submit"
                            class="btn btn-primary btn-primary-dark btn-sm">Guardar</button>
                </div>
            </div>
        </div>
         <modal-fotos-components></modal-fotos-components>
    </div>
    
    
    
`;
``