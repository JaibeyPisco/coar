export default /*html*/`
    
    <!-- MODAL SAVE -->
    <div class="modal inmodal fade" name="modal-tipo-personal-save" data-backdrop="static" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 name="save-tipo-personal" class="modal-title">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form name="save-tipo-personal">
                    <div class="modal-body modal-fondo">
                      
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group mb-3">
                                    <label for="nombre" class="form-label" required>Nombre</label>   
                                        <input id="nombre" name="nombre" class="form-control border-start-0 form-control-sm" autocomplete="off">
                                </div>
                                <div class="form-group mb-3">
                                    <label for="descripcion" class="form-label">Descripcion</label>
                                        <textarea id="descripcion" name="descripcion" class="form-control border-start-0 form-control-sm" autocomplete="off"></textarea>
                                  
                                </div>
                                    
                            </div>
                        </div>
                           
                    </div>
                    <div class="modal-footer" align="center" style="display:block">
                        <button type="button" name="cerrar" class="btn btn-default pull-left"
                            data-bs-dismiss="modal">Cerrar</button>
                        <button type="submit" class="btn btn-primary btn-success">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
`;  